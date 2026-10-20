import assert from 'node:assert/strict'
import test from 'node:test'
import { editorialGallery } from '../shared/editorial-gallery'
import {
  homepagePhotos,
  focalCoordinate,
  photoSection,
} from '../shared/photo-curation'
import { siteContentV2 } from '../shared/site-content-v2'
import { publicContent, unavailableContent } from '../shared/public-content'
import {
  curationPatch,
  galleryCurationData,
} from '../scripts/photo-curation-support'
import { getPublicSiteContent } from '../backend/src/lib/public-site'

test('the homepage uses twelve distinct new photos across their intended sections', () => {
  const content = publicContent(siteContentV2)
  const sections = ['medical-work', 'dialogues', 'public-work'] as const
  const photos = sections
    .flatMap((section) => homepagePhotos(content.galleryItems, section))
    .filter((item) => item.image.startsWith('/media/new/'))
  assert.equal(photos.length, 12)
  assert.equal(new Set(photos.map((item) => item.id)).size, 12)
  assert.deepEqual(
    sections.map(
      (section) =>
        photos.filter((item) => item.homepageSection === section).length,
    ),
    [2, 6, 4],
  )
  assert.equal(
    photoSection({ ...editorialGallery[0], homepageSection: undefined }),
    'dialogues',
  )
  assert.equal(
    homepagePhotos([{ ...editorialGallery[0], status: 'draft' }], 'dialogues')
      .length,
    0,
  )
  assert.deepEqual(
    sections.map((section) =>
      homepagePhotos(unavailableContent(siteContentV2).galleryItems, section),
    ),
    [[], [], []],
  )
})

test('curation preserves staff edits, unpublishing, identifiers and repeat-import behaviour', () => {
  const desired = editorialGallery[0]
  const baseline = {
    ...desired,
    caption: 'Old caption',
    featuredOnHomepage: false,
  }
  const existing = {
    id: 8,
    externalId: desired.id,
    ...galleryCurationData(baseline),
    status: 'draft',
  }
  const patch = curationPatch(existing, baseline, desired)
  assert.equal(patch.caption, desired.caption)
  assert.equal(patch.featured, true)
  assert.equal('status' in patch, false)
  assert.equal('id' in patch, false)
  assert.deepEqual(
    curationPatch({ ...existing, ...patch }, baseline, desired),
    {},
  )
  assert.equal(
    'caption' in
      curationPatch(
        { ...existing, caption: 'Staff caption' },
        baseline,
        desired,
      ),
    false,
  )
  assert.equal(focalCoordinate(NaN), 50)
  assert.equal(focalCoordinate(200), 100)
})

test('public CMS preserves photo curation fields and defaults old visibility controls', async () => {
  const output = await getPublicSiteContent(
    {
      findGlobal: async () => ({}),
      find: async ({ collection }) => ({
        docs:
          collection === 'gallery-items'
            ? [
                {
                  id: 1,
                  title: 'A photo',
                  caption: 'A caption',
                  image: { url: '/media/test.webp', altText: 'An image' },
                  category: 'events',
                  status: 'published',
                  featured: true,
                  homepageSection: 'dialogues',
                  focalX: 120,
                },
              ]
            : [],
      }),
    },
    'https://cms.example.com',
  )
  assert.equal(output.galleryItems[0].homepageSection, 'dialogues')
  assert.equal(output.galleryItems[0].focalX, 100)
  assert.equal(output.galleryItems[0].focalY, 50)
  assert.equal(output.homepage.sectionVisibility.dialogues, true)
  assert.equal(output.homepage.sectionVisibility.writing, true)
})
