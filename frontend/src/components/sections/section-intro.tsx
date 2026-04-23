import { Reveal } from '../ui/reveal'

type SectionIntroProps = {
  body?: string
  eyebrow?: string
  title: string
}

export function SectionIntro({ body, eyebrow, title }: SectionIntroProps) {
  return (
    <Reveal className="max-w-4xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 font-serif text-[2.9rem] leading-[1.02] tracking-[-0.03em] text-[var(--primary)] md:text-[3.8rem]">
        {title}
      </h2>
      {body ? <p className="mt-6 text-[1.02rem] leading-9 text-[var(--muted)] md:text-[1.14rem] md:leading-10">{body}</p> : null}
    </Reveal>
  )
}
