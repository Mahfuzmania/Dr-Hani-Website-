import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="page-shell error-page flex min-h-[70vh] flex-col justify-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-sans text-[3rem] font-semibold leading-[1.1] tracking-[-0.04em] text-[var(--primary)] md:text-[4rem]">
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
