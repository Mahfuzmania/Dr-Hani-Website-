import type { TimelineItem } from '../../../../shared/site-content'
import { Reveal } from '../ui/reveal'

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="space-y-0">
      {items.map((item) => (
        <Reveal
          key={`${item.title}-${item.period}`}
          className="ghost-line grid gap-5 py-8 lg:grid-cols-[220px_1fr]"
        >
          <div>
            <p className="text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">{item.period}</p>
          </div>
          <div>
            <h3 className="font-serif text-[2.15rem] leading-tight text-[var(--primary)]">{item.title}</h3>
            <p className="mt-3 max-w-2xl text-[1rem] leading-8 text-[var(--muted)]">{item.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
