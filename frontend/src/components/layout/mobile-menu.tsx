'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { SiteContentV2 } from '../../../../shared/site-content-v2'

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

export function MobileMenu({ settings }: { settings: SiteContentV2['siteSettings'] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[0.8rem] border border-[rgba(231,219,194,0.96)] bg-[linear-gradient(180deg,rgba(255,252,246,0.98),rgba(243,236,221,0.94))] text-[var(--navy)] shadow-[0_12px_24px_rgba(8,27,55,0.06),inset_0_0_0_1px_rgba(207,248,251,0.12)]"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <span className="flex flex-col gap-[3px]">
          <span className="h-[2px] w-4 bg-[var(--navy)]" />
          <span className="h-[2px] w-4 bg-[var(--navy)]" />
          <span className="h-[2px] w-4 bg-[var(--navy)]" />
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-[rgba(8,18,34,0.28)] backdrop-blur-sm"
        >
          <div
            className="ml-auto flex h-[100dvh] max-h-[100dvh] w-full max-w-sm flex-col overflow-y-auto overscroll-contain rounded-l-[1rem] border-l border-[rgba(231,219,194,0.96)] bg-[linear-gradient(180deg,rgba(251,247,239,0.98),rgba(243,236,221,0.96))] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.5rem+env(safe-area-inset-top))] shadow-[0_28px_70px_rgba(8,27,55,0.14)] sm:px-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Navigation
                </p>
                <p className="mt-3 font-serif text-[1.65rem] leading-none text-[var(--navy)] sm:text-[2rem]">
                  {settings.fullName}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[0.8rem] border border-[rgba(231,219,194,0.96)] bg-[linear-gradient(180deg,rgba(255,252,246,0.98),rgba(243,236,221,0.94))] text-[var(--navy)] shadow-[0_12px_24px_rgba(8,27,55,0.06),inset_0_0_0_1px_rgba(207,248,251,0.12)]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <span className="text-xl leading-none">X</span>
              </button>
            </div>

            <nav
              className="mt-7 space-y-2 sm:mt-10"
            >
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={sectionHref(pathname, item.id)}
                  className="block rounded-[0.85rem] border border-[rgba(231,219,194,0.96)] bg-[linear-gradient(180deg,rgba(255,252,246,0.98),rgba(243,236,221,0.94))] px-4 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[var(--navy)] shadow-[inset_0_0_0_1px_rgba(207,248,251,0.12)] sm:py-3 sm:text-[0.84rem] sm:tracking-[0.14em]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-7 rounded-[1rem] border border-[rgba(231,219,194,0.96)] bg-[linear-gradient(180deg,rgba(255,252,246,0.98),rgba(243,236,221,0.94))] p-4 shadow-[inset_0_0_0_1px_rgba(207,248,251,0.12)] sm:mt-10 sm:p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Public Email
              </p>
              <a href={`mailto:${settings.primaryEmail}`} className="mt-3 block break-all font-serif text-[1rem] italic leading-6 text-[var(--navy)] sm:text-[1.2rem]">
                {settings.primaryEmail}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
