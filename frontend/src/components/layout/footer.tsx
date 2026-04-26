import Link from 'next/link'

import type { SiteContent } from '../../../../shared/site-content'
import { SocialIcon } from '../branding/social-icon'
import { homepageNavItems } from '@/src/lib/home-nav'

const adminUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'}/admin`

export function Footer({ settings }: { settings: SiteContent['siteSettings'] }) {
  return (
    <footer className="border-t border-[rgba(8,32,68,0.06)] bg-[rgba(255,255,255,0.34)]">
      <div className="page-shell py-10 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-serif text-[2rem] italic text-[var(--primary-strong)]">{settings.fullName}</p>
            <p className="mt-3 text-[0.95rem] leading-8 text-[var(--muted)]">
              A composed public profile connecting medical work, women-centered care, and documented community presence.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {homepageNavItems.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[rgba(23,32,51,0.62)] transition-colors hover:text-[var(--primary-strong)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="ghost-line mt-8 flex flex-col gap-5 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {settings.socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(8,32,68,0.08)] bg-[rgba(255,255,255,0.5)] px-3 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-[var(--primary-strong)] transition-colors hover:border-[rgba(245,197,66,0.4)]"
              >
                <span className="icon-chip h-8 w-8">
                  <SocialIcon label={item.label} className="h-4 w-4" />
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[rgba(23,32,51,0.48)]">
            <a href={`mailto:${settings.primaryEmail}`} className="transition-colors hover:text-[var(--primary-strong)]">
              {settings.primaryEmail}
            </a>
            <a href={adminUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--primary-strong)]">
              Admin
            </a>
            <span>© Dr Umma Hani</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
