'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { SiteContent } from '../../../../shared/site-content'
import { MobileMenu } from './mobile-menu'
import { getHomeSectionHref, homepageNavItems, archiveNavItems } from '@/src/lib/home-nav'

export function Header({ settings }: { settings: SiteContent['siteSettings'] }) {
  const pathname = usePathname()
  const onHome = pathname === '/'
  const [activeSection, setActiveSection] = useState<string>('profile')
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 24)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!onHome) return

    const sections = homepageNavItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))

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
        rootMargin: '-20% 0px -54% 0px',
        threshold: [0.18, 0.35, 0.52],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [onHome])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div
        data-top={onHome && atTop ? 'true' : 'false'}
        className="glass-nav mx-auto flex w-full max-w-[92rem] items-center justify-between gap-4 px-4 py-3 md:px-5 md:py-4"
      >
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="micro-accent-dot shrink-0" />
          <div className="min-w-0">
            <p className="truncate font-serif text-[1.35rem] leading-none tracking-[-0.04em] text-[var(--primary-strong)] md:text-[1.85rem]">
              {settings.fullName}
            </p>
            <p className="hidden truncate text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] sm:block">
              Public profile
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex">
          {onHome
            ? homepageNavItems.map((item) => {
                const active = activeSection === item.id

                return (
                  <Link
                    key={item.id}
                    href={getHomeSectionHref(pathname, item.id)}
                    className={`nav-link text-[0.76rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                      active
                        ? 'nav-link-active text-[var(--primary-strong)]'
                        : 'text-[rgba(23,32,51,0.62)] hover:text-[var(--primary-strong)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })
            : archiveNavItems.map((item) => {
                const active = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link text-[0.76rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                      active
                        ? 'nav-link-active text-[var(--primary-strong)]'
                        : 'text-[rgba(23,32,51,0.62)] hover:text-[var(--primary-strong)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
        </nav>
        <div className="hidden xl:block">
          <Link href={getHomeSectionHref(pathname, 'contact')} className="button-primary px-5 py-3">
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
