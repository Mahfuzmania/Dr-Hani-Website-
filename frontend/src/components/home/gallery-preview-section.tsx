import Image from 'next/image'
import Link from 'next/link'

import { ArrowUpRightIcon } from '@/src/components/branding/elegant-icons'
import { Reveal } from '@/src/components/ui/reveal'

type GalleryPreviewItem = {
  altText: string
  id: string
  image: string
  title: string
}

export function GalleryPreviewSection({
  items,
}: {
  items: GalleryPreviewItem[]
}) {
  return (
    <section id="gallery" className="anchor-offset page-shell section-space">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Gallery Preview</p>
          <h2 className="mt-4 font-serif text-[2.8rem] leading-[0.96] tracking-[-0.03em] text-[var(--primary)] md:text-[4rem]">
            A concise visual selection from the broader archive.
          </h2>
        </div>
        <Link href="/gallery" className="button-secondary">
          <span>View Full Gallery</span>
          <ArrowUpRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {items.slice(0, 8).map((item, index) => (
          <Reveal key={item.id} className={`${index % 4 === 1 ? 'md:translate-y-8' : ''} ${index % 4 === 3 ? 'md:-translate-y-5' : ''}`}>
            <div className={`image-frame relative overflow-hidden ${index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[5/4]'}`}>
              <Image src={item.image} alt={item.altText} fill className="object-cover" sizes="(min-width: 768px) 23vw, 50vw" />
            </div>
            <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              {item.title}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
