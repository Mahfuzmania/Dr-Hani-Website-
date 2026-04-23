import Link from 'next/link'

export default function BackendHomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-slate-700">Backend Service</p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900">Dr. Umme Hani CMS/API</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
        This application hosts the Payload admin panel, structured collections and globals,
        public site JSON endpoints, and the inquiry submission API used by the separate frontend.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link className="rounded-full bg-slate-900 px-5 py-3 text-white" href="/admin">
          Open admin
        </Link>
        <Link className="rounded-full border border-slate-300 px-5 py-3" href="/api/public/site">
          View public site JSON
        </Link>
      </div>
    </main>
  )
}
