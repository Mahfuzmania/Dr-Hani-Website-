import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/src/lib/metadata'
import { siteContentV2 } from '../../../shared/site-content-v2'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const staticRoutes = [
    '/',
    '/about',
    '/medical-service',
    '/public-service',
    '/leadership',
    '/media-events',
    '/gallery',
    '/updates',
    '/contact',
    '/privacy',
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === '/privacy' ? ('yearly' as const) : ('weekly' as const),
    priority: path === '/' ? 1 : path === '/privacy' ? 0.3 : 0.6,
  }))

  const updateRoutes = siteContentV2.updates
    .filter((update) => update.status === 'published')
    .map((update) => ({
      url: `${base}/updates/${update.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticRoutes, ...updateRoutes]
}
