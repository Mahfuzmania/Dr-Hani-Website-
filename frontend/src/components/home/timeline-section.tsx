import { Reveal } from '@/src/components/ui/reveal'

export function HomeTimelineSection({
  items,
}: {
  items: Array<{ description: string; period: string; title: string }>
}) {
  return (
    <section className="page-shell section-space" id="timeline">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <Reveal className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow">Timeline</p>
          <h2 className="mt-4 font-serif text-[2.8rem] leading-[0.96] tracking-[-0.03em] text-[var(--primary)] md:text-[4rem]">
            Education, internship, hospital roles, and visible public milestones.
          </h2>
          <p className="mt-6 max-w-md text-[0.96rem] leading-8 text-[var(--muted)]">
            The timeline stays tightly aligned with the verified record and avoids adding institutions, titles, or dates that are not already supported by the repo sources.
          </p>
        </Reveal>
        <div className="panel-soft p-6 md:p-8">
          {items.map((item, index) => (
            <Reveal
              key={`${item.title}-${item.period}`}
              className={`${index === 0 ? '' : 'ghost-line'} grid gap-4 py-6 md:grid-cols-[11rem_1fr] md:gap-6`}
            >
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                {item.period}
              </p>
              <div>
                <h3 className="font-serif text-[1.8rem] leading-tight text-[var(--primary)] md:text-[2.1rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.96rem] leading-8 text-[var(--muted)]">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
