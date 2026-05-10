import config from '@payload-config'
import { canAccessAdmin, createPayloadRequest, getPayload } from 'payload'
import { headers } from 'next/headers'

function getBackendBaseUrl() {
  return process.env.BACKEND_PUBLIC_URL || 'http://localhost:4000'
}

export async function getAdminSession(path = '/admin') {
  const payload = await getPayload({ config })
  const incomingHeaders = await headers()
  const requestHeaders = new Headers()

  incomingHeaders.forEach((value, key) => {
    requestHeaders.set(key, value)
  })

  const req = await createPayloadRequest({
    config,
    request: new Request(`${getBackendBaseUrl()}${path}`, {
      headers: requestHeaders,
    }),
  })

  try {
    await canAccessAdmin({ req })
    return { payload, req, user: req.user }
  } catch {
    return { payload, req, user: null }
  }
}
