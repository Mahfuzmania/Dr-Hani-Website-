import Image from 'next/image'

import type { SiteContentV2 } from '../../../../shared/site-content-v2'
import { SocialIcon } from '../branding/social-icon'
import { FadeUp, StaggerGroup, StaggerItem } from '../motion/reveal'

export function Footer({ settings }: { settings: SiteContentV2['siteSettings'] }) {
  return (
    <footer className="border-t border-[rgba(231,219,194,0.92)] bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,249,238,0.22))]">
      <div className="page-shell py-12">
        <FadeUp>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-serif text-[2rem] tracking-[-0.04em] text-[var(--navy)]">{settings.fullName}</p>
            <p className="mt-3 text-[0.96rem] leading-8 text-[var(--muted)]">{settings.identityLine}</p>
          </div>
          <StaggerGroup className="flex flex-wrap gap-3">
            {settings.socialLinks.map((item) => (
              <StaggerItem key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="premium-chip inline-flex items-center gap-2 px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[var(--navy)]"
              >
                <SocialIcon label={item.label} />
                {item.label}
              </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
        </FadeUp>
        <div className="mt-8 flex flex-col gap-5 border-t border-[rgba(8,32,68,0.08)] pt-6 lg:flex-row lg:items-center lg:justify-between">
          <a href={`mailto:${settings.primaryEmail}`} className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {settings.primaryEmail}
          </a>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
            <p className="max-w-2xl text-[0.8rem] text-[var(--muted)]">{settings.footerText}</p>
            <a
              href="https://azmlabsbd.com"
              target="_blank"
              rel="noreferrer"
              className="premium-chip inline-flex w-fit items-center gap-1.5 px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[var(--navy)]"
              aria-label="Developed by AZM Labs"
            >
              <span className="text-[var(--muted)]">Developed by</span>
              <Image
                src="/branding/azm-labs-logo.png"
                alt="AZM Labs"
                width={20}
                height={20}
                className="h-4 w-4 rounded-[0.2rem] object-contain"
              />
              <span className="tracking-[0.08em]">
                <span className="text-[#168a43]">AZM</span> Labs
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
