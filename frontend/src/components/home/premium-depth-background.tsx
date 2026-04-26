export function PremiumDepthBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="premium-depth-grid" />
      <div className="home-hero-orb left-[-9rem] top-[8rem] h-[18rem] w-[18rem] md:left-[-6rem] md:h-[24rem] md:w-[24rem]" />
      <div className="home-surface-blur right-[-10rem] top-[18rem] h-[20rem] w-[20rem] md:right-[-4rem] md:h-[28rem] md:w-[28rem]" />
      <div className="absolute left-[12%] top-[42rem] h-[18rem] w-[18rem] rounded-full border border-[rgba(200,170,110,0.16)] bg-[radial-gradient(circle,rgba(255,255,255,0.54),rgba(255,255,255,0))] blur-3xl" />
      <div className="absolute right-[-4rem] top-[60rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(11,31,58,0.08),rgba(11,31,58,0))] blur-3xl" />
    </div>
  )
}
