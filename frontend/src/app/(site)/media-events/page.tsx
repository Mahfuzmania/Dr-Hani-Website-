import Image from 'next/image'

import { PlayIcon } from '@/src/components/branding/elegant-icons'
import { CTASection } from '@/src/components/sections/cta-section'
import { PageHero } from '@/src/components/sections/page-hero'
import { SectionIntro } from '@/src/components/sections/section-intro'
import { StatementBlock } from '@/src/components/sections/statement-block'
import { DEFAULT_SITE_IMAGE, getHeroImage, getVideoItem } from '@/src/lib/content-helpers'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Media & Events',
  'Interviews, appearances, event references, and archive video for Dr Umma Hani.',
  '/media-events',
)

export default async function MediaEventsPage() {
  const { events, galleryItems, mediaEventsPage } = await getSiteContent()
  const galleryById = new Map(galleryItems.map((item) => [item.id, item]))
  const featured = events.filter((event) => mediaEventsPage.featuredEventIds.includes(event.id))
  const documentaryStills = mediaEventsPage.documentaryImageIds
    .map((id) => galleryById.get(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  const eventImage =
    featured[0]?.image ??
    galleryById.get('media-interview-setup')?.image ??
    getHeroImage(mediaEventsPage.hero, DEFAULT_SITE_IMAGE)

  return (
    <div className="pb-24">
      <PageHero hero={mediaEventsPage.hero} />

      <section className="page-shell section-space">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="panel-soft overflow-hidden">
            <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
              <div className="p-8 md:p-10">
                <p className="eyebrow">Featured record</p>
                {featured.length ? (
                  <>
                    <h2 className="mt-6 max-w-3xl font-serif text-[2.8rem] leading-[1.02] tracking-[-0.03em] text-[var(--primary)] md:text-[3.6rem]">
                      {featured[0].title}
                    </h2>
                    <p className="mt-4 text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[rgba(15,28,44,0.42)]">
                      {featured[0].period}
                    </p>
                    <p className="mt-6 max-w-3xl text-sm leading-8 text-[var(--muted)]">{featured[0].description}</p>
                  </>
                ) : (
                  <p className="mt-6 max-w-2xl text-sm leading-8 text-[var(--muted)]">
                    This page keeps interviews, appearances, and dated references in one documentary record.
                  </p>
                )}
              </div>
              <div className="image-frame relative min-h-[20rem] rounded-none md:rounded-l-none md:rounded-r-[1.25rem]">
                <Image
                  src={eventImage ?? '/media/media-interview-setup.jpg'}
                  alt="Media and event archive"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 36vw, 100vw"
                />
              </div>
            </div>
          </article>
          <article className="panel-contrast p-8 text-white md:p-10">
            <p className="eyebrow text-[rgba(255,255,255,0.54)]">Archive note</p>
            <p className="mt-6 text-sm leading-8 text-[rgba(255,255,255,0.74)]">{mediaEventsPage.intro}</p>
          </article>
        </div>
      </section>

      <section className="section-tone section-space-lg">
        <div className="page-shell max-w-5xl">
          <StatementBlock>
            The media archive balances still photography, press-style references, and a controlled video library so the site feels complete without becoming noisy.
          </StatementBlock>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionIntro
              eyebrow="Featured video"
              title={mediaEventsPage.featuredVideo.title}
              body={mediaEventsPage.featuredVideo.summary}
            />
            <p className="mt-6 inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[rgba(15,28,44,0.46)]">
              <span className="icon-chip h-8 w-8">
                <PlayIcon className="h-4 w-4" />
              </span>
              <span>{mediaEventsPage.featuredVideo.duration}</span>
            </p>
          </div>
          <div className="panel-white overflow-hidden p-3">
            <div className="image-frame overflow-hidden rounded-[1.1rem]">
              <video
                className="h-auto w-full"
                controls
                preload="metadata"
                playsInline
                poster={mediaEventsPage.featuredVideo.poster}
              >
                <source src={mediaEventsPage.featuredVideo.src} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {documentaryStills.length ? (
        <section className="page-shell section-space">
          <SectionIntro
            eyebrow="Documentary stills"
            title="Press references, event stills, and public record imagery."
            body="These stills are used as documentary support, with screenshots and office-side images kept in the archive rather than promoted as hero visuals."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {documentaryStills.map((item, index) => (
              <article
                key={item.id}
                className={index === 1 ? 'panel-contrast overflow-hidden p-4 text-white' : 'panel-soft overflow-hidden p-4'}
              >
                <div className="image-frame relative aspect-[5/4] rounded-[1rem]">
                  <Image
                    src={item.image}
                    alt={item.altText}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                  />
                </div>
                <div className="px-2 pb-3 pt-5">
                  <p className={`text-[0.76rem] font-semibold uppercase tracking-[0.16em] ${index === 1 ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(15,28,44,0.46)]'}`}>
                    Still {index + 1}
                  </p>
                  <h3 className="mt-3 font-serif text-[1.85rem] leading-tight">{item.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${index === 1 ? 'text-[rgba(255,255,255,0.74)]' : 'text-[var(--muted)]'}`}>
                    {item.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="page-shell section-space">
        <SectionIntro
          eyebrow="Video archive"
          title="The full video archive, organized as a measured visual record."
          body="Every provided clip is preserved here with restrained presentation so the archive stays useful, readable, and intentional."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mediaEventsPage.archiveVideos
            .map((video) => getVideoItem(mediaEventsPage.archiveVideos, video.id))
            .filter((video): video is NonNullable<typeof video> => Boolean(video))
            .map((video, index) => (
            <article
              key={video.id}
              className={index % 5 === 1 ? 'panel-contrast overflow-hidden p-4 text-white' : 'panel-white overflow-hidden p-4'}
            >
              <div className="image-frame overflow-hidden rounded-[1rem]">
                <video className="aspect-[4/5] w-full object-cover" controls preload="metadata" playsInline poster={video.poster}>
                  <source src={video.src} type="video/mp4" />
                </video>
              </div>
              <div className="px-2 pb-3 pt-5">
                <p className={`text-[0.76rem] font-semibold uppercase tracking-[0.16em] ${index % 5 === 1 ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(15,28,44,0.46)]'}`}>
                  Archive video
                </p>
                <h3 className="mt-3 font-serif text-[1.8rem] leading-tight">{video.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${index % 5 === 1 ? 'text-[rgba(255,255,255,0.74)]' : 'text-[var(--muted)]'}`}>
                  {video.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell section-space">
        <SectionIntro eyebrow="Appearances" title="Interviews, discussion visibility, and program documentation." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {mediaEventsPage.appearanceBlocks.map((item, index) => (
            <article
              key={item.title}
              className={`${index === 0 ? 'md:col-span-2 panel-soft' : index === 1 ? 'panel-contrast text-white' : 'panel-white'} p-8`}
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
      </section>

      <section className="page-shell pb-8">
        <CTASection cta={mediaEventsPage.cta} title="For appearances, media requests, or additional context, get in touch here." />
      </section>
    </div>
  )
}
