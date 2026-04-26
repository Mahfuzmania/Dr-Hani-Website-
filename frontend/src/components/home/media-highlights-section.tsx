import Image from 'next/image'
import Link from 'next/link'

import { ArrowUpRightIcon, CalendarIcon, CameraIcon } from '@/src/components/branding/elegant-icons'
import { Reveal } from '@/src/components/ui/reveal'

type EventItem = {
  category: string
  description: string
  image?: string
  period: string
  title: string
}

type MediaStill = {
  altText: string
  caption: string
  id: string
  image: string
  title: string
}

export function MediaHighlightsSection({
  events,
  stills,
}: {
  events: EventItem[]
  stills: MediaStill[]
}) {
  return (
    <section id="media" className="anchor-offset page-shell section-space">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Media Highlights</p>
          <h2 className="mt-4 max-w-3xl font-serif text-[2.8rem] leading-[0.96] tracking-[-0.03em] text-[var(--primary)] md:text-[4rem]">
            Selected appearances, event references, and documentary stills.
          </h2>
        </div>
        <Link href="/media-events" className="button-secondary">
          <span>Open Media Archive</span>
          <ArrowUpRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <Reveal className="panel-soft p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {stills.slice(0, 2).map((item, index) => (
              <article key={item.id} className={index === 1 ? 'panel-contrast p-3 text-white' : 'panel-white p-3'}>
                <div className="image-frame relative aspect-[5/4] rounded-[1rem]">
                  <Image src={item.image} alt={item.altText} fill className="object-cover" sizes="(min-width: 1024px) 20vw, 100vw" />
                </div>
                <div className="px-2 pb-2 pt-4">
                  <p className={`inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] ${index === 1 ? 'text-[rgba(255,255,255,0.62)]' : 'text-[var(--muted)]'}`}>
                    <CameraIcon className="h-3.5 w-3.5" />
                    <span>Featured Still</span>
                  </p>
                  <h3 className="mt-3 font-serif text-[1.75rem] leading-tight">{item.title}</h3>
                  <p className={`mt-3 text-[0.92rem] leading-7 ${index === 1 ? 'text-[rgba(255,255,255,0.76)]' : 'text-[var(--muted)]'}`}>
                    {item.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
        <Reveal className="panel-white p-6 md:p-7">
          <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Dated References</p>
          <div className="mt-5 space-y-5">
            {events.slice(0, 2).map((event, index) => (
              <article key={event.title} className={`${index === 0 ? '' : 'ghost-line'} grid gap-4 pt-5 md:grid-cols-[1fr_10rem]`}>
                <div>
                  <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    <CalendarIcon className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <span>{event.category}</span>
                  </p>
                  <h3 className="mt-3 font-serif text-[1.85rem] leading-tight text-[var(--primary)]">{event.title}</h3>
                  <p className="mt-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {event.period}
                  </p>
                  <p className="mt-3 text-[0.94rem] leading-8 text-[var(--muted)]">{event.description}</p>
                </div>
                {event.image ? (
                  <div className="image-frame relative min-h-[9rem] rounded-[1.1rem]">
                    <Image src={event.image} alt={event.title} fill className="object-cover" sizes="10rem" />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
