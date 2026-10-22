import { NextResponse } from 'next/server'
import { contactInquirySchema } from '../../../../../shared/contact-inquiry'

export async function POST(request: Request) {
  const parsed = contactInquirySchema.safeParse(
    await request.json().catch(() => null),
  )
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 })
  const backend =
    process.env.BACKEND_PUBLIC_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim()
  if (!backend) return NextResponse.json({ ok: false }, { status: 503 })
  try {
    const response = await fetch(
      `${backend.replace(/\/$/, '')}/api/public/contact`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
      },
    )
    if (!response.ok)
      return NextResponse.json(
        { ok: false },
        { status: response.status === 400 ? 400 : 503 },
      )
    const result = await response.json().catch(() => null)
    if (result?.ok !== true)
      return NextResponse.json({ ok: false }, { status: 503 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 })
  }
}
