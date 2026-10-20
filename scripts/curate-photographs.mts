import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { editorialGallery } from '../shared/editorial-gallery'
import type { GalleryItem } from '../shared/photo-curation'
import { curationPatch, galleryCurationData } from './photo-curation-support'

const root = process.cwd()
const apply = process.argv.includes('--apply')
const reportPath = path.join(
  root,
  'docs/photographic-refinement/curation-dry-run.json',
)
const baseline = JSON.parse(
  await readFile(
    path.join(root, 'docs/photographic-refinement/baseline-gallery.json'),
    'utf8',
  ),
) as GalleryItem[]
const exportArg = process.argv
  .find((arg) => arg.startsWith('--export='))
  ?.slice(9)
if (!apply) {
  const exported = exportArg
    ? JSON.parse(await readFile(path.resolve(exportArg), 'utf8'))
    : []
  const docs = (Array.isArray(exported) ? exported : exported.docs) as Record<
    string,
    unknown
  >[]
  const report = editorialGallery.map((item) => {
    const existing = docs.find((doc) => doc.externalId === item.id)
    return {
      externalId: item.id,
      action: existing ? 'patch-unchanged-fields' : 'create-if-missing',
      patch: existing
        ? curationPatch(
            existing,
            baseline.find((record) => record.id === item.id),
            item,
          )
        : galleryCurationData(item),
      publication: existing ? 'preserve-existing-status' : 'create-as-draft',
    }
  })
  await writeFile(
    reportPath,
    JSON.stringify(
      {
        mode: 'dry-run',
        comparedWith: exportArg ?? 'no CMS export; creation proposals only',
        records: report,
      },
      null,
      2,
    ) + '\n',
  )
  console.log(
    `Dry run only: ${report.length} scoped photograph proposals. Supply --export=<CMS gallery export.json> to compare staff edits. No database connected.`,
  )
} else {
  if (process.env.PHOTO_CURATION_APPROVED !== 'true')
    throw new Error(
      'Apply requires PHOTO_CURATION_APPROVED=true after backup and dry-run review.',
    )
  if (process.env.PAYLOAD_DB_DRIVER !== 'postgres')
    throw new Error(
      'Set PAYLOAD_DB_DRIVER=postgres explicitly; apply is for the reviewed target CMS only.',
    )
  process.chdir(path.join(root, 'backend'))
  const { getPayload } = await import('payload')
  const { default: config } = await import('../backend/payload.config')
  const payload = await getPayload({ config })
  try {
    for (const item of editorialGallery) {
      const result = await payload.find({
        collection: 'gallery-items',
        where: { externalId: { equals: item.id } },
        limit: 1,
        overrideAccess: true,
      })
      const existing = result.docs[0]
      if (existing) {
        const patch = curationPatch(
          existing,
          baseline.find((record) => record.id === item.id),
          item,
        )
        if (Object.keys(patch).length)
          await payload.update({
            collection: 'gallery-items',
            id: existing.id,
            data: patch,
          })
      } else {
        const filename = path.basename(item.image)
        let media = (
          await payload.find({
            collection: 'media',
            where: { filename: { equals: filename } },
            limit: 1,
          })
        ).docs[0]
        if (!media) {
          const bytes = await readFile(
            path.join(root, 'frontend/public', item.image),
          )
          media = await payload.create({
            collection: 'media',
            data: {
              altText: item.altText,
              caption: item.caption,
              category: item.category,
            },
            file: {
              name: filename,
              data: bytes,
              mimetype: 'image/webp',
              size: bytes.length,
            },
          })
        }
        await payload.create({
          collection: 'gallery-items',
          data: {
            externalId: item.id,
            image: media.id,
            ...galleryCurationData(item),
            status: 'draft',
          },
        })
      }
    }
    console.log(
      'Applied scoped curation. Existing publication states preserved; new records created as drafts. Review and publish through the CMS.',
    )
  } finally {
    await payload.destroy()
  }
}
process.exit(0)
