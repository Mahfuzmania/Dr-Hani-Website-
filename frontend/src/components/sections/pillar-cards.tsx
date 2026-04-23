import { Reveal } from '../ui/reveal'

type CardItem = {
  description: string
  title: string
}

export function PillarCards({ items }: { items: CardItem[] }) {
  const tones = ['panel-soft text-[var(--foreground)]', 'panel-contrast text-white', 'bg-[var(--surface-mid)] text-[var(--foreground)]']

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item, index) => (
        <Reveal
          key={item.title}
          className={`${tones[index % tones.length]} min-h-[18rem] p-8`}
        >
          <p className={`text-[0.84rem] font-semibold uppercase tracking-[0.14em] ${index % tones.length === 1 ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(15,28,44,0.5)]'}`}>
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-10 font-serif text-[2.15rem] leading-tight md:text-[2.35rem]">{item.title}</h3>
          <p className={`mt-4 text-[1rem] leading-8 ${index % tones.length === 1 ? 'text-[rgba(255,255,255,0.76)]' : 'text-[rgba(27,28,26,0.7)]'}`}>
            {item.description}
          </p>
        </Reveal>
      ))}
    </div>
  )
}
