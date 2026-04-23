import Image from 'next/image'
import Link from 'next/link'

import {
  ArrowUpRightIcon,
  BuildingIcon,
  CommunityIcon,
  HeartIcon,
  ShieldIcon,
} from '@/src/components/branding/elegant-icons'
import { OrganizationStrip } from '@/src/components/sections/organization-strip'
import { CTASection } from '@/src/components/sections/cta-section'
import { EmptyState } from '@/src/components/ui/empty-state'
import { DEFAULT_SITE_IMAGE, getGalleryImage, getVideoItem } from '@/src/lib/content-helpers'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Home',
  "Overview of Dr Umma Hani's medical service, public engagement, and leadership presence.",
)

export default async function HomePage() {
  const content = await getSiteContent()
  const galleryById = new Map(content.galleryItems.map((item) => [item.id, item]))

  const featuredGallery = content.homepage.featuredGalleryItemIds
    .map((id) => galleryById.get(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  const motionClips = content.homepage.motionVideoIds
    .map((id) => getVideoItem(content.mediaEventsPage.archiveVideos, id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  const focusVisuals = [
    getGalleryImage(content.galleryItems, 'camp-consultation', content.homepage.heroImage || DEFAULT_SITE_IMAGE),
    getGalleryImage(content.galleryItems, 'womencare-community-access', content.homepage.heroImage || DEFAULT_SITE_IMAGE),
    getGalleryImage(content.galleryItems, 'home-hero-outreach', content.homepage.heroImage || DEFAULT_SITE_IMAGE),
  ]

  const identityVisuals = [
    getGalleryImage(content.galleryItems, 'camp-consultation', content.homepage.heroImage || DEFAULT_SITE_IMAGE),
    getGalleryImage(content.galleryItems, 'womencare-community-access', content.homepage.heroImage || DEFAULT_SITE_IMAGE),
    getGalleryImage(content.galleryItems, 'field-presence-portrait', content.homepage.heroImage || DEFAULT_SITE_IMAGE),
  ]

  const foundationImage = '/media/field-garden-portrait.jpg'

  const focusIcons = [HeartIcon, CommunityIcon, BuildingIcon]

  return (
    <div className="pb-24">
      <section className="page-shell pt-24 md:pt-36">
        <div className="hero-shell relative px-5 py-8 md:px-10 md:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.78),transparent_18%),radial-gradient(circle_at_78%_14%,rgba(88,124,173,0.2),transparent_22%),radial-gradient(circle_at_70%_74%,rgba(15,28,44,0.08),transparent_24%)]" />
          <div className="relative z-10 grid gap-8 md:gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] lg:items-center">
            <div>
              <p className="eyebrow">Physician and public presence</p>
              <p className="mt-4 inline-flex items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-[rgba(15,28,44,0.44)] sm:mt-5 sm:text-[0.82rem] sm:tracking-[0.14em]">
                <span className="icon-chip h-8 w-8">
                  <ShieldIcon className="h-4 w-4" />
                </span>
                <span>{content.siteSettings.identityLine}</span>
              </p>
              <h1 className="mt-5 max-w-4xl font-serif text-[3rem] leading-[0.94] tracking-[-0.05em] text-[var(--primary)] sm:text-[3.45rem] md:mt-6 md:text-[5.8rem] lg:text-[7.1rem]">
                {content.homepage.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-[0.98rem] leading-7 text-[var(--muted)] sm:text-base sm:leading-8 md:mt-8 md:text-[1.12rem] md:leading-9">
                {content.homepage.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 md:mt-10">
                <Link href={content.homepage.heroPrimaryCTA.href} className="button-primary">
                  <span>{content.homepage.heroPrimaryCTA.label}</span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
                <Link href={content.homepage.heroSecondaryCTA.href} className="button-secondary">
                  {content.homepage.heroSecondaryCTA.label}
                </Link>
              </div>
            </div>
            <div className="relative z-10">
              <div className="image-frame relative aspect-[4/5] rounded-[1.4rem] md:rounded-[1.25rem]">
                <Image
                  src={content.homepage.heroImage}
                  alt={content.homepage.heroTitle}
                  fill
                  priority
                  loading="eager"
                  className="object-cover grayscale-[0.02]"
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
              </div>
              <div className="absolute -bottom-6 left-0 hidden max-w-xs bg-[var(--surface-white)] px-6 py-5 shadow-[0_18px_40px_rgba(15,28,44,0.08)] md:block">
                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.42)]">
                  Profile line
                </p>
                <p className="mt-2 font-serif text-[1.2rem] italic leading-6 text-[var(--primary)]">
                  {content.homepage.missionStatement}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tone section-space-lg mt-16">
        <div className="page-shell max-w-5xl">
          <div className="flex gap-8 md:gap-14">
            <div className="hidden w-1 shrink-0 bg-[var(--secondary)] md:block" />
            <div>
              <p className="editorial-quote text-[2.5rem] md:text-[4.1rem]">
                {content.homepage.closingStatement}
              </p>
              <p className="mt-8 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[rgba(15,28,44,0.46)]">
                Public profile
              </p>
            </div>
          </div>
        </div>
      </section>

      {motionClips.length ? (
        <section className="page-shell section-space">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">In motion</p>
              <h2 className="mt-4 font-serif text-[2.7rem] leading-[1.02] tracking-[-0.03em] text-[var(--primary)] md:text-[4rem]">
                Field presence, briefly and directly.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
              A short group of field clips keeps movement in the homepage without turning the site into a media-heavy landing page.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {motionClips.map((clip, index) => (
              <article
                key={clip.id}
                className={index === 1 ? 'panel-contrast overflow-hidden p-3 text-white' : 'panel-soft overflow-hidden p-3'}
              >
                <div className="image-frame overflow-hidden rounded-[1rem]">
                  <video
                    className="aspect-[4/5] w-full object-cover"
                    autoPlay={index === 0}
                    muted
                    loop
                    playsInline
                    preload={index === 0 ? 'metadata' : 'none'}
                    poster={clip.poster}
                  >
                    <source src={clip.src} type="video/mp4" />
                  </video>
                </div>
                <div className="px-2 pb-3 pt-5">
                  <p className={`text-[0.76rem] font-semibold uppercase tracking-[0.16em] ${index === 1 ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(15,28,44,0.46)]'}`}>
                    Clip {index + 1}
                  </p>
                  <h3 className="mt-3 font-serif text-[1.65rem] leading-tight">{clip.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${index === 1 ? 'text-[rgba(255,255,255,0.74)]' : 'text-[var(--muted)]'}`}>
                    {clip.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="page-shell section-space">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Focus areas</p>
            <h2 className="mt-4 max-w-3xl font-serif text-[3.05rem] leading-[1.02] tracking-[-0.03em] text-[var(--primary)] md:text-[4.55rem]">
              Where the profile feels most grounded.
            </h2>
          </div>
          <p className="max-w-lg text-[1.02rem] leading-8 text-[var(--muted)] md:text-[1.08rem] md:leading-9">
            The strongest overlap appears where hospital work, women&apos;s health service, and field-level public engagement meet.
          </p>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {content.homepage.focusAreas.map((item, index) => {
            const Icon = focusIcons[index] ?? BuildingIcon
            const visual = focusVisuals[index]
            return (
              <article
                key={item.title}
                className="panel-white flex h-full flex-col overflow-hidden"
              >
                <div className="px-5 pt-5 md:px-6 md:pt-6">
                  <div className="image-frame relative aspect-[4/3] rounded-[1.1rem]">
                    <Image
                      src={visual}
                      alt={item.title}
                      fill
                      className={index === 2 ? 'object-cover object-top' : 'object-cover'}
                      sizes="(min-width: 1024px) 28vw, 100vw"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-6 pb-7 pt-6 md:px-7 md:pb-8">
                  <p className="text-[0.84rem] font-semibold uppercase tracking-[0.13em] text-[rgba(15,28,44,0.46)]">
                    Focus {String(index + 1).padStart(2, '0')}
                  </p>
                  <div
                    className="icon-chip mt-5 inline-flex h-12 w-12 items-center justify-center rounded-full text-[rgba(15,28,44,0.68)]"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 max-w-[14ch] font-serif text-[2.1rem] leading-[1.03] md:text-[2.3rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-8 text-[var(--muted)] md:text-[1.04rem]">{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section-contrast section-space-lg">
        <div className="page-shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-[rgba(255,255,255,0.52)]">Clinical and educational foundation</p>
            <h2 className="mt-4 max-w-xl font-serif text-[3.2rem] leading-[0.94] tracking-[-0.04em] text-white md:text-[4.95rem]">
              A profile with institutional grounding and public reach.
            </h2>
            <p className="mt-8 max-w-lg text-[0.98rem] leading-8 text-[rgba(255,255,255,0.8)] md:text-[1.06rem] md:leading-9">
              {content.homepage.aboutPreview}
            </p>
            <div className="mt-10">
              <OrganizationStrip
                title="Referenced institutions"
                items={['bangladesh-specialized-hospital', 'tmss-medical-college', 'rajshahi-university']}
              />
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div className="space-y-8">
              {content.homepage.selectedHighlights.map((item) => (
                <article key={item.title} className="ghost-line-contrast pt-6">
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.5)]">
                    Highlight
                  </p>
                  <h3 className="mt-4 font-serif text-[2.05rem] leading-[1.05] text-white">{item.title}</h3>
                  <p className="mt-4 text-[0.96rem] leading-8 text-[rgba(255,255,255,0.76)]">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="image-frame relative min-h-[24rem] lg:min-h-[35rem]">
              <Image
                src={foundationImage}
                alt="Dr Umma Hani clinical and public foundation portrait"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 24vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Public identity</p>
            <h2 className="mt-4 font-serif text-[2.8rem] leading-[1.02] tracking-[-0.03em] text-[var(--primary)] md:text-[4rem]">
              Three strands shape the public identity.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {content.homepage.identityPillars.map((item, index) => (
              <article
                key={item.title}
              className={index === 1 ? 'panel-soft overflow-hidden p-4' : 'panel-white overflow-hidden p-4'}
            >
                <div className="image-frame relative aspect-[6/5] rounded-[1rem]">
                  <Image
                    src={identityVisuals[index] ?? content.homepage.heroImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 22vw, 100vw"
                  />
                </div>
                <div className="px-2 pb-3 pt-5">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
                    Pillar {index + 1}
                  </p>
                  <h3 className="mt-5 font-serif text-[2rem] leading-tight">{item.title}</h3>
                  <p className="mt-4 text-[1rem] leading-8 text-[var(--muted)]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <p className="eyebrow">Gallery</p>
            <h2 className="mt-4 font-serif text-[2.7rem] leading-[1.02] tracking-[-0.03em] text-[var(--primary)] md:text-[4rem]">
              Selected stills from the archive.
            </h2>
          </div>
          <Link href="/gallery" className="button-secondary hidden md:inline-flex">
            View Full Gallery
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featuredGallery.map((item, index) => (
            <div key={item.id} className={index % 2 === 1 ? 'translate-y-6 md:translate-y-10' : ''}>
              <div className="image-frame relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.altText}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 23vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="mb-10 text-center">
          <p className="eyebrow">Updates</p>
          <h2 className="mt-4 font-serif text-[2.7rem] leading-[1.02] tracking-[-0.03em] text-[var(--primary)] md:text-[4rem]">
            Dated notes from the public record.
          </h2>
        </div>
        {content.updates.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.updates.map((update) => (
              <article key={update.id} className="panel-soft overflow-hidden">
                {update.coverImage ? (
                  <div className="image-frame relative aspect-[16/10] rounded-none md:rounded-b-none">
                    <Image
                      src={update.coverImage}
                      alt={update.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 24vw, (min-width: 768px) 40vw, 100vw"
                    />
                  </div>
                ) : null}
                <div className="p-8">
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[rgba(15,28,44,0.46)]">
                    {update.category}
                  </p>
                  <h3 className="mt-4 font-serif text-[2rem] leading-tight text-[var(--primary)]">{update.title}</h3>
                  <p className="mt-3 text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[rgba(15,28,44,0.42)]">
                    {update.publishDate}
                  </p>
                  <p className="mt-5 text-sm leading-8 text-[var(--muted)]">{update.summary}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No published updates yet"
            message="Public notes are added here only when there is a clear dated record worth preserving."
          />
        )}
      </section>

      <section className="page-shell pb-8">
        <CTASection
          cta={{ href: '/contact', label: 'Write a Message' }}
          title="Professional communication, invitations, and media outreach begin here."
        />
      </section>
    </div>
  )
}
