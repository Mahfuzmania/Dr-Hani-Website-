'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import type { GalleryCategory, GalleryItem } from '../../../../shared/site-content'
import { BuildingIcon, CameraIcon, CloseIcon, FlagIcon, HeartIcon } from '../branding/elegant-icons'

const labels: Record<GalleryCategory | 'all', string> = {
  all: 'All',
  'medical-service': 'Medical Service',
  'community-outreach': 'Community Outreach',
  events: 'Events',
  leadership: 'Leadership',
}

const categoryIcons: Record<GalleryCategory, typeof HeartIcon> = {
  'medical-service': HeartIcon,
  'community-outreach': BuildingIcon,
  events: FlagIcon,
  leadership: CameraIcon,
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    if (!openId) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenId(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openId])

  const filtered = useMemo(
    () => items.filter((item) => activeCategory === 'all' || item.category === activeCategory),
    [activeCategory, items],
  )

  const selected = filtered.find((item) => item.id === openId) || null

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {Object.entries(labels).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`border-b pb-1 text-[0.84rem] font-semibold uppercase tracking-[0.14em] transition ${
              activeCategory === value
                ? 'border-[rgba(15,28,44,0.24)] text-[var(--primary)]'
                : 'border-transparent text-[rgba(15,28,44,0.46)] hover:text-[var(--primary)]'
            }`}
            onClick={() => setActiveCategory(value as GalleryCategory | 'all')}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`group block text-left ${index % 3 === 1 ? 'md:translate-y-8' : ''}`}
            onClick={() => setOpenId(item.id)}
          >
            <div className="image-frame relative aspect-[4/5] overflow-hidden">
              <Image
                src={item.image}
                alt={item.altText}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
              />
            </div>
            <div className="pt-5">
              <p className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
                {(() => {
                  const Icon = categoryIcons[item.category]
                  return (
                    <span className="icon-chip h-8 w-8">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                  )
                })()}
                <span>{labels[item.category]}</span>
              </p>
              <h3 className="mt-3 font-serif text-[1.95rem] leading-tight text-[var(--primary)]">{item.title}</h3>
              <p className="mt-3 text-[1.04rem] leading-8 text-[var(--muted)]">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>
      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(8,18,35,0.84)] p-5"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden bg-[var(--surface)] shadow-[0_28px_90px_rgba(8,18,35,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-[rgba(251,249,245,0.92)] px-3 py-2 text-sm font-semibold text-[var(--primary)] shadow-[0_14px_34px_rgba(8,18,35,0.2)]"
              onClick={() => setOpenId(null)}
            >
              <span className="icon-chip h-8 w-8">
                <CloseIcon className="h-4 w-4" />
              </span>
              <span>Close</span>
            </button>
            <div className="relative aspect-[4/3]">
              <Image src={selected.image} alt={selected.altText} fill className="object-contain" sizes="90vw" />
            </div>
            <div className="p-8 md:p-10">
              <p className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
                {(() => {
                  const Icon = categoryIcons[selected.category]
                  return (
                    <span className="icon-chip h-8 w-8">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                  )
                })()}
                <span>{labels[selected.category]}</span>
              </p>
              <h3 className="mt-3 font-serif text-[2.55rem] leading-tight text-[var(--primary)]">{selected.title}</h3>
              <p className="mt-4 max-w-3xl text-[1.06rem] leading-8 text-[var(--muted)]">{selected.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
