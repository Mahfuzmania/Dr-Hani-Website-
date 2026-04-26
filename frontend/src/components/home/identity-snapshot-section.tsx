import { CommunityIcon, HeartIcon, ShieldIcon } from '@/src/components/branding/elegant-icons'
import { Reveal } from '@/src/components/ui/reveal'

const icons = [ShieldIcon, HeartIcon, CommunityIcon]

export function IdentitySnapshotSection({
  items,
}: {
  items: Array<{ description: string; title: string }>
}) {
  return (
    <section className="page-shell section-space">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Identity Snapshot</p>
          <h2 className="mt-4 max-w-3xl font-serif text-[2.7rem] leading-[0.96] tracking-[-0.035em] text-[var(--primary-strong)] md:text-[4rem]">
            A physician-led profile shaped by care, women-centered service, and visible community presence.
          </h2>
        </div>
        <p className="max-w-lg text-[0.98rem] leading-8 text-[var(--muted)]">
          The homepage stays strongest when these three strands remain balanced: medical credibility, women-focused care, and a civic presence presented in documentary terms.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index] ?? CommunityIcon

          return (
            <Reveal
              key={item.title}
              className={`${index === 1 ? 'panel-contrast md:translate-y-8' : 'panel-white'} p-7`}
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`icon-chip h-12 w-12 ${index === 1 ? 'icon-chip-contrast border-white/14 text-white' : 'text-[var(--primary-strong)]'}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="micro-accent-dot shrink-0" />
              </div>
              <p
                className={`mt-6 text-[0.74rem] font-semibold uppercase tracking-[0.18em] ${
                  index === 1 ? 'text-[rgba(255,255,255,0.62)]' : 'text-[var(--muted)]'
                }`}
              >
                Identity {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-serif text-[2rem] leading-tight">{item.title}</h3>
              <p
                className={`mt-4 text-[0.96rem] leading-8 ${
                  index === 1 ? 'text-[rgba(255,255,255,0.8)]' : 'text-[var(--muted)]'
                }`}
              >
                {item.description}
              </p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
