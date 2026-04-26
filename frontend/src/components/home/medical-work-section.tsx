import Image from 'next/image'
import Link from 'next/link'

import { ArrowUpRightIcon, HeartIcon, ShieldIcon } from '@/src/components/branding/elegant-icons'
import { Reveal } from '@/src/components/ui/reveal'

type MedicalCard = {
  description: string
  image: string
  title: string
}

const icons = [ShieldIcon, HeartIcon, ShieldIcon]

export function MedicalWorkSection({
  cards,
  statement,
  cta,
}: {
  cards: MedicalCard[]
  statement: string
  cta: { href: string; label: string }
}) {
  return (
    <section id="medical-work" className="anchor-offset page-shell section-space-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Medical Service &amp; Women&apos;s Health</p>
          <h2 className="mt-4 max-w-3xl font-serif text-[2.8rem] leading-[0.96] tracking-[-0.035em] text-[var(--primary-strong)] md:text-[4rem]">
            Clinical focus areas presented as professional background, not service advertising.
          </h2>
        </div>
        <p className="max-w-xl text-[0.98rem] leading-8 text-[var(--muted)]">{statement}</p>
      </div>
      <div className="mt-10 grid gap-5 xl:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = icons[index] ?? ShieldIcon
          const contrast = index === 1

          return (
            <Reveal
              key={card.title}
              className={`${contrast ? 'panel-contrast' : 'panel-white'} overflow-hidden ${index === 1 ? 'xl:translate-y-8' : ''}`}
            >
              <div className="image-frame relative aspect-[5/4] rounded-none">
                <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw" />
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`icon-chip h-11 w-11 ${contrast ? 'icon-chip-contrast border-white/14 text-white' : 'text-[var(--primary-strong)]'}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="micro-accent-dot shrink-0" />
                </div>
                <p
                  className={`mt-5 text-[0.74rem] font-semibold uppercase tracking-[0.18em] ${
                    contrast ? 'text-[rgba(255,255,255,0.62)]' : 'text-[var(--muted)]'
                  }`}
                >
                  Focus Area
                </p>
                <h3 className="mt-3 font-serif text-[1.95rem] leading-tight">{card.title}</h3>
                <p
                  className={`mt-4 text-[0.95rem] leading-8 ${
                    contrast ? 'text-[rgba(255,255,255,0.78)]' : 'text-[var(--muted)]'
                  }`}
                >
                  {card.description}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
      <div className="mt-8">
        <Link href={cta.href} className="button-secondary">
          <span>{cta.label}</span>
          <ArrowUpRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
