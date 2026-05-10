import Image from 'next/image'
import { notFound } from 'next/navigation'

import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { updates } = await getSiteContent()
  return updates.filter((item) => item.status === 'published').map((update) => ({ slug: update.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { updates } = await getSiteContent()
  const update = updates.find((item) => item.slug === slug)

  if (!update) {
    return buildMetadata('Update not found', 'Requested update could not be found.')
  }

  return buildMetadata(update.title, update.summary, `/updates/${slug}`)
}

export default async function UpdateDetailPage({ params }: Props) {
  const { slug } = await params
  const { updates } = await getSiteContent()
  const update = updates.find((item) => item.slug === slug && item.status === 'published')

  if (!update) {
    notFound()
  }

  return (
    <div className="page-shell pb-24 pt-28 md:pt-40">
      <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
        <div className="section-frame px-6 py-7 md:px-8 md:py-9">
          <p className="eyebrow text-[var(--muted)]">{update.category}</p>
          <h1 className="section-title mt-4 text-[3rem] text-[var(--navy)] md:text-[5rem]">
            {update.title}
          </h1>
          <p className="mt-6 text-[0.84rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            {update.date}
          </p>
          <p className="mt-6 max-w-3xl text-[1rem] leading-8 text-[var(--muted)]">{update.summary}</p>
          {update.sourceLink ? (
            <p className="support-copy mt-5 text-[0.95rem] leading-8 text-[var(--muted)]">
              <a href={update.sourceLink} target="_blank" rel="noreferrer">Read the related report</a>
            </p>
          ) : null}
        </div>
        {update.image ? (
          <div className="media-frame media-hover relative aspect-[16/12]">
            <Image src={update.image} alt={update.title} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        ) : null}
      </div>

      <article className="panel-solid editorial-card mt-12 p-7 md:p-9">
        {update.body.map((paragraph) => (
          <p key={paragraph} className="mt-4 first:mt-0 text-[1rem] leading-9 text-[var(--muted)]">
            {paragraph}
          </p>
        ))}
      </article>
    </div>
  )
}
