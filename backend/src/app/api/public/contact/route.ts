import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

import { contactInquirySchema } from '../../../../lib/contact-schema'

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null)
  const parsed = contactInquirySchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    )
  }

  try {
    const cms = await getPayload({ config })

    await cms.create({
      collection: 'contact-inquiries',
      data: {
        ...parsed.data,
        status: 'new',
      },
    })

    return NextResponse.json({
      ok: true,
      message: 'Inquiry submitted successfully.',
    })
  } catch (error) {
    console.error('Failed to create inquiry', error)

    return NextResponse.json(
      {
        ok: false,
        message: 'Inquiry submission is unavailable right now.',
      },
      { status: 503 },
    )
  }
}
