import { cache } from 'react'

import { siteContentV2, type SiteContentV2 } from '../../../shared/site-content-v2'

const getBackendUrl = () => process.env.NEXT_PUBLIC_BACKEND_URL?.trim()

export const getSiteContent = cache(async (): Promise<SiteContentV2> => {
  const backendUrl = getBackendUrl()

  if (!backendUrl) {
    return siteContentV2
  }

  try {
    const response = await fetch(`${backendUrl}/api/public/site`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`)
    }

    return (await response.json()) as SiteContentV2
  } catch {
    return siteContentV2
  }
})
