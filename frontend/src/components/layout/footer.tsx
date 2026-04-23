import Image from 'next/image'
import Link from 'next/link'

import type { SiteContent } from '../../../../shared/site-content'
import { ArrowUpRightIcon } from '../branding/elegant-icons'
import { SocialIcon } from '../branding/social-icon'

export function Footer({ settings }: { settings: SiteContent['siteSettings'] }) {
  const primaryItems = settings.navigation.filter((item) => item.menu === 'primary')
  const serviceItems = settings.navigation.filter((item) => item.menu === 'services')
  const footerItems = settings.navigation.filter((item) => item.menu === 'footer')

  return (
    <footer className="mt-16 border-t border-[rgba(15,28,44,0.05)] bg-[var(--surface)]">
      <div className="page-shell py-16 md:py-20">
        <div className="grid gap-12 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-serif text-[2rem] italic text-[var(--primary)]">{settings.fullName}</p>
            <p className="mt-4 max-w-xl text-[1.08rem] leading-8 text-[rgba(15,28,44,0.66)]">
              {settings.footerText}
            </p>
            <a
              href="https://azmlabsbd.com"
              target="_blank"
              rel="noreferrer"
              className="panel-soft mt-6 inline-flex items-center gap-3 px-5 py-4 transition-transform hover:-translate-y-0.5"
            >
              <p className="text-[0.92rem] font-semibold text-[rgba(15,28,44,0.54)]">Developed by</p>
              <div className="relative h-10 w-10 overflow-hidden rounded-[0.9rem] bg-[rgba(15,28,44,0.06)]">
                <Image
                  src="/branding/azm-labs-logo.png"
                  alt="Azm Labs"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="font-serif text-[1.18rem] italic text-[var(--primary)]">Azm Labs</span>
              <ArrowUpRightIcon className="h-4 w-4 text-[rgba(15,28,44,0.46)]" />
            </a>
          </div>
          <div className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="text-[0.84rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.42)]">
                  Pages
                </p>
                <div className="mt-4 space-y-3">
                  {primaryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.56)] transition-colors hover:text-[var(--primary)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[0.84rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.42)]">
                  Services
                </p>
                <div className="mt-4 space-y-3">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.56)] transition-colors hover:text-[var(--primary)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[0.84rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.42)]">
                  Privacy
                </p>
                <div className="mt-4 space-y-3">
                  {footerItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.56)] transition-colors hover:text-[var(--primary)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-[0.94rem] font-semibold uppercase tracking-[0.11em] text-[rgba(15,28,44,0.54)]">
              {settings.socialLinks.map((item) => {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,28,44,0.08)] bg-[rgba(255,255,255,0.45)] px-3 py-2 transition-colors hover:border-[rgba(15,28,44,0.16)] hover:text-[var(--primary)]"
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
        <p className="mt-12 text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.38)]">
          Medical service, public leadership, and a carefully composed record of community life.
        </p>
      </div>
    </footer>
  )
}
