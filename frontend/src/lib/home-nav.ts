export const homepageNavItems = [
  { id: 'profile', label: 'Profile' },
  { id: 'medical-work', label: 'Medical Work' },
  { id: 'public-work', label: 'Public Work' },
  { id: 'media', label: 'Media' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'updates', label: 'Updates' },
  { id: 'contact', label: 'Contact' },
] as const

export const archiveNavItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/media-events', label: 'Media' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/updates', label: 'Updates' },
  { href: '/contact', label: 'Contact' },
] as const

export function getHomeSectionHref(pathname: string, id: string) {
  return pathname === '/' ? `#${id}` : `/#${id}`
}
