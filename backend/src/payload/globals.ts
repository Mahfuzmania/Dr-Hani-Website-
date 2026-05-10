import type { GlobalConfig } from 'payload'

import { canManageStructuredContent } from './access'

const pageAccess = {
  read: () => true,
  update: canManageStructuredContent,
}

export const siteSettingsGlobal: GlobalConfig = {
  slug: 'site-settings',
  access: pageAccess,
  admin: { group: 'Settings' },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    { name: 'identityLine', type: 'text', required: true },
    { name: 'primaryEmail', type: 'email', required: true },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'footerText', type: 'textarea' },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
  ],
}

export const homepageGlobal: GlobalConfig = {
  slug: 'homepage',
  access: pageAccess,
  admin: { group: 'Site Content' },
  fields: [
    { name: 'heroEyebrow', type: 'text' },
    { name: 'heroTitle', type: 'text', required: true },
    { name: 'heroSubtitle', type: 'textarea', required: true },
    { name: 'heroImage', type: 'relationship', relationTo: 'media' },
    { name: 'ctaPrimaryLabel', type: 'text' },
    { name: 'ctaSecondaryLabel', type: 'text' },
    { name: 'biographySummary', type: 'textarea' },
    {
      name: 'identityCards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'sectionVisibility',
      type: 'group',
      fields: [
        { name: 'profile', type: 'checkbox', defaultValue: true },
        { name: 'journey', type: 'checkbox', defaultValue: true },
        { name: 'medicalWork', type: 'checkbox', defaultValue: true },
        { name: 'publicWork', type: 'checkbox', defaultValue: true },
        { name: 'media', type: 'checkbox', defaultValue: true },
        { name: 'updates', type: 'checkbox', defaultValue: true },
        { name: 'contact', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}

export const privacyPageGlobal: GlobalConfig = {
  slug: 'privacy-page',
  access: pageAccess,
  admin: { group: 'Site Content' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}

export const globals: GlobalConfig[] = [siteSettingsGlobal, homepageGlobal, privacyPageGlobal]
