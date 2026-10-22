import test from 'node:test'
import assert from 'node:assert/strict'
import { POST } from '../frontend/src/app/api/contact/route'
import { inquiryEmailDraft } from '../shared/contact-inquiry'

const inquiry = {
  name: 'Local acceptance',
  email: 'qa@example.invalid',
  phone: '',
  inquiryType: 'Professional inquiry',
  subject: 'Local test',
  message: 'A local acceptance test message with no external delivery.',
}
const request = (data: unknown) =>
  new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })

test('email fallback encodes complete enquiries and never implies server delivery', () => {
  const draft = new URL(
    inquiryEmailDraft('public@example.invalid', {
      ...inquiry,
      subject: 'A question & invitation',
      message: 'বাংলা enquiry & context\nA second line.',
    }),
  )
  assert.equal(draft.protocol, 'mailto:')
  assert.equal(draft.pathname, 'public@example.invalid')
  assert.equal(draft.searchParams.get('subject'), 'A question & invitation')
  assert.ok(
    draft.searchParams
      .get('body')
      ?.includes('বাংলা enquiry & context\nA second line.'),
  )
  assert.ok(
    draft.searchParams.get('body')?.includes('Email: qa@example.invalid'),
  )
  assert.ok(!draft.searchParams.get('body')?.includes('Phone:'))
})

test('contact proxy validates messages and never reports success without a backend', async () => {
  const previous = {
    backend: process.env.BACKEND_PUBLIC_URL,
    publicBackend: process.env.NEXT_PUBLIC_BACKEND_URL,
  }
  delete process.env.BACKEND_PUBLIC_URL
  delete process.env.NEXT_PUBLIC_BACKEND_URL
  try {
    assert.equal((await POST(request({}))).status, 400)
    assert.equal((await POST(request(inquiry))).status, 503)
  } finally {
    if (previous.backend === undefined) delete process.env.BACKEND_PUBLIC_URL
    else process.env.BACKEND_PUBLIC_URL = previous.backend
    if (previous.publicBackend === undefined)
      delete process.env.NEXT_PUBLIC_BACKEND_URL
    else process.env.NEXT_PUBLIC_BACKEND_URL = previous.publicBackend
  }
})

test('contact proxy forwards valid inquiries and propagates unavailable service state', async (context) => {
  const previous = process.env.BACKEND_PUBLIC_URL
  process.env.BACKEND_PUBLIC_URL = 'https://cms.example.invalid/'
  const fetchMock = context.mock.method(
    globalThis,
    'fetch',
    async (url: string, options: RequestInit) => {
      assert.equal(url, 'https://cms.example.invalid/api/public/contact')
      assert.equal(options.method, 'POST')
      assert.deepEqual(JSON.parse(String(options.body)), inquiry)
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    },
  )
  try {
    assert.deepEqual(await (await POST(request(inquiry))).json(), { ok: true })
    fetchMock.mock.mockImplementation(
      async () => new Response(null, { status: 503 }),
    )
    assert.equal((await POST(request(inquiry))).status, 503)
    fetchMock.mock.mockImplementation(
      async () => new Response('<html>Sign in</html>', { status: 200 }),
    )
    assert.equal((await POST(request(inquiry))).status, 503)
    fetchMock.mock.mockImplementation(
      async () => new Response(JSON.stringify({ ok: false }), { status: 200 }),
    )
    assert.equal((await POST(request(inquiry))).status, 503)
  } finally {
    fetchMock.mock.restore()
    if (previous === undefined) delete process.env.BACKEND_PUBLIC_URL
    else process.env.BACKEND_PUBLIC_URL = previous
  }
})
