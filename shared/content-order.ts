import type { SiteContentV2 } from './site-content-v2'

export function sortActivities(items: SiteContentV2['updates']) {
  return [...items].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}
