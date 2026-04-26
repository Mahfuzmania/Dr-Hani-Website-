import Image from 'next/image'
import Link from 'next/link'

import { ArrowUpRightIcon, BuildingIcon, CommunityIcon, HeartIcon, ShieldIcon } from '@/src/components/branding/elegant-icons'
import { Reveal } from '@/src/components/ui/reveal'

const floatingBadges = [
  { icon: ShieldIcon, title: 'Medical Service' },
  { icon: HeartIcon, title: "Women's Health" },
  { icon: CommunityIcon, title: 'Community Outreach' },
  { icon: BuildingIcon, title: 'Public Leadership' },
]

export function HeroProfileSection({
  fullName,
  identityLine,
  title,
  subtitle,
  image,
  primaryCta,
  secondaryCta,
}: {
  fullName: string
  identityLine: string
  title: string
  subtitle: string
  image: string
  primaryCta: { href: string; label: string }
  secondaryCta: { href: string; label: string }
}) {
  return (
    <section id="profile" className="anchor-offset page-shell pt-24 md:pt-32 lg:pt-36">
      <div className="hero-shell overflow-hidden border border-[rgba(232,222,201,0.72)] bg-[linear-gradient(145deg,rgba(255,255,255,0.86),rgba(247,244,238,0.56))] px-4 py-5 shadow-[0_40px_120px_rgba(8,32,68,0.1)] sm:px-5 md:px-8 md:py-8 lg:px-10 lg:py-10">
        <div className="absolute left-[5%] top-[8%] h-[9rem] w-[9rem] rounded-full bg-[radial-gradient(circle,rgba(126,214,245,0.5),rgba(126,214,245,0.02))] blur-2xl md:h-[18rem] md:w-[18rem]" />
        <div className="absolute inset-y-0 right-[-12%] top-[12%] hidden w-[44%] rounded-[3rem] bg-[radial-gradient(circle_at_top,rgba(8,32,68,0.12),rgba(8,32,68,0.01))] blur-3xl lg:block" />
        <div className="absolute right-[8%] top-[8%] hidden h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_0_12px_rgba(255,216,77,0.12)] md:block" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] lg:items-center">
          <Reveal className="min-w-0 pb-2">
            <p className="eyebrow max-w-[18rem] whitespace-normal leading-6 sm:max-w-[24rem] md:max-w-none">
              Physician • Women&apos;s Health • Community Leadership
            </p>
            <div className="mt-5 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-[rgba(232,222,201,0.84)] bg-[rgba(255,255,255,0.66)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] shadow-[0_12px_28px_rgba(8,32,68,0.05)]">
              <span className="icon-chip h-8 w-8">
                <ShieldIcon className="h-4 w-4 text-[var(--primary-strong)]" />
              </span>
              <span className="max-w-full break-words leading-6">{identityLine}</span>
            </div>
            <h1 className="mt-6 max-w-3xl font-serif text-[3rem] leading-[0.9] tracking-[-0.045em] text-[var(--primary-strong)] sm:text-[3.6rem] md:text-[5rem] lg:text-[6rem] xl:text-[6.4rem]">
              {title || fullName}
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-[1rem] leading-8 text-[var(--muted)] md:text-[1.08rem] md:leading-9">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4">
              <Link href={primaryCta.href} className="button-primary">
                <span>{primaryCta.label}</span>
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </Link>
              <Link href={secondaryCta.href} className="button-outline">
                {secondaryCta.label}
              </Link>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-2 xl:max-w-xl">
              {floatingBadges.map((badge) => {
                const Icon = badge.icon

                return (
                  <div key={badge.title} className="floating-badge inline-flex items-center gap-3 px-4 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[var(--primary-strong)]">
                    <span className="icon-chip h-9 w-9">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{badge.title}</span>
                  </div>
                )
              })}
            </div>
          </Reveal>
          <Reveal className="relative">
            <div className="relative mx-auto max-w-[32rem]">
              <div className="absolute -left-2 top-8 hidden h-[72%] w-[74%] rounded-[2.4rem] border border-[rgba(255,255,255,0.72)] bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.02))] shadow-[0_26px_60px_rgba(8,32,68,0.08)] md:block" />
              <div className="absolute -right-4 bottom-8 hidden h-[68%] w-[68%] rounded-[2.6rem] bg-[linear-gradient(180deg,rgba(8,32,68,0.24),rgba(8,32,68,0.02))] blur-2xl md:block" />
              <div className="image-frame relative aspect-[4/5] rounded-[2.1rem] border border-[rgba(255,255,255,0.74)]">
                <Image
                  src={image}
                  alt={fullName}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <div className="absolute -bottom-5 left-3 right-3 mx-auto max-w-[18.5rem] rounded-[1.35rem] border border-[rgba(255,255,255,0.56)] bg-[rgba(255,255,255,0.82)] px-5 py-4 shadow-[0_22px_50px_rgba(8,32,68,0.16)] backdrop-blur-xl md:left-5 md:right-auto">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Identity Note
                </p>
                <p className="mt-2 inline-flex items-center gap-3 font-serif text-[1.18rem] italic leading-6 text-[var(--primary-strong)]">
                  <HeartIcon className="h-4 w-4 text-[var(--accent-strong)]" />
                  <span>Clinical service with public composure and human warmth.</span>
                </p>
              </div>
              <div className="absolute right-2 top-4 hidden rounded-full border border-[rgba(255,255,255,0.62)] bg-[rgba(255,255,255,0.8)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--primary-strong)] shadow-[0_14px_30px_rgba(8,32,68,0.08)] md:inline-flex">
                <span className="inline-flex items-center gap-2">
                  <CommunityIcon className="h-4 w-4 text-[var(--accent-strong)]" />
                  Bangladesh
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
