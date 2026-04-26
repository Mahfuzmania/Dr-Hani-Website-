'use client'

import { motion, useReducedMotion } from 'framer-motion'

type FloatingOrbProps = {
  className?: string
  delay?: number
  duration?: number
  tint?: 'aqua' | 'navy' | 'sky'
}

export function FloatingOrb({
  className = '',
  delay = 0,
  duration = 18,
  tint = 'sky',
}: FloatingOrbProps) {
  const reduceMotion = useReducedMotion()
  const background =
    tint === 'navy'
      ? 'radial-gradient(circle, rgba(8,32,68,0.28), rgba(8,32,68,0.02))'
      : tint === 'aqua'
        ? 'radial-gradient(circle, rgba(183,236,250,0.42), rgba(183,236,250,0.02))'
        : 'radial-gradient(circle, rgba(126,214,245,0.48), rgba(126,214,245,0.02))'

  if (reduceMotion) {
    return <div aria-hidden="true" className={`absolute rounded-full blur-3xl ${className}`.trim()} style={{ background }} />
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute rounded-full blur-3xl ${className}`.trim()}
      style={{ background }}
      animate={{
        x: [0, 16, -12, 0],
        y: [0, -18, 10, 0],
        scale: [1, 1.05, 0.98, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }}
    />
  )
}
