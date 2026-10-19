import test from 'node:test'
import assert from 'node:assert/strict'
import { publications } from '../shared/publications'
import { publicPublications } from '../shared/publication-contract'
import { publicContent, unavailableContent } from '../shared/public-content'
import { siteContentV2 } from '../shared/site-content-v2'
import { getPublicSiteContent } from '../backend/src/lib/public-site'
import { createIfMissing } from '../scripts/import-support'
import { readPublicationSources } from '../backend/src/lib/publication-form'

test('editing a story preserves every publisher beyond the initial source count', () => {
  const form = new FormData()
  for (let index = 0; index < 10; index++) {
    form.set(`publisher${index}`, `Publisher ${index}`)
    form.set(`url${index}`, `https://example.com/${index}`)
    form.set(`byline${index}`, 'Original byline')
  }
  assert.equal(readPublicationSources(form).length, 10)
  assert.equal(readPublicationSources(form)[9].publisher, 'Publisher 9')
})

test('six essays preserve seven publication placements without duplicate works', () => {
  const essays = publications.filter((entry) => entry.kind === 'essay')
  assert.equal(essays.length, 6)
  assert.equal(essays.flatMap((entry) => entry.sources).length, 7)
  assert.equal(new Set(essays.map((entry) => entry.id)).size, 6)
})

test('public publication contract excludes drafts, private notes, duplicates and unsafe links', () => {
  const source = publications[0]
  const output = publicPublications([
    { ...source, verificationNotes: 'PRIVATE' },
    { ...source },
    { ...source, id: 'draft', status: 'draft' },
    { ...source, id: 'unsafe', sources: [{ ...source.sources[0], url: 'javascript:alert(1)' }] },
  ])
  assert.equal(output.length, 1)
  assert.equal('verificationNotes' in output[0], false)
})

test('public fallback excludes pending photographs and the disputed appointment', () => {
  const output = publicContent(siteContentV2)
  assert.ok(output.galleryItems.every((item) => item.status === 'published'))
  assert.ok(!JSON.stringify(output).includes('central-vice-president'))
  assert.ok(!JSON.stringify(output).includes('sourceNote'))
})

test('a healthy empty CMS does not resurrect bundled archive content', async () => {
  const output = await getPublicSiteContent(
    { find: async () => ({ docs: [] }), findGlobal: async () => ({}) },
    'https://cms.example.com',
  )
  for (const field of [
    'publications',
    'galleryItems',
    'updates',
    'mediaItems',
    'importantNotices',
    'positions',
  ] as const)
    assert.deepEqual(output[field], [])
})

test('a configured CMS outage is distinct from a healthy empty archive', () => {
  const output = unavailableContent(siteContentV2)
  assert.equal(output.contentStatus, 'unavailable')
  for (const field of [
    'publications',
    'galleryItems',
    'updates',
    'mediaItems',
    'importantNotices',
    'positions',
  ] as const)
    assert.deepEqual(output[field], [])
})

test('invalid publication dates cannot silently acquire a different date', () => {
  const source = publications[0]
  assert.deepEqual(
    publicPublications([{ ...source, sources: [{ ...source.sources[0], publishedAt: '2026-02-31' }] }]),
    [],
  )
})

test('public CMS mapping exposes only complete published publication fields', async () => {
  const base = publications[0]
  const doc = {
    ...base,
    externalId: base.id,
    topics: base.topics.map((label) => ({ label })),
    verificationNotes: 'PRIVATE',
    _status: 'published',
  }
  const output = await getPublicSiteContent(
    {
      find: async ({ collection }) => ({ docs: collection === 'publications' ? [doc] : [] }),
      findGlobal: async () => ({}),
    },
    'https://cms.example.com',
  )
  assert.equal(output.publications.length, 1)
  assert.equal(output.publications[0].id, base.id)
  assert.ok(!JSON.stringify(output).includes('PRIVATE'))
})

test('repeatable imports preserve staff edits and do not create a second record', async () => {
  const store = new Map<string, { title: string }>()
  const find = async (key: string) => store.has(key)
  const create = async () => {
    store.set('essay', { title: 'Imported title' })
  }
  await createIfMissing('essay', find, create)
  store.set('essay', { title: 'Staff-edited title' })
  const second = await createIfMissing('essay', find, create)
  assert.equal(second.created, false)
  assert.equal(store.size, 1)
  assert.equal(store.get('essay')?.title, 'Staff-edited title')
})
