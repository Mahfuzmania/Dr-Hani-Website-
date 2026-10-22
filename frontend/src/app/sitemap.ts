import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent()
  const base = getSiteUrl()
  const staticRoutes = [
    '/',
    '/about',
    '/writing',
    '/media-events',
    '/gallery',
    '/updates',
    '/privacy',
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === '/privacy' ? ('yearly' as const) : ('weekly' as const),
    priority: path === '/' ? 1 : path === '/privacy' ? 0.3 : 0.6,
  }))

  const updateRoutes = content.updates
    .filter((update) => update.status === 'published')
    .map((update) => ({
      url: `${base}/updates/${update.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticRoutes, ...updateRoutes]
}
