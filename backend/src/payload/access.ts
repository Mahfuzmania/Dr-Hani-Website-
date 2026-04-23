import type { Access, CollectionConfig } from 'payload'

export const roles = [
  'super-admin',
  'content-admin',
  'editor',
  'media-manager',
  'inquiry-manager',
  'reviewer',
] as const

export type Role = (typeof roles)[number]

type UserWithRole = {
  role?: Role
}

const getRole = (user: unknown): Role | undefined => {
  if (!user || typeof user !== 'object') return undefined
  return (user as UserWithRole).role
}

export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

export const isSuperAdmin: Access = ({ req }) => getRole(req.user) === 'super-admin'

export const canManageStructuredContent: Access = ({ req }) => {
  const role = getRole(req.user)
  return role === 'super-admin' || role === 'content-admin'
}

export const canCreateDrafts: Access = ({ req }) => {
  const role = getRole(req.user)
  return role === 'super-admin' || role === 'content-admin' || role === 'editor'
}

export const canManageMedia: Access = ({ req }) => {
  const role = getRole(req.user)
  return role === 'super-admin' || role === 'content-admin' || role === 'media-manager'
}

export const canManageInquiries: Access = ({ req }) => {
  const role = getRole(req.user)
  return role === 'super-admin' || role === 'inquiry-manager' || role === 'content-admin'
}

export const canReadForReview: Access = ({ req }) => {
  const role = getRole(req.user)
  return Boolean(
    role &&
      [
        'super-admin',
        'content-admin',
        'editor',
        'media-manager',
        'inquiry-manager',
        'reviewer',
      ].includes(role),
  )
}

export const denyAll: Access = () => false

export const draftVersionConfig: NonNullable<CollectionConfig['versions']> = {
  drafts: {
    autosave: {
      interval: 200,
    },
    schedulePublish: true,
  },
  maxPerDoc: 30,
}
