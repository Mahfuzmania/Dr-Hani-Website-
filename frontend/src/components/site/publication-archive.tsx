'use client'

import { useMemo, useState } from 'react'
import type { Publication } from '../../../../shared/publications'
import { sortPublications } from '../../../../shared/publications'
import { PublicationCard } from './publication-card'

export function PublicationArchive({ items, kind }: { items: Publication[]; kind: Publication['kind'] }) {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('')
  const [publisher, setPublisher] = useState('')
  const entries = useMemo(
    () => items.filter((item) => item.kind === kind && item.status === 'published'),
    [items, kind],
  )
  const topics = [...new Set(entries.flatMap((item) => item.topics))].sort()
  const publishers = [
    ...new Set(entries.flatMap((item) => item.sources.map((source) => source.publisher))),
  ].sort()
  const filtered = sortPublications(
    entries.filter(
      (item) =>
        (!topic || item.topics.includes(topic)) &&
        (!publisher || item.sources.some((source) => source.publisher === publisher)) &&
        `${item.title} ${item.summary} ${item.topics.join(' ')} ${item.sources.map((source) => source.publisher).join(' ')}`
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase()),
    ),
  )
  return (
    <>
      <form className="archive-filters" role="search" onSubmit={(event) => event.preventDefault()}>
        <label>
          Search {kind === 'essay' ? 'writing' : 'coverage'}
          <input
            className="input-shell"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title, topic, or keyword"
          />
        </label>
        <label>
          Topic
          <select className="input-shell" value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="">All topics</option>
            {topics.map((label) => (
              <option key={label}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          Publisher
          <select
            className="input-shell"
            value={publisher}
            onChange={(event) => setPublisher(event.target.value)}
          >
            <option value="">All publishers</option>
            {publishers.map((label) => (
              <option key={label}>{label}</option>
            ))}
          </select>
        </label>
      </form>
      <p className="archive-count" role="status">
        {filtered.length}{' '}
        {kind === 'essay'
          ? filtered.length === 1
            ? 'essay'
            : 'essays'
          : filtered.length === 1
            ? 'story'
            : 'stories'}
      </p>
      {filtered.length ? (
        <div className="archive-list">
          {filtered.map((item) => (
            <PublicationCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No {kind === 'essay' ? 'essays' : 'stories'} found</h2>
          <p>Try another keyword or clear the filters.</p>
          <button
            className="button-secondary"
            onClick={() => {
              setQuery('')
              setTopic('')
              setPublisher('')
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  )
}
