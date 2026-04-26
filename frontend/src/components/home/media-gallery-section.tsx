import Image from 'next/image'
import Link from 'next/link'

import { ArrowUpRightIcon, CameraIcon, PlayIcon } from '@/src/components/branding/elegant-icons'
import { Reveal } from '@/src/components/ui/reveal'
import type { GalleryCategory } from '../../../../shared/site-content'

type GalleryPreviewItem = {
  altText: string
  category: GalleryCategory
  id: string
  image: string
  title: string
}

const labels: Record<GalleryCategory, string> = {
  'medical-service': 'Medical',
  'community-outreach': 'Community',
  events: 'Events',
  leadership: 'Leadership',
}

export function MediaGallerySection({
  featuredImage,
  featuredSummary,
  featuredTitle,
  items,
}: {
  featuredImage: string
  featuredSummary: string
  featuredTitle: string
  items: GalleryPreviewItem[]
}) {
  return (
    <section id="media" className="anchor-offset page-shell section-space-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Media &amp; Gallery</p>
          <h2 className="mt-4 max-w-3xl font-serif text-[2.8rem] leading-[0.96] tracking-[-0.035em] text-[var(--primary-strong)] md:text-[4rem]">
            A curated visual record with media presence, documentary stills, and selected gallery moments.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {['Medical', 'Community', 'Events', 'Leadership'].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(8,32,68,0.08)] bg-[rgba(255,255,255,0.62)] px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--primary-strong)]"
            >
              <span className="micro-accent-dot" />
              <span>{chip}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-5 xl:grid-cols-[0.88fr_1.12fr]">
        <Reveal className="panel-white overflow-hidden">
          <div className="image-frame relative aspect-[4/5] rounded-none md:aspect-[16/14]">
            <Image src={featuredImage} alt={featuredTitle} fill className="object-cover" sizes="(min-width: 1280px) 30vw, 100vw" />
          </div>
          <div className="p-6 md:p-7">
            <p className="inline-flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="icon-chip h-8 w-8">
                <PlayIcon className="h-4 w-4" />
              </span>
              <span>Featured Media</span>
            </p>
            <h3 className="mt-4 font-serif text-[2rem] leading-tight text-[var(--primary-strong)] md:text-[2.3rem]">
              {featuredTitle}
            </h3>
            <p className="mt-4 text-[0.96rem] leading-8 text-[var(--muted)]">{featuredSummary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/media-events" className="button-outline">
                Open Media Archive
              </Link>
              <Link href="/gallery" className="button-secondary">
                <span>View Gallery</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
        <div id="gallery" className="anchor-offset">
          <Reveal className="panel-soft p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between gap-4 px-1">
              <div>
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Gallery Preview
                </p>
                <h3 className="mt-2 font-serif text-[2rem] leading-tight text-[var(--primary-strong)]">
                  Selected real images from the archive
                </h3>
              </div>
              <Link href="/gallery" className="hidden md:inline-flex button-outline">
                View Full Gallery
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.slice(0, 6).map((item, index) => (
                <Link
                  key={item.id}
                  href="/gallery"
                  className={`${index === 1 ? 'sm:translate-y-6' : ''} ${index === 4 ? 'xl:-translate-y-6' : ''} block`}
                >
                  <div className={`image-frame relative ${index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[5/4]'}`}>
                    <Image src={item.image} alt={item.altText} fill className="object-cover" sizes="(min-width: 1280px) 18vw, (min-width: 640px) 45vw, 100vw" />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      {labels[item.category]}
                    </p>
                    <span className="icon-chip h-8 w-8">
                      <CameraIcon className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-2 font-serif text-[1.2rem] leading-6 text-[var(--primary-strong)]">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
