import { OrganizationStrip } from '@/src/components/sections/organization-strip'
import { CTASection } from '@/src/components/sections/cta-section'
import { PageHero } from '@/src/components/sections/page-hero'
import { PillarCards } from '@/src/components/sections/pillar-cards'
import { SectionIntro } from '@/src/components/sections/section-intro'
import { StatementBlock } from '@/src/components/sections/statement-block'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'About',
  'Biography, education, values, and profile details for Dr Umma Hani.',
  '/about',
)

export default async function AboutPage() {
  const { aboutPage } = await getSiteContent()

  return (
    <div className="pb-24">
      <PageHero hero={aboutPage.hero} />

      <section className="section-tone section-space-lg mt-16">
        <div className="page-shell max-w-5xl">
          <StatementBlock>{aboutPage.biographyIntro}</StatementBlock>
        </div>
      </section>

      <section className="page-shell section-space">
        <SectionIntro
          eyebrow="Professional arc"
          title="Education, training, and public responsibility appear in one continuous record."
        />
        <div className="mt-12 space-y-0">
          {aboutPage.longFormStory.map((paragraph, index) => (
            <article key={paragraph} className="ghost-line grid gap-5 py-8 lg:grid-cols-[110px_1fr]">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[rgba(15,28,44,0.46)]">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="max-w-3xl text-base leading-9 text-[var(--muted)]">{paragraph}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-tone section-space">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="panel-white p-8 md:p-10">
              <p className="eyebrow">Education and credentials</p>
              <div className="mt-10 space-y-8">
                {aboutPage.educationItems.map((item) => (
                  <div key={item.title} className="ghost-line pt-5 first:border-t-0 first:pt-0">
                    <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[rgba(15,28,44,0.42)]">
                      {item.title}
                    </p>
                    <h3 className="mt-3 font-serif text-[1.8rem] leading-tight text-[var(--primary)]">
                      {item.institution}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.period}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="panel-contrast p-8 text-white md:p-10">
              <p className="eyebrow text-[rgba(255,255,255,0.54)]">Personal profile</p>
              <div className="mt-10 space-y-8">
                {aboutPage.personalProfileItems.map((item) => (
                  <div key={item.label} className="ghost-line-contrast pt-5 first:border-t-0 first:pt-0">
                    <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.54)]">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[rgba(255,255,255,0.76)]">{item.value}</p>
                  </div>
                ))}
                <div className="ghost-line-contrast pt-5">
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.54)]">
                    Additional notes
                  </p>
                  <div className="mt-3 space-y-2">
                    {aboutPage.credentials.map((item) => (
                      <p key={item} className="text-sm leading-7 text-[rgba(255,255,255,0.76)]">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="mt-8">
            <OrganizationStrip
              title="Verified academic and clinical affiliations"
              items={['tmss-medical-college', 'rajshahi-university', 'bangladesh-specialized-hospital']}
            />
          </div>
        </div>
      </section>

      <section className="page-shell section-space">
        <SectionIntro eyebrow="Profile values" title="The biography reads most clearly through its underlying values." />
        <div className="mt-12">
          <PillarCards items={aboutPage.values} />
        </div>
      </section>

      <section className="page-shell pb-8">
        <CTASection cta={aboutPage.cta} title="Continue to the medical timeline." />
      </section>
    </div>
  )
}

