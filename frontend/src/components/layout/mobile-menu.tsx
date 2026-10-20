'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { Menu, X } from 'lucide-react'
import type { SiteContentV2 } from '../../../../shared/site-content-v2'
import { navigation } from './navigation'

export function MobileMenu({ settings }: { settings: SiteContentV2['siteSettings'] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const previousOverflow = useRef('')
  function close() {
    dialog.current?.close()
  }
  function open() {
    previousOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
  }
  return (
    <>
      <button
        ref={trigger}
        className="menu-toggle"
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        onClick={open}
      >
        <Menu size={22} />
      </button>
      <dialog
        ref={dialog}
        className="mobile-dialog"
        aria-labelledby="navigation-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
        onClose={() => {
          document.body.style.overflow = previousOverflow.current
          trigger.current?.focus()
        }}
      >
        <div className="mobile-dialog-content">
          <div className="flex items-center justify-between gap-4">
            <h2 id="navigation-title" className="font-serif text-3xl">
              {settings.fullName}
            </h2>
            <button className="menu-toggle" onClick={close} aria-label="Close menu" autoFocus>
              <X size={22} />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={close}>
                {item.label}
              </Link>
            ))}
            <Link href="/updates" onClick={close}>
              Activities & updates
            </Link>
            <Link href="/#contact" onClick={close}>
              Contact
            </Link>
          </nav>
          <a className="break-all" href={`mailto:${settings.primaryEmail}`}>
            {settings.primaryEmail}
          </a>
        </div>
      </dialog>
    </>
  )
}
