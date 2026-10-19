'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import type { SiteContentV2 } from '../../../../shared/site-content-v2'

type GalleryItem = SiteContentV2['galleryItems'][number]
const labels = {
  medical: 'Medical service',
  community: 'Community',
  events: 'Events',
  leadership: 'Public work',
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState('')
  const [event, setEvent] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (!openId) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [openId])
  const published = items.filter((item) => item.status === 'published')
  const filtered = published.filter(
    (item) => (!category || item.category === category) && (!event || item.event === event),
  )
  const events = [
    ...new Set(published.map((item) => item.event).filter((value): value is string => Boolean(value))),
  ].sort()
  const selected = filtered.find((item) => item.id === openId)
  const index = filtered.findIndex((item) => item.id === openId)
  function move(amount: number) {
    if (filtered.length) setOpenId(filtered[(index + amount + filtered.length) % filtered.length].id)
  }
  function open(item: GalleryItem, button: HTMLButtonElement) {
    opener.current = button
    setOpenId(item.id)
  }
  return (
    <>
      <div className="archive-filters gallery-filters">
        <label>
          Category
          <select className="input-shell" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {Object.entries(labels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Event
          <select className="input-shell" value={event} onChange={(e) => setEvent(e.target.value)}>
            <option value="">All events</option>
            {events.map((label) => (
              <option key={label}>{label}</option>
            ))}
          </select>
        </label>
      </div>
      <p role="status" className="archive-count">
        {filtered.length} photographs
      </p>
      <div className="gallery-grid">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            className="gallery-tile"
            onClick={(e) => open(item, e.currentTarget)}
            aria-label={`View photograph: ${item.title}`}
          >
            <span className="gallery-image">
              <Image
                src={item.image}
                alt={item.altText}
                fill
                sizes="(min-width:1024px) 29vw, (min-width:640px) 45vw, 92vw"
                className="object-cover"
              />
            </span>
            <span className="gallery-category">{item.event || labels[item.category]}</span>
            <span className="gallery-title">{item.title}</span>
            <span className="gallery-caption">{item.caption}</span>
          </button>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No photographs found</h2>
          <p>Choose another event or category.</p>
          <button
            className="button-secondary"
            onClick={() => {
              setCategory('')
              setEvent('')
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-labelledby="gallery-dialog-title"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') move(-1)
          if (e.key === 'ArrowRight') move(1)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close()
        }}
        onClose={() => {
          setOpenId(null)
          opener.current?.focus()
        }}
      >
        <div className="gallery-dialog-content">
          <button
            className="gallery-close"
            autoFocus
            onClick={() => dialog.current?.close()}
            aria-label="Close photograph"
          >
            <X size={24} />
          </button>
          {selected && (
            <>
              <div className="gallery-dialog-image">
                <Image
                  src={selected.image}
                  alt={selected.altText}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <div className="gallery-dialog-caption">
                <h2 id="gallery-dialog-title">{selected.title}</h2>
                <p>{selected.caption}</p>
                {selected.relatedActivity && (
                  <Link className="text-link" href={`/updates/${selected.relatedActivity}`}>
                    Read related activity
                  </Link>
                )}
                <div className="gallery-controls">
                  <button className="menu-toggle" onClick={() => move(-1)} aria-label="Previous photograph">
                    <ArrowLeft size={20} />
                  </button>
                  <span aria-live="polite">
                    {index + 1} / {filtered.length}
                  </span>
                  <button className="menu-toggle" onClick={() => move(1)} aria-label="Next photograph">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  )
}
