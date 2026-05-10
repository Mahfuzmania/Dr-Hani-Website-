'use client'

import Image from 'next/image'
import { useState } from 'react'

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
  const aspectClassName = size === 'compact' ? 'aspect-[16/10]' : 'aspect-[16/11]'
  const descriptionClassName =
    tone === 'dark'
      ? 'mt-5 text-[0.98rem] leading-8 text-[var(--muted-cream)]'
      : 'mt-3 text-[0.9rem] leading-7 text-[var(--muted)]'
  const badgeClassName =
    size === 'compact'
      ? 'premium-chip-contrast absolute bottom-3 left-3 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-xl'
      : 'premium-chip-contrast absolute bottom-5 left-5 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl'

  if (type === 'video' && active) {
    return (
      <div className={`media-frame media-hover relative ${aspectClassName} overflow-hidden`}>
        <video className="h-full w-full object-cover" controls preload="metadata" poster={thumbnail} src={url} />
      </div>
    )
  }

  if (type === 'article') {
    return (
      <a className="group block" href={url} target="_blank" rel="noreferrer">
        <div className={`media-frame media-hover relative ${aspectClassName} overflow-hidden`}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 34vw, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,27,55,0.08),rgba(8,27,55,0.44))]" />
          <div className={badgeClassName}>
            Open article
          </div>
        </div>
        <p className={descriptionClassName}>{description}</p>
      </a>
    )
  }

  return (
    <button type="button" className="group block w-full text-left" onClick={() => setActive(true)}>
      <div className={`media-frame media-hover relative ${aspectClassName} overflow-hidden`}>
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 34vw, 100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,27,55,0.08),rgba(8,27,55,0.44))]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${size === 'compact' ? 'h-12 w-12 text-[0.58rem]' : 'h-16 w-16 text-[0.66rem]'} inline-flex items-center justify-center rounded-[0.9rem] border border-[rgba(214,176,75,0.26)] bg-[rgba(255,255,255,0.12)] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_20px_36px_rgba(8,27,55,0.24)] backdrop-blur-xl transition group-hover:translate-y-[-2px]`}>
            Play
          </span>
        </div>
        <div className={badgeClassName}>
          Play on click
        </div>
      </div>
      <p className={descriptionClassName}>{description}</p>
    </button>
  )
}
