import Image from 'next/image'
import Link from 'next/link'
import { ContactForm } from '@/src/components/forms/contact-form'
import { MediaFeatureCard } from '@/src/components/site/media-feature-card'
import { PublicationCard } from '@/src/components/site/publication-card'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'
import { sortPublications } from '../../../../shared/publications'
import { sortActivities } from '../../../../shared/content-order'

export const metadata = buildMetadata(
  'Home',
  'Dr Umma Hani: physician, columnist, and community participant. Explore her medical career, published writing, and public work.',
)

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
    .slice(0, 3)
  const video = content.mediaItems.find((item) => item.type === 'video' && item.featuredOnHomepage)
  return (
    <div className="home-page">
      {homepage.sectionVisibility.profile && (
        <section id="profile" className="page-shell anchor-offset">
          <div className="portfolio-hero">
            <div className="hero-copy">
              <p className="identity-line">{siteSettings.identityLine}</p>
              <h1>{homepage.heroTitle}</h1>
              <p className="hero-description">{homepage.heroSubtitle}</p>
              <div className="hero-actions">
                <Link className="button-primary" href="/about">
                  About Dr Hani
                </Link>
                <Link className="button-secondary" href="/writing">
                  Explore her writing
                </Link>
              </div>
              <p className="hero-note">Medicine, thoughtful writing, and a connection to community.</p>
            </div>
            <div className="hero-portrait">
              <Image
                src={homepage.heroImage}
                alt="Dr Umma Hani seated at a public event"
                fill
                priority
                sizes="(min-width:1024px) 44vw, 94vw"
                className="object-cover"
              />
              <span className="portrait-caption">Dr Umma Hani</span>
            </div>
          </div>
        </section>
      )}
      <section id="writing" className="page-shell editorial-section anchor-offset">
        <div className="section-heading">
          <div>
            <h2>Writing & perspectives</h2>
            <p>Ideas on women, health, and public life.</p>
          </div>
          <Link className="text-link" href="/writing">
            All writing <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {essays.length ? (
          <div className="writing-preview">
            {essays.map((item) => (
              <PublicationCard key={item.id} item={item} compact />
            ))}
          </div>
        ) : (
          <p>New writing will appear here when published.</p>
        )}
      </section>
      {homepage.sectionVisibility.journey && (
        <section id="journey" className="page-shell editorial-section anchor-offset">
          <div className="journey-feature">
            <div className="journey-portrait">
              <Image
                src="/media/about-doctor-portrait.jpg"
                alt="Dr Umma Hani in a clinical setting"
                fill
                sizes="(min-width:1024px) 30vw, 90vw"
                className="object-cover object-top"
              />
            </div>
            <div>
              <h2>
                A foundation in medicine.
                <br />A wider public conversation.
              </h2>
              <p className="reading-copy">{homepage.biographySummary}</p>
              <div className="journey-milestones">
                <div>
                  <span>Medical education</span>
                  <p>
                    TMSS Medical College
                    <br />
                    Rajshahi University
                  </p>
                </div>
                <div>
                  <span>Clinical experience</span>
                  <p>
                    Women’s health
                    <br />
                    Hospital and emergency service
                  </p>
                </div>
              </div>
              <Link className="text-link" href="/about">
                Read the full biography <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      )}
      {homepage.sectionVisibility.medicalWork && (
        <section id="medical-work" className="medical-section anchor-offset">
          <div className="page-shell">
            <div className="section-heading">
              <div>
                <h2>Care, in practice</h2>
                <p>Clinical service and community healthcare.</p>
              </div>
            </div>
            <div className="medical-feature">
              <div className="medical-image">
                <Image
                  src="/media/bedside-review.jpg"
                  alt="Dr Umma Hani in a hospital setting"
                  fill
                  sizes="(min-width:1024px) 45vw, 94vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3>
                  From hospital wards
                  <br />
                  to community settings.
                </h3>
                {profile.medicalCards.map((item) => (
                  <div className="service-note" key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                ))}
                <Link className="text-link" href="/media-events">
                  Explore reported health programmes <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {homepage.sectionVisibility.publicWork && (
        <section id="public-work" className="page-shell editorial-section anchor-offset">
          <div className="public-work-intro">
            <h2>Connected to community.</h2>
            <div>
              <p className="reading-copy">
                Her public work includes student health camps, community programmes, and discussions on youth
                opportunity and women’s participation.
              </p>
              <p className="reading-copy">
                Read the reporting, explore the photographs, and follow the activities behind the profile.
              </p>
              <Link className="text-link" href="/updates">
                Activities & updates <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      )}
      {homepage.sectionVisibility.updates && (
        <section id="updates" className="page-shell editorial-section anchor-offset">
          <div className="section-heading">
            <div>
              <h2>Recent activities</h2>
              <p>Selected moments in public and community work.</p>
            </div>
            <Link className="text-link" href="/updates">
              All updates <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="activity-preview">
            {activities.map((item) => (
              <article key={item.slug}>
                <p className="publication-meta">
                  {item.date} · {item.category}
                </p>
                <h3>
                  <Link href={`/updates/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="reading-copy">{item.summary}</p>
                <Link className="text-link" href={`/updates/${item.slug}`}>
                  Read activity <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
          {!activities.length && <p>Activities will appear here when published.</p>}
        </section>
      )}
      {homepage.sectionVisibility.media && (
        <section id="media" className="page-shell editorial-section anchor-offset">
          <div className="section-heading">
            <div>
              <h2>In conversation & in the field</h2>
              <p>Interviews and selected photographs.</p>
            </div>
            <Link className="text-link" href="/media-events">
              Press & interviews <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="media-preview">
            {video && (
              <div className="featured-interview">
                <h3>{video.title}</h3>
                <MediaFeatureCard
                  title={video.title}
                  description={video.description}
                  thumbnail={video.thumbnail}
                  type="video"
                  url={video.url}
                  tone="light"
                />
              </div>
            )}
            <div className="photo-preview">
              {gallery.map((item) => (
                <Link key={item.id} href="/gallery" aria-label={`View gallery: ${item.title}`}>
                  <figure>
                    <div className="photo-preview-image">
                      <Image
                        src={item.image}
                        alt={item.altText}
                        fill
                        sizes="(min-width:1024px) 20vw, 44vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption>{item.title}</figcaption>
                  </figure>
                </Link>
              ))}
              <Link className="text-link" href="/gallery">
                Explore the gallery <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      )}
      {homepage.sectionVisibility.contact && (
        <section id="contact" className="contact-section anchor-offset">
          <div className="page-shell contact-layout">
            <div>
              <h2>Let’s stay in touch.</h2>
              <p>{contact.intro}</p>
              <a className="contact-email" href={`mailto:${siteSettings.primaryEmail}`}>
                {siteSettings.primaryEmail}
              </a>
              <div className="social-text-links">
                {siteSettings.socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} <span aria-hidden="true">↗</span>
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
