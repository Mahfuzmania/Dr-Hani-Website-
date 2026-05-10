'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { SiteContentV2 } from '../../../../shared/site-content-v2'
import { MobileMenu } from './mobile-menu'

const items = [
  { id: 'profile', label: 'Profile' },
  { id: 'journey', label: 'Journey' },
  { id: 'medical-work', label: 'Medical Work' },
  { id: 'public-work', label: 'Public Work' },
  { id: 'media', label: 'Media' },
  { id: 'updates', label: 'Updates' },
  { id: 'contact', label: 'Contact' },
] as const

function sectionHref(pathname: string, id: string) {
  return pathname === '/' ? `#${id}` : `/#${id}`
}

export function Header({ settings }: { settings: SiteContentV2['siteSettings'] }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [atTop, setAtTop] = useState(true)
  const [activeSection, setActiveSection] = useState('profile')

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 16)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((item): item is HTMLElement => Boolean(item))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        rootMargin: '-22% 0px -52% 0px',
        threshold: [0.2, 0.35, 0.5],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5"
    >
      <div
        data-top={isHome && atTop ? 'true' : 'false'}
        className="glass-nav mx-auto flex w-full max-w-[92rem] min-w-0 items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-5 md:py-4"
      >
        <Link href="/" className="flex min-w-0 max-w-[calc(100%-3.5rem)] items-center gap-3">
          <span className="h-10 w-[3px] shrink-0 bg-[linear-gradient(180deg,var(--gold-soft),var(--sky))]" />
          <div className="min-w-0">
            <p className="truncate font-serif text-[1.28rem] leading-none tracking-[-0.04em] text-[var(--navy)] md:text-[1.8rem]">
              {settings.fullName}
            </p>
            <p className="hidden truncate text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] sm:block">
              Public Profile
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {items.map((item) => (
            <Link
              key={item.id}
              href={sectionHref(pathname, item.id)}
              data-active={isHome && activeSection === item.id ? 'true' : 'false'}
              className="nav-link text-[0.75rem] font-semibold uppercase tracking-[0.17em]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link href={sectionHref(pathname, 'contact')} className="button-primary nav-pill text-[0.76rem] font-semibold uppercase tracking-[0.16em]">
            Contact
          </Link>
        </div>

        <div className="xl:hidden">
          <MobileMenu settings={settings} />
        </div>
      </div>
    </header>
  )
}
