'use client'

import { useState } from 'react'
import type { GalleryItem } from '../../../../shared/photo-curation'
import { PhotoCollection } from './photo-collection'

const labels = {
  medical: 'Medical service',
  community: 'Community',
  events: 'Events',
  leadership: 'Public work',
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState('')
  const [event, setEvent] = useState('')
  const published = items.filter((item) => item.status === 'published')
  const filtered = published.filter(
    (item) =>
      (!category || item.category === category) &&
      (!event || item.event === event),
  )
  const events = [
    ...new Set(
      published
        .filter((item) => !category || item.category === category)
        .map((item) => item.event)
        .filter((value): value is string => Boolean(value)),
    ),
  ].sort()
  function clear() {
    setCategory('')
    setEvent('')
  }
  return (
    <>
      <div className="gallery-toolbar">
        <div
          className="gallery-tabs"
          role="group"
          aria-label="Photograph categories"
        >
          <button aria-pressed={!category} onClick={clear}>
            All photographs
          </button>
          {Object.entries(labels)
            .filter(([value]) =>
              published.some((item) => item.category === value),
            )
            .map(([value, label]) => (
              <button
                key={value}
                aria-pressed={category === value}
                onClick={() => {
                  setCategory(value)
                  setEvent('')
                }}
              >
                {label}
              </button>
            ))}
        </div>
        <label className="gallery-event-filter">
          Event
          <select value={event} onChange={(e) => setEvent(e.target.value)}>
            <option value="">All events</option>
            {events.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <p role="status">{filtered.length} photographs</p>
      </div>
      <PhotoCollection items={filtered} />
      {!filtered.length && (
        <div className="empty-state">
          <h2>No photographs found</h2>
          <p>Choose another event or category.</p>
          <button className="button-secondary" onClick={clear}>
            Clear filters
          </button>
        </div>
      )}
    </>
  )
}
