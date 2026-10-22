import { mkdir, writeFile } from 'node:fs/promises'
import { publications } from '../shared/publications'
import { editorialGallery } from '../shared/editorial-gallery'

await mkdir('docs', { recursive: true })
await writeFile(
  'docs/source-register.json',
  JSON.stringify(
    {
      researchedOn: '2026-10-20',
      publications: publications.map((item) => ({
        ...item,
        verificationStatus: 'publisher-source-reviewed',
        eventDate:
          item.relatedActivity === 'jagannath-university-health-camp-2025'
            ? '23–25 September 2025'
            : undefined,
      })),
      captions: editorialGallery,
    },
    null,
    2,
  ) + '\n',
)
console.log('Wrote publication and caption register.')
