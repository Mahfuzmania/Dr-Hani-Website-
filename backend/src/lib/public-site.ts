import type { SiteContentV2 } from '../../../shared/site-content-v2'
import { siteContentV2 } from '../../../shared/site-content-v2'

type CmsClient = {
  find: (args: {
    collection: string
    depth?: number
    limit?: number
    pagination?: boolean
    sort?: string
  }) => Promise<{ docs?: unknown[] }>
  findGlobal: (args: { slug: string; depth?: number }) => Promise<unknown>
}

type MediaDoc = {
  altText?: string | null
  caption?: string | null
  category?: string | null
  id?: number | string | null
  url?: string | null
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object'
}

function asString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function asBoolean(value: unknown, fallback = false) {
  return typeof value === 'boolean' ? value : fallback
}

function resolveMediaUrl(media: unknown, backendUrl: string, fallback?: string) {
  if (typeof media === 'string' && media.startsWith('http')) return media
  if (typeof media === 'string' && media.startsWith('/')) return `${backendUrl}${media}`

  if (isObject(media)) {
    const url = asString((media as MediaDoc).url)
    if (url?.startsWith('http')) return url
    if (url?.startsWith('/')) return `${backendUrl}${url}`
  }

  return fallback ?? ''
}

function normalizeCategory(value: unknown): SiteContentV2['galleryItems'][number]['category'] {
  const category = asString(value)

  switch (category) {
    case 'medical-service':
    case 'medical':
      return 'medical'
    case 'community-outreach':
    case 'community':
      return 'community'
    case 'leadership':
      return 'leadership'
    default:
      return 'events'
  }
}

function textSections(rows: unknown, fallback: SiteContentV2['privacyPage']['sections']) {
  if (!Array.isArray(rows)) return fallback

  const values = rows
    .map((row) => {
      if (!isObject(row)) return null
      const title = asString(row.title)
      const body = asString(row.body)
      if (!title || !body) return null
      return { title, body }
    })
    .filter((value): value is { body: string; title: string } => Boolean(value))

  return values.length ? values : fallback
}

function identityCards(rows: unknown, fallback: SiteContentV2['homepage']['identityCards']) {
  if (!Array.isArray(rows)) return fallback

  const values = rows
    .map((row) => {
      if (!isObject(row)) return null
      const title = asString(row.title)
      const body = asString(row.body)
      if (!title || !body) return null
      return { title, body }
    })
    .filter((value): value is { body: string; title: string } => Boolean(value))

  return values.length ? values : fallback
}

function socialLinks(rows: unknown, fallback: SiteContentV2['siteSettings']['socialLinks']) {
  if (!Array.isArray(rows)) return fallback

  const values = rows
    .map((row) => {
      if (!isObject(row)) return null
      const label = asString(row.label)
      const href = asString(row.url)
      if (!label || !href) return null
      if (!['Facebook', 'Instagram', 'LinkedIn'].includes(label)) return null
      return { label: label as SiteContentV2['siteSettings']['socialLinks'][number]['label'], href }
    })
    .filter((value): value is SiteContentV2['siteSettings']['socialLinks'][number] => Boolean(value))

  return values.length ? values : fallback
}

function mapGalleryItems(docs: unknown[] | undefined, backendUrl: string, fallback: SiteContentV2['galleryItems']) {
  if (!docs?.length) return fallback

  const mapped = docs
    .map((doc) => {
      if (!isObject(doc)) return null
      const id = doc.id != null ? String(doc.id) : null
      const title = asString(doc.title)
      const caption = asString(doc.caption) ?? title
      const status = asString(doc.status) === 'published' ? 'published' : 'draft'
      const image = resolveMediaUrl(doc.image, backendUrl)
      const media = isObject(doc.image) ? (doc.image as MediaDoc) : null
      const altText = asString(media?.altText) ?? title
      if (!id || !title || !caption || !image || !altText) return null
      return {
        id,
        title,
        image,
        altText,
        caption,
        category: normalizeCategory(doc.category),
        featuredOnHomepage: asBoolean(doc.featured),
        sortOrder: typeof doc.sortOrder === 'number' ? doc.sortOrder : 0,
        status,
      }
    })
    .filter((value): value is SiteContentV2['galleryItems'][number] => Boolean(value))

  return mapped.length ? mapped : fallback
}

function mapMediaItems(docs: unknown[] | undefined, backendUrl: string, fallback: SiteContentV2['mediaItems']) {
  if (!docs?.length) return fallback

  const mapped: SiteContentV2['mediaItems'] = []

  for (const doc of docs) {
    if (!isObject(doc)) continue
    const id = doc.id != null ? String(doc.id) : null
    const title = asString(doc.title)
    const type = asString(doc.type)
    const url = asString(doc.mediaUrl)
    const description = asString(doc.description)
    const thumbnail = resolveMediaUrl(doc.thumbnail, backendUrl)
    if (!id || !title || !type || !url || !description || !thumbnail) continue

    mapped.push({
      id,
      title,
      type: type === 'article' || type === 'image' ? type : 'video',
      url,
      description,
      thumbnail,
      category: normalizeCategory(doc.category),
      featuredOnHomepage: asBoolean(doc.featuredOnHomepage),
      status: asString(doc.status) === 'published' ? 'published' : 'draft',
      sourceLink: asString(doc.sourceLink) ?? undefined,
    })
  }

  return mapped.length ? mapped : fallback
}

function mapUpdates(docs: unknown[] | undefined, backendUrl: string, fallback: SiteContentV2['updates']) {
  if (!docs?.length) return fallback

  const mapped: SiteContentV2['updates'] = []

  for (const doc of docs) {
    if (!isObject(doc)) continue
    const id = doc.id != null ? String(doc.id) : null
    const title = asString(doc.title)
    const slug = asString(doc.slug)
    const summary = asString(doc.summary)
    const category = asString(doc.category)
    const date = asString(doc.publishDate)
    const bodyText = asString(doc.bodyText)
    if (!id || !title || !slug || !summary || !category || !date || !bodyText) continue

    mapped.push({
      id,
      title,
      slug,
      summary,
      category,
      date: new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(date)),
      image: resolveMediaUrl(doc.coverImage, backendUrl) || undefined,
      sourceLink: asString(doc.sourceLink) ?? undefined,
      featured: asBoolean(doc.featured),
      pinned: asBoolean(doc.pinned),
      status: asString(doc.status) === 'published' ? 'published' : 'draft',
      body: bodyText.split(/\r?\n\r?\n/).map((item) => item.trim()).filter(Boolean),
    })
  }

  return mapped.length ? mapped : fallback
}

function mapNotices(docs: unknown[] | undefined, fallback: SiteContentV2['importantNotices']) {
  if (!docs?.length) return fallback

  const mapped: SiteContentV2['importantNotices'] = []

  for (const doc of docs) {
    if (!isObject(doc)) continue
    const id = doc.id != null ? String(doc.id) : null
    const title = asString(doc.title)
    const message = asString(doc.message)
    const category = asString(doc.category)
    if (!id || !title || !message || !category) continue

    mapped.push({
      id,
      title,
      message,
      category,
      pinned: asBoolean(doc.pinned),
      status: asString(doc.status) === 'published' ? 'published' : 'draft',
      startDate: asString(doc.startDate) ?? undefined,
      expiryDate: asString(doc.expiryDate) ?? undefined,
    })
  }

  return mapped.length ? mapped : fallback
}

function normalizeSourceType(value: unknown): SiteContentV2['positions'][number]['sourceType'] {
  const sourceType = asString(value)

  switch (sourceType) {
    case 'news':
    case 'public-record':
    case 'internal':
      return sourceType
    default:
      return 'document'
  }
}

function mapPositions(docs: unknown[] | undefined, backendUrl: string, fallback: SiteContentV2['positions']) {
  if (!docs?.length) return fallback

  const mapped: SiteContentV2['positions'] = []

  for (const doc of docs) {
    if (!isObject(doc)) continue
    const id = doc.id != null ? String(doc.id) : null
    const title = asString(doc.title)
    const organization = asString(doc.organization)
    const period = asString(doc.period)
    const description = asString(doc.description)
    if (!id || !title || !organization || !period || !description) continue

    mapped.push({
      id,
      title,
      organization,
      branch: asString(doc.branch) ?? undefined,
      period,
      description,
      image: resolveMediaUrl(doc.image, backendUrl) || undefined,
      sourceType: normalizeSourceType(doc.sourceType),
      sourceNote: asString(doc.sourceNote) ?? undefined,
      sourceLink: asString(doc.sourceLink) ?? undefined,
      featured: asBoolean(doc.featured),
      sortOrder: typeof doc.sortOrder === 'number' ? doc.sortOrder : 0,
      status: asString(doc.status) === 'published' ? 'published' : 'draft',
    })
  }

  return mapped.length ? mapped : fallback
}

export async function getPublicSiteContent(cms: CmsClient, backendUrl: string): Promise<SiteContentV2> {
  const fallback = siteContentV2

  const [siteSettingsGlobal, homepageGlobal, privacyPageGlobal, galleryItemsResult, mediaItemsResult, updatesResult, noticesResult, positionsResult] =
    await Promise.all([
      cms.findGlobal({ slug: 'site-settings', depth: 1 }),
      cms.findGlobal({ slug: 'homepage', depth: 1 }),
      cms.findGlobal({ slug: 'privacy-page', depth: 1 }),
      cms.find({ collection: 'gallery-items', depth: 1, limit: 100, pagination: false, sort: 'sortOrder' }),
      cms.find({ collection: 'media-items', depth: 1, limit: 100, pagination: false, sort: '-updatedAt' }),
      cms.find({ collection: 'updates', depth: 1, limit: 100, pagination: false, sort: '-publishDate' }),
      cms.find({ collection: 'important-notices', depth: 1, limit: 50, pagination: false, sort: '-updatedAt' }),
      cms.find({ collection: 'positions', depth: 1, limit: 50, pagination: false, sort: 'sortOrder' }),
    ])
  const siteSettingsRecord = (siteSettingsGlobal as Record<string, unknown> | null) ?? {}
  const homepageRecord = (homepageGlobal as Record<string, unknown> | null) ?? {}
  const privacyRecord = (privacyPageGlobal as Record<string, unknown> | null) ?? {}
  const homepageVisibility = (homepageRecord.sectionVisibility as Record<string, unknown> | undefined) ?? {}

  return {
    ...fallback,
    siteSettings: {
      ...fallback.siteSettings,
      fullName: asString(siteSettingsRecord.fullName) ?? fallback.siteSettings.fullName,
      identityLine: asString(siteSettingsRecord.identityLine) ?? fallback.siteSettings.identityLine,
      primaryEmail: asString(siteSettingsRecord.primaryEmail) ?? fallback.siteSettings.primaryEmail,
      footerText: asString(siteSettingsRecord.footerText) ?? fallback.siteSettings.footerText,
      seoTitle: asString(siteSettingsRecord.seoTitle) ?? fallback.siteSettings.seoTitle,
      seoDescription: asString(siteSettingsRecord.seoDescription) ?? fallback.siteSettings.seoDescription,
      logo: resolveMediaUrl(siteSettingsRecord.logo, backendUrl, fallback.siteSettings.logo),
      socialLinks: socialLinks(siteSettingsRecord.socialLinks, fallback.siteSettings.socialLinks),
    },
    homepage: {
      ...fallback.homepage,
      heroEyebrow: asString(homepageRecord.heroEyebrow) ?? fallback.homepage.heroEyebrow,
      heroTitle: asString(homepageRecord.heroTitle) ?? fallback.homepage.heroTitle,
      heroSubtitle: asString(homepageRecord.heroSubtitle) ?? fallback.homepage.heroSubtitle,
      heroImage: resolveMediaUrl(homepageRecord.heroImage, backendUrl, fallback.homepage.heroImage),
      ctaPrimaryLabel: asString(homepageRecord.ctaPrimaryLabel) ?? fallback.homepage.ctaPrimaryLabel,
      ctaSecondaryLabel: asString(homepageRecord.ctaSecondaryLabel) ?? fallback.homepage.ctaSecondaryLabel,
      biographySummary: asString(homepageRecord.biographySummary) ?? fallback.homepage.biographySummary,
      identityCards: identityCards(homepageRecord.identityCards, fallback.homepage.identityCards),
      sectionVisibility: {
        profile: asBoolean(homepageVisibility.profile, fallback.homepage.sectionVisibility.profile),
        journey: asBoolean(homepageVisibility.journey, fallback.homepage.sectionVisibility.journey),
        medicalWork: asBoolean(homepageVisibility.medicalWork, fallback.homepage.sectionVisibility.medicalWork),
        publicWork: asBoolean(homepageVisibility.publicWork, fallback.homepage.sectionVisibility.publicWork),
        media: asBoolean(homepageVisibility.media, fallback.homepage.sectionVisibility.media),
        updates: asBoolean(homepageVisibility.updates, fallback.homepage.sectionVisibility.updates),
        contact: asBoolean(homepageVisibility.contact, fallback.homepage.sectionVisibility.contact),
      },
    },
    privacyPage: {
      ...fallback.privacyPage,
      title: asString(privacyRecord.title) ?? fallback.privacyPage.title,
      intro: asString(privacyRecord.intro) ?? fallback.privacyPage.intro,
      sections: textSections(privacyRecord.sections, fallback.privacyPage.sections),
    },
    galleryItems: mapGalleryItems(galleryItemsResult.docs, backendUrl, fallback.galleryItems),
    mediaItems: mapMediaItems(mediaItemsResult.docs, backendUrl, fallback.mediaItems),
    updates: mapUpdates(updatesResult.docs, backendUrl, fallback.updates),
    importantNotices: mapNotices(noticesResult.docs, fallback.importantNotices),
    positions: mapPositions(positionsResult.docs, backendUrl, fallback.positions),
  }
}
