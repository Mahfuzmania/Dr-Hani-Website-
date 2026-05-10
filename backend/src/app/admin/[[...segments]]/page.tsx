import type React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { getAdminSession } from '../../../lib/admin-auth'
import { AdminLoginForm } from '../login-form'
import { LogoutButton } from '../logout-button'
import {
  createGalleryItemAction,
  createMediaItemAction,
  createNoticeAction,
  createPositionAction,
  createUpdateAction,
  deleteGalleryItemAction,
  deleteMediaItemAction,
  deleteMessageAction,
  deleteNoticeAction,
  deletePositionAction,
  deleteUpdateAction,
  saveHomepageAction,
  saveMessageAction,
  saveSiteSettingsAction,
  updateGalleryItemAction,
  updateMediaItemAction,
  updateNoticeAction,
  updatePositionAction,
  updateUpdateAction,
} from '../actions'

type Props = {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const navItems = [
  { slug: 'dashboard', label: 'Dashboard' },
  { slug: 'homepage', label: 'Homepage Control' },
  { slug: 'gallery', label: 'Photos / Gallery' },
  { slug: 'media', label: 'Media' },
  { slug: 'positions', label: 'Positions' },
  { slug: 'updates', label: 'Updates' },
  { slug: 'notices', label: 'Important Notices' },
  { slug: 'messages', label: 'Contact Messages' },
  { slug: 'settings', label: 'Site Settings' },
] as const

function text(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function bool(value: unknown, fallback = false) {
  return typeof value === 'boolean' ? value : fallback
}

function fieldValue(source: unknown, key: string) {
  if (!source || typeof source !== 'object') return ''
  const value = (source as Record<string, unknown>)[key]
  return typeof value === 'string' ? value : ''
}

function relationID(source: unknown) {
  if (!source) return ''
  if (typeof source === 'string' || typeof source === 'number') return String(source)
  if (typeof source === 'object' && 'id' in source && source.id != null) return String(source.id)
  return ''
}

function relationURL(source: unknown) {
  if (!source || typeof source !== 'object') return ''
  if ('url' in source && typeof source.url === 'string') return source.url
  return ''
}

function textAreaValue(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function dateValue(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.slice(0, 10)
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`admin-field mt-2 w-full rounded-[0.8rem] px-4 py-3 text-[var(--foreground)] ${props.className ?? ''}`}
    />
  )
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`admin-field mt-2 w-full rounded-[0.8rem] px-4 py-3 text-[var(--foreground)] ${props.className ?? ''}`}
    />
  )
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`admin-field mt-2 w-full rounded-[0.8rem] px-4 py-3 text-[var(--foreground)] ${props.className ?? ''}`}
    />
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[rgba(18,32,51,0.58)]">{children}</span>
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`admin-card rounded-[1rem] p-6 ${className}`}>
      {children}
    </section>
  )
}

function SectionTitle({ eyebrow, title, body }: { body?: string; eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-[2.2rem] leading-none tracking-[-0.04em] text-[var(--navy)] md:text-[2.8rem]">
        {title}
      </h1>
      {body ? <p className="mt-4 max-w-3xl text-[0.98rem] leading-8 text-[var(--muted)]">{body}</p> : null}
    </div>
  )
}

export default async function AdminPage({ params, searchParams }: Props) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const section = resolvedParams.segments?.[0] ?? 'dashboard'
  const session = await getAdminSession(`/admin/${resolvedParams.segments?.join('/') ?? ''}`)

  if (!session.user) {
    return (
      <main className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="admin-contrast rounded-[1.2rem] p-8 text-white">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/60">Dr Umma Hani CMS</p>
            <h1 className="mt-5 font-serif text-[3rem] leading-[0.9] tracking-[-0.04em]">Editorial, structured control.</h1>
            <p className="mt-6 max-w-lg text-[1rem] leading-8 text-white/78">
              This custom admin replaces the previous stock-first CMS flow with focused modules for homepage content, media, updates, notices, messages, and site settings.
            </p>
          </div>
          <Card>
            <SectionTitle
              eyebrow="Admin Access"
              title="Sign in to continue"
              body="Use an authorized Payload user account. The custom CMS reuses the existing backend auth and data models."
            />
            <AdminLoginForm />
          </Card>
        </div>
      </main>
    )
  }

  const { payload, req, user } = session
  const [homepage, siteSettings, galleryItems, mediaItems, positions, updates, notices, messages, mediaLibrary] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', depth: 1, req, overrideAccess: false }),
    payload.findGlobal({ slug: 'site-settings', depth: 1, req, overrideAccess: false }),
    payload.find({ collection: 'gallery-items', depth: 1, limit: 100, pagination: false, sort: 'sortOrder', req, overrideAccess: false }),
    payload.find({ collection: 'media-items', depth: 1, limit: 100, pagination: false, sort: '-updatedAt', req, overrideAccess: false }),
    payload.find({ collection: 'positions', depth: 1, limit: 100, pagination: false, sort: 'sortOrder', req, overrideAccess: false }),
    payload.find({ collection: 'updates', depth: 1, limit: 100, pagination: false, sort: '-publishDate', req, overrideAccess: false }),
    payload.find({ collection: 'important-notices', depth: 1, limit: 100, pagination: false, sort: '-updatedAt', req, overrideAccess: false }),
    payload.find({ collection: 'contact-inquiries', depth: 0, limit: 100, pagination: false, sort: '-createdAt', req, overrideAccess: false }),
    payload.find({ collection: 'media', depth: 0, limit: 100, pagination: false, sort: '-updatedAt', req, overrideAccess: false }),
  ])
  const homepageRecord = homepage as Record<string, unknown>
  const siteSettingsRecord = siteSettings as Record<string, unknown>
  const homepageVisibility = (homepageRecord.sectionVisibility as Record<string, unknown> | undefined) ?? {}

  const mediaChoices = (mediaLibrary.docs ?? []) as Array<Record<string, unknown>>
  const galleryDocs = (galleryItems.docs ?? []) as Array<Record<string, unknown>>
  const mediaDocs = (mediaItems.docs ?? []) as Array<Record<string, unknown>>
  const positionDocs = (positions.docs ?? []) as Array<Record<string, unknown>>
  const updateDocs = (updates.docs ?? []) as Array<Record<string, unknown>>
  const noticeDocs = (notices.docs ?? []) as Array<Record<string, unknown>>
  const messageDocs = (messages.docs ?? []) as Array<Record<string, unknown>>

  const filterType = typeof resolvedSearchParams.type === 'string' ? resolvedSearchParams.type : ''
  const searchQuery = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q.toLowerCase() : ''
  const filteredMessages = messageDocs.filter((item) => {
    const matchesType = filterType ? text(item.inquiryType) === filterType : true
    const haystack = [text(item.name), text(item.email), text(item.subject), text(item.message)].join(' ').toLowerCase()
    const matchesQuery = searchQuery ? haystack.includes(searchQuery) : true
    return matchesType && matchesQuery
  })

  const currentNav = navItems.find((item) => item.slug === section) ?? navItems[0]

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(255,255,255,0.44),rgba(255,255,255,0.2)),var(--background)] text-[var(--foreground)]">
      <div className="mx-auto grid min-h-screen max-w-[98rem] gap-0 xl:grid-cols-[18rem_1fr]">
        <aside className="border-b border-[rgba(18,32,51,0.08)] bg-[linear-gradient(180deg,rgba(8,32,68,1),rgba(9,31,63,0.98))] px-5 py-6 text-white xl:min-h-screen xl:border-b-0 xl:border-r xl:border-r-white/8">
          <div className="admin-pill-contrast rounded-[1rem] px-5 py-5 backdrop-blur-xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/58">Dr Umma Hani CMS</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-none tracking-[-0.04em]">{text((user as Record<string, unknown>)?.name) || 'Content Team'}</h2>
            <p className="mt-3 text-[0.9rem] leading-7 text-white/72">Custom editor workspace for homepage, gallery, updates, notices, messages, and settings.</p>
          </div>
          <nav className="mt-8 grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.slug}
                href={item.slug === 'dashboard' ? '/admin/dashboard' : `/admin/${item.slug}`}
                className={`rounded-[1rem] px-4 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition ${currentNav.slug === item.slug ? 'admin-pill bg-white text-[var(--navy)]' : 'admin-pill-contrast text-white/72 hover:bg-white/10 hover:text-white'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="px-4 py-4 md:px-6 md:py-6 xl:px-8 xl:py-8">
          <div className="admin-panel mb-6 flex flex-col gap-4 rounded-[1rem] px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Active Module</p>
              <p className="mt-2 font-serif text-[1.8rem] leading-none tracking-[-0.04em] text-[var(--navy)]">{currentNav.label}</p>
            </div>
            <LogoutButton />
          </div>

          {section === 'dashboard' ? (
            <div className="space-y-6">
              <SectionTitle
                eyebrow="Dashboard"
                title="A tighter control surface"
                body="The dashboard prioritizes the content sets that actually drive the rebuilt website."
              />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                {[
                  ['Total photos', String(galleryDocs.length)],
                  ['Featured media', String(mediaDocs.filter((item) => bool(item.featuredOnHomepage)).length)],
                  ['Published positions', String(positionDocs.filter((item) => text(item.status) === 'published').length)],
                  ['Published updates', String(updateDocs.filter((item) => text(item.status) === 'published').length)],
                  ['Pinned notices', String(noticeDocs.filter((item) => bool(item.pinned)).length)],
                  ['Unread messages', String(messageDocs.filter((item) => text(item.status) === 'new').length)],
                ].map(([label, value]) => (
                  <Card key={label}>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
                    <p className="mt-4 font-serif text-[2.4rem] leading-none tracking-[-0.04em] text-[var(--navy)]">{value}</p>
                  </Card>
                ))}
              </div>
              <div className="grid gap-6 xl:grid-cols-2">
                <Card>
                  <h3 className="font-serif text-[1.8rem] leading-none tracking-[-0.04em] text-[var(--navy)]">Homepage control</h3>
                  <p className="mt-3 text-[0.96rem] leading-8 text-[var(--muted)]">
                    Manage hero copy, identity cards, biography summary, the homepage portrait, and section visibility.
                  </p>
                </Card>
                <Card>
                  <h3 className="font-serif text-[1.8rem] leading-none tracking-[-0.04em] text-[var(--navy)]">Content flow</h3>
                  <p className="mt-3 text-[0.96rem] leading-8 text-[var(--muted)]">
                    Gallery, media, updates, notices, and contact messages all connect directly to the rebuilt public homepage or support routes.
                  </p>
                </Card>
              </div>
            </div>
          ) : null}

          {section === 'homepage' ? (
            <div className="space-y-6">
              <SectionTitle eyebrow="Homepage" title="Manage the public homepage" />
              <Card>
                <form action={saveHomepageAction} className="grid gap-6">
                  <div className="grid gap-5 lg:grid-cols-2">
                    <label className="block">
                      <Label>Hero eyebrow</Label>
                      <Input name="heroEyebrow" defaultValue={fieldValue(homepage, 'heroEyebrow')} />
                    </label>
                    <label className="block">
                      <Label>Hero title</Label>
                      <Input name="heroTitle" defaultValue={fieldValue(homepage, 'heroTitle')} />
                    </label>
                  </div>
                  <label className="block">
                    <Label>Hero subtitle</Label>
                    <Textarea name="heroSubtitle" rows={4} defaultValue={fieldValue(homepage, 'heroSubtitle')} />
                  </label>
                  <div className="grid gap-5 lg:grid-cols-3">
                    <label className="block">
                      <Label>Primary CTA</Label>
                      <Input name="ctaPrimaryLabel" defaultValue={fieldValue(homepage, 'ctaPrimaryLabel')} />
                    </label>
                    <label className="block">
                      <Label>Secondary CTA</Label>
                      <Input name="ctaSecondaryLabel" defaultValue={fieldValue(homepage, 'ctaSecondaryLabel')} />
                    </label>
                    <label className="block">
                      <Label>Hero image</Label>
                      <Select name="heroImageID" defaultValue={relationID(homepageRecord.heroImage)}>
                        <option value="">Keep current</option>
                        {mediaChoices.map((item) => (
                          <option key={String(item.id)} value={String(item.id)}>
                            {text(item.filename) || `Media ${String(item.id)}`}
                          </option>
                        ))}
                      </Select>
                    </label>
                  </div>
                  <label className="block">
                    <Label>Upload new hero image</Label>
                    <Input name="heroImageUpload" type="file" accept="image/*" />
                  </label>
                  <label className="block">
                    <Label>Biography summary</Label>
                    <Textarea name="biographySummary" rows={5} defaultValue={fieldValue(homepage, 'biographySummary')} />
                  </label>
                  <div className="grid gap-5 lg:grid-cols-3">
                    {[1, 2, 3].map((index) => {
                      const card = Array.isArray(homepageRecord.identityCards)
                        ? (((homepageRecord.identityCards as Array<Record<string, unknown>>)[index - 1] ?? {}))
                        : {}

                      return (
                        <div key={index} className="admin-panel rounded-[1.2rem] p-4">
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Identity card {index}</p>
                          <label className="mt-4 block">
                            <Label>Title</Label>
                            <Input name={`identityTitle${index}`} defaultValue={fieldValue(card, 'title')} />
                          </label>
                          <label className="mt-4 block">
                            <Label>Body</Label>
                            <Textarea name={`identityBody${index}`} rows={5} defaultValue={fieldValue(card, 'body')} />
                          </label>
                        </div>
                      )
                    })}
                  </div>
                  <div className="admin-panel rounded-[1.2rem] p-4">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Section visibility</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                      {[
                        ['sectionProfile', 'Profile', bool(homepageVisibility.profile, true)],
                        ['sectionJourney', 'Journey', bool(homepageVisibility.journey, true)],
                        ['sectionMedicalWork', 'Medical Work', bool(homepageVisibility.medicalWork, true)],
                        ['sectionPublicWork', 'Public Work', bool(homepageVisibility.publicWork, true)],
                        ['sectionMedia', 'Media', bool(homepageVisibility.media, true)],
                        ['sectionUpdates', 'Updates', bool(homepageVisibility.updates, true)],
                        ['sectionContact', 'Contact', bool(homepageVisibility.contact, true)],
                      ].map(([name, label, checked]) => (
                        <label key={String(name)} className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm text-[var(--foreground)]">
                          <input type="checkbox" name={String(name)} defaultChecked={Boolean(checked)} />
                          <span>{String(label)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="admin-button-primary w-fit rounded-full px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white">
                    Save Homepage
                  </button>
                </form>
              </Card>
            </div>
          ) : null}

          {section === 'gallery' ? (
            <div className="space-y-6">
              <SectionTitle eyebrow="Photos / Gallery" title="Manage homepage and gallery photos" />
              <Card>
                <h3 className="font-serif text-[1.8rem] leading-none tracking-[-0.04em] text-[var(--navy)]">Add gallery item</h3>
                <form action={createGalleryItemAction} className="mt-6 grid gap-5 lg:grid-cols-2">
                  <label className="block"><Label>Title</Label><Input name="title" /></label>
                  <label className="block"><Label>Alt text</Label><Input name="altText" /></label>
                  <label className="block lg:col-span-2"><Label>Caption</Label><Textarea name="caption" rows={3} /></label>
                  <label className="block"><Label>Category</Label><Select name="category" defaultValue="events"><option value="medical">Medical</option><option value="community">Community</option><option value="events">Events</option><option value="leadership">Leadership</option></Select></label>
                  <label className="block"><Label>Existing image</Label><Select name="imageID" defaultValue=""><option value="">Upload new or choose later</option>{mediaChoices.map((item) => <option key={String(item.id)} value={String(item.id)}>{text(item.filename) || `Media ${String(item.id)}`}</option>)}</Select></label>
                  <label className="block"><Label>Upload image</Label><Input type="file" name="imageUpload" accept="image/*" /></label>
                  <label className="block"><Label>Sort order</Label><Input name="sortOrder" type="number" defaultValue="0" /></label>
                  <label className="block"><Label>Status</Label><Select name="status" defaultValue="published"><option value="draft">Draft</option><option value="published">Published</option></Select></label>
                  <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="featured" /><span>Feature on homepage</span></label>
                  <button className="admin-button-primary w-fit rounded-full px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white">Create Photo</button>
                </form>
              </Card>
              <div className="grid gap-5 xl:grid-cols-2">
                {galleryDocs.map((item) => {
                  const updateAction = updateGalleryItemAction.bind(null, String(item.id))
                  const deleteAction = deleteGalleryItemAction.bind(null, String(item.id))
                  return (
                    <Card key={String(item.id)}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-[1.6rem] leading-none tracking-[-0.04em] text-[var(--navy)]">{text(item.title)}</h3>
                          <p className="mt-2 text-sm text-[var(--muted)]">{text(item.category)} - {text(item.status) || 'draft'}</p>
                        </div>
                        {relationURL(item.image) ? <Image src={relationURL(item.image)} alt={text(item.title)} width={80} height={80} className="h-20 w-20 rounded-[1rem] object-cover" /> : null}
                      </div>
                      <form action={updateAction} className="mt-6 grid gap-4">
                        <label className="block"><Label>Title</Label><Input name="title" defaultValue={text(item.title)} /></label>
                        <label className="block"><Label>Alt text</Label><Input name="altText" defaultValue={text((item.image as Record<string, unknown> | undefined)?.altText)} /></label>
                        <label className="block"><Label>Caption</Label><Textarea name="caption" rows={3} defaultValue={text(item.caption)} /></label>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block"><Label>Category</Label><Select name="category" defaultValue={text(item.category) || 'events'}><option value="medical">Medical</option><option value="community">Community</option><option value="events">Events</option><option value="leadership">Leadership</option></Select></label>
                          <label className="block"><Label>Existing image</Label><Select name="imageID" defaultValue={relationID(item.image)}><option value="">Keep current</option>{mediaChoices.map((choice) => <option key={String(choice.id)} value={String(choice.id)}>{text(choice.filename) || `Media ${String(choice.id)}`}</option>)}</Select></label>
                        </div>
                        <label className="block"><Label>Upload replacement</Label><Input type="file" name="imageUpload" accept="image/*" /></label>
                        <div className="grid gap-4 md:grid-cols-3">
                          <label className="block"><Label>Sort order</Label><Input name="sortOrder" type="number" defaultValue={String(item.sortOrder ?? 0)} /></label>
                          <label className="block"><Label>Status</Label><Select name="status" defaultValue={text(item.status) || 'draft'}><option value="draft">Draft</option><option value="published">Published</option></Select></label>
                          <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="featured" defaultChecked={bool(item.featured)} /><span>Featured</span></label>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button className="admin-button-primary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white">Save</button>
                          <button formAction={deleteAction} className="admin-button-secondary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--navy)]">Delete</button>
                        </div>
                      </form>
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : null}

          {section === 'media' ? (
            <div className="space-y-6">
              <SectionTitle eyebrow="Media" title="Manage featured media and article references" />
              <Card>
                <h3 className="font-serif text-[1.8rem] leading-none tracking-[-0.04em] text-[var(--navy)]">Add media item</h3>
                <form action={createMediaItemAction} className="mt-6 grid gap-5 lg:grid-cols-2">
                  <label className="block"><Label>Title</Label><Input name="title" /></label>
                  <label className="block"><Label>Type</Label><Select name="type" defaultValue="video"><option value="video">Video</option><option value="image">Image</option><option value="article">Article</option></Select></label>
                  <label className="block lg:col-span-2"><Label>Description</Label><Textarea name="description" rows={3} /></label>
                  <label className="block"><Label>Media URL or upload path</Label><Input name="mediaUrl" /></label>
                  <label className="block"><Label>Source link</Label><Input name="sourceLink" /></label>
                  <label className="block"><Label>Category</Label><Select name="category" defaultValue="events"><option value="medical">Medical</option><option value="community">Community</option><option value="events">Events</option><option value="leadership">Leadership</option></Select></label>
                  <label className="block"><Label>Existing thumbnail</Label><Select name="thumbnailID" defaultValue=""><option value="">Upload new or choose later</option>{mediaChoices.map((item) => <option key={String(item.id)} value={String(item.id)}>{text(item.filename) || `Media ${String(item.id)}`}</option>)}</Select></label>
                  <label className="block"><Label>Upload thumbnail</Label><Input type="file" name="thumbnailUpload" accept="image/*" /></label>
                  <label className="block"><Label>Status</Label><Select name="status" defaultValue="published"><option value="draft">Draft</option><option value="published">Published</option></Select></label>
                  <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="featuredOnHomepage" /><span>Feature on homepage</span></label>
                  <button className="admin-button-primary w-fit rounded-full px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white">Create Media Item</button>
                </form>
              </Card>
              <div className="grid gap-5 xl:grid-cols-2">
                {mediaDocs.map((item) => {
                  const updateAction = updateMediaItemAction.bind(null, String(item.id))
                  const deleteAction = deleteMediaItemAction.bind(null, String(item.id))
                  return (
                    <Card key={String(item.id)}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-[1.6rem] leading-none tracking-[-0.04em] text-[var(--navy)]">{text(item.title)}</h3>
                          <p className="mt-2 text-sm text-[var(--muted)]">{text(item.type)} - {text(item.category)} - {text(item.status)}</p>
                        </div>
                        {relationURL(item.thumbnail) ? <Image src={relationURL(item.thumbnail)} alt={text(item.title)} width={80} height={80} className="h-20 w-20 rounded-[1rem] object-cover" /> : null}
                      </div>
                      <form action={updateAction} className="mt-6 grid gap-4">
                        <label className="block"><Label>Title</Label><Input name="title" defaultValue={text(item.title)} /></label>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block"><Label>Type</Label><Select name="type" defaultValue={text(item.type) || 'video'}><option value="video">Video</option><option value="image">Image</option><option value="article">Article</option></Select></label>
                          <label className="block"><Label>Category</Label><Select name="category" defaultValue={text(item.category) || 'events'}><option value="medical">Medical</option><option value="community">Community</option><option value="events">Events</option><option value="leadership">Leadership</option></Select></label>
                        </div>
                        <label className="block"><Label>Description</Label><Textarea name="description" rows={3} defaultValue={text(item.description)} /></label>
                        <label className="block"><Label>Media URL or upload path</Label><Input name="mediaUrl" defaultValue={text(item.mediaUrl)} /></label>
                        <label className="block"><Label>Source link</Label><Input name="sourceLink" defaultValue={text(item.sourceLink)} /></label>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block"><Label>Existing thumbnail</Label><Select name="thumbnailID" defaultValue={relationID(item.thumbnail)}><option value="">Keep current</option>{mediaChoices.map((choice) => <option key={String(choice.id)} value={String(choice.id)}>{text(choice.filename) || `Media ${String(choice.id)}`}</option>)}</Select></label>
                          <label className="block"><Label>Upload replacement</Label><Input type="file" name="thumbnailUpload" accept="image/*" /></label>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block"><Label>Status</Label><Select name="status" defaultValue={text(item.status) || 'draft'}><option value="draft">Draft</option><option value="published">Published</option></Select></label>
                          <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="featuredOnHomepage" defaultChecked={bool(item.featuredOnHomepage)} /><span>Featured</span></label>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button className="admin-button-primary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white">Save</button>
                          <button formAction={deleteAction} className="admin-button-secondary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--navy)]">Delete</button>
                        </div>
                      </form>
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : null}

          {section === 'positions' ? (
            <div className="space-y-6">
              <SectionTitle
                eyebrow="Positions"
                title="Manage leadership roles and public references"
                body="Use this module for verified positions that should appear on the public site without editing code."
              />
              <Card>
                <h3 className="font-serif text-[1.8rem] leading-none tracking-[-0.04em] text-[var(--navy)]">Add position</h3>
                <form action={createPositionAction} className="mt-6 grid gap-5 lg:grid-cols-2">
                  <label className="block"><Label>Title</Label><Input name="title" placeholder="Vice-President" /></label>
                  <label className="block"><Label>Organization</Label><Input name="organization" placeholder="Bangladesh Jatiyatabadi Chhatra Dal" /></label>
                  <label className="block"><Label>Branch / scope</Label><Input name="branch" placeholder="Central Parliament" /></label>
                  <label className="block"><Label>Period / date</Label><Input name="period" placeholder="4 April 2026" /></label>
                  <label className="block lg:col-span-2"><Label>Description</Label><Textarea name="description" rows={4} /></label>
                  <label className="block"><Label>Source type</Label><Select name="sourceType" defaultValue="document"><option value="document">Document</option><option value="news">News</option><option value="public-record">Public record</option><option value="internal">Internal source</option></Select></label>
                  <label className="block"><Label>Source link</Label><Input name="sourceLink" /></label>
                  <label className="block lg:col-span-2"><Label>Source note</Label><Textarea name="sourceNote" rows={3} placeholder="Supplied April 4, 2026 nomination/selection document." /></label>
                  <label className="block"><Label>Existing image</Label><Select name="imageID" defaultValue=""><option value="">Upload new or choose later</option>{mediaChoices.map((item) => <option key={String(item.id)} value={String(item.id)}>{text(item.filename) || `Media ${String(item.id)}`}</option>)}</Select></label>
                  <label className="block"><Label>Upload image</Label><Input type="file" name="imageUpload" accept="image/*" /></label>
                  <label className="block"><Label>Sort order</Label><Input name="sortOrder" type="number" defaultValue="0" /></label>
                  <label className="block"><Label>Status</Label><Select name="status" defaultValue="published"><option value="draft">Draft</option><option value="published">Published</option></Select></label>
                  <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="featured" defaultChecked /><span>Featured on public site</span></label>
                  <button className="admin-button-primary w-fit rounded-full px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white">Create Position</button>
                </form>
              </Card>
              <div className="grid gap-5">
                {positionDocs.map((item) => {
                  const updateAction = updatePositionAction.bind(null, String(item.id))
                  const deleteAction = deletePositionAction.bind(null, String(item.id))
                  return (
                    <Card key={String(item.id)}>
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="font-serif text-[1.7rem] leading-none tracking-[-0.04em] text-[var(--navy)]">{text(item.title)}</h3>
                          <p className="mt-2 text-sm text-[var(--muted)]">{text(item.organization)} - {text(item.period)} - {text(item.status)}</p>
                        </div>
                        {relationURL(item.image) ? <Image src={relationURL(item.image)} alt={text(item.title)} width={96} height={96} className="h-24 w-24 rounded-[1rem] object-cover" /> : null}
                      </div>
                      <form action={updateAction} className="mt-6 grid gap-4 lg:grid-cols-2">
                        <label className="block"><Label>Title</Label><Input name="title" defaultValue={text(item.title)} /></label>
                        <label className="block"><Label>Organization</Label><Input name="organization" defaultValue={text(item.organization)} /></label>
                        <label className="block"><Label>Branch / scope</Label><Input name="branch" defaultValue={text(item.branch)} /></label>
                        <label className="block"><Label>Period / date</Label><Input name="period" defaultValue={text(item.period)} /></label>
                        <label className="block lg:col-span-2"><Label>Description</Label><Textarea name="description" rows={4} defaultValue={text(item.description)} /></label>
                        <label className="block"><Label>Source type</Label><Select name="sourceType" defaultValue={text(item.sourceType) || 'document'}><option value="document">Document</option><option value="news">News</option><option value="public-record">Public record</option><option value="internal">Internal source</option></Select></label>
                        <label className="block"><Label>Source link</Label><Input name="sourceLink" defaultValue={text(item.sourceLink)} /></label>
                        <label className="block lg:col-span-2"><Label>Source note</Label><Textarea name="sourceNote" rows={3} defaultValue={text(item.sourceNote)} /></label>
                        <label className="block"><Label>Existing image</Label><Select name="imageID" defaultValue={relationID(item.image)}><option value="">Keep current</option>{mediaChoices.map((choice) => <option key={String(choice.id)} value={String(choice.id)}>{text(choice.filename) || `Media ${String(choice.id)}`}</option>)}</Select></label>
                        <label className="block"><Label>Upload replacement</Label><Input type="file" name="imageUpload" accept="image/*" /></label>
                        <label className="block"><Label>Sort order</Label><Input name="sortOrder" type="number" defaultValue={String(typeof item.sortOrder === 'number' ? item.sortOrder : 0)} /></label>
                        <label className="block"><Label>Status</Label><Select name="status" defaultValue={text(item.status) || 'draft'}><option value="draft">Draft</option><option value="published">Published</option></Select></label>
                        <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="featured" defaultChecked={bool(item.featured)} /><span>Featured on public site</span></label>
                        <div className="flex flex-wrap gap-3 lg:col-span-2">
                          <button className="admin-button-primary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white">Save</button>
                          <button formAction={deleteAction} className="admin-button-secondary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--navy)]">Delete</button>
                        </div>
                      </form>
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : null}

          {section === 'updates' ? (
            <div className="space-y-6">
              <SectionTitle eyebrow="Updates" title="Manage public news and updates" />
              <Card>
                <h3 className="font-serif text-[1.8rem] leading-none tracking-[-0.04em] text-[var(--navy)]">Add update</h3>
                <form action={createUpdateAction} className="mt-6 grid gap-5 lg:grid-cols-2">
                  <label className="block"><Label>Title</Label><Input name="title" /></label>
                  <label className="block"><Label>Slug</Label><Input name="slug" placeholder="Auto-generated if left blank" /></label>
                  <label className="block"><Label>Category</Label><Input name="category" /></label>
                  <label className="block"><Label>Date</Label><Input name="publishDate" type="date" /></label>
                  <label className="block lg:col-span-2"><Label>Summary</Label><Textarea name="summary" rows={3} /></label>
                  <label className="block lg:col-span-2"><Label>Body paragraphs</Label><Textarea name="bodyText" rows={8} placeholder="Separate paragraphs with a blank line." /></label>
                  <label className="block"><Label>Source link</Label><Input name="sourceLink" /></label>
                  <label className="block"><Label>Image category</Label><Select name="imageCategory" defaultValue="events"><option value="medical">Medical</option><option value="community">Community</option><option value="events">Events</option><option value="leadership">Leadership</option></Select></label>
                  <label className="block"><Label>Existing cover image</Label><Select name="coverImageID" defaultValue=""><option value="">Upload new or choose later</option>{mediaChoices.map((item) => <option key={String(item.id)} value={String(item.id)}>{text(item.filename) || `Media ${String(item.id)}`}</option>)}</Select></label>
                  <label className="block"><Label>Upload cover image</Label><Input type="file" name="coverImageUpload" accept="image/*" /></label>
                  <label className="block"><Label>Status</Label><Select name="status" defaultValue="published"><option value="draft">Draft</option><option value="published">Published</option></Select></label>
                  <div className="flex flex-wrap gap-3">
                    <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="featured" /><span>Featured</span></label>
                    <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="pinned" /><span>Pinned</span></label>
                  </div>
                  <button className="admin-button-primary w-fit rounded-full px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white">Create Update</button>
                </form>
              </Card>
              <div className="grid gap-5">
                {updateDocs.map((item) => {
                  const updateAction = updateUpdateAction.bind(null, String(item.id))
                  const deleteAction = deleteUpdateAction.bind(null, String(item.id))
                  return (
                    <Card key={String(item.id)}>
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="font-serif text-[1.7rem] leading-none tracking-[-0.04em] text-[var(--navy)]">{text(item.title)}</h3>
                          <p className="mt-2 text-sm text-[var(--muted)]">{text(item.publishDate)} - {text(item.category)} - {text(item.status)}</p>
                        </div>
                        {relationURL(item.coverImage) ? <Image src={relationURL(item.coverImage)} alt={text(item.title)} width={96} height={96} className="h-24 w-24 rounded-[1rem] object-cover" /> : null}
                      </div>
                      <form action={updateAction} className="mt-6 grid gap-4 lg:grid-cols-2">
                        <label className="block"><Label>Title</Label><Input name="title" defaultValue={text(item.title)} /></label>
                        <label className="block"><Label>Slug</Label><Input name="slug" defaultValue={text(item.slug)} /></label>
                        <label className="block"><Label>Category</Label><Input name="category" defaultValue={text(item.category)} /></label>
                        <label className="block"><Label>Date</Label><Input name="publishDate" type="date" defaultValue={dateValue(item.publishDate)} /></label>
                        <label className="block lg:col-span-2"><Label>Summary</Label><Textarea name="summary" rows={3} defaultValue={text(item.summary)} /></label>
                        <label className="block lg:col-span-2"><Label>Body paragraphs</Label><Textarea name="bodyText" rows={8} defaultValue={textAreaValue(item.bodyText)} /></label>
                        <label className="block"><Label>Source link</Label><Input name="sourceLink" defaultValue={text(item.sourceLink)} /></label>
                        <label className="block"><Label>Image category</Label><Select name="imageCategory" defaultValue="events"><option value="medical">Medical</option><option value="community">Community</option><option value="events">Events</option><option value="leadership">Leadership</option></Select></label>
                        <label className="block"><Label>Existing cover image</Label><Select name="coverImageID" defaultValue={relationID(item.coverImage)}><option value="">Keep current</option>{mediaChoices.map((choice) => <option key={String(choice.id)} value={String(choice.id)}>{text(choice.filename) || `Media ${String(choice.id)}`}</option>)}</Select></label>
                        <label className="block"><Label>Upload replacement</Label><Input type="file" name="coverImageUpload" accept="image/*" /></label>
                        <label className="block"><Label>Status</Label><Select name="status" defaultValue={text(item.status) || 'draft'}><option value="draft">Draft</option><option value="published">Published</option></Select></label>
                        <div className="flex flex-wrap gap-3">
                          <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="featured" defaultChecked={bool(item.featured)} /><span>Featured</span></label>
                          <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="pinned" defaultChecked={bool(item.pinned)} /><span>Pinned</span></label>
                        </div>
                        <div className="flex flex-wrap gap-3 lg:col-span-2">
                          <button className="admin-button-primary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white">Save</button>
                          <button formAction={deleteAction} className="admin-button-secondary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--navy)]">Delete</button>
                        </div>
                      </form>
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : null}

          {section === 'notices' ? (
            <div className="space-y-6">
              <SectionTitle eyebrow="Important Notices" title="Manage short pinned or scheduled notices" />
              <Card>
                <h3 className="font-serif text-[1.8rem] leading-none tracking-[-0.04em] text-[var(--navy)]">Add notice</h3>
                <form action={createNoticeAction} className="mt-6 grid gap-5 lg:grid-cols-2">
                  <label className="block"><Label>Title</Label><Input name="title" /></label>
                  <label className="block"><Label>Category</Label><Input name="category" /></label>
                  <label className="block lg:col-span-2"><Label>Message</Label><Textarea name="message" rows={4} /></label>
                  <label className="block"><Label>Start date</Label><Input name="startDate" type="date" /></label>
                  <label className="block"><Label>Expiry date</Label><Input name="expiryDate" type="date" /></label>
                  <label className="block"><Label>Status</Label><Select name="status" defaultValue="published"><option value="draft">Draft</option><option value="published">Published</option></Select></label>
                  <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="pinned" /><span>Pinned notice</span></label>
                  <button className="admin-button-primary w-fit rounded-full px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white">Create Notice</button>
                </form>
              </Card>
              <div className="grid gap-5 xl:grid-cols-2">
                {noticeDocs.map((item) => {
                  const updateAction = updateNoticeAction.bind(null, String(item.id))
                  const deleteAction = deleteNoticeAction.bind(null, String(item.id))
                  return (
                    <Card key={String(item.id)}>
                      <h3 className="font-serif text-[1.6rem] leading-none tracking-[-0.04em] text-[var(--navy)]">{text(item.title)}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">{text(item.category)} - {text(item.status)}</p>
                      <form action={updateAction} className="mt-6 grid gap-4">
                        <label className="block"><Label>Title</Label><Input name="title" defaultValue={text(item.title)} /></label>
                        <label className="block"><Label>Category</Label><Input name="category" defaultValue={text(item.category)} /></label>
                        <label className="block"><Label>Message</Label><Textarea name="message" rows={4} defaultValue={text(item.message)} /></label>
                        <div className="grid gap-4 md:grid-cols-3">
                          <label className="block"><Label>Start date</Label><Input name="startDate" type="date" defaultValue={dateValue(item.startDate)} /></label>
                          <label className="block"><Label>Expiry date</Label><Input name="expiryDate" type="date" defaultValue={dateValue(item.expiryDate)} /></label>
                          <label className="block"><Label>Status</Label><Select name="status" defaultValue={text(item.status) || 'draft'}><option value="draft">Draft</option><option value="published">Published</option></Select></label>
                        </div>
                        <label className="admin-pill flex items-center gap-3 rounded-[1rem] px-4 py-3"><input type="checkbox" name="pinned" defaultChecked={bool(item.pinned)} /><span>Pinned notice</span></label>
                        <div className="flex flex-wrap gap-3">
                          <button className="admin-button-primary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white">Save</button>
                          <button formAction={deleteAction} className="admin-button-secondary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--navy)]">Delete</button>
                        </div>
                      </form>
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : null}

          {section === 'messages' ? (
            <div className="space-y-6">
              <SectionTitle eyebrow="Contact Messages" title="Review, filter, and respond internally" />
              <Card>
                <form method="GET" className="grid gap-4 md:grid-cols-[1fr_14rem_auto]">
                  <div>
                    <Label>Search</Label>
                    <Input name="q" defaultValue={typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : ''} placeholder="Search name, email, subject, or message" />
                  </div>
                  <div>
                    <Label>Inquiry type</Label>
                    <Select name="type" defaultValue={filterType}>
                      <option value="">All types</option>
                      {[...new Set(messageDocs.map((item) => text(item.inquiryType)).filter(Boolean))].map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="self-end">
                    <button className="admin-button-primary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white">Apply</button>
                  </div>
                </form>
              </Card>
              <div className="grid gap-5">
                {filteredMessages.map((item) => {
                  const saveAction = saveMessageAction.bind(null, String(item.id))
                  const deleteAction = deleteMessageAction.bind(null, String(item.id))
                  return (
                    <Card key={String(item.id)}>
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="font-serif text-[1.6rem] leading-none tracking-[-0.04em] text-[var(--navy)]">{text(item.subject)}</h3>
                          <p className="mt-2 text-sm text-[var(--muted)]">{text(item.name)} - {text(item.email)} - {text(item.inquiryType)}</p>
                        </div>
                        <span className="admin-pill rounded-full px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--navy)]">
                          {text(item.status) || 'new'}
                        </span>
                      </div>
                      <p className="mt-5 text-[0.98rem] leading-8 text-[var(--foreground)]">{text(item.message)}</p>
                      <form action={saveAction} className="mt-6 grid gap-4 lg:grid-cols-[14rem_1fr_auto]">
                        <label className="block">
                          <Label>Status</Label>
                          <Select name="status" defaultValue={text(item.status) || 'new'}>
                            <option value="new">Unread</option>
                            <option value="read">Read</option>
                            <option value="archived">Archived</option>
                            <option value="in-review">In Review</option>
                            <option value="closed">Closed</option>
                          </Select>
                        </label>
                        <label className="block">
                          <Label>Internal notes</Label>
                          <Textarea name="internalNotes" rows={3} defaultValue={text(item.internalNotes)} />
                        </label>
                        <div className="flex flex-wrap items-end gap-3">
                          <button className="admin-button-primary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white">Save</button>
                          <button formAction={deleteAction} className="admin-button-secondary rounded-full px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--navy)]">Delete</button>
                        </div>
                      </form>
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : null}

          {section === 'settings' ? (
            <div className="space-y-6">
              <SectionTitle eyebrow="Site Settings" title="Manage public email, social links, SEO, and footer text" />
              <Card>
                <form action={saveSiteSettingsAction} className="grid gap-5">
                  <div className="grid gap-5 lg:grid-cols-2">
                    <label className="block"><Label>Full name</Label><Input name="fullName" defaultValue={fieldValue(siteSettings, 'fullName')} /></label>
                    <label className="block"><Label>Identity line</Label><Input name="identityLine" defaultValue={fieldValue(siteSettings, 'identityLine')} /></label>
                  </div>
                  <label className="block"><Label>Public email</Label><Input name="primaryEmail" type="email" defaultValue={fieldValue(siteSettings, 'primaryEmail')} /></label>
                  <label className="block"><Label>Footer text</Label><Textarea name="footerText" rows={4} defaultValue={fieldValue(siteSettings, 'footerText')} /></label>
                  <div className="grid gap-5 lg:grid-cols-2">
                    <label className="block"><Label>SEO title</Label><Input name="seoTitle" defaultValue={fieldValue(siteSettings, 'seoTitle')} /></label>
                    <label className="block"><Label>SEO description</Label><Textarea name="seoDescription" rows={4} defaultValue={fieldValue(siteSettings, 'seoDescription')} /></label>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-3">
                    <label className="block"><Label>Facebook URL</Label><Input name="facebookUrl" defaultValue={Array.isArray(siteSettingsRecord.socialLinks) ? text((((siteSettingsRecord.socialLinks as Array<Record<string, unknown>>).find((item) => text(item.label) === 'Facebook') ?? {}).url)) : ''} /></label>
                    <label className="block"><Label>Instagram URL</Label><Input name="instagramUrl" defaultValue={Array.isArray(siteSettingsRecord.socialLinks) ? text((((siteSettingsRecord.socialLinks as Array<Record<string, unknown>>).find((item) => text(item.label) === 'Instagram') ?? {}).url)) : ''} /></label>
                    <label className="block"><Label>LinkedIn URL</Label><Input name="linkedinUrl" defaultValue={Array.isArray(siteSettingsRecord.socialLinks) ? text((((siteSettingsRecord.socialLinks as Array<Record<string, unknown>>).find((item) => text(item.label) === 'LinkedIn') ?? {}).url)) : ''} /></label>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-2">
                    <label className="block"><Label>Existing logo</Label><Select name="logoID" defaultValue={relationID(siteSettingsRecord.logo)}><option value="">Keep current</option>{mediaChoices.map((choice) => <option key={String(choice.id)} value={String(choice.id)}>{text(choice.filename) || `Media ${String(choice.id)}`}</option>)}</Select></label>
                    <label className="block"><Label>Upload new logo</Label><Input type="file" name="logoUpload" accept="image/*" /></label>
                  </div>
                  {relationURL(siteSettingsRecord.logo) ? <Image src={relationURL(siteSettingsRecord.logo)} alt="Site logo" width={96} height={96} className="h-24 w-24 rounded-[1rem] object-cover" /> : null}
                  <button className="admin-button-primary w-fit rounded-full px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white">Save Settings</button>
                </form>
              </Card>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  )
}
