import Image from 'next/image'
import Link from 'next/link'
import type { SiteContentV2 } from '../../../../shared/site-content-v2'
import { SocialIcon } from '../branding/social-icon'
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'

export function Footer({
  settings,
}: {
  settings: SiteContentV2['siteSettings']
}) {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-main">
          <div>
            <Link href="/" className="footer-name">
              {settings.fullName}
            </Link>
            <p>{settings.identityLine}</p>
          </div>
          <div className="footer-social-links" aria-label="Social profiles">
            {settings.socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon label={item.label} />
                {item.label}
                <Arrow />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-navigation-row">
          <a className="footer-email" href={`mailto:${settings.primaryEmail}`}>
            {settings.primaryEmail}
          </a>
          <nav aria-label="Footer navigation" className="site-footer-links">
            <Link href="/about">Biography</Link>
            <Link href="/writing">Writing</Link>
            <Link href="/media-events">Press & interviews</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/updates">Updates</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>{settings.footerText}</p>
          <a
            href="https://azmlabsbd.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Developed by AZM Labs"
          >
            <span>Developed by</span>
            <Image
              src="/branding/azm-labs-logo.png"
              alt=""
              width={22}
              height={22}
            />{' '}
            <span>
              <span className="footer-azm">AZM</span> Labs
            </span>
            <Arrow />
          </a>
        </div>
      </div>
    </footer>
  )
}
function Arrow() {
  return <ArrowUpRightIcon size={16} aria-hidden="true" />
}
