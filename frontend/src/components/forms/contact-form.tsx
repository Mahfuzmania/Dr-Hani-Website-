'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.email('Please provide a valid email address.'),
  phone: z.string().optional(),
  inquiryType: z.string().min(2, 'Please select an inquiry type.'),
  subject: z.string().min(3, 'Please provide a short subject.'),
  message: z.string().min(20, 'Please write a more detailed message.'),
})

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim()

export function ContactForm({ inquiryTypes }: { framed?: boolean; inquiryTypes: string[] }) {
  const [status, setStatus] = useState<'error' | 'idle' | 'submitting' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError(null)

    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    const parsed = schema.safeParse(payload)

    if (!parsed.success) {
      setStatus('error')
      setError(parsed.error.issues[0]?.message || 'Please review your message and try again.')
      return
    }

    if (!backendUrl) {
      setStatus('error')
      setError('The submission service is not configured right now.')
      return
    }

    const response = await fetch(`${backendUrl}/api/public/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
    }).catch(() => null)

    if (!response || !response.ok) {
      setStatus('error')
      setError('Submission could not be completed right now.')
      return
    }

    setStatus('success')
    event.currentTarget.reset()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="panel-solid editorial-card p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Name</span>
          <input name="name" className="input-shell mt-3" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Email</span>
          <input name="email" type="email" className="input-shell mt-3" placeholder="Your email address" />
        </label>
        <label className="block">
          <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Phone</span>
          <input name="phone" className="input-shell mt-3" placeholder="Optional contact number" />
        </label>
        <label className="block">
          <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Inquiry type</span>
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
        <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Subject</span>
        <input name="subject" className="input-shell mt-3" placeholder="A short subject line" />
      </label>
      <label className="mt-5 block">
        <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Message</span>
        <textarea
          name="message"
          rows={6}
          className="input-shell mt-3 resize-none"
          placeholder="Share a little context for your message"
        />
      </label>
      {status === 'error' && error ? (
        <p className="mt-5 text-sm text-[#8f3d34]">{error}</p>
      ) : null}
      {status === 'success' ? (
        <p className="mt-5 text-sm text-[var(--navy)]">Your message has been sent successfully.</p>
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
