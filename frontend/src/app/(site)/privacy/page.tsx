import { SectionIntro } from '@/src/components/sections/section-intro'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Privacy',
  'Minimal privacy language for the contact and data-handling flow of the site.',
  '/privacy',
)

export default async function PrivacyPage() {
  const { privacyPage } = await getSiteContent()

  return (
    <div className="pb-24">
      <section className="page-shell pt-28 md:pt-40">
        <SectionIntro eyebrow="Privacy" title={privacyPage.title} body={privacyPage.intro} />
      </section>
      <section className="page-shell section-space">
        <div className="space-y-0">
          {privacyPage.sections.map((section) => (
            <article key={section.title} className="ghost-line py-8">
              <h2 className="font-serif text-[2rem] leading-tight text-[var(--primary)]">{section.title}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--muted)]">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
