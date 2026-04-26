import { BiographyJourneySection } from '@/src/components/home/biography-journey-section'
import { HeroProfileSection } from '@/src/components/home/hero-profile-section'
import { HomeContactSection } from '@/src/components/home/home-contact-section'
import { IdentitySnapshotSection } from '@/src/components/home/identity-snapshot-section'
import { MedicalWorkSection } from '@/src/components/home/medical-work-section'
import { MediaGallerySection } from '@/src/components/home/media-gallery-section'
import { PublicWorkSection } from '@/src/components/home/public-work-section'
import { UpdatesPreviewSection } from '@/src/components/home/updates-preview-section'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Home',
  'Dr Umma Hani is a Bangladeshi medical doctor and public-facing community leader connecting clinical service, women-focused care, and civic engagement.',
)

function uniqueById<T extends { id: string }>(items: Array<T | null>) {
  const seen = new Set<string>()

  return items.filter((item): item is T => {
    if (!item || seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

export default async function HomePage() {
  const content = await getSiteContent()
  const galleryById = new Map(content.galleryItems.map((item) => [item.id, item]))

  const latestHospitalRole = content.medicalServicePage.rolesTimeline[0]
  const womenFocusedRole =
    content.medicalServicePage.rolesTimeline.find((item) => item.title.toLowerCase().includes('gynae')) ??
    content.medicalServicePage.rolesTimeline[2]

  const biographyHighlights = [
    {
      label: 'Education',
      value: content.aboutPage.educationItems[0]?.title ?? 'MBBS',
    },
    {
      label: 'Institution',
      value: content.aboutPage.educationItems[0]?.institution ?? 'TMSS Medical College',
    },
    {
      label: 'Clinical Focus',
      value:
        content.aboutPage.personalProfileItems.find((item) => item.label === 'Clinical focus')?.value ??
        'Emergency medicine and women-focused care',
    },
    {
      label: 'Languages',
      value: content.aboutPage.credentials.slice(0, 2).join(' / '),
    },
  ]

  const journeyMilestones = [
    {
      period: content.aboutPage.educationItems[0]?.period ?? 'Academic record',
      title: 'Medical Education',
      description: content.aboutPage.educationItems[0]?.institution ?? content.aboutPage.biographyIntro,
    },
    {
      period: 'Internship Training',
      title: 'TMSS Medical College and Rafatullah Community Hospital',
      description: content.medicalServicePage.internshipSummary,
    },
    {
      period: latestHospitalRole?.period ?? 'Hospital service',
      title: 'Hospital Service',
      description: latestHospitalRole
        ? `${latestHospitalRole.title}. ${latestHospitalRole.description}`
        : content.medicalServicePage.servicePhilosophy,
    },
    {
      period: womenFocusedRole?.period ?? "Women's care",
      title: "Women-Focused Care",
      description: womenFocusedRole
        ? `${womenFocusedRole.title}. ${womenFocusedRole.description}`
        : content.publicServicePage.communityHealthBlocks[1]?.description ?? content.publicServicePage.missionText,
    },
    {
      period: content.events[0]?.period ?? 'Public record',
      title: 'Public & Community Presence',
      description:
        content.publicServicePage.outreachBlocks[0]?.description ??
        content.publicServicePage.missionText,
    },
  ]

  const medicalCards = [
    {
      title: 'Emergency Care',
      description:
        'The verified clinical record is anchored in emergency medical officer work, ward coordination, bedside communication, and practical hospital responsibility.',
      image: galleryById.get('about-doctor-portrait')?.image ?? '/media/about-doctor-portrait.jpg',
    },
    {
      title: "Women's Health",
      description:
        'Gynecology and obstetrics-linked appointments give the profile a clear women-centered care thread inside hospital and consultation settings.',
      image: galleryById.get('camp-consultation')?.image ?? '/media/camp-consultation.jpg',
    },
    {
      title: 'Health Outreach',
      description:
        content.publicServicePage.communityHealthBlocks[0]?.description ??
        'Medical-camp documentation connects clinical practice to organized public-facing healthcare outreach.',
      image: galleryById.get('medical-camp-desk')?.image ?? '/media/medical-camp-desk.jpg',
    },
  ]

  const publicWorkItems = [
    content.publicServicePage.outreachBlocks[0],
    content.publicServicePage.outreachBlocks[2] ?? content.publicServicePage.communityHealthBlocks[1],
    content.publicServicePage.communityHealthBlocks[0],
  ].filter((item): item is { description: string; title: string } => Boolean(item))

  const mediaFeature = galleryById.get('media-interview-setup') ?? galleryById.get('field-presence-portrait')

  const mediaGalleryItems = uniqueById([
    galleryById.get('media-interview-setup') ?? null,
    galleryById.get('public-discussion-greeting') ?? null,
    galleryById.get('camp-consultation') ?? null,
    galleryById.get('womencare-community-access') ?? null,
    galleryById.get('field-presence-portrait') ?? null,
    galleryById.get('community-support-circle') ?? null,
  ])

  return (
    <div className="pb-0">
      <HeroProfileSection
        fullName={content.siteSettings.fullName}
        identityLine={content.siteSettings.identityLine}
        title={content.homepage.heroTitle}
        subtitle="A medical doctor and public-facing community leader connecting clinical service, women-centered care, and civic engagement in Bangladesh."
        image={content.homepage.heroImage}
        primaryCta={{ href: '#biography', label: 'Read Biography' }}
        secondaryCta={{ href: '#contact', label: 'Contact' }}
      />

      <IdentitySnapshotSection items={content.homepage.identityPillars} />

      <BiographyJourneySection
        biography={content.aboutPage.biographyIntro}
        highlights={biographyHighlights}
        image={galleryById.get('about-doctor-portrait')?.image ?? '/media/about-doctor-portrait.jpg'}
        storyParagraphs={content.aboutPage.longFormStory}
        timeline={journeyMilestones}
        cta={{ href: '/about', label: 'Open Full Biography' }}
      />

      <MedicalWorkSection
        cards={medicalCards}
        statement={content.medicalServicePage.servicePhilosophy}
        cta={{ href: '/medical-service', label: 'Open Medical Archive' }}
      />

      <PublicWorkSection
        body={content.publicServicePage.missionText}
        cta={{ href: '/public-service', label: 'See Public Work' }}
        featureImage={galleryById.get('womencare-community-access')?.image ?? content.publicServicePage.hero.image ?? content.homepage.heroImage}
        items={publicWorkItems}
        supportingImages={[
          galleryById.get('public-leaflet-briefing')?.image ?? content.homepage.heroImage,
          galleryById.get('medical-relief-visit')?.image ?? content.homepage.heroImage,
          galleryById.get('community-support-circle')?.image ?? content.homepage.heroImage,
        ]}
      />

      <MediaGallerySection
        featuredImage={mediaFeature?.image ?? content.mediaEventsPage.hero.image ?? content.homepage.heroImage}
        featuredSummary={
          mediaFeature?.caption ??
          content.mediaEventsPage.appearanceBlocks[0]?.description ??
          content.mediaEventsPage.intro
        }
        featuredTitle={mediaFeature?.title ?? content.mediaEventsPage.hero.title}
        items={mediaGalleryItems}
      />

      <UpdatesPreviewSection items={content.updates.slice(0, 3)} />

      <HomeContactSection contactPage={content.contactPage} siteSettings={content.siteSettings} />
    </div>
  )
}
