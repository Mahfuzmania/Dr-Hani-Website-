'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, useId } from 'react'
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import {
  photoPosition,
  type GalleryItem,
} from '../../../../shared/photo-curation'
import { photoDimensions } from '../../../../shared/photo-dimensions'
import { containDialogFocus } from '@/src/lib/dialog-focus'

/** One viewer for homepage features and the filtered archive. */
export function PhotoCollection({
  items,
  layout = 'archive',
  label = 'Photographs',
}: {
  items: GalleryItem[]
  layout?: 'archive' | 'medical' | 'dialogue' | 'public' | 'pair'
  label?: string
}) {
  const published = items.filter((item) => item.status === 'published')
  const [openId, setOpenId] = useState<string | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const strip = useRef<HTMLDivElement>(null)
  const headingId = useId()
  const selected = published.find((item) => item.id === openId)
  const index = published.findIndex((item) => item.id === openId)
  useEffect(() => {
    if (!selected) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.current?.open) dialog.current?.showModal()
    return () => {
      document.body.style.overflow = previous
    }
  }, [selected])
  function move(amount: number) {
    if (published.length)
      setOpenId(
        published[(index + amount + published.length) % published.length].id,
      )
  }
  return (
    <div className={`photo-collection photo-collection-${layout}`}>
      <div ref={strip} className="photo-sequence" aria-label={label}>
        {published.map((item) => (
          <figure
            key={item.id}
            className="story-photograph"
            id={`photo-${item.id}`}
            data-photo-id={item.id}
          >
            <button
              type="button"
              className="photo-open"
              aria-label={`View photograph: ${item.title}`}
              onClick={(event) => {
                opener.current = event.currentTarget
                setOpenId(item.id)
              }}
            >
              <Image
                src={item.image}
                alt={item.altText}
                width={photoDimensions[item.image]?.width ?? 1200}
                height={photoDimensions[item.image]?.height ?? 1600}
                sizes={
                  layout === 'archive'
                    ? '(min-width:1440px) 24vw, (min-width:1024px) 32vw, (min-width:640px) 48vw, 92vw'
                    : '(min-width:1440px) 48vw, (min-width:768px) 48vw, 92vw'
                }
                style={{ objectPosition: photoPosition(item) }}
              />
              <span className="photo-expand" aria-hidden="true">
                <Expand size={18} />
              </span>
            </button>
            <figcaption>
              <span className="photo-caption-title">{item.title}</span>
              <span>{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {layout !== 'archive' && published.length > 1 && (
        <div
          className="photo-strip-controls"
          aria-label={`${label} scrolling controls`}
        >
          <span>Explore the photographs</span>
          <button
            aria-label={`Scroll ${label} backward`}
            onClick={() =>
              strip.current?.scrollBy({
                left: -strip.current.clientWidth * 0.8,
                behavior: 'smooth',
              })
            }
          >
            <ArrowLeft size={20} />
          </button>
          <button
            aria-label={`Scroll ${label} forward`}
            onClick={() =>
              strip.current?.scrollBy({
                left: strip.current.clientWidth * 0.8,
                behavior: 'smooth',
              })
            }
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-labelledby={headingId}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            move(event.key === 'ArrowLeft' ? -1 : 1)
          }
          containDialogFocus(event)
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
        onClose={() => {
          setOpenId(null)
          opener.current?.focus()
        }}
      >
        {selected && (
          <div className="gallery-dialog-content">
            <button
              className="gallery-close"
              autoFocus
              aria-label="Close photograph"
              onClick={() => dialog.current?.close()}
            >
              <X size={24} />
            </button>
            <div className="gallery-dialog-image">
              <Image
                src={selected.image}
                alt={selected.altText}
                fill
                sizes="94vw"
                className="object-contain"
              />
            </div>
            <div className="gallery-dialog-caption">
              <h2 id={headingId}>{selected.title}</h2>
              <p>{selected.caption}</p>
              {selected.relatedActivity && (
                <Link
                  className="text-link"
                  href={`/updates/${selected.relatedActivity}`}
                >
                  Read related activity
                </Link>
              )}
              <div className="gallery-controls">
                <button
                  aria-label="Previous photograph"
                  onClick={() => move(-1)}
                >
                  <ArrowLeft size={22} />
                </button>
                <span aria-live="polite">
                  {index + 1} / {published.length}
                </span>
                <button aria-label="Next photograph" onClick={() => move(1)}>
                  <ArrowRight size={22} />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
