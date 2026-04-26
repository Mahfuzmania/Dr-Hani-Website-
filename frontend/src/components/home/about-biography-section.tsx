import Link from 'next/link'

import { ArrowUpRightIcon } from '@/src/components/branding/elegant-icons'
import { Reveal } from '@/src/components/ui/reveal'

export function AboutBiographySection({
  biography,
  highlights,
  cta,
}: {
  biography: string
  highlights: Array<{ label: string; value: string }>
  cta: { href: string; label: string }
}) {
  return (
    <section id="biography" className="anchor-offset section-tone section-space-lg">
      <div className="page-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <Reveal>
          <p className="eyebrow">About / Biography</p>
          <h2 className="mt-4 font-serif text-[2.9rem] leading-[0.96] tracking-[-0.03em] text-[var(--primary)] md:text-[4.2rem]">
            A medical career shaped by hospital discipline and visible public contact.
          </h2>
        </Reveal>
        <Reveal className="grid gap-6">
          <article className="panel-white p-7 md:p-8">
            <p className="text-[1rem] leading-8 text-[var(--foreground)] md:text-[1.05rem] md:leading-9">{biography}</p>
          </article>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <article key={item.label} className="premium-card px-5 py-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-3 font-serif text-[1.45rem] italic leading-6 text-[var(--primary)]">{item.value}</p>
              </article>
            ))}
          </div>
          <div>
            <Link href={cta.href} className="button-secondary">
              <span>{cta.label}</span>
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
