import type { GalleryItem } from '../shared/photo-curation'

const editable = [
  'title',
  'caption',
  'category',
  'event',
  'featured',
  'sortOrder',
  'homepageSection',
  'focalX',
  'focalY',
] as const
export function galleryCurationData(item: GalleryItem) {
  return {
    title: item.title,
    caption: item.caption,
    category: item.category,
    event: item.event,
    featured: item.featuredOnHomepage,
    sortOrder: item.sortOrder,
    homepageSection: item.homepageSection,
    focalX: item.focalX ?? 50,
    focalY: item.focalY ?? 50,
  }
}

/** Change only fields still equal to the preceding seed. Never change publication state. */
export function curationPatch(
  existing: Record<string, unknown>,
  baseline: GalleryItem | undefined,
  desired: GalleryItem,
) {
  const previous = baseline ? galleryCurationData(baseline) : undefined
  const next = galleryCurationData(desired)
  const patch: Record<string, unknown> = {}
  for (const key of editable) {
    const current = existing[key]
    const untouched = current === previous?.[key]
    const newField =
      ['homepageSection', 'focalX', 'focalY'].includes(key) &&
      (current === undefined ||
        current === null ||
        (key !== 'homepageSection' && current === 50))
    if (
      (untouched || newField) &&
      current !== next[key] &&
      next[key] !== undefined
    )
      patch[key] = next[key]
  }
  return patch
}
