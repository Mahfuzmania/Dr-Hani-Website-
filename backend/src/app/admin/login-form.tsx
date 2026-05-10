'use client'

import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({ email, password }),
    }).catch(() => null)

    if (!response?.ok) {
      setSubmitting(false)
      setError('Login failed. Check the email and password and try again.')
      return
    }

    router.refresh()
    window.location.assign('/admin/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[rgba(18,32,51,0.54)]">
          Email
        </span>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          className="admin-field mt-3 w-full rounded-[0.8rem] px-4 py-3 text-[var(--foreground)]"
          placeholder="Admin email"
          required
        />
      </label>
      <label className="block">
        <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[rgba(18,32,51,0.54)]">
          Password
        </span>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className="admin-field mt-3 w-full rounded-[0.8rem] px-4 py-3 text-[var(--foreground)]"
          placeholder="Password"
          required
        />
      </label>
      {error ? <p className="text-sm text-[#a53939]">{error}</p> : null}
      <button
        type="submit"
        disabled={submitting}
        className="admin-button-primary inline-flex rounded-[0.9rem] px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-70"
      >
        {submitting ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  )
}
