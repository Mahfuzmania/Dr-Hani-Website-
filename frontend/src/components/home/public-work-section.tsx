import Image from 'next/image'
import Link from 'next/link'

import { ArrowUpRightIcon } from '@/src/components/branding/elegant-icons'
import { Reveal } from '@/src/components/ui/reveal'

export function PublicWorkSection({
  body,
  cta,
  featureImage,
  items,
  supportingImages,
}: {
  body: string
  cta: { href: string; label: string }
  featureImage: string
  items: Array<{ description: string; title: string }>
  supportingImages: string[]
}) {
  const [secondaryImage, tertiaryImage, quaternaryImage] = supportingImages

  return (
    <section id="public-work" className="anchor-offset section-contrast section-space-lg">
      <div className="page-shell grid gap-10 xl:grid-cols-[0.94fr_1.06fr] xl:items-center">
        <Reveal>
          <p className="eyebrow text-[rgba(255,255,255,0.6)]">Public Service &amp; Community Presence</p>
          <h2 className="mt-4 max-w-2xl font-serif text-[2.9rem] leading-[0.96] tracking-[-0.035em] text-white md:text-[4.1rem]">
            Documentary, community-facing, and strongest when presented with restraint.
          </h2>
          <p className="mt-6 max-w-xl text-[0.98rem] leading-8 text-[rgba(255,255,255,0.8)]">{body}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {items.map((item) => (
              <article key={item.title} className="glass-card px-4 py-4">
                <div className="micro-accent-dot" />
                <h3 className="mt-4 font-serif text-[1.45rem] italic leading-tight text-white">{item.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-7 text-[rgba(255,255,255,0.74)]">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link href={cta.href} className="button-outline border-white/16 bg-white/8 text-white">
              <span>{cta.label}</span>
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal className="grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
          <div className="image-frame relative min-h-[24rem] rounded-[1.8rem] border border-white/10 bg-white/5 md:min-h-[31rem]">
            <Image src={featureImage} alt="Community presence feature" fill className="object-cover" sizes="(min-width: 1280px) 34vw, 100vw" />
          </div>
          <div className="grid gap-4">
            <div className="image-frame relative min-h-[14rem] rounded-[1.6rem] border border-white/10 bg-white/5">
              <Image src={secondaryImage} alt="Community presence supporting" fill className="object-cover" sizes="(min-width: 1280px) 18vw, 100vw" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <div className="image-frame relative min-h-[13rem] rounded-[1.6rem] border border-white/10 bg-white/5">
                <Image src={tertiaryImage} alt="Public presence detail" fill className="object-cover" sizes="(min-width: 1280px) 14vw, 100vw" />
              </div>
              <div className="glass-card flex min-h-[13rem] flex-col justify-between px-5 py-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.58)]">
                  Documentary note
                </p>
                <p className="font-serif text-[1.45rem] italic leading-6 text-white">
                  The homepage stays civic and image-led without drifting into campaign language or slogan-driven presentation.
                </p>
              </div>
            </div>
            <div className="image-frame relative min-h-[13rem] rounded-[1.6rem] border border-white/10 bg-white/5">
              <Image src={quaternaryImage} alt="Community presence collage detail" fill className="object-cover" sizes="(min-width: 1280px) 22vw, 100vw" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
