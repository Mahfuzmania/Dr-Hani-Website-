import { CinematicBackground } from '@/src/components/home/cinematic-background'
import { Footer } from '@/src/components/layout/footer'
import { Header } from '@/src/components/layout/header'
import { getSiteContent } from '@/src/lib/site-api'

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getSiteContent()

  return (
    <div className="site-frame">
      <CinematicBackground />
      <Header settings={content.siteSettings} />
      <main className="relative z-10">{children}</main>
      <Footer settings={content.siteSettings} />
    </div>
  )
}
