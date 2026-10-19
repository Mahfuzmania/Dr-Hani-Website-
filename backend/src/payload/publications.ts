import type { CollectionConfig, Where } from 'payload'
import { APIError } from 'payload'
import { canCreateDrafts, canManageStructuredContent, draftVersionConfig } from './access'

const publishedOnly: Where = {
  and: [{ status: { equals: 'published' } }, { _status: { equals: 'published' } }],
}

export const publicationsCollection: CollectionConfig = {
  slug: 'publications',
  versions: draftVersionConfig,
  admin: { group: 'Content', useAsTitle: 'title', defaultColumns: ['title', 'kind', 'status', 'featured'] },
  access: {
    read: ({ req }) => (req.user ? true : publishedOnly),
    create: canCreateDrafts,
    update: canCreateDrafts,
    delete: canManageStructuredContent,
  },
  hooks: {
    beforeChange: [
      ({ data, req, originalDoc }) => {
        const role = (req.user as { role?: string } | null)?.role
        const publisher =
          role === 'super-admin' || role === 'content-admin' || req.context.editorialImport === true
        if (
          !publisher &&
          (data.status === 'published' || data._status === 'published' || originalDoc?.status === 'published')
        ) {
          throw new APIError('A content administrator must publish or revise published work.', 403)
        }
        if (data._status === 'draft' || data._status === 'published') data.status = data._status
        return data
      },
    ],
  },
  fields: [
    { name: 'externalId', type: 'text', unique: true, index: true, required: true },
    { name: 'kind', type: 'select', required: true, options: ['essay', 'report'] },
    { name: 'title', type: 'text', required: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'topics', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    {
      name: 'sources',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'publisher', type: 'text', required: true },
        {
          name: 'url',
          type: 'text',
          required: true,
          validate: (value: unknown) => {
            try {
              return new URL(String(value)).protocol === 'https:' || 'Use an HTTPS publisher URL.'
            } catch {
              return 'Enter a valid publisher URL.'
            }
          },
        },
        { name: 'byline', type: 'text', required: true },
        { name: 'publishedAt', type: 'date' },
        {
          name: 'dateLabel',
          type: 'text',
          admin: { description: 'Use a month/year only when an exact publication date is unavailable.' },
        },
      ],
    },
    { name: 'image', type: 'relationship', relationTo: 'media' },
    {
      name: 'imagePath',
      type: 'text',
      admin: { description: 'Optional bundled media path for imported material.' },
    },
    {
      name: 'relatedActivity',
      type: 'text',
      admin: { description: 'Slug of the related activity in Updates.' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: ['draft', 'published'],
    },
    { name: 'verificationNotes', type: 'textarea', access: { read: ({ req }) => Boolean(req.user) } },
  ],
}
