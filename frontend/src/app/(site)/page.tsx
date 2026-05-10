import Image from 'next/image'
import Link from 'next/link'

import { ContactForm } from '@/src/components/forms/contact-form'
import { SocialIcon } from '@/src/components/branding/social-icon'
import { FadeUp, ImageReveal, StaggerGroup, StaggerItem } from '@/src/components/motion/reveal'
import { MediaFeatureCard } from '@/src/components/site/media-feature-card'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Home',
  "Dr Umma Hani is a Bangladeshi physician whose work connects clinical service, women's health, and community leadership.",
)

const mediaLabels = {
  medical: 'Medical Service',
  community: 'Community Visit',
  events: 'Events',
  leadership: 'Field Visit',
} as const

const mediaSectionLabels = ['Medical Service', 'Interview', 'Community Visit', 'Public Program', 'Field Visit'] as const

function mediaItemLabel(item: { category: keyof typeof mediaLabels; id: string }) {
  if (item.id.includes('interview')) return 'Interview'
  if (item.id.includes('nomination')) return 'Public Program'
  if (item.id.includes('women')) return 'Community Visit'
  if (item.id.includes('medical')) return 'Medical Service'
  if (item.id.includes('field')) return 'Field Visit'

  return mediaLabels[item.category]
}

export default async function HomePage() {
  const content = await getSiteContent()
  const { homepage, profile, siteSettings, contact } = content
  const publishedMedia = content.mediaItems.filter((item) => item.status === 'published')
  const videoItems = publishedMedia.filter((item) => item.type === 'video')
  const featuredVideo = videoItems.find((item) => item.featuredOnHomepage) ?? videoItems[0]
  const supportingVideos = videoItems.filter((item) => item.id !== featuredVideo?.id).slice(0, 4)
  const galleryPreview = content.galleryItems
    .filter((item) => item.featuredOnHomepage && item.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 6)
  const featuredUpdates = content.updates
    .filter((item) => item.status === 'published')
    .sort((a, b) => Number(Boolean(b.pinned || b.featured)) - Number(Boolean(a.pinned || a.featured)))
    .slice(0, 3)
  const featuredPositions = content.positions
    .filter((item) => item.status === 'published' && item.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3)
  const pinnedNotice = content.importantNotices.find((item) => item.pinned && item.status === 'published')
  const careerAppointments = profile.journeyTimeline.filter((item) =>
    [
      'Indoor Medical Officer, Gynae and Obs',
      'Honorary Medical Officer, Gynae and Obs',
      'Emergency Medical Officer at Famous Specialized Hospital',
      'Emergency Medical Officer at Bangladesh Specialized Hospital',
    ].includes(item.title),
  )

  return (
    <div className="pb-0 pt-24 md:pt-32">
      {homepage.sectionVisibility.profile ? (
        <section id="profile" className="anchor-offset page-shell">
          <div className="hero-surface px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-9 lg:px-10 lg:py-10">
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <StaggerGroup className="min-w-0 text-center lg:text-left">
                <StaggerItem>
                  <p className="eyebrow max-w-full flex-wrap justify-center text-[0.58rem] tracking-[0.08em] text-[var(--muted)] before:hidden sm:text-[0.68rem] sm:tracking-[0.14em] sm:before:block lg:justify-start">
                    {homepage.heroEyebrow}
                  </p>
                </StaggerItem>
                <StaggerItem>
                <h1 className="section-title mx-auto mt-5 max-w-full text-[clamp(2.55rem,12.5vw,3.35rem)] text-[var(--navy)] sm:max-w-3xl sm:text-[4.2rem] md:text-[5.2rem] lg:mx-0 lg:text-[6rem]">
                  {homepage.heroTitle}
                </h1>
                </StaggerItem>
                <StaggerItem>
                <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-8 text-[var(--muted)] md:text-[1.12rem] md:leading-9 lg:mx-0">
                  {homepage.heroSubtitle}
                </p>
                </StaggerItem>
                <StaggerItem>
                <div className="mt-7 grid gap-3 sm:inline-flex sm:justify-center lg:justify-start">
                  <Link href="#journey" className="button-primary w-full px-6 py-4 text-[0.76rem] font-semibold uppercase tracking-[0.18em] sm:w-auto">
                    {homepage.ctaPrimaryLabel}
                  </Link>
                  <Link href="#contact" className="button-secondary w-full px-6 py-4 text-[0.76rem] font-semibold uppercase tracking-[0.18em] sm:w-auto">
                    {homepage.ctaSecondaryLabel}
                  </Link>
                </div>
                </StaggerItem>
                <StaggerItem>
                <div className="mt-8 hidden max-w-2xl border-l border-[rgba(214,176,75,0.52)] pl-4 text-left lg:block">
                  <p className="text-[0.77rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    Professional Summary
                  </p>
                  <p className="mt-3 text-[0.96rem] leading-8 text-[var(--muted)]">{homepage.biographySummary}</p>
                </div>
                </StaggerItem>
              </StaggerGroup>

              <ImageReveal className="relative">
                <div className="media-frame media-hover relative mx-auto aspect-[4/5] w-full max-w-[25rem] sm:max-w-[28rem] lg:max-w-[34rem]">
                  <Image
                    src={homepage.heroImage}
                    alt={siteSettings.fullName}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
              </ImageReveal>
            </div>

            <StaggerGroup className="relative z-10 mt-7 grid gap-3 sm:grid-cols-3 lg:mt-9 xl:max-w-2xl">
                  {profile.badges.slice(0, 3).map((badge) => (
                    <StaggerItem
                      key={badge}
                      className="identity-chip inline-flex items-center justify-center px-4 py-3 text-center text-[0.73rem] font-semibold uppercase tracking-[0.16em] text-[var(--navy)]"
                    >
                      {badge}
                    </StaggerItem>
                  ))}
            </StaggerGroup>
          </div>
        </section>
      ) : null}

      <section className="page-shell section-shell">
        <FadeUp>
        <div className="section-frame px-5 py-7 md:px-8 md:py-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-[var(--muted)]">Identity Snapshot</p>
              <h2 className="section-title mt-4 max-w-3xl text-[2.9rem] text-[var(--navy)] md:text-[4.2rem]">
                Medical service, women&apos;s health, and community leadership in one public journey.
              </h2>
            </div>
            <p className="max-w-xl text-[1rem] leading-8 text-[var(--muted)]">
              Her profile brings together three clear strands: clinical service, women&apos;s health, and community work.
            </p>
          </div>
          <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {homepage.identityCards.map((item, index) => (
              <StaggerItem key={item.title}>
              <article
                className={`${index === 2 ? 'panel-contrast' : 'panel-solid'} editorial-card p-7 md:min-h-[19rem]`}
              >
                <p className={`text-[0.74rem] font-semibold uppercase tracking-[0.18em] ${index === 2 ? 'text-white/62' : 'text-[var(--muted)]'}`}>
                  Identity {String(index + 1).padStart(2, '0')}
                </p>
                <div className="detail-rule mt-5 max-w-[6rem]" />
                <h3 className="mt-5 font-serif text-[2rem] leading-tight">{item.title}</h3>
                <p className={`mt-4 text-[1rem] leading-8 ${index === 2 ? 'text-white/78' : 'text-[var(--muted)]'}`}>{item.body}</p>
              </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
        </FadeUp>
      </section>

      {featuredPositions.length ? (
        <section className="page-shell pb-4">
          <FadeUp>
            <div className="milestone-band grid gap-6 px-5 py-7 md:px-8 md:py-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="eyebrow text-[var(--muted)]">Leadership Milestone</p>
                <h2 className="section-title mt-4 max-w-xl text-[2.6rem] text-[var(--navy)] md:text-[3.65rem]">
                  A new leadership responsibility in public service.
                </h2>
                <p className="mt-5 max-w-xl text-[0.98rem] leading-8 text-[var(--muted)]">
                  Dr Umma Hani&apos;s public work now includes a central Vice-President role with Bangladesh Jatiyatabadi Chhatra Dal.
                </p>
              </div>
              <div className="grid gap-4">
                {featuredPositions.map((position) => (
                  <article key={position.id} className="position-card grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
                        {position.period}
                      </p>
                      <h3 className="mt-3 font-serif text-[2rem] leading-tight text-[var(--navy)]">
                        {position.title}
                      </h3>
                      <p className="mt-2 text-[0.86rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                        {[position.organization, position.branch].filter(Boolean).join(' - ')}
                      </p>
                      <p className="mt-4 text-[0.98rem] leading-8 text-[var(--muted)]">{position.description}</p>
                    </div>
                    {position.image ? (
                      <div className="media-frame media-hover relative aspect-[4/3] w-full md:w-44">
                        <Image src={position.image} alt={position.title} fill className="object-cover" sizes="176px" />
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>
      ) : null}

      {homepage.sectionVisibility.journey ? (
        <section
          id="journey"
          className="anchor-offset section-shell bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.08))]"
        >
          <div className="page-shell grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
            <div className="xl:h-fit">
              <FadeUp>
              <p className="eyebrow text-[var(--muted)]">CV-Based Biography</p>
              <h2 className="section-title mt-4 max-w-xl text-[2.9rem] text-[var(--navy)] md:text-[4.15rem]">
                Education, internship, and hospital appointments from her CV.
              </h2>
              <p className="mt-6 text-[1.02rem] leading-8 text-[var(--muted)]">{homepage.biographySummary}</p>
              </FadeUp>
              <ImageReveal className="media-frame media-hover relative mt-8 aspect-[4/5]">
                <Image
                  src="/media/about-doctor-portrait.jpg"
                  alt="Dr Umma Hani clinical portrait"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 32vw, 100vw"
                />
              </ImageReveal>
            </div>

            <div className="grid gap-6">
              <FadeUp>
              <article className="panel-solid editorial-card p-7 md:p-8">
                {profile.storyParagraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 first:mt-0 text-[1rem] leading-8 text-[var(--muted)]">
                    {paragraph}
                  </p>
                ))}
              </article>
              </FadeUp>
              <FadeUp delay={0.08}>
              <article className="panel-glass editorial-card timeline-scroll-panel p-7 md:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="eyebrow text-[var(--muted)]">Experience Timeline</p>
                    <h3 className="mt-4 font-serif text-[2.25rem] leading-tight text-[var(--navy)] md:text-[2.8rem]">
                      Education, hospital service, and public work
                    </h3>
                  </div>
                  <p className="max-w-md text-[0.93rem] leading-7 text-[var(--muted)]">
                    Key milestones from her education, hospital work, health-service activity, and leadership responsibilities.
                  </p>
                </div>
                <div className="timeline-scroll mt-8 space-y-0">
                  {profile.journeyTimeline.map((item, index) => (
                    <article
                      key={`${item.title}-${item.period}`}
                      className={`${index === 0 ? '' : 'border-t border-[var(--section-line)]'} grid gap-4 py-6 md:grid-cols-[12rem_1fr]`}
                    >
                      <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {item.period}
                      </p>
                      <div>
                        <h4 className="font-serif text-[1.68rem] leading-tight text-[var(--navy)]">{item.title}</h4>
                        <p className="mt-3 text-[0.98rem] leading-8 text-[var(--muted)]">{item.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </article>
              </FadeUp>
            </div>
          </div>
        </section>
      ) : null}

      {homepage.sectionVisibility.medicalWork ? (
        <section id="medical-work" className="anchor-offset page-shell section-shell">
          <FadeUp className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-[var(--muted)]">Medical Work and Women&apos;s Health</p>
              <h2 className="section-title mt-4 max-w-3xl text-[2.9rem] text-[var(--navy)] md:text-[4rem]">
                Hospital appointments and women&apos;s health work shown as a clear career path.
              </h2>
            </div>
            <p className="max-w-xl text-[1rem] leading-8 text-[var(--muted)]">
              Her medical work includes emergency service, women&apos;s health appointments, and patient-facing hospital responsibility.
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
          <article className="panel-solid editorial-card mt-8 overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
              <div className="media-frame media-hover relative aspect-[16/11] rounded-none lg:aspect-auto lg:min-h-[25rem]">
                <Image
                  src="/media/bedside-review.jpg"
                  alt="Bangladesh Specialized Hospital clinical service"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
              <div className="p-6 md:p-8 lg:p-10">
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Current Hospital Appointment
                </p>
                <h3 className="mt-4 font-serif text-[2.35rem] leading-tight text-[var(--navy)] md:text-[3.25rem]">
                  Bangladesh Specialized Hospital
                </h3>
                <p className="mt-5 text-[1.02rem] leading-8 text-[var(--muted)]">
                  Emergency Medical Officer at Bangladesh Specialized Hospital, 21 Mirpur Road, Dhaka 1207.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="identity-chip px-4 py-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Role</p>
                    <p className="mt-2 font-serif text-[1.22rem] leading-6 text-[var(--navy)]">Emergency Medical Officer</p>
                  </div>
                  <div className="identity-chip px-4 py-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Status</p>
                    <p className="mt-2 font-serif text-[1.22rem] leading-6 text-[var(--navy)]">Current appointment</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
          </FadeUp>
          <FadeUp delay={0.12}>
          <article className="panel-glass editorial-card mt-8 p-6 md:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-[var(--muted)]">Career Appointments</p>
                <h3 className="mt-4 font-serif text-[2.1rem] leading-tight text-[var(--navy)] md:text-[2.8rem]">
                  Hospital appointments from the CV
                </h3>
              </div>
              <p className="max-w-xl text-[0.96rem] leading-7 text-[var(--muted)]">
                Selected appointments from her medical education and hospital career.
              </p>
            </div>
            <StaggerGroup className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {careerAppointments.map((item, index) => (
                <StaggerItem key={`${item.title}-${item.period}`}>
                <article
                  className={`${index === careerAppointments.length - 1 ? 'panel-contrast' : 'panel-solid'} editorial-card p-5 md:min-h-[15rem]`}
                >
                  <p
                    className={`text-[0.74rem] font-semibold uppercase tracking-[0.18em] ${
                      index === careerAppointments.length - 1 ? 'text-white/62' : 'text-[var(--muted)]'
                    }`}
                  >
                    {item.period}
                  </p>
                  <div className="detail-rule mt-4 max-w-[5rem]" />
                  <h4 className="mt-4 font-serif text-[1.5rem] leading-tight">{item.title}</h4>
                  <p
                    className={`mt-3 text-[0.94rem] leading-7 ${
                      index === careerAppointments.length - 1 ? 'text-white/78' : 'text-[var(--muted)]'
                    }`}
                  >
                    {item.description}
                  </p>
                </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </article>
          </FadeUp>
          <StaggerGroup className="mt-10 grid gap-5 xl:grid-cols-3">
            {profile.medicalCards.map((card, index) => (
              <StaggerItem key={card.title}>
              <article
                className={`${index === 1 ? 'panel-contrast' : 'panel-solid'} editorial-card overflow-hidden`}
              >
                <div className="media-frame media-hover relative aspect-[4/3] rounded-none">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <p className={`text-[0.74rem] font-semibold uppercase tracking-[0.18em] ${index === 1 ? 'text-white/60' : 'text-[var(--muted)]'}`}>
                    Medical Work
                  </p>
                  <h3 className="mt-4 font-serif text-[1.95rem] leading-tight">{card.title}</h3>
                  <p className={`mt-4 text-[0.98rem] leading-8 ${index === 1 ? 'text-white/78' : 'text-[var(--muted)]'}`}>{card.body}</p>
                </div>
              </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      ) : null}

      {homepage.sectionVisibility.publicWork ? (
        <section id="public-work" className="anchor-offset contrast-surface section-shell text-white">
          <div className="page-shell grid gap-10 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
            <FadeUp>
              <p className="eyebrow text-white/64">Public Service and Leadership</p>
              <h2 className="section-title mt-4 max-w-2xl text-[2.95rem] md:text-[4.15rem]">
                Health service, community contact, and leadership work.
              </h2>
              <p className="mt-6 max-w-xl text-[1rem] leading-8 text-white/80">
                Her public work includes student health-service programs, community outreach, media appearances, and leadership responsibilities.
              </p>
              <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-3">
                {profile.publicWorkCards.map((item) => (
                  <StaggerItem key={item.title}>
                  <article key={item.title} className="panel-contrast-soft editorial-card px-5 py-5 text-white">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/60">
                      Public work
                    </p>
                    <h3 className="mt-4 font-serif text-[1.5rem] leading-tight">{item.title}</h3>
                    <p className="mt-3 text-[0.92rem] leading-7 text-white/78">{item.body}</p>
                  </article>
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <article className="panel-contrast-soft mt-8 px-6 py-5 text-white">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Public milestones
                </p>
                <div className="mt-4 space-y-4">
                  <div className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--sky)]">
                      25 September 2025
                    </p>
                    <p className="mt-2 text-[0.96rem] leading-7 text-white/80">
                      Amar Sangbad named Dr Umma Hani among the doctors serving a Jagannath University student health-service and medicine-distribution program.
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--gold-soft)]">
                      11 April 2026
                    </p>
                    <p className="mt-2 text-[0.96rem] leading-7 text-white/80">
                      Jagonews24 reported that Dr Umma Hani collected a BNP nomination form and identified her as Health Secretary of Chhatra Dal, Bogura District Branch.
                    </p>
                  </div>
                </div>
              </article>
            </FadeUp>

            <StaggerGroup className="grid gap-4 md:grid-cols-2">
              <StaggerItem className="md:row-span-2">
              <div className="media-frame media-hover relative aspect-[4/5] h-full">
                <Image
                  src="/media/women-public-rally.jpg"
                  alt="Women participating in a public program"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1280px) 24vw, 100vw"
                />
              </div>
              </StaggerItem>
              <StaggerItem>
              <div className="media-frame media-hover relative aspect-[4/3]">
                <Image
                  src="/media/public-leaflet-briefing.jpg"
                  alt="Printed public outreach"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 18vw, 100vw"
                />
              </div>
              </StaggerItem>
              <StaggerItem>
              <div className="media-frame media-hover relative aspect-[4/3]">
                <Image
                  src="/media/community-street-walk.jpg"
                  alt="Neighborhood walk-through"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 18vw, 100vw"
                />
              </div>
              </StaggerItem>
              <StaggerItem className="md:col-span-2">
              <div className="media-frame media-hover relative aspect-[4/3]">
                <Image
                  src="/media/medical-relief-visit.jpg"
                  alt="Medical relief and community support visit"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 38vw, 100vw"
                />
              </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>
      ) : null}

      {homepage.sectionVisibility.media ? (
        <section id="media" className="anchor-offset page-shell section-shell">
          <FadeUp className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-[var(--muted)]">Media and Gallery Preview</p>
              <h2 className="section-title mt-4 max-w-3xl text-[2.9rem] text-[var(--navy)] md:text-[4rem]">
                Media appearances, videos, and photo highlights.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {mediaSectionLabels.map((chip) => (
                <span
                  key={chip}
                  className="premium-chip px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--navy)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </FadeUp>

          <div className="mt-10 grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
            <FadeUp>
            <article className="panel-contrast editorial-card p-6 md:p-7">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white/60">Featured Video</p>
              <h3 className="mt-4 font-serif text-[2rem] leading-tight md:text-[2.45rem]">
                {featuredVideo?.title}
              </h3>
              {featuredVideo ? (
                <div className="mt-6">
                  <MediaFeatureCard
                    description={featuredVideo.description}
                    thumbnail={featuredVideo.thumbnail}
                    title={featuredVideo.title}
                    type={featuredVideo.type}
                    url={featuredVideo.url}
                  />
                </div>
              ) : null}
            </article>
            </FadeUp>

            <FadeUp delay={0.08}>
            <article className="panel-glass editorial-card p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Video Selection
                  </p>
                  <h3 className="mt-2 font-serif text-[2rem] leading-tight text-[var(--navy)]">
                    Videos and appearances
                  </h3>
                </div>
              </div>

              <StaggerGroup className="grid gap-4 sm:grid-cols-2">
                {supportingVideos.map((item) => (
                  <StaggerItem key={item.id}>
                    <article>
                      <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        {mediaItemLabel(item)}
                      </p>
                      <h4 className="mb-3 font-serif text-[1.34rem] leading-6 text-[var(--navy)]">{item.title}</h4>
                      <MediaFeatureCard
                        description={item.description}
                        thumbnail={item.thumbnail}
                        title={item.title}
                        type={item.type}
                        url={item.url}
                        size="compact"
                        tone="light"
                      />
                    </article>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </article>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <article className="panel-glass editorial-card mt-5 p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Photo Selection
                  </p>
                    <h3 className="mt-2 font-serif text-[2rem] leading-tight text-[var(--navy)]">
                    Photo highlights
                  </h3>
                </div>
              </div>

              <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {galleryPreview.map((item) => (
                  <StaggerItem key={item.id}>
                  <figure>
                    <div className="media-frame media-hover relative aspect-[4/5]">
                      <Image
                        src={item.image}
                        alt={item.altText}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 18vw, (min-width: 640px) 45vw, 100vw"
                      />
                    </div>
                    <figcaption className="mt-3">
                      <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        {mediaLabels[item.category]}
                      </p>
                      <p className="mt-2 font-serif text-[1.18rem] leading-6 text-[var(--navy)]">{item.title}</p>
                    </figcaption>
                  </figure>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </article>
          </FadeUp>
        </section>
      ) : null}

      {homepage.sectionVisibility.updates ? (
        <section
          id="updates"
          className="anchor-offset section-shell bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.08))]"
        >
          <div className="page-shell">
            <FadeUp className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-[var(--muted)]">Updates and Important Notices</p>
                <h2 className="section-title mt-4 max-w-3xl text-[2.9rem] text-[var(--navy)] md:text-[4rem]">
                  Latest news, notices, and public updates.
                </h2>
              </div>
              <p className="max-w-xl text-[1rem] leading-8 text-[var(--muted)]">
                Follow recent healthcare activity, public programs, media coverage, and official notices.
              </p>
            </FadeUp>

            {pinnedNotice ? (
              <FadeUp delay={0.08}>
              <article className="panel-solid editorial-card mt-8 px-6 py-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Pinned Notice
                </p>
                <h3 className="mt-3 font-serif text-[1.9rem] leading-tight text-[var(--navy)]">{pinnedNotice.title}</h3>
                <p className="mt-3 max-w-4xl text-[0.98rem] leading-8 text-[var(--muted)]">{pinnedNotice.message}</p>
              </article>
              </FadeUp>
            ) : null}

            <StaggerGroup className="mt-8 grid gap-5 xl:grid-cols-3">
              {featuredUpdates.map((item, index) => (
                <StaggerItem key={item.slug}>
                <article
                  className={`${index === 1 ? 'panel-contrast' : 'panel-solid'} editorial-card overflow-hidden`}
                >
                  {item.image ? (
                    <div className="media-frame media-hover relative aspect-[16/10] rounded-none">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 28vw, 100vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-6 md:p-7">
                    <p className={`text-[0.74rem] font-semibold uppercase tracking-[0.18em] ${index === 1 ? 'text-white/60' : 'text-[var(--muted)]'}`}>
                      {item.category}
                    </p>
                    <h3 className="mt-4 font-serif text-[1.82rem] leading-tight">{item.title}</h3>
                    <p className={`mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] ${index === 1 ? 'text-white/56' : 'text-[var(--muted)]'}`}>
                      {item.date}
                    </p>
                    <p className={`mt-4 text-[0.98rem] leading-8 ${index === 1 ? 'text-white/78' : 'text-[var(--muted)]'}`}>{item.summary}</p>
                    <div className="mt-6">
                      <Link
                        href={`/updates/${item.slug}`}
                        className={index === 1 ? 'button-ghost px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em]' : 'button-secondary px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em]'}
                      >
                        Read Update
                      </Link>
                    </div>
                  </div>
                </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      ) : null}

      {homepage.sectionVisibility.contact ? (
        <section id="contact" className="anchor-offset contrast-surface section-shell text-white">
          <div className="page-shell grid gap-8 xl:grid-cols-[0.96fr_1.04fr]">
            <FadeUp>
              <p className="eyebrow text-white/64">Contact and Communication</p>
              <h2 className="section-title mt-4 max-w-2xl text-[2.9rem] md:text-[4rem]">
                Professional correspondence, invitations, and community-service communication.
              </h2>
              <p className="mt-6 max-w-xl text-[1rem] leading-8 text-white/80">{contact.intro}</p>
              <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <StaggerItem>
                <article className="panel-contrast-soft editorial-card px-5 py-5 text-white">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/60">Public Email</p>
                  <p className="mt-3 font-serif text-[1.3rem] leading-6">{siteSettings.primaryEmail}</p>
                </article>
                </StaggerItem>
                <StaggerItem>
                <article className="panel-contrast-soft editorial-card px-5 py-5 text-white">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/60">Inquiry Scope</p>
                  <p className="mt-3 text-[0.94rem] leading-7 text-white/78">Professional, medical, public-service, leadership, and media communication.</p>
                </article>
                </StaggerItem>
              </StaggerGroup>
              <div className="mt-8 flex flex-wrap gap-3">
                {siteSettings.socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="premium-chip-contrast inline-flex items-center gap-2 px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white"
                  >
                    <SocialIcon label={item.label} />
                    {item.label}
                  </a>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <ContactForm inquiryTypes={contact.inquiryTypes} />
            </FadeUp>
          </div>
        </section>
      ) : null}
    </div>
  )
}
