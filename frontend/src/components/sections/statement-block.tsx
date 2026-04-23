import { Reveal } from '../ui/reveal'

export function StatementBlock({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="flex gap-6 md:gap-10">
      <div className="hidden w-1 shrink-0 bg-[var(--secondary)] md:block" />
      <div className="max-w-4xl">
        <div className="editorial-quote text-[2.7rem] md:text-[3.9rem]">
          {children}
        </div>
      </div>
    </Reveal>
  )
}
