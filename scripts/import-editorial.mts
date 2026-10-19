import path from 'node:path'
import { readFile } from 'node:fs/promises'
import { getPayload } from 'payload'
import { publications } from '../shared/publications'
import { editorialGallery } from '../shared/editorial-gallery'
import { siteContentV2 } from '../shared/site-content-v2'
import { createIfMissing, archiveSupersededArticle } from './import-support'

const taskRoot = process.cwd()
if (process.env.NODE_ENV === 'production' && process.env.EDITORIAL_IMPORT_APPROVED !== 'true')
  throw new Error('Production imports require EDITORIAL_IMPORT_APPROVED=true after backup and review.')
process.chdir(path.join(taskRoot, 'backend'))
const { default: config } = await import('../backend/payload.config')
const payload = await getPayload({ config })
const context = { editorialImport: true }
let created = 0
try {
  for (const entry of publications) {
    const result = await createIfMissing(
      entry.id,
      async (id) =>
        Boolean(
          (
            await payload.find({
              collection: 'publications',
              where: { externalId: { equals: id } },
              limit: 1,
            })
          ).docs.length,
        ),
      async () => {
        const { id, image, ...record } = entry
        return payload.create({
          collection: 'publications',
          overrideAccess: true,
          context,
          draft: entry.status !== 'published',
          data: {
            ...record,
            _status: entry.status,
            externalId: id,
            imagePath: image,
            topics: record.topics.map((label) => ({ label })),
            verificationNotes:
              'Reviewed publisher-source import, 20 October 2026. See docs/CONTENT_REVIEW.md.',
          },
        })
      },
    )
    if (result.created) created++
  }
  for (const entry of editorialGallery) {
    const result = await createIfMissing(
      entry.id,
      async (id) =>
        Boolean(
          (
            await payload.find({
              collection: 'gallery-items',
              where: { externalId: { equals: id } },
              limit: 1,
            })
          ).docs.length,
        ),
      async () => {
        const filename = path.basename(entry.image)
        let media = (
          await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1 })
        ).docs[0]
        if (!media)
          media = await payload.create({
            collection: 'media',
            data: { altText: entry.altText, caption: entry.caption, category: entry.category },
            file: {
              name: filename,
              data: await readFile(path.join(taskRoot, 'frontend/public', entry.image)),
              mimetype: 'image/webp',
              size: (await readFile(path.join(taskRoot, 'frontend/public', entry.image))).length,
            },
          })
        return payload.create({
          collection: 'gallery-items',
          data: {
            externalId: entry.id,
            title: entry.title,
            image: media.id,
            caption: entry.caption,
            category: entry.category,
            event: entry.event,
            relatedActivity: entry.relatedActivity,
            featured: entry.featuredOnHomepage,
            sortOrder: entry.sortOrder,
            status: entry.status,
          },
        })
      },
    )
    if (result.created) created++
  }
  for (const entry of siteContentV2.updates) {
    const result = await createIfMissing(
      entry.slug,
      async (slug) =>
        Boolean(
          (await payload.find({ collection: 'updates', where: { slug: { equals: slug } }, limit: 1 })).docs
            .length,
        ),
      async () => {
        const { id: _id, date, image: _image, body, ...record } = entry
        return payload.create({
          collection: 'updates',
          draft: false,
          data: {
            ...record,
            _status: entry.status,
            publishDate: new Date(date).toISOString(),
            bodyText: body.join('\n\n'),
          },
        })
      },
    )
    if (result.created) created++
  }
  // Once the replacement story exists, hide its old media-only representation.
  await archiveSupersededArticle(payload)
  console.log(
    `Created ${created} missing records. Existing editorial records were preserved; superseded media articles were archived as drafts.`,
  )
} finally {
  await payload.destroy()
}
// Payload's development worker can retain a timer after closing SQLite.
process.exit(0)
