import { NextResponse } from 'next/server'

import { siteContent } from '../../../../../../shared/site-content'

export async function GET() {
  return NextResponse.json(siteContent, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
