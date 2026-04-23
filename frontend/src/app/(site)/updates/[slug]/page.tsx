import { notFound } from 'next/navigation'

import { PageHero } from '@/src/components/sections/page-hero'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { updates } = await getSiteContent()
  return updates.map((update) => ({ slug: update.slug }))
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
  const update = updates.find((item) => item.slug === slug)

  if (!update) {
    notFound()
  }

  return (
    <div className="pb-24">
      <PageHero
        hero={{
          eyebrow: update.category,
          title: update.title,
          summary: update.summary,
          image: update.coverImage,
        }}
      />
      <section className="page-shell section-space">
        <div className="mx-auto max-w-4xl">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[rgba(15,28,44,0.42)]">
            {update.publishDate}
          </p>
          <div className="mt-8 space-y-6">
            {update.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-9 text-[var(--muted)]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
