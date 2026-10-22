import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'
import { PageIntro } from '@/src/components/site/page-intro'

export const metadata = buildMetadata(
  'Privacy',
  'Privacy information for contact messages and public website communication.',
  '/privacy',
)

export default async function PrivacyPage() {
  const { privacyPage } = await getSiteContent()
  return (
    <div className="page-shell archive-page privacy-page">
      <PageIntro title={privacyPage.title}>
        <p>{privacyPage.intro}</p>
      </PageIntro>
      {privacyPage.sections.map((section) => (
        <section className="privacy-section" key={section.title}>
          <h2>{section.title}</h2>
          <p className="reading-copy">{section.body}</p>
        </section>
      ))}
    </div>
  )
}
