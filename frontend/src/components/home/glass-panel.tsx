import type { ReactNode } from 'react'

type GlassPanelProps = {
  children: ReactNode
  className?: string
  tone?: 'contrast' | 'light' | 'solid'
}

export function GlassPanel({ children, className = '', tone = 'light' }: GlassPanelProps) {
  const base =
    tone === 'contrast' ? 'panel-contrast' : tone === 'solid' ? 'panel-white' : 'panel-soft'

  return <div className={`${base} ${className}`.trim()}>{children}</div>
}
