import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ContactForm } from '@/src/components/forms/contact-form'
import { SocialIcon } from '@/src/components/branding/social-icon'
import { PhotoCollection } from '@/src/components/gallery/photo-collection'
import { VideoPlaylist } from '@/src/components/site/video-playlist'
import { PublicationCard } from '@/src/components/site/publication-card'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'
import { sortPublications } from '../../../../shared/publications'
import { sortActivities } from '../../../../shared/content-order'
import { homepagePhotos } from '../../../../shared/photo-curation'

export const metadata = buildMetadata(
  'Home',
  'The medical career, published writing, community work, and public life of Dr Umma Hani.',
)

function SectionHeading({
  number,
  title,
  description,
  href,
  link,
}: {
  number: string
  title: string
  description?: string
  href?: string
  link?: string
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-index">{number}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  )
}

export default async function HomePage() {
  const content = await getSiteContent()
  const { homepage, profile, siteSettings, contact } = content
  const visible = homepage.sectionVisibility
  const essays = sortPublications(
    content.publications.filter(
      (item) => item.kind === 'essay' && item.featured,
    ),
  ).slice(0, 3)
  const medical = homepagePhotos(content.galleryItems, 'medical-work').sort(
    (a, b) =>
      Number(Boolean(a.event?.includes('Doctors'))) -
        Number(Boolean(b.event?.includes('Doctors'))) ||
      a.sortOrder - b.sortOrder,
  )
  const dialogues = homepagePhotos(content.galleryItems, 'dialogues')
  const publicWork = homepagePhotos(content.galleryItems, 'public-work')
  const community = publicWork.filter(
    (item) =>
      !['Courtesy visits', 'Public activities'].includes(item.event ?? ''),
  )
  const encounters = publicWork.filter((item) =>
    ['Courtesy visits', 'Public activities'].includes(item.event ?? ''),
  )
  const videos = content.mediaItems.filter((item) => item.type === 'video')
  const activities = sortActivities(content.updates).slice(0, 3)
  const notice = content.importantNotices.find((item) => item.pinned)
  const positions = content.positions.filter((item) => item.featured)
  const milestones = profile.journeyTimeline
    .filter((item) =>
      /MBBS|internship|hospital grounding|Indoor Medical Officer|Bangladesh Specialized Hospital/i.test(
        item.title,
      ),
    )
    .slice(0, 4)
  return (
    <div className="photo-home">
      {visible.profile && (
        <section id="profile" className="page-shell introduction anchor-offset">
          <div className="intro-copy">
            <p className="section-index">{homepage.heroEyebrow}</p>
            <h1>{homepage.heroTitle}</h1>
            <p className="intro-description">{homepage.heroSubtitle}</p>
            <div className="intro-actions">
              <Link className="button-primary" href="/about">
                Read biography
                <ArrowUpRight size={18} />
              </Link>
              <a className="text-link" href="#medical-work">
                Explore her work
                <ArrowUpRight size={18} />
              </a>
            </div>
            <p className="intro-location">
              Medicine, writing & public life
              <br />
              <span>Bangladesh</span>
            </p>
          </div>
          <figure className="intro-portrait">
            <Image
              src={homepage.heroImage}
              alt="Dr Umma Hani seated at a public event"
              fill
              priority
              sizes="(min-width:768px) 52vw, 100vw"
              className="object-cover"
            />
          </figure>
        </section>
      )}

      {visible.journey && (
        <section
          id="journey"
          className="page-shell photo-section journey-section anchor-offset"
        >
          <figure className="journey-portrait">
            <Image
              src="/media/about-doctor-portrait.jpg"
              alt="Dr Umma Hani wearing medical scrubs and a stethoscope"
              width={778}
              height={1280}
              sizes="(min-width:768px) 30vw, 92vw"
            />
            <figcaption>Dr Umma Hani · Medical service</figcaption>
          </figure>
          <div className="journey-copy">
            <SectionHeading
              number="01 / Her journey"
              title="A foundation in medicine."
            />
            <p className="reading-copy">{homepage.biographySummary}</p>
            <p className="reading-copy">
              Her published writing and community work extend that professional
              journey into questions of health, opportunity, and participation.
            </p>
            <div className="journey-milestones">
              {milestones.map((item) => (
                <div key={item.title}>
                  <span>{item.period}</span>
                  <h3>{item.title}</h3>
                </div>
              ))}
            </div>
            <Link className="text-link" href="/about">
              The complete biography
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      )}

      {visible.medicalWork && (
        <section
          id="medical-work"
          className="photo-section medical-section anchor-offset"
        >
          <div className="page-shell">
            <SectionHeading
              number="02 / Medicine & service"
              title="Care, in practice."
              description="Hospital experience, women’s health, and community healthcare."
              href="/media-events"
              link="Health programmes in the news"
            />
            <div className="section-introduction">
              <p>
                Her medical career includes Gynae and Obs appointments in Bogura
                and medical officer service in Dhaka. Health programmes bring
                that work into the community.
              </p>
              <Link className="text-link" href="/about">
                Education & appointments
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <PhotoCollection
              items={medical}
              layout="medical"
              label="Medicine and service"
            />
            {!medical.length && (
              <p>No service photographs are currently published.</p>
            )}
          </div>
        </section>
      )}

      {visible.dialogues !== false && (
        <section
          id="photographs"
          className="photo-section dialogues-section anchor-offset"
        >
          <div className="page-shell">
            <SectionHeading
              number="03 / Dialogues & encounters"
              title="In conversation."
              description="Photographs from dialogues and public discussions."
              href="/gallery"
              link="All photographs"
            />
            {['Dhaka Dialogue', 'Bay of Bengal Conversation 2026'].map(
              (event) => {
                const images = dialogues.filter((item) => item.event === event)
                return (
                  images.length > 0 && (
                    <article
                      className={`dialogue-feature ${event.startsWith('Bay') ? 'dialogue-feature-bay' : ''}`}
                      key={event}
                    >
                      <div className="dialogue-context">
                        <p className="section-index">
                          {event.startsWith('Bay')
                            ? 'Conference encounters'
                            : 'Women & society'}
                        </p>
                        <h3>{event}</h3>
                        <p>
                          {event.startsWith('Bay')
                            ? 'At Bay of Bengal Conversation 2026, organised by the Centre for Governance Studies.'
                            : 'At the Dhaka Dialogue on ending digital and AI-facilitated violence against women.'}
                        </p>
                      </div>
                      <PhotoCollection
                        items={images}
                        layout={event.startsWith('Bay') ? 'pair' : 'dialogue'}
                        label={event}
                      />
                    </article>
                  )
                )
              },
            )}
            {dialogues.filter(
              (item) =>
                !['Dhaka Dialogue', 'Bay of Bengal Conversation 2026'].includes(
                  item.event ?? '',
                ),
            ).length > 0 && (
              <PhotoCollection
                items={dialogues.filter(
                  (item) =>
                    ![
                      'Dhaka Dialogue',
                      'Bay of Bengal Conversation 2026',
                    ].includes(item.event ?? ''),
                )}
                layout="dialogue"
                label="More dialogue photographs"
              />
            )}
            {!dialogues.length && (
              <p>No dialogue photographs are currently published.</p>
            )}
          </div>
        </section>
      )}

      {visible.publicWork && (
        <section
          id="public-work"
          className="page-shell photo-section public-section anchor-offset"
        >
          <SectionHeading
            number="04 / Community & public life"
            title="Among people."
            description="Community visits, public activity, and encounters along the way."
            href="/updates"
            link="Activities & updates"
          />
          {community.length > 0 && (
            <PhotoCollection
              items={community}
              layout="public"
              label="Community work"
            />
          )}
          {encounters.length > 0 && (
            <div className="public-encounters">
              <div className="section-introduction">
                <h3>Visits & encounters</h3>
                <p>
                  Community outreach and public gatherings form another part of
                  her work beyond the hospital.
                </p>
              </div>
              <PhotoCollection
                items={encounters}
                layout="public"
                label="Visits and public activities"
              />
            </div>
          )}
          {!publicWork.length && (
            <p>No public-work photographs are currently published.</p>
          )}
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
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {visible.writing !== false && (
        <section
          id="writing"
          className="page-shell photo-section writing-section anchor-offset"
        >
          <SectionHeading
            number="05 / Published writing"
            title="Writing & perspectives."
            description="On women, health, opportunity, and public responsibility."
            href="/writing"
            link="All essays"
          />
          <div className="writing-selection">
            {essays.map((item) => (
              <PublicationCard key={item.id} item={item} compact />
            ))}
          </div>
          {!essays.length && (
            <p>New writing will appear here when published.</p>
          )}
        </section>
      )}

      {(visible.media || visible.updates) && (
        <div className="page-shell media-activities">
          {visible.media && (
            <section id="media" className="photo-section anchor-offset">
              <SectionHeading
                number="06 / Interviews & appearances"
                title="Conversations on camera."
                href="/media-events"
                link="Press & interviews"
              />
              <VideoPlaylist items={videos} />
            </section>
          )}
          {visible.updates && (
            <section
              id="updates"
              className="photo-section activity-section anchor-offset"
            >
              <SectionHeading
                number="The latest"
                title="Recent activity."
                href="/updates"
                link="All updates"
              />
              <div className="activity-rows">
                {activities.map((item) => (
                  <article key={item.slug}>
                    <p className="publication-meta">
                      {item.date}
                      <span>{item.category}</span>
                    </p>
                    <div>
                      <h3>
                        <Link href={`/updates/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p>{item.summary}</p>
                    </div>
                    <Link
                      href={`/updates/${item.slug}`}
                      className="text-link"
                      aria-label={`Read activity: ${item.title}`}
                    >
                      <span>Read activity</span>
                      <ArrowUpRight size={22} />
                    </Link>
                  </article>
                ))}
              </div>
              {!activities.length && (
                <p>No activities are currently published.</p>
              )}
            </section>
          )}
        </div>
      )}

      {visible.contact && (
        <section
          id="contact"
          className="photo-section contact-section anchor-offset"
        >
          <div className="page-shell contact-layout">
            <div>
              <p className="section-index">Professional correspondence</p>
              <h2>Let’s connect.</h2>
              <p>{contact.intro}</p>
              <a
                className="contact-email"
                href={`mailto:${siteSettings.primaryEmail}`}
              >
                {siteSettings.primaryEmail}
              </a>
              <div className="social-text-links">
                {siteSettings.socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon label={item.label} />
                    {item.label}
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
              {notice && (
                <aside className="contact-notice">
                  <strong>{notice.title}</strong>
                  <p>{notice.message}</p>
                </aside>
              )}
            </div>
            <ContactForm inquiryTypes={contact.inquiryTypes} />
          </div>
        </section>
      )}
    </div>
  )
}
