import { PageIntro } from '@/src/components/site/page-intro'
import { GalleryGrid } from '@/src/components/gallery/gallery-grid'
import { getSiteContent } from '@/src/lib/site-api'
import { buildMetadata } from '@/src/lib/metadata'

export const metadata = buildMetadata(
  'Gallery',
  'Selected photographs from Dr Umma Hani’s medical work, community activities, and public events.',
  '/gallery',
)
export default async function GalleryPage() {
  const content = await getSiteContent()
  const items = [...content.galleryItems].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  )
  return (
    <div className="page-shell archive-page">
      <PageIntro title="Photographs">
        <p>
          Selected photographs from clinical settings, community programmes, and
          public conversations.
        </p>
      </PageIntro>
      <GalleryGrid items={items} />
    </div>
  )
}
