import { cache } from 'react'

import { siteContent, type SiteContent } from '../../../shared/site-content'

const getBackendUrl = () => process.env.NEXT_PUBLIC_BACKEND_URL?.trim()

function normalizeContent(content: SiteContent): SiteContent {
  const replacements = [
    ['â€™', "'"],
    ['â€œ', '"'],
    ['â€', '"'],
    ['â€”', ' - '],
    ['â€¢', '- '],
  ] as const

  let serialized = JSON.stringify(content)

  for (const [from, to] of replacements) {
    serialized = serialized.split(from).join(to)
  }

  return JSON.parse(serialized) as SiteContent
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const backendUrl = getBackendUrl()

  if (!backendUrl) {
    return normalizeContent(siteContent)
  }

  try {
    const response = await fetch(`${backendUrl}/api/public/site`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`)
    }

    return normalizeContent((await response.json()) as SiteContent)
  } catch {
    return normalizeContent(siteContent)
  }
})
