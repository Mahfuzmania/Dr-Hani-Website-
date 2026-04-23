import type { GlobalConfig } from 'payload'

import { canManageStructuredContent } from './access'

const textArray = (name: string, label: string) => ({
  name,
  label,
  type: 'array' as const,
  fields: [
    {
      name: 'value',
      type: 'text' as const,
      required: true,
    },
  ],
})

const itemArray = (name: string, label: string) => ({
  name,
  label,
  type: 'array' as const,
  fields: [
    { name: 'title', type: 'text' as const, required: true },
    { name: 'description', type: 'textarea' as const, required: true },
  ],
})

const heroField = {
  name: 'hero',
  type: 'group' as const,
  fields: [
    { name: 'eyebrow', type: 'text' as const },
    { name: 'title', type: 'text' as const, required: true },
    { name: 'summary', type: 'textarea' as const, required: true },
    { name: 'image', type: 'relationship' as const, relationTo: 'media' as const },
  ],
}

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
    { name: 'displayTitle', type: 'text' },
    { name: 'tagline', type: 'text' },
    { name: 'identityLine', type: 'text', required: true },
    { name: 'primaryEmail', type: 'email', required: true },
    { name: 'primaryPhone', type: 'text' },
    {
      name: 'mainProfileImage',
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
  ],
}

export const homepageGlobal: GlobalConfig = {
  slug: 'homepage',
  access: pageAccess,
  admin: { group: 'Site Content' },
  fields: [
    { name: 'heroTitle', type: 'text', required: true },
    { name: 'heroSubtitle', type: 'textarea', required: true },
    { name: 'heroImage', type: 'relationship', relationTo: 'media' },
    itemArray('identityPillars', 'Identity pillars'),
    { name: 'aboutPreview', type: 'textarea' },
    { name: 'missionStatement', type: 'textarea' },
    itemArray('featuredFocusAreas', 'Featured focus areas'),
    itemArray('selectedHighlights', 'Selected highlights'),
    { name: 'closingStatement', type: 'textarea' },
  ],
}

export const aboutPageGlobal: GlobalConfig = {
  slug: 'about-page',
  access: pageAccess,
  admin: { group: 'Site Content' },
  fields: [
    heroField,
    { name: 'biographyIntro', type: 'textarea' },
    textArray('longFormStory', 'Long-form story'),
    itemArray('values', 'Values'),
    {
      name: 'educationItems',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'institution', type: 'text', required: true },
        { name: 'period', type: 'text', required: true },
      ],
    },
    textArray('credentials', 'Credentials'),
    {
      name: 'personalProfileItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}

export const medicalServicePageGlobal: GlobalConfig = {
  slug: 'medical-service-page',
  access: pageAccess,
  admin: { group: 'Site Content' },
  fields: [
    heroField,
    {
      name: 'rolesTimeline',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'period', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    { name: 'internshipSummary', type: 'textarea' },
    textArray('clinicalResponsibilities', 'Clinical responsibilities'),
    textArray('clinicalCompetencies', 'Clinical competencies'),
    { name: 'servicePhilosophy', type: 'textarea' },
  ],
}

export const publicServicePageGlobal: GlobalConfig = {
  slug: 'public-service-page',
  access: pageAccess,
  admin: { group: 'Site Content' },
  fields: [
    heroField,
    { name: 'missionText', type: 'textarea' },
    itemArray('outreachBlocks', 'Outreach blocks'),
    itemArray('communityHealthBlocks', 'Community health blocks'),
    itemArray('socialResponseBlocks', 'Social response blocks'),
    {
      name: 'featuredImages',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}

export const leadershipPageGlobal: GlobalConfig = {
  slug: 'leadership-page',
  access: pageAccess,
  admin: { group: 'Site Content' },
  fields: [
    heroField,
    { name: 'publicPurpose', type: 'textarea' },
    {
      name: 'leadershipTimeline',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'period', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    { name: 'organizationalRole', type: 'textarea' },
    itemArray('speakingRepresentationBlocks', 'Speaking and representation blocks'),
  ],
}

export const mediaEventsPageGlobal: GlobalConfig = {
  slug: 'media-events-page',
  access: pageAccess,
  admin: { group: 'Site Content' },
  fields: [
    heroField,
    { name: 'intro', type: 'textarea' },
    {
      name: 'featuredEventRefs',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
    },
    itemArray('appearanceBlocks', 'Appearance blocks'),
  ],
}

export const contactPageGlobal: GlobalConfig = {
  slug: 'contact-page',
  access: pageAccess,
  admin: { group: 'Site Content' },
  fields: [
    heroField,
    { name: 'intro', type: 'textarea' },
    {
      name: 'contactCards',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    textArray('inquiryTypeOptions', 'Inquiry type options'),
    { name: 'privacyNote', type: 'textarea' },
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

export const globals: GlobalConfig[] = [
  siteSettingsGlobal,
  homepageGlobal,
  aboutPageGlobal,
  medicalServicePageGlobal,
  publicServicePageGlobal,
  leadershipPageGlobal,
  mediaEventsPageGlobal,
  contactPageGlobal,
  privacyPageGlobal,
]
