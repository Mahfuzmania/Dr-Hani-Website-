import type { GalleryItem, PageHero, VideoArchiveItem } from '../../../shared/site-content'

export const DEFAULT_SITE_IMAGE = '/media/about-doctor-portrait.jpg'

export function getGalleryItem(items: GalleryItem[], id: string) {
  return items.find((item) => item.id === id) ?? null
}

export function getGalleryImage(items: GalleryItem[], id: string, fallback = DEFAULT_SITE_IMAGE) {
  return getGalleryItem(items, id)?.image ?? fallback
}

export function getVideoItem(items: VideoArchiveItem[], id: string) {
  return items.find((item) => item.id === id) ?? null
}

export function getHeroImage(hero: PageHero, fallback = DEFAULT_SITE_IMAGE) {
  return hero.image ?? fallback
}
