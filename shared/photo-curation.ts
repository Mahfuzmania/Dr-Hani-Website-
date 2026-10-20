import type { SiteContentV2 } from './site-content-v2'

export type GalleryItem = SiteContentV2['galleryItems'][number]
export type HomepagePhotoSection = 'medical-work' | 'dialogues' | 'public-work'

export function photoSection(item: GalleryItem): HomepagePhotoSection {
  if (item.homepageSection) return item.homepageSection
  if (/dialogue|bay of bengal/i.test(item.event ?? '')) return 'dialogues'
  return item.category === 'medical' ? 'medical-work' : 'public-work'
}

export function homepagePhotos(
  items: GalleryItem[],
  section: HomepagePhotoSection,
) {
  return items
    .filter(
      (item) =>
        item.status === 'published' &&
        item.featuredOnHomepage &&
        photoSection(item) === section,
    )
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id))
}

export function focalCoordinate(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.min(100, Math.max(0, value))
    : 50
}

export function photoPosition(item: GalleryItem) {
  return `${focalCoordinate(item.focalX)}% ${focalCoordinate(item.focalY)}%`
}
