export async function createIfMissing<T>(
  key: string,
  find: (key: string) => Promise<boolean>,
  create: () => Promise<T>,
) {
  if (await find(key)) return { created: false }
  await create()
  return { created: true }
}
import type { Payload } from 'payload'

export async function archiveSupersededArticle(payload: Pick<Payload, 'find' | 'update'>) {
  const replacement = await payload.find({
    collection: 'publications',
    where: {
      and: [
        { externalId: { equals: 'reserved-seat-nomination-press' } },
        { status: { equals: 'published' } },
        { _status: { equals: 'published' } },
      ],
    },
    limit: 1,
  })
  if (!replacement.docs.length) return 0
  const legacy = await payload.find({
    collection: 'media-items',
    where: {
      and: [
        { type: { equals: 'article' } },
        { mediaUrl: { equals: 'https://www.jagonews24.com/politics/news/1109481' } },
        { status: { equals: 'published' } },
      ],
    },
  })
  for (const doc of legacy.docs)
    await payload.update({
      collection: 'media-items',
      id: doc.id,
      draft: false,
      data: { status: 'draft', _status: 'draft' },
    })
  return legacy.docs.length
}
