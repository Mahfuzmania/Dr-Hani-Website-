import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
import { publicContent } from '../shared/public-content'
import { siteContentV2 } from '../shared/site-content-v2'

const base = process.env.PHOTO_REVIEW_URL || 'http://127.0.0.1:3000'
const content = publicContent(siteContentV2)
const results = []
for (const route of [
  '/',
  '/about',
  '/writing',
  '/gallery',
  '/media-events',
  '/updates',
  '/privacy',
  ...content.updates.map((item) => `/updates/${item.slug}`),
]) {
  const response = await fetch(base + route)
  const html = await response.text()
  assert.equal(response.status, 200, route)
  assert.ok(
    !/NEEDS_CLIENT_CONFIRMATION|PRIVATE_ACCEPTANCE_NOTE|central-vice-president/.test(
      html,
    ),
    `Internal or disputed content at ${route}`,
  )
  results.push({ route, status: response.status })
}
for (const [route, target] of [
  ['/medical-service', '/#medical-work'],
  ['/public-service', '/#public-work'],
  ['/leadership', '/#public-work'],
  ['/contact', '/#contact'],
]) {
  const response = await fetch(base + route, { redirect: 'manual' })
  assert.equal(response.status, 307)
  assert.equal(response.headers.get('location'), target)
  results.push({ route, status: response.status, target })
}
assert.equal((await fetch(base + '/unavailable-page-check')).status, 404)
const sitemap = await (await fetch(base + '/sitemap.xml')).text()
assert.ok(sitemap.includes('https://dr-hani-website.vercel.app'))
assert.ok(
  !sitemap.includes('localhost') && !sitemap.includes('central-vice-president'),
)
await writeFile(
  'docs/photographic-refinement/route-checks.json',
  JSON.stringify(results, null, 2) + '\n',
)
console.log(
  `Verified ${results.length} public routes/redirects, 404 behaviour and production sitemap URLs.`,
)
