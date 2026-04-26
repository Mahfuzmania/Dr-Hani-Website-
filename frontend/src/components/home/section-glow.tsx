type SectionGlowProps = {
  className?: string
  tint?: 'gold' | 'navy' | 'sky'
}

export function SectionGlow({ className = '', tint = 'sky' }: SectionGlowProps) {
  const background =
    tint === 'gold'
      ? 'radial-gradient(circle, rgba(245,197,66,0.28), rgba(245,197,66,0))'
      : tint === 'navy'
        ? 'radial-gradient(circle, rgba(8,32,68,0.24), rgba(8,32,68,0))'
        : 'radial-gradient(circle, rgba(126,214,245,0.34), rgba(126,214,245,0))'

  return <div aria-hidden="true" className={`absolute rounded-full blur-3xl ${className}`.trim()} style={{ background }} />
}
