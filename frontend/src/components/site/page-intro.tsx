import type { ReactNode } from 'react'

export function PageIntro({ title, children }: { title: string; children: ReactNode }) {
  return <div className="archive-intro"><h1>{title}</h1><div className="reading-copy">{children}</div></div>
}
