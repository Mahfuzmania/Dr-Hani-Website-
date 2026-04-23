import type { CollectionConfig, Field } from 'payload'

import {
  canCreateDrafts,
  canManageInquiries,
  canManageMedia,
  canManageStructuredContent,
  canReadForReview,
  draftVersionConfig,
  roles,
} from './access'

const seoFields = (): Field[] => [
  {
    name: 'seo',
    type: 'group',
    fields: [
      {
        name: 'title',
        label: 'SEO title',
        type: 'text',
      },
      {
        name: 'description',
        label: 'SEO description',
        type: 'textarea',
      },
    ],
  },
]

const imageRelationshipField = (name: string, label: string): Field => ({
  name,
  label,
  type: 'relationship',
  relationTo: 'media',
})

const baseStatusFields: Field[] = [
  {
    name: 'status',
    type: 'select',
    defaultValue: 'draft',
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' },
    ],
  },
  {
    name: 'featured',
    type: 'checkbox',
    defaultValue: false,
  },
]

export const usersCollection: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Users & Access',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
  },
  auth: true,
  access: {
    read: canReadForReview,
    create: canManageStructuredContent,
    update: canManageStructuredContent,
    delete: canManageStructuredContent,
    admin: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: roles.map((role) => ({
        label: role,
        value: role,
      })),
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  ],
}

export const mediaCollection: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: canManageMedia,
    update: canManageMedia,
    delete: canManageMedia,
  },
  admin: {
    group: 'Media',
    defaultColumns: ['filename', 'category', 'approvedForHero', 'approvedForGallery'],
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'hero', width: 1600, height: 1100, fit: 'cover' },
      { name: 'card', width: 960, height: 720, fit: 'cover' },
    ],
  },
  fields: [
    { name: 'altText', type: 'text', required: true },
    { name: 'caption', type: 'textarea' },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Medical Service', value: 'medical-service' },
        { label: 'Community Outreach', value: 'community-outreach' },
        { label: 'Events', value: 'events' },
        { label: 'Leadership', value: 'leadership' },
      ],
      required: true,
    },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'approvedForHero', type: 'checkbox', defaultValue: false },
    { name: 'approvedForGallery', type: 'checkbox', defaultValue: true },
  ],
}

export const updatesCollection: CollectionConfig = {
  slug: 'updates',
  versions: draftVersionConfig,
  admin: {
    group: 'Dynamic Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishDate', 'status'],
  },
  access: {
    read: () => true,
    create: canCreateDrafts,
    update: canCreateDrafts,
    delete: canManageStructuredContent,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'summary', type: 'textarea', required: true },
    imageRelationshipField('coverImage', 'Cover image'),
    { name: 'content', type: 'richText' },
    { name: 'category', type: 'text', required: true },
    { name: 'publishDate', type: 'date', required: true },
    ...baseStatusFields,
    ...seoFields(),
  ],
}

export const eventsCollection: CollectionConfig = {
  slug: 'events',
  versions: draftVersionConfig,
  admin: {
    group: 'Dynamic Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'category', 'status'],
  },
  access: {
    read: () => true,
    create: canCreateDrafts,
    update: canCreateDrafts,
    delete: canManageStructuredContent,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'date', type: 'date', required: true },
    { name: 'venue', type: 'text' },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'content', type: 'richText' },
    imageRelationshipField('coverImage', 'Cover image'),
    {
      name: 'galleryImages',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    { name: 'category', type: 'text', required: true },
    ...baseStatusFields,
    ...seoFields(),
  ],
}

export const galleryItemsCollection: CollectionConfig = {
  slug: 'gallery-items',
  admin: {
    group: 'Media',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'visibility'],
  },
  access: {
    read: () => true,
    create: canManageMedia,
    update: canManageMedia,
    delete: canManageMedia,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    imageRelationshipField('image', 'Image'),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Medical Service', value: 'medical-service' },
        { label: 'Community Outreach', value: 'community-outreach' },
        { label: 'Events', value: 'events' },
        { label: 'Leadership', value: 'leadership' },
      ],
    },
    { name: 'caption', type: 'textarea' },
    {
      name: 'relatedEvent',
      type: 'relationship',
      relationTo: 'events',
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    {
      name: 'visibility',
      type: 'select',
      defaultValue: 'public',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Hidden', value: 'hidden' },
      ],
    },
  ],
}

export const contactInquiriesCollection: CollectionConfig = {
  slug: 'contact-inquiries',
  admin: {
    group: 'Inquiries',
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'inquiryType', 'status', 'createdAt'],
  },
  access: {
    read: canManageInquiries,
    create: () => false,
    update: canManageInquiries,
    delete: canManageInquiries,
  },
  timestamps: true,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'inquiryType', type: 'text', required: true },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Review', value: 'in-review' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        description: 'Visible to inquiry managers only.',
      },
    },
  ],
}

export const collections: CollectionConfig[] = [
  usersCollection,
  mediaCollection,
  updatesCollection,
  eventsCollection,
  galleryItemsCollection,
  contactInquiriesCollection,
]
