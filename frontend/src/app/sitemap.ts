import type { MetadataRoute } from 'next'

import { siteContent } from '../../../shared/site-content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.FRONTEND_URL || 'http://localhost:3000'
  const staticRoutes = siteContent.siteSettings.navigation.map((item) => ({
    url: `${base}${item.href}`,
    changeFrequency: 'weekly' as const,
    priority: item.href === '/' ? 1 : 0.7,
  }))

  const updateRoutes = siteContent.updates.map((update) => ({
    url: `${base}/updates/${update.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...updateRoutes,
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
