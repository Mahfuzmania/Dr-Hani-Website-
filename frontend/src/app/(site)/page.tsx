import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Images } from 'lucide-react'
import { ContactForm } from '@/src/components/forms/contact-form'
import { SocialIcon } from '@/src/components/branding/social-icon'
import { GalleryGrid } from '@/src/components/gallery/gallery-grid'
import { MediaFeatureCard } from '@/src/components/site/media-feature-card'
import { PublicationCard } from '@/src/components/site/publication-card'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'
import { sortPublications } from '../../../../shared/publications'
import { sortActivities } from '../../../../shared/content-order'

export const metadata = buildMetadata(
  'Home',
  'Explore the photographs, medical career, community work, published writing, and media appearances of Dr Umma Hani.',
)

const publicPhotographs = [
  {
    image: '/media/women-public-rally.jpg',
    title: 'Women in public life',
    alt: 'Dr Umma Hani taking part in a public programme with women.',
  },
  {
    image: '/media/public-leaflet-briefing.jpg',
    title: 'Community conversations',
    alt: 'Dr Umma Hani distributing printed materials during community outreach.',
  },
  {
    image: '/media/community-street-walk.jpg',
    title: 'Neighbourhood visits',
    alt: 'Dr Umma Hani walking through a neighbourhood during outreach.',
  },
  {
    image: '/media/medical-relief-visit.jpg',
    title: 'Medical relief & support',
    alt: 'Dr Umma Hani at a medical relief and community support visit.',
  },
]

export default async function HomePage() {
  const content = await getSiteContent()
  const { homepage, profile, siteSettings, contact } = content
  const essays = sortPublications(
    content.publications.filter((item) => item.kind === 'essay' && item.featured),
  ).slice(0, 3)
  const activities = sortActivities(content.updates).slice(0, 3)
  const gallery = content.galleryItems
    .filter((item) => item.featuredOnHomepage)
    .sort((a, b) => a.sortOrder - b.sortOrder)
  const videos = content.mediaItems.filter((item) => item.type === 'video')
  const featuredVideo = videos.find((item) => item.featuredOnHomepage) || videos[0]
  const supportingVideos = videos.filter((item) => item.id !== featuredVideo?.id).slice(0, 4)
  const career = profile.journeyTimeline.filter((item) =>
    /Medical Officer|Bangladesh Specialized Hospital/.test(item.title),
  )
  const positions = content.positions.filter((item) => item.featured)
  const notice = content.importantNotices.find((item) => item.pinned)

  return (
    <div className="photo-home">
      {homepage.sectionVisibility.profile && (
        <section id="profile" className="page-shell anchor-offset">
          <div className="hero-surface photographic-hero">
            <div className="photographic-hero-copy">
              <p className="profile-identity">{siteSettings.identityLine}</p>
              <h1>{homepage.heroTitle}</h1>
              <p className="profile-introduction">{homepage.heroSubtitle}</p>
              <div className="profile-actions">
                <Link className="button-primary" href="/gallery">
                  <Images size={18} />
                  Explore gallery
                </Link>
                <Link className="button-secondary" href="/about">
                  Read biography
                  <ArrowUpRight size={18} />
                </Link>
              </div>
              <div className="profile-summary">
                <span>Professional background</span>
                <p>{homepage.biographySummary}</p>
              </div>
              <div className="profile-credentials">
                {profile.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            </div>
            <figure className="photographic-hero-image">
              <Image
                src={homepage.heroImage}
                alt="Dr Umma Hani seated at a public event"
                fill
                priority
                sizes="(min-width:1024px) 43vw, 94vw"
                className="object-cover"
              />
            </figure>
            <div className="profile-credentials profile-credentials-mobile">
              {profile.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>
          <div className="profile-explore">
            <span>Her work, through the moments that shape it.</span>
            <a href="#photographs">
              Discover the photographs
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      )}

      {homepage.sectionVisibility.media && (
        <section id="photographs" className="page-shell photo-section anchor-offset">
          <div className="photo-section-heading">
            <div>
              <h2>A life in photographs.</h2>
              <p>Medical service, community encounters, and conversations in public life.</p>
            </div>
            <Link className="text-link" href="/gallery">
              The complete gallery
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <GalleryGrid items={gallery} portfolio />
          <div className="gallery-endnote">
            <span>Explore a photograph to view the full image and caption.</span>
            <Link href="/gallery">
              More photographs
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      )}

      {homepage.sectionVisibility.journey && (
        <section id="journey" className="page-shell photo-section anchor-offset">
          <div className="career-story">
            <figure className="career-portrait">
              <Image
                src="/media/about-doctor-portrait.jpg"
                alt="Dr Umma Hani seated in medical dress in a hospital setting"
                fill
                sizes="(min-width:1024px) 32vw, 92vw"
                className="object-cover object-top"
              />
              <figcaption>Dr Umma Hani · Medical service</figcaption>
            </figure>
            <div className="career-story-copy">
              <h2>
                A foundation in medicine.
                <br />A commitment to people.
              </h2>
              <p>{profile.storyParagraphs[1] || homepage.biographySummary}</p>
              <div className="education-record">
                <div>
                  <Image
                    src="/branding/organizations/tmss-medical-college.png"
                    alt="TMSS Medical College logo"
                    width={50}
                    height={50}
                  />
                  <span>
                    Medical education<strong>TMSS Medical College</strong>
                  </span>
                </div>
                <div>
                  <Image
                    src="/branding/organizations/rajshahi-university.png"
                    alt="Rajshahi University logo"
                    width={50}
                    height={50}
                  />
                  <span>
                    University<strong>Rajshahi University</strong>
                  </span>
                </div>
              </div>
              <Link className="text-link" href="/about">
                Education, internship & experience
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
          {career.length > 0 && (
            <div className="career-appointments">
              {career.map((item) => (
                <article key={item.title}>
                  <p>{item.period}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {homepage.sectionVisibility.medicalWork && (
        <section id="medical-work" className="medical-portfolio photo-section anchor-offset">
          <div className="page-shell">
            <div className="photo-section-heading">
              <div>
                <h2>Care, in practice.</h2>
                <p>Hospital experience, women’s health, and community healthcare.</p>
              </div>
              <Link className="text-link" href="/about">
                Professional journey
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="medical-portfolio-feature">
              <figure>
                <Image
                  src="/media/clinic-corridor-portrait.jpg"
                  alt="Dr Umma Hani in a hospital corridor"
                  fill
                  sizes="(min-width:1024px) 45vw, 92vw"
                  className="object-cover"
                />
              </figure>
              <div>
                <h3>
                  Hospital service.
                  <br />
                  Human connection.
                </h3>
                <p>
                  Her clinical career includes medical officer service in Dhaka and earlier Gynae
                  and Obs appointments in Bogura. Medical camps and community health programmes
                  extend that work beyond the hospital.
                </p>
                <Link className="text-link" href="/media-events">
                  Health programmes in the news
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
            <div className="clinical-cards">
              {profile.medicalCards.map((card) => (
                <article key={card.title}>
                  <figure>
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width:1024px) 30vw, 92vw"
                      className="object-cover"
                    />
                  </figure>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {homepage.sectionVisibility.publicWork && (
        <section id="public-work" className="page-shell photo-section anchor-offset">
          <div className="photo-section-heading">
            <div>
              <h2>Among people. In community.</h2>
              <p>Neighbourhood visits, health programmes, and public activity.</p>
            </div>
            <Link className="text-link" href="/updates">
              Activities & updates
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="public-photo-story">
            {publicPhotographs.map((photo) => (
              <Link
                key={photo.image}
                href={`/gallery#photo-${photo.image.split('/').pop()?.replace('.jpg', '')}`}
                className="public-story-image"
              >
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(min-width:1024px) 47vw, 92vw"
                  className="object-cover"
                />
                <span>
                  {photo.title}
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
          <div className="public-story-notes">
            {profile.publicWorkCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          {positions.length > 0 && (
            <div className="public-appointments">
              {positions.map((item) => (
                <article key={item.id}>
                  <h3>
                    {item.title} · {item.organization}
                  </h3>
                  <p>{item.description}</p>
                  {item.sourceLink && (
                    <a
                      className="text-link"
                      href={item.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read source
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      <section id="writing" className="page-shell photo-section anchor-offset">
        <div className="writing-feature-surface">
          <div className="photo-section-heading">
            <div>
              <h2>Writing & perspectives.</h2>
              <p>Her published voice on women, health, and public life.</p>
            </div>
            <Link className="text-link" href="/writing">
              All essays
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="writing-preview">
            {essays.map((item) => (
              <PublicationCard key={item.id} item={item} compact />
            ))}
          </div>
          {!essays.length && (
            <p className="reading-copy">New writing will appear here when published.</p>
          )}
        </div>
      </section>

      {homepage.sectionVisibility.media && (
        <section id="media" className="page-shell photo-section anchor-offset">
          <div className="photo-section-heading">
            <div>
              <h2>Interviews & appearances.</h2>
              <p>Conversations on camera and moments from the field.</p>
            </div>
            <Link className="text-link" href="/media-events">
              Press & media
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="portfolio-videos">
            {featuredVideo && (
              <article className="portfolio-featured-video">
                <h3>{featuredVideo.title}</h3>
                <MediaFeatureCard
                  title={featuredVideo.title}
                  description={featuredVideo.description}
                  thumbnail={featuredVideo.thumbnail}
                  type={featuredVideo.type}
                  url={featuredVideo.url}
                  tone="light"
                />
              </article>
            )}
            <div className="portfolio-supporting-videos">
              {supportingVideos.map((item) => (
                <article key={item.id}>
                  <MediaFeatureCard
                    title={item.title}
                    description={item.description}
                    thumbnail={item.thumbnail}
                    type={item.type}
                    url={item.url}
                    size="compact"
                    tone="light"
                  />
                  <h3>{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
          {!videos.length && <p className="reading-copy">No videos are currently published.</p>}
        </section>
      )}

      {homepage.sectionVisibility.updates && (
        <section id="updates" className="page-shell photo-section anchor-offset">
          <div className="photo-section-heading">
            <div>
              <h2>Recent activities.</h2>
              <p>Healthcare, community programmes, and public discussions.</p>
            </div>
            <Link className="text-link" href="/updates">
              All updates
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="portfolio-activities">
            {activities.map((item) => (
              <article key={item.slug}>
                {item.image && (
                  <Link className="activity-photo" href={`/updates/${item.slug}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width:1024px) 30vw, 92vw"
                      className="object-cover"
                    />
                  </Link>
                )}
                <div>
                  <p className="publication-meta">
                    {item.date} · {item.category}
                  </p>
                  <h3>
                    <Link href={`/updates/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p>{item.summary}</p>
                  <Link className="text-link" href={`/updates/${item.slug}`}>
                    Read activity
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {!activities.length && (
            <p className="reading-copy">No activities are currently published.</p>
          )}
          {notice && (
            <aside className="portfolio-notice">
              <strong>{notice.title}</strong>
              <p>{notice.message}</p>
            </aside>
          )}
        </section>
      )}

      {homepage.sectionVisibility.contact && (
        <section id="contact" className="contact-section anchor-offset">
          <div className="page-shell contact-layout">
            <div>
              <h2>Let’s connect.</h2>
              <p>{contact.intro}</p>
              <a className="contact-email" href={`mailto:${siteSettings.primaryEmail}`}>
                {siteSettings.primaryEmail}
              </a>
              <div className="social-text-links">
                {siteSettings.socialLinks.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                    <SocialIcon label={item.label} />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <ContactForm inquiryTypes={contact.inquiryTypes} />
          </div>
        </section>
      )}
    </div>
  )
}
