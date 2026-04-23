import Image from 'next/image'

import type { PageHero as PageHeroType } from '../../../../shared/site-content'
import { getHeroImage } from '@/src/lib/content-helpers'
import { Reveal } from '../ui/reveal'

export function PageHero({ hero }: { hero: PageHeroType }) {
  const heroImage = hero.image ? getHeroImage(hero) : null

  return (
    <section className="page-shell pt-28 md:pt-40">
      <div
        className={`hero-shell px-6 py-10 md:px-10 md:py-12 ${
          hero.image ? '' : 'max-w-4xl'
        }`}
      >
        <div
        className={`grid gap-10 md:gap-14 ${
          hero.image
            ? 'lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-end'
            : ''
        }`}
        >
          <Reveal className="self-center">
            {hero.eyebrow ? <p className="eyebrow">{hero.eyebrow}</p> : null}
            <h1 className="mt-4 max-w-4xl font-serif text-[3.7rem] leading-[0.94] tracking-[-0.04em] text-[var(--primary)] md:text-[5.3rem] lg:text-[6.3rem]">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.02rem] leading-9 text-[var(--muted)] md:text-[1.15rem] md:leading-10">
              {hero.summary}
            </p>
            <div className="mt-10 editorial-rule" />
          </Reveal>
          {heroImage ? (
            <Reveal className="relative">
              <div className="image-frame relative aspect-[4/5]">
                <Image
                  src={heroImage}
                  alt={hero.title}
                  fill
                  loading="eager"
                  className="object-cover grayscale-[0.04] transition-transform duration-700 hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}

