'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SiteContentV2 } from '../../../../shared/site-content-v2'
import { MobileMenu } from './mobile-menu'
import { navigation } from './navigation'
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'

export function Header({
  settings,
}: {
  settings: SiteContentV2['siteSettings']
}) {
  const pathname = usePathname()
  return (
    <header className="site-header">
      <div className="portfolio-navigation">
        <Link href="/" className="portfolio-brand min-w-0">
          <p className="truncate font-serif text-[1.5rem] leading-none text-[var(--navy)] md:text-[1.8rem]">
            {settings.fullName}
          </p>
          <span>Medicine · Writing · Public life</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 xl:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className="nav-link text-[0.82rem] font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          className="button-primary header-contact hidden xl:inline-flex"
          href="/#contact"
        >
          Contact
          <ArrowUpRightIcon size={16} aria-hidden="true" />
        </Link>
        <div className="xl:hidden">
          <MobileMenu settings={settings} />
        </div>
      </div>
    </header>
  )
}
