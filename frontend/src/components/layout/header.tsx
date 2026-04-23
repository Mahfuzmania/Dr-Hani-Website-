'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import type { SiteContent } from '../../../../shared/site-content'
import { ChevronDownIcon } from '../branding/elegant-icons'
import { MobileMenu } from './mobile-menu'

export function Header({ settings }: { settings: SiteContent['siteSettings'] }) {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<'services' | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const primaryItems = settings.navigation.filter((item) => item.menu === 'primary')
  const serviceItems = settings.navigation.filter((item) => item.menu === 'services')
  const servicesActive = serviceItems.some((item) => item.href === pathname)

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    window.addEventListener('mousedown', onPointerDown)
    return () => window.removeEventListener('mousedown', onPointerDown)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-6 md:pt-4">
      <div className="glass-nav page-shell flex items-center justify-between gap-6 py-4 md:py-5">
        <Link href="/" className="shrink-0 text-[1.9rem] tracking-[-0.03em] text-[var(--primary)] md:text-[2.08rem]">
          <span className="font-serif">{settings.fullName}</span>
        </Link>
        <nav className="hidden items-center gap-5 2xl:gap-7 xl:flex" ref={dropdownRef}>
          {primaryItems.slice(0, 2).map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b pb-1 text-[0.94rem] font-semibold uppercase tracking-[0.12em] transition-colors 2xl:text-[0.98rem] 2xl:tracking-[0.14em] ${
                  active
                    ? 'border-[rgba(15,28,44,0.22)] text-[var(--primary)]'
                    : 'border-transparent text-[rgba(15,28,44,0.56)] hover:text-[var(--primary)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="relative">
            <button
              type="button"
              className={`inline-flex items-center gap-2 border-b pb-1 text-[0.94rem] font-semibold uppercase tracking-[0.12em] transition-colors 2xl:text-[0.98rem] 2xl:tracking-[0.14em] ${
                servicesActive || openMenu === 'services'
                  ? 'border-[rgba(15,28,44,0.22)] text-[var(--primary)]'
                  : 'border-transparent text-[rgba(15,28,44,0.56)] hover:text-[var(--primary)]'
              }`}
              aria-expanded={openMenu === 'services'}
              onClick={() => setOpenMenu((value) => (value === 'services' ? null : 'services'))}
            >
              <span>Services</span>
              <ChevronDownIcon
                className={`h-3.5 w-3.5 transition-transform ${openMenu === 'services' ? 'rotate-180' : ''}`}
              />
            </button>
            {openMenu === 'services' ? (
              <div className="absolute right-0 top-[calc(100%+0.9rem)] min-w-[15rem] rounded-[1rem] border border-[rgba(15,28,44,0.08)] bg-[rgba(251,249,245,0.96)] p-3 shadow-[0_20px_56px_rgba(15,28,44,0.12)] backdrop-blur-xl">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-[0.8rem] px-4 py-3 text-[0.94rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                      pathname === item.href
                        ? 'bg-[rgba(15,28,44,0.06)] text-[var(--primary)]'
                        : 'text-[rgba(15,28,44,0.64)] hover:bg-[rgba(15,28,44,0.04)] hover:text-[var(--primary)]'
                    }`}
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {primaryItems.slice(2).map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b pb-1 text-[0.94rem] font-semibold uppercase tracking-[0.12em] transition-colors 2xl:text-[0.98rem] 2xl:tracking-[0.14em] ${
                  active
                    ? 'border-[rgba(15,28,44,0.22)] text-[var(--primary)]'
                    : 'border-transparent text-[rgba(15,28,44,0.56)] hover:text-[var(--primary)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="xl:hidden">
          <MobileMenu settings={settings} />
        </div>
      </div>
    </header>
  )
}
