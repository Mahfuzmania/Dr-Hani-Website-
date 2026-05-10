import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Privacy',
  'Privacy information for contact messages and public website communication.',
  '/privacy',
)

export default async function PrivacyPage() {
  const { privacyPage } = await getSiteContent()

  return (
    <div className="page-shell pb-24 pt-28 md:pt-40">
      <div className="section-frame px-6 py-8 md:px-8 md:py-10">
        <div className="max-w-4xl">
          <p className="eyebrow text-[var(--muted)]">Privacy</p>
          <h1 className="section-title mt-4 text-[3.2rem] text-[var(--navy)] md:text-[5rem]">
            {privacyPage.title}
          </h1>
          <p className="mt-6 max-w-3xl text-[1rem] leading-8 text-[var(--muted)]">{privacyPage.intro}</p>
        </div>
      </div>
      <div className="mt-12 space-y-5">
        {privacyPage.sections.map((section) => (
          <article key={section.title} className="panel-solid editorial-card p-7">
            <h2 className="font-serif text-[2rem] leading-tight text-[var(--navy)]">{section.title}</h2>
            <p className="support-copy mt-4 max-w-3xl text-[0.98rem] leading-8 text-[var(--muted)]">{section.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
