import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="page-shell flex min-h-[70vh] max-w-3xl flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-[3.6rem] leading-[0.95] tracking-[-0.04em] text-[var(--primary)] md:text-[5rem]">
        Page not found
      </h1>
      <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)]">
        The requested page could not be found in the public website structure.
      </p>
      <Link href="/" className="button-primary mt-10 w-fit">
        Return home
      </Link>
    </main>
  )
}
