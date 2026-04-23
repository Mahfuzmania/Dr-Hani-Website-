import Image from 'next/image'
import Link from 'next/link'

import { ArrowRightIcon, CalendarIcon, DocumentIcon } from '../branding/elegant-icons'

export function UpdateCard({
  category,
  coverImage,
  href,
  publishDate,
  summary,
  title,
}: {
  category: string
  coverImage?: string
  href: string
  publishDate: string
  summary: string
  title: string
}) {
  return (
    <article className="panel-soft overflow-hidden">
      {coverImage ? (
        <div className="image-frame relative aspect-[16/10] rounded-none md:rounded-b-none">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
          />
        </div>
      ) : null}
      <div className="p-8">
        <p className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
          <span className="icon-chip h-8 w-8">
            <DocumentIcon className="h-4 w-4" />
          </span>
          <span>{category}</span>
        </p>
        <h3 className="mt-4 max-w-2xl font-serif text-[2.15rem] leading-tight text-[var(--primary)]">{title}</h3>
        <p className="mt-3 inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.42)]">
          <span className="icon-chip h-8 w-8">
            <CalendarIcon className="h-4 w-4" />
          </span>
          <span>{publishDate}</span>
        </p>
        <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-[var(--muted)]">{summary}</p>
        <Link className="mt-7 inline-flex border-b border-[rgba(15,28,44,0.18)] pb-1 font-serif text-[1.12rem] italic text-[var(--primary)]" href={href}>
          <span>Open entry</span>
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
