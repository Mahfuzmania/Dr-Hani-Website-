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
      images: ['/media/about-doctor-portrait.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteContent.siteSettings.fullName}`,
      description,
      images: ['/media/about-doctor-portrait.jpg'],
    },
    alternates: {
      canonical: `${base}${path}`,
    },
  }
}
