import Link from 'next/link'

import type { CTA } from '../../../../shared/site-content'
import { Reveal } from '../ui/reveal'

export function CTASection({ cta, title }: { cta: CTA; title: string }) {
  return (
    <Reveal className="panel-contrast px-8 py-16 text-center md:px-12 md:py-24">
      <h2 className="mx-auto max-w-4xl font-serif text-[3rem] leading-[1.04] tracking-[-0.03em] text-white md:text-[4.9rem]">
        {title}
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-[0.84rem] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.6)]">
        Thoughtful correspondence, invitations, and media communication are welcomed here.
      </p>
      <div className="mt-10 flex justify-center">
        <Link href={cta.href} className="button-outline">
          {cta.label}
        </Link>
      </div>
    </Reveal>
  )
}

