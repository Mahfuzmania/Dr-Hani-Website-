import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

import { siteContentV2 } from '../../../../../../shared/site-content-v2'
import { getPublicSiteContent } from '../../../../lib/public-site'

export async function GET() {
  try {
    const cms = await getPayload({ config })
    const backendUrl = process.env.BACKEND_PUBLIC_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'
    const content = await getPublicSiteContent(cms, backendUrl)

    return NextResponse.json(content, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
      console.error('Falling back to shared site content for public site route', error)

    return NextResponse.json(siteContentV2, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  }
}
