import type { Metadata } from 'next'

import { siteContentV2 } from '../../../shared/site-content-v2'

const fallbackSiteUrl = 'https://dr-hani-website.vercel.app'

export function getSiteUrl() {
  const configuredUrl = process.env.FRONTEND_URL?.trim() || process.env.NEXT_PUBLIC_FRONTEND_URL?.trim()

  if (configuredUrl && !configuredUrl.includes('localhost')) {
    return configuredUrl.replace(/\/$/, '')
  }

  return fallbackSiteUrl
}

export function isReviewDeployment() {
  return process.env.VERCEL_ENV === 'preview' || process.env.SITE_NOINDEX === 'true'
}

export function buildMetadata(title: string, description: string, path = '/'): Metadata {
  const base = getSiteUrl()

  return {
    title,
    description,
    robots: isReviewDeployment() ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${title} | ${siteContentV2.siteSettings.fullName}`,
      description,
      url: `${base}${path}`,
      siteName: siteContentV2.siteSettings.fullName,
      type: 'website',
      images: ['/media/about-doctor-portrait.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteContentV2.siteSettings.fullName}`,
      description,
      images: ['/media/about-doctor-portrait.jpg'],
    },
    alternates: {
      canonical: `${base}${path}`,
    },
  }
}
