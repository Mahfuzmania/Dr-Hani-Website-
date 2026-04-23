'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { SiteContent } from '../../../../shared/site-content'
import { ArrowUpRightIcon, CloseIcon, MailIcon, MenuIcon } from '../branding/elegant-icons'
import { SocialIcon } from '../branding/social-icon'

export function MobileMenu({ settings }: { settings: SiteContent['siteSettings'] }) {
  const [open, setOpen] = useState(false)
  const primaryItems = settings.navigation.filter((item) => item.menu === 'primary')
  const serviceItems = settings.navigation.filter((item) => item.menu === 'services')

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
        className="inline-flex items-center text-[var(--primary)]"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
      >
        <MenuIcon className="h-5 w-5" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-[rgba(15,28,44,0.18)] backdrop-blur-sm">
          <div
            id="mobile-nav"
            className="ml-auto flex min-h-screen w-full max-w-sm flex-col rounded-l-[1.35rem] bg-[var(--surface)] px-6 pb-10 pt-6 shadow-[0_24px_64px_rgba(15,28,44,0.16)] sm:max-w-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Navigation</p>
                <p className="mt-4 font-serif text-[2.45rem] leading-none text-[var(--primary)]">
                  {settings.fullName}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex text-[var(--primary)]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-10">
              <p className="text-[0.88rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
                Main pages
              </p>
            </div>
            <nav className="mt-5 space-y-3">
              {primaryItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-[0.95rem] px-3 py-3 text-[0.98rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.78)] transition-colors hover:bg-[rgba(15,28,44,0.04)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="ghost-line mt-8 pt-8">
              <p className="text-[0.88rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
                Services
              </p>
            </div>
            <nav className="mt-5 space-y-2">
              {serviceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-[0.95rem] px-3 py-3 text-[0.96rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.68)] transition-colors hover:bg-[rgba(15,28,44,0.04)] hover:text-[var(--primary)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="ghost-line mt-10 pt-8">
              <p className="eyebrow">Public contact</p>
              <a
                href={`mailto:${settings.primaryEmail}`}
                className="mt-4 inline-flex items-center gap-3 font-serif text-[1.22rem] italic text-[var(--primary)]"
              >
                <span className="icon-chip h-8 w-8">
                  <MailIcon className="h-4 w-4 text-[rgba(15,28,44,0.48)]" />
                </span>
                <span>{settings.primaryEmail}</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="ghost-line mt-8 pt-8">
              <p className="eyebrow">Social presence</p>
              <div className="mt-4 flex flex-col gap-3 text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.56)]">
                {settings.socialLinks.map((item) => {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3"
                    >
                      <span className="icon-chip h-8 w-8">
                        <SocialIcon label={item.label} className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
