import Image from 'next/image'
import Link from 'next/link'

import { ArrowUpRightIcon } from '@/src/components/branding/elegant-icons'
import { Reveal } from '@/src/components/ui/reveal'

type UpdateItem = {
  category: string
  coverImage?: string
  publishDate: string
  slug: string
  summary: string
  title: string
}

export function UpdatesPreviewSection({
  items,
}: {
  items: UpdateItem[]
}) {
  return (
    <section id="updates" className="anchor-offset section-tone section-space-lg">
      <div className="page-shell">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Updates &amp; Public Notes</p>
            <h2 className="mt-4 max-w-3xl font-serif text-[2.8rem] leading-[0.96] tracking-[-0.035em] text-[var(--primary-strong)] md:text-[4rem]">
              Dated, factual, and kept intentionally restrained.
            </h2>
          </div>
          <Link href="/updates" className="button-secondary">
            <span>See All Updates</span>
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 xl:grid-cols-3">
          {items.slice(0, 3).map((item, index) => (
            <Reveal key={item.slug} className={`${index === 1 ? 'panel-contrast' : 'panel-white'} overflow-hidden`}>
              {item.coverImage ? (
                <div className="image-frame relative aspect-[16/10] rounded-none">
                  <Image src={item.coverImage} alt={item.title} fill className="object-cover" sizes="(min-width: 1280px) 28vw, 100vw" />
                </div>
              ) : null}
              <div className="p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <p
                    className={`text-[0.74rem] font-semibold uppercase tracking-[0.18em] ${
                      index === 1 ? 'text-[rgba(255,255,255,0.62)]' : 'text-[var(--muted)]'
                    }`}
                  >
                    {item.category}
                  </p>
                  <span className="micro-accent-dot shrink-0" />
                </div>
                <h3 className="mt-4 font-serif text-[1.85rem] leading-tight">{item.title}</h3>
                <p
                  className={`mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] ${
                    index === 1 ? 'text-[rgba(255,255,255,0.6)]' : 'text-[var(--muted)]'
                  }`}
                >
                  {item.publishDate}
                </p>
                <p
                  className={`mt-4 text-[0.94rem] leading-8 ${
                    index === 1 ? 'text-[rgba(255,255,255,0.76)]' : 'text-[var(--muted)]'
                  }`}
                >
                  {item.summary}
                </p>
                <div className="mt-6">
                  <Link
                    href={`/updates/${item.slug}`}
                    className={index === 1 ? 'button-outline border-white/16 bg-white/8 text-white' : 'button-outline'}
                  >
                    Read Note
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
