import { CTASection } from '@/src/components/sections/cta-section'
import { PageHero } from '@/src/components/sections/page-hero'
import { SectionIntro } from '@/src/components/sections/section-intro'
import { StatementBlock } from '@/src/components/sections/statement-block'
import { Timeline } from '@/src/components/sections/timeline'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Leadership',
  'Organizational role and public-facing leadership context for Dr Umma Hani.',
  '/leadership',
)

export default async function LeadershipPage() {
  const { leadershipPage } = await getSiteContent()

  return (
    <div className="pb-24">
      <PageHero hero={leadershipPage.hero} />

      <section className="section-tone section-space-lg mt-16">
        <div className="page-shell max-w-5xl">
          <StatementBlock>{leadershipPage.publicPurpose}</StatementBlock>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <article className="panel-contrast p-8 text-white md:p-10">
            <p className="eyebrow text-[rgba(255,255,255,0.54)]">Named role</p>
            <h2 className="mt-6 font-serif text-[2.6rem] leading-[1.02] tracking-[-0.03em]">
              {leadershipPage.organizationalRole}
            </h2>
            <p className="mt-6 text-sm leading-8 text-[rgba(255,255,255,0.74)]">
              Leadership is presented here as a visible strand of the wider public profile, not as a replacement for the medical identity that anchors the site.
            </p>
          </article>
          <div>
            <SectionIntro eyebrow="Public participation" title="Leadership appears through role, visibility, and organized participation." />
            <div className="mt-10">
              <Timeline items={leadershipPage.leadershipTimeline} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tone section-space">
        <div className="page-shell">
          <SectionIntro eyebrow="Representation" title="The visual record suggests public-facing responsibility rather than generic image-making." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {leadershipPage.speakingRepresentationBlocks.map((item, index) => (
              <article
                key={item.title}
                className={index === 1 ? 'panel-contrast p-8 text-white md:p-10' : 'panel-white p-8 md:p-10'}
              >
                <p className={`text-[0.76rem] font-semibold uppercase tracking-[0.16em] ${index === 1 ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(15,28,44,0.46)]'}`}>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-8 font-serif text-[2.1rem] leading-tight">{item.title}</h3>
                <p className={`mt-4 text-sm leading-8 ${index === 1 ? 'text-[rgba(255,255,255,0.74)]' : 'text-[var(--muted)]'}`}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell pb-8">
        <CTASection cta={leadershipPage.cta} title="Continue into the interviews, appearances, and event archive." />
      </section>
    </div>
  )
}
