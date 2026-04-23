import { UpdateCard } from '@/src/components/cards/update-card'
import { CTASection } from '@/src/components/sections/cta-section'
import { SectionIntro } from '@/src/components/sections/section-intro'
import { EmptyState } from '@/src/components/ui/empty-state'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Updates',
  'Dated public record entries related to Dr Umma Hani.',
  '/updates',
)

export default async function UpdatesPage() {
  const { updates } = await getSiteContent()

  return (
    <div className="pb-24">
      <section className="page-shell pt-28 md:pt-40">
        <SectionIntro
          eyebrow="Updates"
          title="A dated public record for news, appearances, and documented notes."
          body="This archive gathers only those entries that carry a clear date, source context, and place in the wider profile."
        />
      </section>
      <section className="page-shell section-space">
        {updates.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {updates.map((update) => (
              <UpdateCard
                key={update.id}
                category={update.category}
                coverImage={update.coverImage}
                href={`/updates/${update.slug}`}
                publishDate={update.publishDate}
                summary={update.summary}
                title={update.title}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No updates published"
            message="New entries appear here only when there is a dated public record worth preserving."
          />
        )}
      </section>
      <section className="page-shell pb-8">
        <CTASection cta={{ href: '/contact', label: 'Get in Touch' }} title="For time-sensitive questions, use the contact page rather than waiting for a public archive entry." />
      </section>
    </div>
  )
}

