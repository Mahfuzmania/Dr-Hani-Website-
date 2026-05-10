import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeUp({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>
}

export function StaggerGroup({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>
}

export function StaggerItem({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>
}

export function ImageReveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>
}
