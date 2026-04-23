import Image from 'next/image'
import Link from 'next/link'

import { ArrowUpRightIcon } from '../branding/elegant-icons'
import { organizations, type OrganizationKey } from '@/src/lib/organizations'

export function OrganizationStrip({
  items,
  title,
}: {
  items: OrganizationKey[]
  title?: string
}) {
  const resolved = items.map((item) => organizations[item]).filter(Boolean)

  if (!resolved.length) return null

  return (
    <div>
      {title ? (
        <p className="text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
          {title}
        </p>
      ) : null}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {resolved.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="panel-white flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[0.8rem] bg-[rgba(15,28,44,0.03)]">
              <Image src={item.logo} alt={item.title} fill className="object-contain p-2" sizes="48px" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.42)]">
                Official site
              </p>
              <p className="mt-1 line-clamp-2 text-[1.04rem] font-medium leading-6 text-[var(--foreground)]">
                {item.title}
              </p>
            </div>
            <span className="icon-chip ml-auto h-8 w-8 shrink-0 text-[rgba(15,28,44,0.52)]">
              <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
