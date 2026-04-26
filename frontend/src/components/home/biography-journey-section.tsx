import Image from 'next/image'
import Link from 'next/link'

import { ArrowUpRightIcon, CalendarIcon, DocumentIcon } from '@/src/components/branding/elegant-icons'
import { Reveal } from '@/src/components/ui/reveal'

type Highlight = {
  label: string
  value: string
}

type JourneyMilestone = {
  description: string
  period: string
  title: string
}

export function BiographyJourneySection({
  biography,
  highlights,
  image,
  storyParagraphs,
  timeline,
  cta,
}: {
  biography: string
  highlights: Highlight[]
  image: string
  storyParagraphs: string[]
  timeline: JourneyMilestone[]
  cta: { href: string; label: string }
}) {
  return (
    <section id="biography" className="anchor-offset section-tone section-space-lg">
      <div className="page-shell">
        <div className="grid gap-12 xl:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="xl:sticky xl:top-28 xl:h-fit">
            <p className="eyebrow">Biography &amp; Journey</p>
            <h2 className="mt-4 max-w-xl font-serif text-[2.8rem] leading-[0.96] tracking-[-0.035em] text-[var(--primary-strong)] md:text-[4rem]">
              A professional journey grounded in medical training, hospital work, and public-facing human contact.
            </h2>
            <div className="image-frame relative mt-8 aspect-[4/5] rounded-[2rem]">
              <Image src={image} alt="Dr Umma Hani in a clinical portrait" fill className="object-cover object-center" sizes="(min-width: 1280px) 32vw, 100vw" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <article key={item.label} className="premium-card px-5 py-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {item.label}
                  </p>
                  <p className="mt-3 font-serif text-[1.35rem] italic leading-6 text-[var(--primary-strong)]">
                    {item.value}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-6">
            <Reveal className="panel-white p-7 md:p-8">
              <p className="text-[1rem] leading-8 text-[var(--foreground)] md:text-[1.05rem] md:leading-9">
                {biography}
              </p>
              <div className="mt-7 space-y-5">
                {storyParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[0.97rem] leading-8 text-[var(--muted)]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8">
                <Link href={cta.href} className="button-secondary">
                  <span>{cta.label}</span>
                  <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <Reveal className="panel-soft p-7 md:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Verified Journey</p>
                  <h3 className="mt-4 font-serif text-[2.2rem] leading-tight text-[var(--primary-strong)] md:text-[2.6rem]">
                    Milestones in the record
                  </h3>
                </div>
                <p className="max-w-md text-[0.92rem] leading-7 text-[var(--muted)]">
                  Dates and role labels stay tied to the verified repo sources. Where exact dates are not surfaced cleanly, the timeline remains descriptive rather than invented.
                </p>
              </div>
              <div className="mt-8 space-y-0">
                {timeline.map((item, index) => (
                  <article
                    key={`${item.title}-${item.period}`}
                    className={`${index === 0 ? '' : 'ghost-line'} grid gap-4 py-6 md:grid-cols-[11rem_1fr]`}
                  >
                    <div>
                      <p className="inline-flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        <span className="icon-chip h-8 w-8">
                          {index < 2 ? <DocumentIcon className="h-4 w-4" /> : <CalendarIcon className="h-4 w-4" />}
                        </span>
                        <span>{item.period}</span>
                      </p>
                    </div>
                    <div>
                      <div className="flex items-start gap-3">
                        <span className="micro-accent-dot mt-3 shrink-0" />
                        <div>
                          <h4 className="font-serif text-[1.7rem] leading-tight text-[var(--primary-strong)] md:text-[2rem]">
                            {item.title}
                          </h4>
                          <p className="mt-3 text-[0.95rem] leading-8 text-[var(--muted)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
