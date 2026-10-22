import { Footer } from '@/src/components/layout/footer'
import { Header } from '@/src/components/layout/header'
import { getSiteContent } from '@/src/lib/site-api'

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getSiteContent()

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header settings={content.siteSettings} />
      <main id="main-content" tabIndex={-1}>
        {content.contentStatus === 'unavailable' && (
          <p role="status" className="availability-notice page-shell">
            The archive is temporarily unavailable. Please try again shortly.
          </p>
        )}
        {children}
      </main>
      <Footer settings={content.siteSettings} />
    </div>
  )
}
