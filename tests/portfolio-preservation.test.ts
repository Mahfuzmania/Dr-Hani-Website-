import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { siteContentV2 } from '../shared/site-content-v2'
import { publicContent } from '../shared/public-content'

test('the photographic update retains every original gallery record and video', () => {
  const content = publicContent(siteContentV2)
  for (const id of [
    'bedside-review',
    'about-doctor-portrait',
    'medical-camp-team',
    'public-leaflet-briefing',
    'media-interview-setup',
    'women-public-rally',
    'womencare-community-access',
    'field-presence-portrait',
    'community-street-walk',
  ]) {
    assert.ok(
      content.galleryItems.some((item) => item.id === id),
      `Missing original photograph: ${id}`,
    )
  }
  for (const id of [
    'interview-live-broadcast',
    'medical-camp-service-video',
    'women-gathering-video',
    'nomination-office-video',
    'late-night-field-video',
  ]) {
    assert.ok(
      content.mediaItems.some((item) => item.id === id),
      `Missing original video: ${id}`,
    )
  }
  for (const item of [
    ...content.galleryItems.map((item) => item.image),
    ...content.mediaItems.map((item) => item.url),
  ].filter((url) => url.startsWith('/media/'))) {
    assert.ok(
      existsSync(path.join(process.cwd(), 'frontend/public', item)),
      `Missing media file: ${item}`,
    )
  }
  assert.ok(content.galleryItems.filter((item) => item.featuredOnHomepage).length >= 9)
  assert.equal(content.publications.filter((item) => item.kind === 'essay').length, 6)
  assert.ok(content.galleryItems.every((item) => item.status === 'published'))
})
