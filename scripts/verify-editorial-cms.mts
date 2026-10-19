import assert from 'node:assert/strict'
import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { getPayload } from 'payload'
import { publications } from '../shared/publications'
import { publicContent } from '../shared/public-content'
import { getPublicSiteContent } from '../backend/src/lib/public-site'
import { createIfMissing, archiveSupersededArticle } from './import-support'

const taskRoot = process.cwd()
const directory = await mkdtemp(path.join(tmpdir(), 'dr-hani-cms-'))
process.env.PAYLOAD_DB_DRIVER = 'sqlite'
process.env.SQLITE_DATABASE_URL = `file:${path.join(directory, 'acceptance.db')}`
process.chdir(path.join(taskRoot, 'backend'))
const { default: config } = await import('../backend/payload.config')
const payload = await getPayload({ config })
try {
  const administrator = await payload.create({
    collection: 'users',
    data: {
      name: 'Temporary acceptance administrator',
      email: 'acceptance@example.invalid',
      password: randomUUID(),
      role: 'content-admin',
    },
  })
  const editor = await payload.create({
    collection: 'users',
    data: {
      name: 'Temporary acceptance editor',
      email: 'editor@example.invalid',
      password: randomUUID(),
      role: 'editor',
    },
  })
  const administratorUser = { ...administrator, collection: 'users' as const }
  const editorUser = { ...editor, collection: 'users' as const }
  for (const entry of publications.filter((entry) => entry.kind === 'essay')) {
    const { id, image: _image, ...fields } = entry
    await payload.create({
      collection: 'publications',
      overrideAccess: false,
      user: administratorUser,
      draft: false,
      data: {
        ...fields,
        _status: 'published',
        externalId: id,
        topics: fields.topics.map((label) => ({ label })),
        verificationNotes: 'PRIVATE_ACCEPTANCE_NOTE',
      },
    })
  }
  const draft = await payload.create({
    collection: 'publications',
    overrideAccess: false,
    user: editorUser,
    draft: true,
    data: {
      externalId: 'acceptance-draft',
      kind: 'essay',
      title: 'DRAFT_ACCEPTANCE_TITLE',
      summary: 'Unpublished acceptance entry.',
      topics: [],
      sources: [{ publisher: 'Test', byline: 'Test', url: 'https://example.com/test' }],
      status: 'draft',
    },
  })
  const anonymous = await payload.find({
    collection: 'publications',
    overrideAccess: false,
    pagination: false,
  })
  assert.equal(anonymous.docs.length, 6)
  assert.ok(!JSON.stringify(anonymous.docs).includes('PRIVATE_ACCEPTANCE_NOTE'))
  assert.ok(!JSON.stringify(anonymous.docs).includes('DRAFT_ACCEPTANCE_TITLE'))
  assert.equal(anonymous.docs.flatMap((entry) => entry.sources).length, 7)
  await assert.rejects(
    () =>
      payload.update({
        collection: 'publications',
        id: draft.id,
        overrideAccess: false,
        user: editorUser,
        draft: false,
        data: { status: 'published', _status: 'published' },
      }),
    /administrator must publish/,
  )
  await payload.update({
    collection: 'publications',
    id: draft.id,
    overrideAccess: false,
    user: administratorUser,
    draft: false,
    data: { status: 'published', _status: 'published' },
  })
  assert.equal((await payload.find({ collection: 'publications', overrideAccess: false })).totalDocs, 7)
  await payload.update({
    collection: 'publications',
    id: draft.id,
    overrideAccess: false,
    user: administratorUser,
    draft: false,
    data: { status: 'draft', _status: 'draft' },
  })
  assert.equal((await payload.find({ collection: 'publications', overrideAccess: false })).totalDocs, 6)

  const existing = anonymous.docs[0]
  await payload.update({
    collection: 'publications',
    id: existing.id,
    user: administratorUser,
    data: { title: 'Staff-edited acceptance title' },
    draft: false,
  })
  const repeat = await createIfMissing(
    String(existing.externalId),
    async (id) =>
      Boolean(
        (await payload.find({ collection: 'publications', where: { externalId: { equals: id } } })).totalDocs,
      ),
    async () => {
      throw new Error('Existing record must not be overwritten')
    },
  )
  assert.equal(repeat.created, false)
  assert.equal(
    (await payload.findByID({ collection: 'publications', id: existing.id })).title,
    'Staff-edited acceptance title',
  )

  await payload.create({
    collection: 'gallery-items',
    data: { title: 'DRAFT_GALLERY_TITLE', category: 'events', status: 'draft' },
  })
  assert.equal((await payload.find({ collection: 'gallery-items', overrideAccess: false })).totalDocs, 0)
  const content = publicContent(await getPublicSiteContent(payload, 'https://cms.example.invalid'))
  assert.equal(content.publications.length, 6)
  assert.ok(!JSON.stringify(content).includes('PRIVATE_ACCEPTANCE_NOTE'))
  assert.ok(!JSON.stringify(content).includes('DRAFT_ACCEPTANCE_TITLE'))
  await payload.update({
    collection: 'publications',
    where: {},
    user: administratorUser,
    draft: false,
    data: { status: 'draft', _status: 'draft' },
  })
  assert.deepEqual((await getPublicSiteContent(payload, 'https://cms.example.invalid')).publications, [])

  const legacy = await payload.create({
    collection: 'media-items',
    data: {
      title: 'Preserved legacy article',
      type: 'article',
      mediaUrl: 'https://www.jagonews24.com/politics/news/1109481',
      description: 'Staff-edited legacy description',
      category: 'events',
      status: 'published',
      _status: 'published',
    },
  })
  assert.equal(await archiveSupersededArticle(payload), 0)
  const replacement = publications.find((entry) => entry.id === 'reserved-seat-nomination-press')!
  const { id: _replacementId, image: _replacementImage, ...replacementRecord } = replacement
  await payload.create({
    collection: 'publications',
    user: administratorUser,
    data: { ...replacementRecord, externalId: replacement.id, topics: [], _status: 'published' },
  })
  assert.equal(await archiveSupersededArticle(payload), 1)
  assert.equal(await archiveSupersededArticle(payload), 0)
  const archived = await payload.findByID({ collection: 'media-items', id: legacy.id })
  assert.equal(archived.status, 'draft')
  assert.equal(archived.description, 'Staff-edited legacy description')

  const migration = await readFile(
    path.join(taskRoot, 'backend/src/migrations/20261020_000000_editorial_publications.ts'),
    'utf8',
  )
  const up = migration.split('export async function down')[0]
  assert.ok(!/DROP TABLE|DROP COLUMN|TRUNCATE/.test(up))
  for (const field of ['external_id', 'event', 'related_activity'])
    assert.ok(up.includes(`ALTER TABLE "gallery_items" ADD COLUMN "${field}"`))
  console.log(
    'CMS acceptance passed: 6 essays / 7 placements; editor publishing denied; admin publish/unpublish; anonymous draft and private-note exclusion; empty archive; staff-edit preservation; additive migration.',
  )
} finally {
  await payload.destroy()
}
process.exit(0)
