import Link from 'next/link'
import { PageIntro } from '@/src/components/site/page-intro'
import { PublicationArchive } from '@/src/components/site/publication-archive'
import { MediaFeatureCard } from '@/src/components/site/media-feature-card'
import { getSiteContent } from '@/src/lib/site-api'
import { buildMetadata } from '@/src/lib/metadata'

export const metadata = buildMetadata(
  'Press & interviews',
  'Reporting on Dr Umma Hani’s community work, public activities, and media appearances, with links to original publishers.',
  '/media-events',
)
export default async function MediaEventsPage() {
  const content = await getSiteContent()
  const videos = content.mediaItems.filter((item) => item.type === 'video')
  const references = content.mediaItems.filter((item) => item.type === 'article')
  return (
    <div className="page-shell archive-page">
      <PageIntro title="Press & interviews">
        <p>
          Reporting on her work, alongside interviews and filmed appearances. Multiple reports of the same
          activity are collected in one story.
        </p>
      </PageIntro>
      <nav className="archive-links" aria-label="Media sections">
        <a className="text-link" href="#press">
          Press coverage
        </a>
        <a className="text-link" href="#interviews">
          Interviews & videos
        </a>
        <Link className="text-link" href="/gallery">
          Photo gallery
        </Link>
        <Link className="text-link" href="/updates">
          Activities & updates
        </Link>
      </nav>
      <section id="press" className="anchor-offset">
        <h2>In the news</h2>
        <PublicationArchive items={content.publications} kind="report" />
      </section>
      {references.length > 0 && (
        <section className="editorial-section">
          <h2>Additional media references</h2>
          {references.map((item) => (
            <article className="publication-card" key={item.id}>
              <h3 className="publication-heading">{item.title}</h3>
              <p className="reading-copy">{item.description}</p>
              <a className="text-link mt-5" href={item.url} target="_blank" rel="noopener noreferrer">
                Read original source
              </a>
            </article>
          ))}
        </section>
      )}
      <section id="interviews" className="editorial-section anchor-offset">
        <h2>Interviews & videos</h2>
        <div className="video-archive">
          {videos.map((item) => (
            <article key={item.id}>
              <h3 className="publication-heading">{item.title}</h3>
              <MediaFeatureCard
                title={item.title}
                description={item.description}
                thumbnail={item.thumbnail}
                type="video"
                url={item.url}
                tone="light"
              />
            </article>
          ))}
        </div>
        {!videos.length && <p>No videos are currently published.</p>}
      </section>
    </div>
  )
}
