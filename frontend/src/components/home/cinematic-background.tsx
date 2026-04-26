'use client'

import { DepthGrid } from './depth-grid'
import { FloatingOrb } from './floating-orb'
import { SectionGlow } from './section-glow'

export function CinematicBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_42%)]" />
      <DepthGrid className="opacity-60" />
      <FloatingOrb className="left-[-10rem] top-[5rem] h-[20rem] w-[20rem] md:h-[28rem] md:w-[28rem]" tint="sky" duration={22} />
      <FloatingOrb className="right-[-8rem] top-[12rem] h-[18rem] w-[18rem] md:h-[24rem] md:w-[24rem]" tint="aqua" duration={19} delay={1} />
      <FloatingOrb className="right-[8%] top-[58%] h-[16rem] w-[16rem] md:h-[22rem] md:w-[22rem]" tint="navy" duration={25} delay={0.8} />
      <div className="absolute left-[8%] top-[24%] h-[16rem] w-[30rem] rounded-[50%] bg-[linear-gradient(135deg,rgba(8,32,68,0.14),rgba(8,32,68,0.02))] blur-3xl" />
      <div className="absolute right-[10%] top-[34%] h-[18rem] w-[26rem] rounded-[40%] bg-[linear-gradient(135deg,rgba(0,87,184,0.12),rgba(0,87,184,0.01))] blur-3xl" />
      <SectionGlow className="left-[12%] top-[42rem] h-[20rem] w-[20rem]" tint="sky" />
      <SectionGlow className="right-[-6rem] top-[68rem] h-[22rem] w-[22rem]" tint="navy" />
      <SectionGlow className="left-[30%] top-[96rem] h-[18rem] w-[18rem]" tint="gold" />
    </div>
  )
}
