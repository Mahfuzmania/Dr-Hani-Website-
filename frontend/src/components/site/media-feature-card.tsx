'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PlayIcon as Play } from '@phosphor-icons/react/ssr'

type MediaFeatureCardProps = {
  description: string
  thumbnail: string
  title: string
  type: 'article' | 'image' | 'video'
  url: string
  size?: 'compact' | 'feature'
  tone?: 'dark' | 'light'
}

export function MediaFeatureCard({
  description,
  thumbnail,
  title,
  type,
  url,
  size = 'feature',
  tone = 'dark',
}: MediaFeatureCardProps) {
  const [active, setActive] = useState(false)
  const aspectClassName =
    size === 'compact' ? 'aspect-[16/10]' : 'aspect-[16/11]'
  const descriptionClassName =
    tone === 'dark'
      ? 'mt-5 text-[0.98rem] leading-8 text-[var(--muted-cream)]'
      : 'mt-3 text-[0.9rem] leading-7 text-[var(--muted)]'
  const badgeClassName = 'media-video-label'

  if (type === 'video' && active) {
    return (
      <div>
        <div className={`media-frame relative ${aspectClassName}`}>
          <video
            aria-label={title}
            className="h-full w-full bg-[var(--navy)] object-contain"
            controls
            autoPlay
            playsInline
            preload="metadata"
            poster={thumbnail}
            src={url}
          />
        </div>
        <p className={descriptionClassName}>{description}</p>
      </div>
    )
  }

  if (type === 'article') {
    return (
      <a className="group block" href={url} target="_blank" rel="noreferrer">
        <div
          className={`media-frame media-hover relative ${aspectClassName} overflow-hidden`}
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 34vw, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,27,55,0.08),rgba(8,27,55,0.44))]" />
          <div className={badgeClassName}>Open article</div>
        </div>
        <p className={descriptionClassName}>{description}</p>
      </a>
    )
  }

  return (
    <button
      type="button"
      className="group block w-full text-left"
      aria-label={`Play video: ${title}`}
      onClick={() => setActive(true)}
    >
      <div
        className={`media-frame media-hover relative ${aspectClassName} overflow-hidden`}
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 34vw, 100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,27,55,0.08),rgba(8,27,55,0.44))]" />
        <span className="video-play">
          <Play size={size === 'compact' ? 18 : 23} aria-hidden="true" />
        </span>
        <div className={badgeClassName}>Watch video</div>
      </div>
      <p className={descriptionClassName}>{description}</p>
    </button>
  )
}
