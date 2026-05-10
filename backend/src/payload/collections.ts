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

const galleryCategories = [
  { label: 'Medical', value: 'medical' },
  { label: 'Community', value: 'community' },
  { label: 'Events', value: 'events' },
  { label: 'Leadership', value: 'leadership' },
]

const statusField = (name = 'status'): Field => ({
  name,
  type: 'select',
  defaultValue: 'draft',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
  ],
})

const imageRelationshipField = (name: string, label: string): Field => ({
  name,
  label,
  type: 'relationship',
  relationTo: 'media',
})

export const usersCollection: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    group: 'Users & Access',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
  },
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
    group: 'Assets',
    defaultColumns: ['filename', 'category', 'updatedAt'],
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'hero', width: 1600, height: 1100, fit: 'cover' },
      { name: 'card', width: 960, height: 720, fit: 'cover' },
      { name: 'thumb', width: 640, height: 480, fit: 'cover' },
    ],
  },
  fields: [
    { name: 'altText', type: 'text', required: true },
    { name: 'caption', type: 'textarea' },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: galleryCategories,
      defaultValue: 'events',
    },
  ],
}

export const galleryItemsCollection: CollectionConfig = {
  slug: 'gallery-items',
  access: {
    read: () => true,
    create: canManageMedia,
    update: canManageMedia,
    delete: canManageMedia,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'sortOrder', 'status'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    imageRelationshipField('image', 'Image'),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: galleryCategories,
      defaultValue: 'events',
    },
    { name: 'caption', type: 'textarea' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    statusField(),
  ],
}

export const mediaItemsCollection: CollectionConfig = {
  slug: 'media-items',
  versions: draftVersionConfig,
  access: {
    read: () => true,
    create: canCreateDrafts,
    update: canCreateDrafts,
    delete: canManageStructuredContent,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'category', 'featuredOnHomepage', 'status'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'video',
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Image', value: 'image' },
        { label: 'Article', value: 'article' },
      ],
    },
    imageRelationshipField('thumbnail', 'Thumbnail'),
    { name: 'mediaUrl', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: galleryCategories,
      defaultValue: 'events',
    },
    { name: 'featuredOnHomepage', type: 'checkbox', defaultValue: false },
    { name: 'sourceLink', type: 'text' },
    statusField(),
  ],
}

export const updatesCollection: CollectionConfig = {
  slug: 'updates',
  versions: draftVersionConfig,
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishDate', 'featured', 'pinned', 'status'],
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
    { name: 'bodyText', type: 'textarea', required: true },
    imageRelationshipField('coverImage', 'Cover image'),
    { name: 'category', type: 'text', required: true },
    { name: 'publishDate', type: 'date', required: true },
    { name: 'sourceLink', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'pinned', type: 'checkbox', defaultValue: false },
    statusField(),
  ],
}

export const importantNoticesCollection: CollectionConfig = {
  slug: 'important-notices',
  versions: draftVersionConfig,
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'pinned', 'startDate', 'expiryDate', 'status'],
  },
  access: {
    read: () => true,
    create: canCreateDrafts,
    update: canCreateDrafts,
    delete: canManageStructuredContent,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'category', type: 'text', required: true },
    { name: 'startDate', type: 'date' },
    { name: 'expiryDate', type: 'date' },
    { name: 'pinned', type: 'checkbox', defaultValue: false },
    statusField(),
  ],
}

export const positionsCollection: CollectionConfig = {
  slug: 'positions',
  versions: draftVersionConfig,
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'organization', 'period', 'featured', 'sortOrder', 'status'],
  },
  access: {
    read: () => true,
    create: canCreateDrafts,
    update: canCreateDrafts,
    delete: canManageStructuredContent,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'organization', type: 'text', required: true },
    { name: 'branch', type: 'text' },
    { name: 'period', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    imageRelationshipField('image', 'Source or role image'),
    {
      name: 'sourceType',
      type: 'select',
      required: true,
      defaultValue: 'document',
      options: [
        { label: 'Document', value: 'document' },
        { label: 'News', value: 'news' },
        { label: 'Public record', value: 'public-record' },
        { label: 'Internal source', value: 'internal' },
      ],
    },
    { name: 'sourceNote', type: 'textarea' },
    { name: 'sourceLink', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    statusField(),
  ],
}

export const eventsCollection: CollectionConfig = {
  slug: 'events',
  versions: draftVersionConfig,
  admin: {
    group: 'Legacy',
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
    { name: 'summary', type: 'textarea', required: true },
    { name: 'category', type: 'text', required: true },
    imageRelationshipField('coverImage', 'Cover image'),
    statusField(),
  ],
}

export const contactInquiriesCollection: CollectionConfig = {
  slug: 'contact-inquiries',
  timestamps: true,
  admin: {
    group: 'Inbox',
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'inquiryType', 'status', 'createdAt'],
  },
  access: {
    read: canManageInquiries,
    create: () => false,
    update: canManageInquiries,
    delete: canManageInquiries,
  },
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
        { label: 'Unread', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Archived', value: 'archived' },
        { label: 'In Review', value: 'in-review' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'internalNotes',
      type: 'textarea',
    },
  ],
}

export const collections: CollectionConfig[] = [
  usersCollection,
  mediaCollection,
  galleryItemsCollection,
  mediaItemsCollection,
  updatesCollection,
  importantNoticesCollection,
  positionsCollection,
  eventsCollection,
  contactInquiriesCollection,
]
