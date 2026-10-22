'use server'

import { revalidatePath } from 'next/cache'
import { getAdminSession } from '../../lib/admin-auth'
import { publicationSchema } from '../../../../shared/publication-contract'
import { readPublicationSources } from '../../lib/publication-form'

export async function savePublicationAction(
  _previous: { message: string; success: boolean },
  form: FormData,
) {
  const { payload, req, user } = await getAdminSession('/admin/publications')
  if (!user) return { message: 'Sign in before saving publications.', success: false }
  const value = (name: string) => String(form.get(name) || '').trim()
  const sources = readPublicationSources(form)
  const parsed = publicationSchema.safeParse({
    id: value('externalId'),
    kind: value('kind'),
    title: value('title'),
    summary: value('summary'),
    topics: value('topics')
      .split(',')
      .map((topic) => topic.trim())
      .filter(Boolean),
    sources,
    relatedActivity: value('relatedActivity') || undefined,
    image: value('imagePath') || undefined,
    featured: form.get('featured') === 'on',
    status: value('status'),
  })
  if (!parsed.success)
    return { message: parsed.error.issues[0]?.message || 'Check the publication fields.', success: false }
  const role = (user as { role?: string }).role
  if (parsed.data.status === 'published' && role !== 'super-admin' && role !== 'content-admin')
    return { message: 'A content administrator must publish this entry.', success: false }
  const { id: externalId, image, ...entry } = parsed.data
  const data = {
    ...entry,
    _status: entry.status,
    externalId,
    imagePath: image || null,
    relatedActivity: entry.relatedActivity || null,
    sources: sources.map((source) => ({
      ...source,
      publishedAt: source.publishedAt || null,
      dateLabel: source.dateLabel || null,
    })),
    topics: entry.topics.map((label) => ({ label })),
    verificationNotes: value('verificationNotes'),
  }
  try {
    // Persist visibility on the main document; draft:true would leave a previously
    // published version public when the administrator chooses to unpublish it.
    const options = { collection: 'publications', data, req, overrideAccess: false, draft: false }
    if (value('recordId')) await payload.update({ ...options, id: value('recordId') })
    else await payload.create(options)
    revalidatePath('/admin/publications')
    return {
      message:
        entry.status === 'published'
          ? 'Publication saved. Public pages refresh within five minutes.'
          : 'Draft saved. It is excluded from public pages.',
      success: true,
    }
  } catch (error) {
    console.error('Publication save failed', error)
    return {
      message:
        'The entry could not be saved. Check your permissions and the unique archive ID, then try again.',
      success: false,
    }
  }
}
