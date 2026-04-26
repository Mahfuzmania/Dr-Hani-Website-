import type { SiteContent } from '../../../shared/site-content'
import { siteContent } from '../../../shared/site-content'

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
  approvedForGallery?: boolean | null
  approvedForHero?: boolean | null
  caption?: string | null
  category?: SiteContent['galleryItems'][number]['category'] | null
  filename?: string | null
  id?: number | string | null
  url?: string | null
}

type GalleryDoc = {
  caption?: string | null
  category?: SiteContent['galleryItems'][number]['category'] | null
  featured?: boolean | null
  id?: number | string | null
  image?: MediaDoc | number | string | null
  sortOrder?: number | null
  title?: string | null
  visibility?: 'hidden' | 'public' | null
}

type EventDoc = {
  category?: string | null
  coverImage?: MediaDoc | number | string | null
  date?: string | null
  featured?: boolean | null
  id?: number | string | null
  summary?: string | null
  title?: string | null
}

type UpdateDoc = {
  category?: string | null
  content?: unknown
  coverImage?: MediaDoc | number | string | null
  featured?: boolean | null
  id?: number | string | null
  publishDate?: string | null
  slug?: string | null
  status?: 'draft' | 'published' | null
  summary?: string | null
  title?: string | null
}

type PageHeroFallback = SiteContent['aboutPage']['hero']

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object'
}

function asString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function textArrayFromRows(
  rows: unknown,
  fallback: string[],
  key = 'value',
) {
  if (!Array.isArray(rows)) return fallback

  const values = rows
    .map((row) => (isObject(row) ? asString(row[key]) : null))
    .filter((value): value is string => Boolean(value))

  return values.length ? values : fallback
}

function titleDescriptionArray(
  rows: unknown,
  fallback: Array<{ description: string; title: string }>,
) {
  if (!Array.isArray(rows)) return fallback

  const values = rows
    .map((row) => {
      if (!isObject(row)) return null
      const title = asString(row.title)
      const description = asString(row.description)

      if (!title || !description) return null

      return { title, description }
    })
    .filter((value): value is { description: string; title: string } => Boolean(value))

  return values.length ? values : fallback
}

function labelValueArray(
  rows: unknown,
  fallback: Array<{ label: string; value: string }>,
) {
  if (!Array.isArray(rows)) return fallback

  const values = rows
    .map((row) => {
      if (!isObject(row)) return null
      const label = asString(row.label)
      const value = asString(row.value)

      if (!label || !value) return null

      return { label, value }
    })
    .filter((value): value is { label: string; value: string } => Boolean(value))

  return values.length ? values : fallback
}

function privacySectionsArray(
  rows: unknown,
  fallback: SiteContent['privacyPage']['sections'],
) {
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

function educationArray(
  rows: unknown,
  fallback: SiteContent['aboutPage']['educationItems'],
) {
  if (!Array.isArray(rows)) return fallback

  const values = rows
    .map((row) => {
      if (!isObject(row)) return null
      const title = asString(row.title)
      const institution = asString(row.institution)
      const period = asString(row.period)

      if (!title || !institution || !period) return null

      return { title, institution, period }
    })
    .filter(
      (
        value,
      ): value is {
        institution: string
        period: string
        title: string
      } => Boolean(value),
    )

  return values.length ? values : fallback
}

function timelineArray(
  rows: unknown,
  fallback: SiteContent['medicalServicePage']['rolesTimeline'],
) {
  if (!Array.isArray(rows)) return fallback

  const values = rows
    .map((row) => {
      if (!isObject(row)) return null
      const title = asString(row.title)
      const description = asString(row.description)
      const period = asString(row.period)

      if (!title || !description || !period) return null

      return { title, description, period }
    })
    .filter((value): value is { description: string; period: string; title: string } => Boolean(value))

  return values.length ? values : fallback
}

function resolveMediaUrl(
  media: MediaDoc | number | string | null | undefined,
  backendUrl: string,
  fallback?: string,
) {
  if (typeof media === 'string' && media.startsWith('http')) return media
  if (typeof media === 'string' && media.startsWith('/')) {
    return `${backendUrl}${media}`
  }

  if (isObject(media)) {
    const url = asString(media.url)

    if (url?.startsWith('http')) return url
    if (url?.startsWith('/')) return `${backendUrl}${url}`
  }

  return fallback ?? ''
}

function mapHero(hero: unknown, fallback: PageHeroFallback, backendUrl: string) {
  if (!isObject(hero)) return fallback

  return {
    eyebrow: asString(hero.eyebrow) ?? fallback.eyebrow,
    title: asString(hero.title) ?? fallback.title,
    summary: asString(hero.summary) ?? fallback.summary,
    image: resolveMediaUrl(hero.image as MediaDoc | number | string | null | undefined, backendUrl, fallback.image),
  }
}

function collectText(node: unknown): string {
  if (!isObject(node)) return ''

  const text = asString(node.text)
  if (text) return text

  if (Array.isArray(node.children)) {
    return node.children.map((child) => collectText(child)).join('').trim()
  }

  return ''
}

function richTextParagraphs(value: unknown, fallback: string[]) {
  const root = isObject(value) ? value.root : null
  const children = isObject(root) && Array.isArray(root.children) ? root.children : null

  if (!children) return fallback

  const paragraphs = children
    .map((child) => collectText(child).trim())
    .filter((text): text is string => Boolean(text))

  return paragraphs.length ? paragraphs : fallback
}

function formatDate(date: string | null | undefined, fallback: string) {
  if (!date) return fallback

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return fallback

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed)
}

function knownSocialLinks(
  rows: unknown,
  fallback: SiteContent['siteSettings']['socialLinks'],
) {
  if (!Array.isArray(rows)) return fallback

  const values = rows
    .map((row) => {
      if (!isObject(row)) return null
      const label = asString(row.label)
      const href = asString(row.url)

      if (!label || !href) return null
      if (!['Facebook', 'Instagram', 'LinkedIn'].includes(label)) return null

      return {
        label: label as SiteContent['siteSettings']['socialLinks'][number]['label'],
        href,
      }
    })
    .filter(
      (
        value,
      ): value is {
        href: string
        label: SiteContent['siteSettings']['socialLinks'][number]['label']
      } => Boolean(value),
    )

  return values.length ? values : fallback
}

function mapGalleryItems(
  docs: unknown[] | undefined,
  backendUrl: string,
  fallback: SiteContent['galleryItems'],
) {
  if (!docs?.length) return fallback

  const values: SiteContent['galleryItems'] = []

  for (const doc of docs) {
    if (!isObject(doc)) continue

    const item = doc as GalleryDoc
    if (item.visibility === 'hidden') continue

    const id = item.id != null ? String(item.id) : null
    const title = asString(item.title)
    const image = resolveMediaUrl(item.image, backendUrl)
    const media = isObject(item.image) ? (item.image as MediaDoc) : null
    const altText = asString(media?.altText) ?? title
    const caption = asString(item.caption) ?? asString(media?.caption) ?? title

    if (!id || !title || !image || !altText || !caption || !item.category) continue

    values.push({
      id,
      title,
      image,
      altText,
      caption,
      category: item.category,
      featured: Boolean(item.featured),
    })
  }

  if (!values.length) return fallback

  return values
}

function galleryIdsFromMediaRelations(
  relations: unknown,
  gallery: SiteContent['galleryItems'],
  backendUrl: string,
  fallback: string[],
) {
  if (!Array.isArray(relations)) return fallback

  const urls = relations
    .map((relation) => resolveMediaUrl(relation as MediaDoc | number | string | null | undefined, backendUrl))
    .filter(Boolean)

  if (!urls.length) return fallback

  const ids = gallery
    .filter((item) => urls.includes(item.image))
    .map((item) => item.id)

  return ids.length ? ids : fallback
}

export async function getPublicSiteContent(cms: CmsClient, backendUrl: string): Promise<SiteContent> {
  const fallback = siteContent

  const [
    siteSettingsGlobal,
    homepageGlobal,
    aboutPageGlobal,
    medicalServicePageGlobal,
    publicServicePageGlobal,
    leadershipPageGlobal,
    mediaEventsPageGlobal,
    contactPageGlobal,
    privacyPageGlobal,
    galleryItemsResult,
    eventsResult,
    updatesResult,
  ] = await Promise.all([
    cms.findGlobal({ slug: 'site-settings', depth: 1 }),
    cms.findGlobal({ slug: 'homepage', depth: 1 }),
    cms.findGlobal({ slug: 'about-page', depth: 1 }),
    cms.findGlobal({ slug: 'medical-service-page', depth: 1 }),
    cms.findGlobal({ slug: 'public-service-page', depth: 1 }),
    cms.findGlobal({ slug: 'leadership-page', depth: 1 }),
    cms.findGlobal({ slug: 'media-events-page', depth: 1 }),
    cms.findGlobal({ slug: 'contact-page', depth: 1 }),
    cms.findGlobal({ slug: 'privacy-page', depth: 1 }),
    cms.find({ collection: 'gallery-items', depth: 1, limit: 100, pagination: false, sort: 'sortOrder' }),
    cms.find({ collection: 'events', depth: 1, limit: 100, pagination: false, sort: '-date' }),
    cms.find({ collection: 'updates', depth: 1, limit: 100, pagination: false, sort: '-publishDate' }),
  ])

  const galleryItems = mapGalleryItems(galleryItemsResult.docs, backendUrl, fallback.galleryItems)

  const rawEvents = (eventsResult.docs ?? []).filter((doc): doc is EventDoc => isObject(doc))
  const events: SiteContent['events'] = []

  for (const doc of rawEvents) {
    const title = asString(doc.title)
    const description = asString(doc.summary)
    const period = formatDate(doc.date, '')
    const category = asString(doc.category)

    if (!title || !description || !period || !category) continue

    events.push({
      id: doc.id != null ? String(doc.id) : title.toLowerCase().replace(/\s+/g, '-'),
      title,
      description,
      period,
      category,
      image: resolveMediaUrl(doc.coverImage, backendUrl) || undefined,
    })
  }

  const rawUpdates = (updatesResult.docs ?? []).filter((doc): doc is UpdateDoc => isObject(doc))
  const updates: SiteContent['updates'] = []

  for (const doc of rawUpdates) {
    if (doc.status && doc.status !== 'published') continue

    const title = asString(doc.title)
    const slug = asString(doc.slug)
    const summary = asString(doc.summary)
    const category = asString(doc.category)
    const publishDate = formatDate(doc.publishDate, '')

    if (!title || !slug || !summary || !category || !publishDate) continue

    updates.push({
      id: doc.id != null ? String(doc.id) : slug,
      slug,
      title,
      category,
      publishDate,
      summary,
      coverImage: resolveMediaUrl(doc.coverImage, backendUrl) || undefined,
      body: richTextParagraphs(doc.content, [summary]),
    })
  }

  const featuredGalleryItemIds = galleryItems
    .filter((item) => item.featured)
    .map((item) => item.id)

  const featuredEventIds = rawEvents
    .filter((event) => Boolean(event.featured))
    .map((event) => (event.id != null ? String(event.id) : ''))
    .filter(Boolean)

  const featuredEventRefs = Array.isArray((mediaEventsPageGlobal as Record<string, unknown> | null)?.featuredEventRefs)
    ? ((mediaEventsPageGlobal as Record<string, unknown>).featuredEventRefs as unknown[])
        .map((item) => {
          if (isObject(item) && item.id != null) return String(item.id)
          if (typeof item === 'string' || typeof item === 'number') return String(item)
          return ''
        })
        .filter(Boolean)
    : []

  const eventGalleryIds = galleryItems
    .filter((item) => item.category === 'events')
    .slice(0, 3)
    .map((item) => item.id)

  return {
    ...fallback,
    siteSettings: {
      ...fallback.siteSettings,
      fullName:
        asString((siteSettingsGlobal as Record<string, unknown> | null)?.fullName) ?? fallback.siteSettings.fullName,
      identityLine:
        asString((siteSettingsGlobal as Record<string, unknown> | null)?.identityLine) ??
        fallback.siteSettings.identityLine,
      primaryEmail:
        asString((siteSettingsGlobal as Record<string, unknown> | null)?.primaryEmail) ??
        fallback.siteSettings.primaryEmail,
      footerText:
        asString((siteSettingsGlobal as Record<string, unknown> | null)?.footerText) ?? fallback.siteSettings.footerText,
      socialLinks: knownSocialLinks(
        (siteSettingsGlobal as Record<string, unknown> | null)?.socialLinks,
        fallback.siteSettings.socialLinks,
      ),
    },
    homepage: {
      ...fallback.homepage,
      heroTitle:
        asString((homepageGlobal as Record<string, unknown> | null)?.heroTitle) ?? fallback.homepage.heroTitle,
      heroSubtitle:
        asString((homepageGlobal as Record<string, unknown> | null)?.heroSubtitle) ?? fallback.homepage.heroSubtitle,
      heroImage: resolveMediaUrl(
        (homepageGlobal as Record<string, unknown> | null)?.heroImage as MediaDoc | number | string | null | undefined,
        backendUrl,
        fallback.homepage.heroImage,
      ),
      identityPillars: titleDescriptionArray(
        (homepageGlobal as Record<string, unknown> | null)?.identityPillars,
        fallback.homepage.identityPillars,
      ),
      aboutPreview:
        asString((homepageGlobal as Record<string, unknown> | null)?.aboutPreview) ?? fallback.homepage.aboutPreview,
      missionStatement:
        asString((homepageGlobal as Record<string, unknown> | null)?.missionStatement) ??
        fallback.homepage.missionStatement,
      focusAreas: titleDescriptionArray(
        (homepageGlobal as Record<string, unknown> | null)?.featuredFocusAreas,
        fallback.homepage.focusAreas,
      ),
      selectedHighlights: titleDescriptionArray(
        (homepageGlobal as Record<string, unknown> | null)?.selectedHighlights,
        fallback.homepage.selectedHighlights,
      ),
      closingStatement:
        asString((homepageGlobal as Record<string, unknown> | null)?.closingStatement) ??
        fallback.homepage.closingStatement,
      featuredGalleryItemIds: featuredGalleryItemIds.length
        ? featuredGalleryItemIds
        : fallback.homepage.featuredGalleryItemIds,
    },
    aboutPage: {
      ...fallback.aboutPage,
      hero: mapHero(
        (aboutPageGlobal as Record<string, unknown> | null)?.hero,
        fallback.aboutPage.hero,
        backendUrl,
      ),
      biographyIntro:
        asString((aboutPageGlobal as Record<string, unknown> | null)?.biographyIntro) ??
        fallback.aboutPage.biographyIntro,
      longFormStory: textArrayFromRows(
        (aboutPageGlobal as Record<string, unknown> | null)?.longFormStory,
        fallback.aboutPage.longFormStory,
      ),
      values: titleDescriptionArray(
        (aboutPageGlobal as Record<string, unknown> | null)?.values,
        fallback.aboutPage.values,
      ),
      educationItems: educationArray(
        (aboutPageGlobal as Record<string, unknown> | null)?.educationItems,
        fallback.aboutPage.educationItems,
      ),
      credentials: textArrayFromRows(
        (aboutPageGlobal as Record<string, unknown> | null)?.credentials,
        fallback.aboutPage.credentials,
      ),
      personalProfileItems: labelValueArray(
        (aboutPageGlobal as Record<string, unknown> | null)?.personalProfileItems,
        fallback.aboutPage.personalProfileItems,
      ),
    },
    medicalServicePage: {
      ...fallback.medicalServicePage,
      hero: mapHero(
        (medicalServicePageGlobal as Record<string, unknown> | null)?.hero,
        fallback.medicalServicePage.hero,
        backendUrl,
      ),
      rolesTimeline: timelineArray(
        (medicalServicePageGlobal as Record<string, unknown> | null)?.rolesTimeline,
        fallback.medicalServicePage.rolesTimeline,
      ),
      internshipSummary:
        asString((medicalServicePageGlobal as Record<string, unknown> | null)?.internshipSummary) ??
        fallback.medicalServicePage.internshipSummary,
      clinicalResponsibilities: textArrayFromRows(
        (medicalServicePageGlobal as Record<string, unknown> | null)?.clinicalResponsibilities,
        fallback.medicalServicePage.clinicalResponsibilities,
      ),
      clinicalCompetencies: textArrayFromRows(
        (medicalServicePageGlobal as Record<string, unknown> | null)?.clinicalCompetencies,
        fallback.medicalServicePage.clinicalCompetencies,
      ),
      servicePhilosophy:
        asString((medicalServicePageGlobal as Record<string, unknown> | null)?.servicePhilosophy) ??
        fallback.medicalServicePage.servicePhilosophy,
    },
    publicServicePage: {
      ...fallback.publicServicePage,
      hero: mapHero(
        (publicServicePageGlobal as Record<string, unknown> | null)?.hero,
        fallback.publicServicePage.hero,
        backendUrl,
      ),
      missionText:
        asString((publicServicePageGlobal as Record<string, unknown> | null)?.missionText) ??
        fallback.publicServicePage.missionText,
      outreachBlocks: titleDescriptionArray(
        (publicServicePageGlobal as Record<string, unknown> | null)?.outreachBlocks,
        fallback.publicServicePage.outreachBlocks,
      ),
      communityHealthBlocks: titleDescriptionArray(
        (publicServicePageGlobal as Record<string, unknown> | null)?.communityHealthBlocks,
        fallback.publicServicePage.communityHealthBlocks,
      ),
      socialResponseBlocks: titleDescriptionArray(
        (publicServicePageGlobal as Record<string, unknown> | null)?.socialResponseBlocks,
        fallback.publicServicePage.socialResponseBlocks,
      ),
      featuredImageIds: galleryIdsFromMediaRelations(
        (publicServicePageGlobal as Record<string, unknown> | null)?.featuredImages,
        galleryItems,
        backendUrl,
        fallback.publicServicePage.featuredImageIds,
      ),
    },
    leadershipPage: {
      ...fallback.leadershipPage,
      hero: mapHero(
        (leadershipPageGlobal as Record<string, unknown> | null)?.hero,
        fallback.leadershipPage.hero,
        backendUrl,
      ),
      publicPurpose:
        asString((leadershipPageGlobal as Record<string, unknown> | null)?.publicPurpose) ??
        fallback.leadershipPage.publicPurpose,
      leadershipTimeline: timelineArray(
        (leadershipPageGlobal as Record<string, unknown> | null)?.leadershipTimeline,
        fallback.leadershipPage.leadershipTimeline,
      ),
      organizationalRole:
        asString((leadershipPageGlobal as Record<string, unknown> | null)?.organizationalRole) ??
        fallback.leadershipPage.organizationalRole,
      speakingRepresentationBlocks: titleDescriptionArray(
        (leadershipPageGlobal as Record<string, unknown> | null)?.speakingRepresentationBlocks,
        fallback.leadershipPage.speakingRepresentationBlocks,
      ),
    },
    mediaEventsPage: {
      ...fallback.mediaEventsPage,
      hero: mapHero(
        (mediaEventsPageGlobal as Record<string, unknown> | null)?.hero,
        fallback.mediaEventsPage.hero,
        backendUrl,
      ),
      intro:
        asString((mediaEventsPageGlobal as Record<string, unknown> | null)?.intro) ??
        fallback.mediaEventsPage.intro,
      featuredEventIds:
        featuredEventRefs.length
          ? featuredEventRefs
          : featuredEventIds.length
            ? featuredEventIds
            : fallback.mediaEventsPage.featuredEventIds,
      documentaryImageIds: eventGalleryIds.length ? eventGalleryIds : fallback.mediaEventsPage.documentaryImageIds,
      appearanceBlocks: titleDescriptionArray(
        (mediaEventsPageGlobal as Record<string, unknown> | null)?.appearanceBlocks,
        fallback.mediaEventsPage.appearanceBlocks,
      ),
    },
    contactPage: {
      ...fallback.contactPage,
      hero: mapHero(
        (contactPageGlobal as Record<string, unknown> | null)?.hero,
        fallback.contactPage.hero,
        backendUrl,
      ),
      intro:
        asString((contactPageGlobal as Record<string, unknown> | null)?.intro) ?? fallback.contactPage.intro,
      contactCards: labelValueArray(
        (contactPageGlobal as Record<string, unknown> | null)?.contactCards,
        fallback.contactPage.contactCards,
      ),
      inquiryTypeOptions: textArrayFromRows(
        (contactPageGlobal as Record<string, unknown> | null)?.inquiryTypeOptions,
        fallback.contactPage.inquiryTypeOptions,
      ),
      privacyNote:
        asString((contactPageGlobal as Record<string, unknown> | null)?.privacyNote) ??
        fallback.contactPage.privacyNote,
    },
    privacyPage: {
      ...fallback.privacyPage,
      title:
        asString((privacyPageGlobal as Record<string, unknown> | null)?.title) ?? fallback.privacyPage.title,
      intro:
        asString((privacyPageGlobal as Record<string, unknown> | null)?.intro) ?? fallback.privacyPage.intro,
      sections: privacySectionsArray(
        (privacyPageGlobal as Record<string, unknown> | null)?.sections,
        fallback.privacyPage.sections,
      ),
    },
    galleryItems,
    events: events.length ? events : fallback.events,
    updates: updates.length ? updates : fallback.updates,
  }
}
