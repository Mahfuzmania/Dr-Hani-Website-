import { publicPublications } from './publication-contract'
import type { SiteContentV2 } from './site-content-v2'

// A configured CMS outage must never restore content an editor has unpublished.
export function unavailableContent(content: SiteContentV2): SiteContentV2 {
  return publicContent({
    ...content,
    contentStatus: 'unavailable',
    publications: [],
    galleryItems: [],
    mediaItems: [],
    updates: [],
    positions: [],
    importantNotices: [],
  })
}

export function publicContent(content: SiteContentV2): SiteContentV2 {
  const publications = publicPublications(content.publications)
  const publicationUrls = new Set(publications.flatMap((entry) => entry.sources.map((source) => source.url)))
  return {
    ...content,
    publications,
    galleryItems: content.galleryItems.filter((item) => item.status === 'published'),
    mediaItems: content.mediaItems.filter(
      (item) => item.status === 'published' && !(item.type === 'article' && publicationUrls.has(item.url)),
    ),
    updates: content.updates.filter(
      (item) => item.status === 'published' && item.slug !== 'chhatra-dal-central-vice-president-2026',
    ),
    positions: content.positions
      .filter(
        (item) =>
          item.status === 'published' &&
          item.id !== 'chhatra-dal-central-vice-president-2026' &&
          !(
            item.organization === 'Bangladesh Jatiyatabadi Chhatra Dal' &&
            item.branch === 'Central Parliament' &&
            item.title === 'Vice-President'
          ),
      )
      .map(({ sourceNote: _note, ...item }) => item),
    importantNotices: content.importantNotices.filter((item) => item.status === 'published'),
  }
}
