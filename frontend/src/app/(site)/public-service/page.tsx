import Image from 'next/image'

import { CTASection } from '@/src/components/sections/cta-section'
import { PageHero } from '@/src/components/sections/page-hero'
import { SectionIntro } from '@/src/components/sections/section-intro'
import { StatementBlock } from '@/src/components/sections/statement-block'
import { getGalleryItem } from '@/src/lib/content-helpers'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Public Service',
  'Outreach, service, and community-facing activity associated with Dr Umma Hani.',
  '/public-service',
)

export default async function PublicServicePage() {
  const { galleryItems, publicServicePage } = await getSiteContent()
  const featuredImages = publicServicePage.featuredImageIds
    .map((id) => getGalleryItem(galleryItems, id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <div className="pb-24">
      <PageHero hero={publicServicePage.hero} />

      <section className="section-tone section-space-lg mt-16">
        <div className="page-shell max-w-5xl">
          <StatementBlock>{publicServicePage.missionText}</StatementBlock>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionIntro
              eyebrow="Outreach"
              title="Field-level engagement and organized public activity."
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {publicServicePage.outreachBlocks.map((item, index) => (
              <article
                key={item.title}
                className={`${index === 0 ? 'md:col-span-2' : ''} ${index === 1 ? 'panel-contrast text-white' : 'panel-soft'} p-8`}
              >
                <p className={`text-[0.76rem] font-semibold uppercase tracking-[0.16em] ${index === 1 ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(15,28,44,0.46)]'}`}>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-8 font-serif text-[2rem] leading-tight">{item.title}</h3>
                <p className={`mt-4 text-sm leading-8 ${index === 1 ? 'text-[rgba(255,255,255,0.74)]' : 'text-[var(--muted)]'}`}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {featuredImages.length ? (
        <section className="page-shell section-space">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {featuredImages.map((item, index) => (
              <div key={item.id} className={`${index === 0 ? 'md:col-span-7' : 'md:col-span-5'} ${index === 2 ? 'md:col-span-12' : ''}`}>
                <div className="image-frame relative aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.altText}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">{item.caption}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-tone section-space">
        <div className="page-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="panel-white p-8 md:p-10">
            <p className="eyebrow">Community health</p>
            <div className="mt-10 space-y-8">
              {publicServicePage.communityHealthBlocks.map((item) => (
                <div key={item.title} className="ghost-line pt-5 first:border-t-0 first:pt-0">
                  <h3 className="font-serif text-[2rem] leading-tight text-[var(--primary)]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </article>
          {publicServicePage.socialResponseBlocks.length ? (
            <article className="panel-contrast p-8 text-white md:p-10">
              <p className="eyebrow text-[rgba(255,255,255,0.54)]">Leadership context</p>
              <div className="mt-10 space-y-8">
                {publicServicePage.socialResponseBlocks.map((item) => (
                  <div key={item.title} className="ghost-line-contrast pt-5 first:border-t-0 first:pt-0">
                    <h3 className="font-serif text-[2rem] leading-tight">{item.title}</h3>
                    <p className="mt-4 text-sm leading-8 text-[rgba(255,255,255,0.74)]">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="page-shell pb-8">
        <CTASection cta={publicServicePage.cta} title="Explore the wider visual record behind the public-facing work." />
      </section>
    </div>
  )
}

