'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { contactInquirySchema as schema } from '../../../../shared/contact-inquiry'

export function ContactForm({ inquiryTypes }: { framed?: boolean; inquiryTypes: string[] }) {
  const [status, setStatus] = useState<'error' | 'idle' | 'submitting' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    const parsed = schema.safeParse(payload)

    if (!parsed.success) {
      setStatus('error')
      setError(parsed.error.issues[0]?.message || 'Please review your message and try again.')
      return
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
    }).catch(() => null)

    if (!response || !response.ok) {
      setStatus('error')
      setError('Online enquiries are temporarily unavailable. Please use the email link.')
      return
    }

    setStatus('success')
    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="panel-solid editorial-card p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Name
          </span>
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            className="input-shell mt-3"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Email
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="input-shell mt-3"
            placeholder="Your email address"
          />
        </label>
        <label className="block">
          <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="input-shell mt-3"
            placeholder="Optional contact number"
          />
        </label>
        <label className="block">
          <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Inquiry type
          </span>
          <select name="inquiryType" defaultValue={inquiryTypes[0] ?? ''} className="input-shell mt-3">
            {inquiryTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-5 block">
        <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Subject
        </span>
        <input
          name="subject"
          required
          minLength={3}
          className="input-shell mt-3"
          placeholder="A short subject line"
        />
      </label>
      <label className="mt-5 block">
        <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Message
        </span>
        <textarea
          name="message"
          required
          minLength={20}
          rows={6}
          className="input-shell mt-3 resize-none"
          placeholder="Share a little context for your message"
        />
      </label>
      {status === 'error' && error ? (
        <p role="alert" className="mt-5 text-sm text-[#8f3d34]">
          {error}
        </p>
      ) : null}
      {status === 'success' ? (
        <p role="status" className="mt-5 text-sm text-[var(--navy)]">
          Your message has been sent successfully.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="button-primary mt-6 px-6 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
