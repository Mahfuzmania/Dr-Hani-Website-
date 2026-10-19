import type { MetadataRoute } from 'next'

import { getSiteUrl, isReviewDeployment } from '@/src/lib/metadata'

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl()
  if (isReviewDeployment()) return { rules: { userAgent: '*', disallow: '/' } }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
