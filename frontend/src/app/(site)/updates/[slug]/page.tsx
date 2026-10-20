import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageIntro } from '@/src/components/site/page-intro'
import { PublicationCard } from '@/src/components/site/publication-card'
import { GalleryGrid } from '@/src/components/gallery/gallery-grid'

import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { updates } = await getSiteContent()
  return updates
    .filter((item) => item.status === 'published')
    .map((update) => ({ slug: update.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { updates } = await getSiteContent()
  const update = updates.find(
    (item) => item.slug === slug && item.status === 'published',
  )

  if (!update) {
    return buildMetadata(
      'Update not found',
      'Requested update could not be found.',
    )
  }

  return buildMetadata(update.title, update.summary, `/updates/${slug}`)
}

export default async function UpdateDetailPage({ params }: Props) {
  const { slug } = await params
  const { updates, publications, galleryItems } = await getSiteContent()
  const update = updates.find(
    (item) => item.slug === slug && item.status === 'published',
  )

  if (!update) {
    notFound()
  }
  const coverage = publications.filter((item) => item.relatedActivity === slug)
  const photographs = galleryItems.filter(
    (item) => item.relatedActivity === slug,
  )

  return (
    <div className="page-shell archive-page activity-detail">
      <Link className="text-link mb-8" href="/updates">
        Back to activities
      </Link>
      <p className="publication-meta mb-4">
        {update.date} · {update.category}
      </p>
      <PageIntro title={update.title}>
        <p>{update.summary}</p>
      </PageIntro>
      <div
        className={
          update.image ? 'grid gap-10 lg:grid-cols-2 lg:items-start' : ''
        }
      >
        <article className="reading-copy biography-copy">
          {update.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {update.sourceLink && (
            <a
              className="text-link mt-6"
              href={update.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the original report <span aria-hidden="true">↗</span>
            </a>
          )}
        </article>
        {update.image ? (
          <div className="media-frame media-hover relative aspect-[16/12]">
            <Image
              src={update.image}
              alt={update.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        ) : null}
      </div>

      {coverage.length > 0 && (
        <section className="editorial-section">
          <h2>Related coverage</h2>
          <div className="archive-list">
            {coverage.map((item) => (
              <PublicationCard key={item.id} item={item} compact />
            ))}
          </div>
        </section>
      )}
      {photographs.length > 0 && (
        <section className="editorial-section">
          <h2>Photographs from this activity</h2>
          <GalleryGrid items={photographs} />
        </section>
      )}
    </div>
  )
}
