import type { Metadata } from 'next'

import { siteContent } from '../../../shared/site-content'

export function buildMetadata(title: string, description: string, path = '/'): Metadata {
  const base = process.env.FRONTEND_URL || 'http://localhost:3000'

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteContent.siteSettings.fullName}`,
      description,
      url: `${base}${path}`,
      siteName: siteContent.siteSettings.fullName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteContent.siteSettings.fullName}`,
      description,
    },
    alternates: {
      canonical: `${base}${path}`,
    },
  }
}
