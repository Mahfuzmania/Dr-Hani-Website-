import { GalleryGrid } from '@/src/components/gallery/gallery-grid'
import { SectionIntro } from '@/src/components/sections/section-intro'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Gallery',
  'Image archive for Dr Umma Hani with category filters and lightbox viewing.',
  '/gallery',
)

export default async function GalleryPage() {
  const { galleryItems } = await getSiteContent()

  return (
    <div className="pb-24">
      <section className="page-shell pt-28 md:pt-40">
        <SectionIntro
          eyebrow="Gallery"
          title="A visual archive drawn from medical work, outreach, appearances, and leadership."
          body="The gallery is organized around medical service, community outreach, events, and leadership so the record reads clearly rather than as an unstructured photo dump."
        />
      </section>
      <section className="page-shell section-space">
        <GalleryGrid items={galleryItems} />
      </section>
    </div>
  )
}

