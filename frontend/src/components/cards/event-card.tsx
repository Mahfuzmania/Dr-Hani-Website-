import { CalendarIcon, MicrophoneIcon } from '../branding/elegant-icons'

export function EventCard({
  category,
  description,
  period,
  title,
}: {
  category: string
  description: string
  period: string
  title: string
}) {
  return (
    <article className="panel-soft p-8">
      <p className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
        <span className="icon-chip h-8 w-8">
          <MicrophoneIcon className="h-4 w-4" />
        </span>
        <span>{category}</span>
      </p>
      <h3 className="mt-5 max-w-2xl font-serif text-[2.35rem] leading-tight text-[var(--primary)]">{title}</h3>
      <p className="mt-3 inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.42)]">
        <span className="icon-chip h-8 w-8">
          <CalendarIcon className="h-4 w-4" />
        </span>
        <span>{period}</span>
      </p>
      <p className="mt-5 max-w-3xl text-[1rem] leading-8 text-[var(--muted)]">{description}</p>
    </article>
  )
}
