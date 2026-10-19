import Image from 'next/image'
import Link from 'next/link'
import { PageIntro } from '@/src/components/site/page-intro'
import { getSiteContent } from '@/src/lib/site-api'
import { buildMetadata } from '@/src/lib/metadata'

export const metadata = buildMetadata(
  'About',
  'Biography, medical education, hospital appointments, published writing, and community work of Dr Umma Hani.',
  '/about',
)
export default async function AboutPage() {
  const { profile } = await getSiteContent()
  return (
    <div className="page-shell archive-page">
      <PageIntro title="A life in medicine & public service">
        <p>The professional journey of Dr Umma Hani.</p>
      </PageIntro>
      <div className="biography-layout">
        <div className="biography-image">
          <Image
            src="/media/about-doctor-portrait.jpg"
            alt="Dr Umma Hani in a clinical setting"
            fill
            sizes="(min-width:1024px) 32vw, 92vw"
            className="object-cover object-top"
          />
        </div>
        <div className="biography-copy reading-copy">
          {profile.storyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="archive-links">
            <Link className="text-link" href="/writing">
              Published writing
            </Link>
            <Link className="text-link" href="/media-events">
              Press coverage
            </Link>
          </div>
        </div>
      </div>
      <section className="biography-timeline">
        <h2>Education & experience</h2>
        <div className="mt-8">
          {profile.journeyTimeline.map((item) => (
            <article key={item.title} className="timeline-entry">
              <p>{item.period}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
