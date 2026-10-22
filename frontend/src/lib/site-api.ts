import { cache } from 'react'

import { siteContentV2, type SiteContentV2 } from '../../../shared/site-content-v2'
import { publicContent, unavailableContent } from '../../../shared/public-content'

const getBackendUrl = () => process.env.NEXT_PUBLIC_BACKEND_URL?.trim()

export const getSiteContent = cache(async (): Promise<SiteContentV2> => {
  const backendUrl = getBackendUrl()

  if (!backendUrl) {
    return publicContent({ ...siteContentV2, contentStatus: 'snapshot' })
  }

  try {
    const response = await fetch(`${backendUrl}/api/public/site`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`)
    }

    const content = (await response.json()) as SiteContentV2
    return publicContent({ ...siteContentV2, ...content, contentStatus: 'cms', publications: Array.isArray(content.publications) ? content.publications : siteContentV2.publications })
  } catch {
    return unavailableContent(siteContentV2)
  }
})
