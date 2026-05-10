'use server'

import { revalidatePath } from 'next/cache'
import type { File as PayloadFile } from 'payload'

import { getAdminSession } from '../../lib/admin-auth'

function getText(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === 'on' || formData.get(key) === 'true'
}

function getNumber(formData: FormData, key: string, fallback = 0) {
  const value = Number(getText(formData, key))
  return Number.isFinite(value) ? value : fallback
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function paragraphText(formData: FormData, key: string) {
  return getText(formData, key)
    .split(/\r?\n\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .join('\n\n')
}

async function requireAdmin(path = '/admin') {
  const session = await getAdminSession(path)

  if (!session.user) {
    throw new Error('Unauthorized admin action')
  }

  return session
}

async function toPayloadFile(fileEntry: FormDataEntryValue | null): Promise<null | PayloadFile> {
  if (!(fileEntry instanceof File) || fileEntry.size === 0) {
    return null
  }

  const data = Buffer.from(await fileEntry.arrayBuffer())

  return {
    name: fileEntry.name,
    data,
    mimetype: fileEntry.type || 'application/octet-stream',
    size: fileEntry.size,
  }
}

async function resolveMediaID(args: {
  altText: string
  caption?: string
  category: 'community' | 'events' | 'leadership' | 'medical'
  existingID?: string
  fileEntry: FormDataEntryValue | null
}) {
  const { payload, req } = await requireAdmin('/admin')

  if (args.existingID) {
    return args.existingID
  }

  const payloadFile = await toPayloadFile(args.fileEntry)

  if (!payloadFile) {
    return null
  }

  const mediaDoc = await payload.create({
    collection: 'media',
    data: {
      altText: args.altText,
      caption: args.caption,
      category: args.category,
    },
    file: payloadFile,
    req,
    overrideAccess: false,
  })

  return String(mediaDoc.id)
}

export async function saveHomepageAction(formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/homepage')
  const heroTitle = getText(formData, 'heroTitle')
  const heroImageID = await resolveMediaID({
    altText: `${heroTitle || 'Dr Umma Hani'} hero portrait`,
    category: 'leadership',
    existingID: getText(formData, 'heroImageID') || undefined,
    fileEntry: formData.get('heroImageUpload'),
  })

  const identityCards = [1, 2, 3]
    .map((index) => ({
      title: getText(formData, `identityTitle${index}`),
      body: getText(formData, `identityBody${index}`),
    }))
    .filter((item) => item.title && item.body)

  await payload.updateGlobal({
    slug: 'homepage',
    req,
    overrideAccess: false,
    data: {
      heroEyebrow: getText(formData, 'heroEyebrow'),
      heroTitle,
      heroSubtitle: getText(formData, 'heroSubtitle'),
      heroImage: heroImageID || undefined,
      ctaPrimaryLabel: getText(formData, 'ctaPrimaryLabel'),
      ctaSecondaryLabel: getText(formData, 'ctaSecondaryLabel'),
      biographySummary: getText(formData, 'biographySummary'),
      identityCards,
      sectionVisibility: {
        profile: getBoolean(formData, 'sectionProfile'),
        journey: getBoolean(formData, 'sectionJourney'),
        medicalWork: getBoolean(formData, 'sectionMedicalWork'),
        publicWork: getBoolean(formData, 'sectionPublicWork'),
        media: getBoolean(formData, 'sectionMedia'),
        updates: getBoolean(formData, 'sectionUpdates'),
        contact: getBoolean(formData, 'sectionContact'),
      },
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/homepage')
}

export async function saveSiteSettingsAction(formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/settings')
  const logoID = await resolveMediaID({
    altText: getText(formData, 'fullName') || 'Dr Umma Hani logo',
    category: 'leadership',
    existingID: getText(formData, 'logoID') || undefined,
    fileEntry: formData.get('logoUpload'),
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    req,
    overrideAccess: false,
    data: {
      fullName: getText(formData, 'fullName'),
      identityLine: getText(formData, 'identityLine'),
      primaryEmail: getText(formData, 'primaryEmail'),
      logo: logoID || undefined,
      footerText: getText(formData, 'footerText'),
      seoTitle: getText(formData, 'seoTitle'),
      seoDescription: getText(formData, 'seoDescription'),
      socialLinks: [
        { label: 'Facebook', url: getText(formData, 'facebookUrl') },
        { label: 'Instagram', url: getText(formData, 'instagramUrl') },
        { label: 'LinkedIn', url: getText(formData, 'linkedinUrl') },
      ].filter((item) => item.url),
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/settings')
}

export async function createGalleryItemAction(formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/gallery')
  const title = getText(formData, 'title')
  const category = (getText(formData, 'category') || 'events') as 'community' | 'events' | 'leadership' | 'medical'
  const imageID = await resolveMediaID({
    altText: getText(formData, 'altText') || title,
    caption: getText(formData, 'caption'),
    category,
    existingID: getText(formData, 'imageID') || undefined,
    fileEntry: formData.get('imageUpload'),
  })

  if (!imageID || !title) return

  await payload.create({
    collection: 'gallery-items',
    req,
    overrideAccess: false,
    data: {
      title,
      image: imageID,
      caption: getText(formData, 'caption'),
      category,
      featured: getBoolean(formData, 'featured'),
      sortOrder: getNumber(formData, 'sortOrder'),
      status: getText(formData, 'status') || 'draft',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/gallery')
}

export async function updateGalleryItemAction(id: string, formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/gallery')
  const title = getText(formData, 'title')
  const category = (getText(formData, 'category') || 'events') as 'community' | 'events' | 'leadership' | 'medical'
  const imageID = await resolveMediaID({
    altText: getText(formData, 'altText') || title,
    caption: getText(formData, 'caption'),
    category,
    existingID: getText(formData, 'imageID') || undefined,
    fileEntry: formData.get('imageUpload'),
  })

  await payload.update({
    collection: 'gallery-items',
    id,
    req,
    overrideAccess: false,
    data: {
      title,
      image: imageID || undefined,
      caption: getText(formData, 'caption'),
      category,
      featured: getBoolean(formData, 'featured'),
      sortOrder: getNumber(formData, 'sortOrder'),
      status: getText(formData, 'status') || 'draft',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/gallery')
}

export async function deleteGalleryItemAction(id: string) {
  const { payload, req } = await requireAdmin('/admin/gallery')

  await payload.delete({
    collection: 'gallery-items',
    id,
    req,
    overrideAccess: false,
  })

  revalidatePath('/')
  revalidatePath('/admin/gallery')
}

export async function createMediaItemAction(formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/media')
  const title = getText(formData, 'title')
  const category = (getText(formData, 'category') || 'events') as 'community' | 'events' | 'leadership' | 'medical'
  const thumbnailID = await resolveMediaID({
    altText: `${title || 'Media item'} thumbnail`,
    caption: getText(formData, 'description'),
    category,
    existingID: getText(formData, 'thumbnailID') || undefined,
    fileEntry: formData.get('thumbnailUpload'),
  })

  if (!thumbnailID || !title) return

  await payload.create({
    collection: 'media-items',
    req,
    overrideAccess: false,
    draft: getText(formData, 'status') !== 'published',
    data: {
      title,
      type: getText(formData, 'type') || 'video',
      thumbnail: thumbnailID,
      mediaUrl: getText(formData, 'mediaUrl'),
      description: getText(formData, 'description'),
      category,
      featuredOnHomepage: getBoolean(formData, 'featuredOnHomepage'),
      sourceLink: getText(formData, 'sourceLink') || undefined,
      status: getText(formData, 'status') || 'draft',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/media')
}

export async function updateMediaItemAction(id: string, formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/media')
  const title = getText(formData, 'title')
  const category = (getText(formData, 'category') || 'events') as 'community' | 'events' | 'leadership' | 'medical'
  const thumbnailID = await resolveMediaID({
    altText: `${title || 'Media item'} thumbnail`,
    caption: getText(formData, 'description'),
    category,
    existingID: getText(formData, 'thumbnailID') || undefined,
    fileEntry: formData.get('thumbnailUpload'),
  })

  await payload.update({
    collection: 'media-items',
    id,
    req,
    overrideAccess: false,
    draft: getText(formData, 'status') !== 'published',
    data: {
      title,
      type: getText(formData, 'type') || 'video',
      thumbnail: thumbnailID || undefined,
      mediaUrl: getText(formData, 'mediaUrl'),
      description: getText(formData, 'description'),
      category,
      featuredOnHomepage: getBoolean(formData, 'featuredOnHomepage'),
      sourceLink: getText(formData, 'sourceLink') || undefined,
      status: getText(formData, 'status') || 'draft',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/media')
}

export async function deleteMediaItemAction(id: string) {
  const { payload, req } = await requireAdmin('/admin/media')

  await payload.delete({
    collection: 'media-items',
    id,
    req,
    overrideAccess: false,
  })

  revalidatePath('/')
  revalidatePath('/admin/media')
}

export async function createUpdateAction(formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/updates')
  const title = getText(formData, 'title')
  const category = (getText(formData, 'imageCategory') || 'events') as 'community' | 'events' | 'leadership' | 'medical'
  const coverImageID = await resolveMediaID({
    altText: `${title || 'Update'} cover image`,
    caption: getText(formData, 'summary'),
    category,
    existingID: getText(formData, 'coverImageID') || undefined,
    fileEntry: formData.get('coverImageUpload'),
  })

  if (!title) return

  await payload.create({
    collection: 'updates',
    req,
    overrideAccess: false,
    draft: getText(formData, 'status') !== 'published',
    data: {
      title,
      slug: getText(formData, 'slug') || slugify(title),
      summary: getText(formData, 'summary'),
      bodyText: paragraphText(formData, 'bodyText'),
      coverImage: coverImageID || undefined,
      category: getText(formData, 'category'),
      publishDate: getText(formData, 'publishDate'),
      sourceLink: getText(formData, 'sourceLink') || undefined,
      featured: getBoolean(formData, 'featured'),
      pinned: getBoolean(formData, 'pinned'),
      status: getText(formData, 'status') || 'draft',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/updates')
}

export async function updateUpdateAction(id: string, formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/updates')
  const title = getText(formData, 'title')
  const category = (getText(formData, 'imageCategory') || 'events') as 'community' | 'events' | 'leadership' | 'medical'
  const coverImageID = await resolveMediaID({
    altText: `${title || 'Update'} cover image`,
    caption: getText(formData, 'summary'),
    category,
    existingID: getText(formData, 'coverImageID') || undefined,
    fileEntry: formData.get('coverImageUpload'),
  })

  await payload.update({
    collection: 'updates',
    id,
    req,
    overrideAccess: false,
    draft: getText(formData, 'status') !== 'published',
    data: {
      title,
      slug: getText(formData, 'slug') || slugify(title),
      summary: getText(formData, 'summary'),
      bodyText: paragraphText(formData, 'bodyText'),
      coverImage: coverImageID || undefined,
      category: getText(formData, 'category'),
      publishDate: getText(formData, 'publishDate'),
      sourceLink: getText(formData, 'sourceLink') || undefined,
      featured: getBoolean(formData, 'featured'),
      pinned: getBoolean(formData, 'pinned'),
      status: getText(formData, 'status') || 'draft',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/updates')
}

export async function deleteUpdateAction(id: string) {
  const { payload, req } = await requireAdmin('/admin/updates')

  await payload.delete({
    collection: 'updates',
    id,
    req,
    overrideAccess: false,
  })

  revalidatePath('/')
  revalidatePath('/admin/updates')
}

export async function createNoticeAction(formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/notices')

  await payload.create({
    collection: 'important-notices',
    req,
    overrideAccess: false,
    draft: getText(formData, 'status') !== 'published',
    data: {
      title: getText(formData, 'title'),
      message: getText(formData, 'message'),
      category: getText(formData, 'category'),
      startDate: getText(formData, 'startDate') || undefined,
      expiryDate: getText(formData, 'expiryDate') || undefined,
      pinned: getBoolean(formData, 'pinned'),
      status: getText(formData, 'status') || 'draft',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/notices')
}

export async function updateNoticeAction(id: string, formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/notices')

  await payload.update({
    collection: 'important-notices',
    id,
    req,
    overrideAccess: false,
    draft: getText(formData, 'status') !== 'published',
    data: {
      title: getText(formData, 'title'),
      message: getText(formData, 'message'),
      category: getText(formData, 'category'),
      startDate: getText(formData, 'startDate') || undefined,
      expiryDate: getText(formData, 'expiryDate') || undefined,
      pinned: getBoolean(formData, 'pinned'),
      status: getText(formData, 'status') || 'draft',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/notices')
}

export async function deleteNoticeAction(id: string) {
  const { payload, req } = await requireAdmin('/admin/notices')

  await payload.delete({
    collection: 'important-notices',
    id,
    req,
    overrideAccess: false,
  })

  revalidatePath('/')
  revalidatePath('/admin/notices')
}

export async function createPositionAction(formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/positions')
  const title = getText(formData, 'title')
  const imageID = await resolveMediaID({
    altText: `${title || 'Leadership position'} source image`,
    caption: getText(formData, 'sourceNote') || getText(formData, 'description'),
    category: 'leadership',
    existingID: getText(formData, 'imageID') || undefined,
    fileEntry: formData.get('imageUpload'),
  })

  if (!title) return

  await payload.create({
    collection: 'positions',
    req,
    overrideAccess: false,
    draft: getText(formData, 'status') !== 'published',
    data: {
      title,
      organization: getText(formData, 'organization'),
      branch: getText(formData, 'branch') || undefined,
      period: getText(formData, 'period'),
      description: getText(formData, 'description'),
      image: imageID || undefined,
      sourceType: getText(formData, 'sourceType') || 'document',
      sourceNote: getText(formData, 'sourceNote') || undefined,
      sourceLink: getText(formData, 'sourceLink') || undefined,
      featured: getBoolean(formData, 'featured'),
      sortOrder: getNumber(formData, 'sortOrder'),
      status: getText(formData, 'status') || 'draft',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/positions')
}

export async function updatePositionAction(id: string, formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/positions')
  const title = getText(formData, 'title')
  const imageID = await resolveMediaID({
    altText: `${title || 'Leadership position'} source image`,
    caption: getText(formData, 'sourceNote') || getText(formData, 'description'),
    category: 'leadership',
    existingID: getText(formData, 'imageID') || undefined,
    fileEntry: formData.get('imageUpload'),
  })

  await payload.update({
    collection: 'positions',
    id,
    req,
    overrideAccess: false,
    draft: getText(formData, 'status') !== 'published',
    data: {
      title,
      organization: getText(formData, 'organization'),
      branch: getText(formData, 'branch') || undefined,
      period: getText(formData, 'period'),
      description: getText(formData, 'description'),
      image: imageID || undefined,
      sourceType: getText(formData, 'sourceType') || 'document',
      sourceNote: getText(formData, 'sourceNote') || undefined,
      sourceLink: getText(formData, 'sourceLink') || undefined,
      featured: getBoolean(formData, 'featured'),
      sortOrder: getNumber(formData, 'sortOrder'),
      status: getText(formData, 'status') || 'draft',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/positions')
}

export async function deletePositionAction(id: string) {
  const { payload, req } = await requireAdmin('/admin/positions')

  await payload.delete({
    collection: 'positions',
    id,
    req,
    overrideAccess: false,
  })

  revalidatePath('/')
  revalidatePath('/admin/positions')
}

export async function saveMessageAction(id: string, formData: FormData) {
  const { payload, req } = await requireAdmin('/admin/messages')

  await payload.update({
    collection: 'contact-inquiries',
    id,
    req,
    overrideAccess: false,
    data: {
      status: getText(formData, 'status') || 'new',
      internalNotes: getText(formData, 'internalNotes') || undefined,
    },
  })

  revalidatePath('/admin/messages')
}

export async function deleteMessageAction(id: string) {
  const { payload, req } = await requireAdmin('/admin/messages')

  await payload.delete({
    collection: 'contact-inquiries',
    id,
    req,
    overrideAccess: false,
  })

  revalidatePath('/admin/messages')
}
