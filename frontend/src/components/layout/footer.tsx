import Image from 'next/image'
import Link from 'next/link'
import type { SiteContentV2 } from '../../../../shared/site-content-v2'

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
            Developed by{' '}
            <Image
              src="/branding/azm-labs-logo.png"
              alt=""
              width={22}
              height={22}
            />{' '}
            AZM Labs
            <Arrow />
          </a>
        </div>
      </div>
    </footer>
  )
}
function Arrow() {
  return <span aria-hidden="true">↗</span>
}
