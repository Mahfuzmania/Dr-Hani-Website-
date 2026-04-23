'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod'

import { DocumentIcon, MailIcon, MessageIcon, PhoneIcon, SendIcon, UserIcon } from '../branding/elegant-icons'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.email('Please provide a valid email address.'),
  phone: z.string().optional(),
  inquiryType: z.string().min(2, 'Please select or enter an inquiry type.'),
  subject: z.string().min(3, 'Please provide a short subject.'),
  message: z.string().min(20, 'Please write a more detailed message.'),
})

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim()

export function ContactForm({ inquiryTypes }: { inquiryTypes: string[] }) {
  const [status, setStatus] = useState<'idle' | 'error' | 'submitting' | 'success'>('idle')
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
      setError(parsed.error.issues[0]?.message || 'Please review your submission.')
      return
    }

    if (!backendUrl) {
      setStatus('error')
      setError('Direct form delivery is not configured right now. Please use the public email or social links.')
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
      className="panel-soft p-8 md:p-12"
    >
      <h3 className="font-serif text-[2.45rem] italic leading-tight text-[var(--primary)]">Write a Message</h3>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <label className="block">
          <span className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
            <span className="icon-chip h-8 w-8">
              <UserIcon className="h-4 w-4" />
            </span>
            <span>Name</span>
          </span>
          <input
            name="name"
            className="editorial-input"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
            <span className="icon-chip h-8 w-8">
              <MailIcon className="h-4 w-4" />
            </span>
            <span>Email address</span>
          </span>
          <input
            name="email"
            type="email"
            className="editorial-input"
            placeholder="Your email address"
          />
        </label>
        <label className="block">
          <span className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
            <span className="icon-chip h-8 w-8">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <span>Phone</span>
          </span>
          <input
            name="phone"
            className="editorial-input"
            placeholder="Optional contact number"
          />
        </label>
        <label className="block">
          <span className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
            <span className="icon-chip h-8 w-8">
              <DocumentIcon className="h-4 w-4" />
            </span>
            <span>Inquiry type</span>
          </span>
          <select
            name="inquiryType"
            defaultValue={inquiryTypes[0] ?? ''}
            className="editorial-input"
          >
            {inquiryTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-10 block">
        <span className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
          <span className="icon-chip h-8 w-8">
            <DocumentIcon className="h-4 w-4" />
          </span>
          <span>Subject</span>
        </span>
        <input
          name="subject"
          className="editorial-input"
          placeholder="A short subject line"
        />
      </label>
      <label className="mt-10 block">
        <span className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.46)]">
          <span className="icon-chip h-8 w-8">
            <MessageIcon className="h-4 w-4" />
          </span>
          <span>Message</span>
        </span>
        <textarea
          name="message"
          rows={4}
          className="editorial-input resize-none"
          placeholder="Share a little context for your message"
        />
      </label>
      {status === 'error' && error ? <p className="mt-6 text-[0.98rem] text-red-700">{error}</p> : null}
      {status === 'success' ? (
        <p className="mt-6 text-[0.98rem] text-[var(--success)]">Your message has been sent successfully.</p>
      ) : null}
      <button
        type="submit"
        className="button-primary mt-10"
      >
        <span className="icon-chip icon-chip-contrast h-8 w-8">
          <SendIcon className="h-4 w-4" />
        </span>
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
