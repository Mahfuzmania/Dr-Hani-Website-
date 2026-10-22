import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

import { getPublicSiteContent } from '../../../../lib/public-site'
import { publicContent } from '../../../../../../shared/public-content'

export async function GET() {
  try {
    const cms = await getPayload({ config })
    const backendUrl = process.env.BACKEND_PUBLIC_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'
    const content = await getPublicSiteContent(cms, backendUrl)

    return NextResponse.json(publicContent(content), {
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Public CMS content is unavailable', error)

    return NextResponse.json({ error: 'Content temporarily unavailable' }, {
      status: 503,
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  }
}
