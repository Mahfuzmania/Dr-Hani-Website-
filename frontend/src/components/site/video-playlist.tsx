'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PlayIcon as Play } from '@phosphor-icons/react/ssr'
import type { SiteContentV2 } from '../../../../shared/site-content-v2'

export function VideoPlaylist({
  items,
}: {
  items: SiteContentV2['mediaItems']
}) {
  const [selectedId, setSelectedId] = useState(
    items.find((item) => item.featuredOnHomepage)?.id ?? items[0]?.id,
  )
  const [active, setActive] = useState(false)
  const selected = items.find((item) => item.id === selectedId) ?? items[0]
  if (!selected) return <p>No videos are currently published.</p>
  return (
    <div className="video-playlist">
      <div className="video-main">
        {active ? (
          <video
            key={selected.id}
            src={selected.url}
            poster={selected.thumbnail}
            aria-label={selected.title}
            controls
            autoPlay
            preload="none"
          />
        ) : (
          <button
            className="video-poster"
            aria-label={`Play video: ${selected.title}`}
            onClick={() => setActive(true)}
          >
            <Image
              src={selected.thumbnail}
              alt={selected.title}
              fill
              sizes="(min-width:1024px) 65vw, 92vw"
              className="object-cover"
            />
            <span className="video-play">
              <Play size={30} aria-hidden="true" />
            </span>
          </button>
        )}
        <h3>{selected.title}</h3>
        <p>{selected.description}</p>
      </div>
      <div className="video-queue" aria-label="Interview and video playlist">
        {items
          .filter((item) => item.id !== selected.id)
          .map((item, index) => (
            <button
              key={item.id}
              className="video-queue-item"
              aria-pressed={item.id === selected.id}
              onClick={() => {
                setSelectedId(item.id)
                setActive(true)
              }}
            >
              <span className="video-number">0{index + 1}</span>
              <span>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </span>
              <Play size={17} aria-hidden="true" />
            </button>
          ))}
      </div>
    </div>
  )
}
