'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { SiteContent } from '../../../../shared/site-content'
import { ArrowUpRightIcon, CloseIcon, MailIcon, MenuIcon } from '../branding/elegant-icons'
import { SocialIcon } from '../branding/social-icon'
import { archiveNavItems, getHomeSectionHref, homepageNavItems } from '@/src/lib/home-nav'

export function MobileMenu({ settings }: { settings: SiteContent['siteSettings'] }) {
  const pathname = usePathname()
  const onHome = pathname === '/'
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(8,32,68,0.08)] bg-[rgba(255,255,255,0.58)] text-[var(--primary-strong)]"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
      >
        <MenuIcon className="h-5 w-5" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(7,17,33,0.34)] backdrop-blur-sm">
          <div
            id="mobile-nav"
            className="ml-auto flex min-h-screen w-full max-w-sm flex-col overflow-y-auto rounded-l-[1.8rem] border-l border-[rgba(232,222,201,0.86)] bg-[linear-gradient(180deg,rgba(252,250,246,0.98),rgba(247,244,238,0.97))] px-6 pb-10 pt-6 shadow-[0_28px_70px_rgba(8,32,68,0.16)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Navigation</p>
                <p className="mt-4 font-serif text-[2.1rem] leading-none text-[var(--primary-strong)]">
                  {settings.fullName}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(8,32,68,0.08)] bg-[rgba(255,255,255,0.58)] text-[var(--primary-strong)]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-10">
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {onHome ? 'Homepage sections' : 'Pages'}
              </p>
            </div>
            <nav className="mt-4 space-y-2">
              {onHome
                ? homepageNavItems.map((item) => (
                    <Link
                      key={item.id}
                      href={getHomeSectionHref(pathname, item.id)}
                      className="block rounded-[1rem] border border-transparent bg-[rgba(255,255,255,0.56)] px-4 py-3 text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-[rgba(23,32,51,0.82)] transition-colors hover:border-[rgba(232,222,201,0.9)]"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))
                : archiveNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-[1rem] border border-transparent bg-[rgba(255,255,255,0.56)] px-4 py-3 text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-[rgba(23,32,51,0.82)] transition-colors hover:border-[rgba(232,222,201,0.9)]"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
            </nav>
            <div className="ghost-line mt-8 pt-8">
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Public contact
              </p>
              <a
                href={`mailto:${settings.primaryEmail}`}
                className="mt-4 inline-flex items-center gap-3 font-serif text-[1.08rem] italic text-[var(--primary-strong)]"
              >
                <span className="icon-chip h-8 w-8">
                  <MailIcon className="h-4 w-4 text-[rgba(8,32,68,0.52)]" />
                </span>
                <span className="break-all">{settings.primaryEmail}</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </div>
            {settings.socialLinks.length ? (
              <div className="ghost-line mt-8 pt-8">
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Social presence
                </p>
                <div className="mt-4 flex flex-col gap-3 text-[0.86rem] font-semibold uppercase tracking-[0.12em] text-[rgba(23,32,51,0.68)]">
                  {settings.socialLinks.map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3">
                      <span className="icon-chip h-8 w-8">
                        <SocialIcon label={item.label} className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
