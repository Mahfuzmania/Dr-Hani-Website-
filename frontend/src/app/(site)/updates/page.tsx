import Link from 'next/link'
import Image from 'next/image'
import { PageIntro } from '@/src/components/site/page-intro'
import { getSiteContent } from '@/src/lib/site-api'
import { buildMetadata } from '@/src/lib/metadata'
import { sortActivities } from '../../../../../shared/content-order'

export const metadata = buildMetadata(
  'Activities & updates',
  'Dated updates on Dr Umma Hani’s medical, community, and public activities, with original sources.',
  '/updates',
)
export default async function UpdatesPage() {
  const content = await getSiteContent()
  const items = sortActivities(content.updates)
  return (
    <div className="page-shell archive-page">
      <PageIntro title="Activities & updates">
        <p>
          Healthcare programmes, community visits, and public discussions, in chronological order.
        </p>
      </PageIntro>
      {items.map((item) => (
        <article className="timeline-entry" key={item.slug}>
          <p>
            {item.date}
            <br />
            {item.category}
          </p>
          <div>
            {item.image && (
              <Link className="update-archive-image" href={`/updates/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width:768px) 40vw, 92vw"
                  className="object-cover"
                />
              </Link>
            )}
            <h2 className="publication-heading">
              <Link href={`/updates/${item.slug}`}>{item.title}</Link>
            </h2>
            <p>{item.summary}</p>
            <Link className="text-link mt-5" href={`/updates/${item.slug}`}>
              Read activity <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
      ))}
      {!items.length && <p>No activities are currently published.</p>}
    </div>
  )
}
