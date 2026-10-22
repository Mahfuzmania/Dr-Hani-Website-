import Link from 'next/link'
import type { Publication } from '../../../../shared/publications'
import { dateLabel } from '../../../../shared/publications'
import { ArrowUpRightIcon, NewspaperIcon } from '@phosphor-icons/react/ssr'

export function PublicationCard({
  item,
  compact = false,
}: {
  item: Publication
  compact?: boolean
}) {
  const Heading = compact || item.kind === 'report' ? 'h3' : 'h2'
  return (
    <article
      className={`publication-card ${compact ? 'publication-card-compact' : ''}`}
    >
      <div className="publication-meta">
        <span>
          <NewspaperIcon size={16} weight="duotone" aria-hidden="true" />
          {item.sources.map((source) => source.publisher).join(' / ')}
        </span>
        <span>{dateLabel(item.sources[0])}</span>
      </div>
      <Heading
        className={
          item.kind === 'essay' ? 'bengali-title' : 'publication-heading'
        }
        lang={item.kind === 'essay' ? 'bn' : 'en'}
      >
        {item.title}
      </Heading>
      <p className="reading-copy">{item.summary}</p>
      <div className="publication-topics">{item.topics.join(' · ')}</div>
      <div className="publication-links">
        {item.sources.map((source) => (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            key={source.url}
            aria-label={`Read ${item.title} in ${source.publisher}`}
          >
            Read in {source.publisher}{' '}
            <ArrowUpRightIcon size={16} aria-hidden="true" />
          </a>
        ))}
      </div>
      {!compact && (
        <details className="source-details">
          <summary>Publication details</summary>
          {item.sources.map((source) => (
            <p key={source.url}>
              <strong>{source.publisher}</strong> · {dateLabel(source)}
              <br />
              <span lang={item.kind === 'essay' ? 'bn' : 'en'}>
                By {source.byline}
              </span>
            </p>
          ))}
        </details>
      )}
      {!compact && item.relatedActivity && (
        <Link className="text-link" href={`/updates/${item.relatedActivity}`}>
          Related activity
        </Link>
      )}
    </article>
  )
}
