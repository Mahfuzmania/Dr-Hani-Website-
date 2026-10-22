import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon as ArrowUpRight,
  GraduationCapIcon,
  StethoscopeIcon,
  UsersThreeIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/ssr";
import { ContactForm } from "@/src/components/forms/contact-form";
import { SocialIcon } from "@/src/components/branding/social-icon";
import { PhotoCollection } from "@/src/components/gallery/photo-collection";
import { VideoPlaylist } from "@/src/components/site/video-playlist";
import { PublicationCard } from "@/src/components/site/publication-card";
import { buildMetadata } from "@/src/lib/metadata";
import { getSiteContent } from "@/src/lib/site-api";
import { sortPublications } from "../../../../shared/publications";
import { sortActivities } from "../../../../shared/content-order";
import { homepagePhotos } from "../../../../shared/photo-curation";

export const metadata = buildMetadata(
  "Home",
  "The medical career, published writing, community work, and public life of Dr Umma Hani.",
);

function SectionHeading({
  title,
  description,
  href,
  link,
}: {
  title: string;
  description?: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
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
  );
}

export default async function HomePage() {
  const content = await getSiteContent();
  const { homepage, siteSettings, contact } = content;
  const visible = homepage.sectionVisibility;
  const essays = sortPublications(
    content.publications.filter(
      (item) => item.kind === "essay" && item.featured,
    ),
  ).slice(0, 3);
  const medical = homepagePhotos(content.galleryItems, "medical-work").sort(
    (a, b) =>
      Number(Boolean(a.event?.includes("Doctors"))) -
        Number(Boolean(b.event?.includes("Doctors"))) ||
      a.sortOrder - b.sortOrder,
  );
  const servicePhotographs = medical.filter(
    (item) => !item.event?.includes("Doctors"),
  );
  const doctorsPhotographs = medical.filter((item) =>
    item.event?.includes("Doctors"),
  );
  const dialogues = homepagePhotos(content.galleryItems, "dialogues");
  const publicWork = homepagePhotos(content.galleryItems, "public-work");
  const community = publicWork.filter(
    (item) =>
      !["Courtesy visits", "Public activities"].includes(item.event ?? ""),
  );
  const encounters = publicWork.filter((item) =>
    ["Courtesy visits", "Public activities"].includes(item.event ?? ""),
  );
  const videos = content.mediaItems.filter((item) => item.type === "video");
  const activities = sortActivities(content.updates).slice(0, 3);
  const notice = content.importantNotices.find((item) => item.pinned);
  const positions = content.positions.filter((item) => item.featured);
  return (
    <div className="photo-home">
      {visible.profile && (
        <div className="page-shell hero-shell">
          <section id="profile" className="introduction anchor-offset">
            <figure className="intro-portrait">
              <Image
                src={homepage.heroImage}
                alt="Dr Umma Hani seated at a public event"
                fill
                priority
                sizes="(min-width:1440px) 740px, (min-width:901px) 56vw, 100vw"
                className="object-cover"
              />
            </figure>
            <div className="intro-copy">
              <h1>{homepage.heroTitle}</h1>
              <p className="intro-role">{siteSettings.identityLine}</p>
              <p className="intro-description">{homepage.heroSubtitle}</p>
              <div className="intro-actions">
                <Link className="button-primary" href="/about">
                  Read biography
                  <ArrowUpRight size={18} />
                </Link>
                <a className="button-secondary" href="#medical-work">
                  Explore her work
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {visible.journey && (
        <section
          id="journey"
          className="page-shell photo-section journey-section anchor-offset"
        >
          <div className="journey-copy">
            <SectionHeading title="Her journey" />
            <p className="reading-copy">{homepage.biographySummary}</p>
            <Link className="text-link" href="/about">
              Read the complete biography <ArrowUpRight size={18} />
            </Link>
          </div>
          <figure className="journey-portrait">
            <Image
              src="/media/about-doctor-portrait.jpg"
              alt="Dr Umma Hani wearing medical scrubs and a stethoscope"
              width={778}
              height={1280}
              sizes="(min-width:768px) 30vw, 92vw"
            />
          </figure>
          <div className="journey-milestones">
            <div>
              <GraduationCapIcon
                size={28}
                weight="duotone"
                aria-hidden="true"
              />
              <div>
                <h3>Medical education</h3>
                <p>MBBS at TMSS Medical College under Rajshahi University.</p>
              </div>
            </div>
            <div>
              <StethoscopeIcon size={28} weight="duotone" aria-hidden="true" />
              <div>
                <h3>Hospital experience</h3>
                <p>
                  Clinical appointments and medical service in Bogura and Dhaka.
                </p>
              </div>
            </div>
            <div>
              <UsersThreeIcon size={28} weight="duotone" aria-hidden="true" />
              <div>
                <h3>Writing & community</h3>
                <p>
                  Published perspectives and participation in community life.
                </p>
              </div>
            </div>
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
              title="Medical work"
              description="Hospital experience, women’s health, and community healthcare."
              href="/media-events"
              link="Health programmes in the news"
            />
            <PhotoCollection
              items={servicePhotographs}
              layout="medical"
              label="Medicine and service"
            />
            {doctorsPhotographs.length > 0 && (
              <div className="medical-doctors">
                <h3>Doctors’ gathering</h3>
                <PhotoCollection
                  items={doctorsPhotographs}
                  layout="doctors"
                  label="Doctors’ gathering"
                />
              </div>
            )}
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
              title="Dialogues & conferences"
              description="Photographs from dialogues and public discussions."
              href="/gallery"
              link="All photographs"
            />
            {["Dhaka Dialogue", "Bay of Bengal Conversation 2026"].map(
              (event) => {
                const images = dialogues.filter((item) => item.event === event);
                return (
                  images.length > 0 && (
                    <article
                      className={`dialogue-feature ${event.startsWith("Bay") ? "dialogue-feature-bay" : ""}`}
                      key={event}
                    >
                      <div className="dialogue-context">
                        <h3>{event}</h3>
                        <p>
                          {event.startsWith("Bay")
                            ? "At Bay of Bengal Conversation 2026, organised by the Centre for Governance Studies."
                            : "At the Dhaka Dialogue on ending digital and AI-facilitated violence against women."}
                        </p>
                      </div>
                      <PhotoCollection
                        items={images}
                        layout={event.startsWith("Bay") ? "pair" : "dialogue"}
                        label={event}
                      />
                    </article>
                  )
                );
              },
            )}
            {dialogues.filter(
              (item) =>
                !["Dhaka Dialogue", "Bay of Bengal Conversation 2026"].includes(
                  item.event ?? "",
                ),
            ).length > 0 && (
              <PhotoCollection
                items={dialogues.filter(
                  (item) =>
                    ![
                      "Dhaka Dialogue",
                      "Bay of Bengal Conversation 2026",
                    ].includes(item.event ?? ""),
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
            title="Community & public life"
            description="Community outreach, visits, and public activities."
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
                <h3>Visits & public activities</h3>
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
            title="Published writing"
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
                title="Interviews & videos"
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
                title="Recent activity"
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
              <h2>Contact</h2>
              <p>{contact.intro}</p>
              <a
                className="contact-email"
                href={`mailto:${siteSettings.primaryEmail}`}
              >
                <EnvelopeSimpleIcon
                  size={24}
                  weight="duotone"
                  aria-hidden="true"
                />
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
            <ContactForm
              inquiryTypes={contact.inquiryTypes}
              recipient={siteSettings.primaryEmail}
              delivery={
                process.env.BACKEND_PUBLIC_URL?.trim() ||
                process.env.NEXT_PUBLIC_BACKEND_URL?.trim()
                  ? "cms"
                  : "email"
              }
            />
          </div>
        </section>
      )}
    </div>
  );
}
