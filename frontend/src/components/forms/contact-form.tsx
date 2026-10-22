'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import {
  contactInquirySchema as schema,
  inquiryEmailDraft,
} from '../../../../shared/contact-inquiry'

export function ContactForm({
  inquiryTypes,
  delivery = 'cms',
  recipient,
}: {
  framed?: boolean
  inquiryTypes: string[]
  delivery?: 'cms' | 'email'
  recipient?: string
}) {
  const [status, setStatus] = useState<
    'error' | 'idle' | 'submitting' | 'success'
  >('idle')
  const [error, setError] = useState<string | null>(null)
  const [emailDraft, setEmailDraft] = useState<string | null>(null)

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
      setError(
        parsed.error.issues[0]?.message ||
          'Please review your message and try again.',
      )
      return
    }

    if (delivery === 'email' && recipient) {
      const draft = inquiryEmailDraft(recipient, parsed.data)
      setEmailDraft(draft)
      setStatus('idle')
      window.location.href = draft
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
      setError(
        'Online enquiries are temporarily unavailable. Please use the email link.',
      )
      return
    }

    setStatus('success')
    form.reset()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form"
      aria-busy={status === 'submitting'}
    >
      {delivery === 'email' && (
        <p id="contact-delivery-note" className="contact-delivery-note">
          This form prepares an email. Your email app will open so you can
          review and send it. You can also use the email address alongside this
          form.
        </p>
      )}
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
            maxLength={100}
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
            maxLength={40}
            className="input-shell mt-3"
            placeholder="Optional contact number"
          />
        </label>
        <label className="block">
          <span className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Inquiry type
          </span>
          <select
            name="inquiryType"
            defaultValue={inquiryTypes[0] ?? ''}
            className="input-shell mt-3"
          >
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
          maxLength={120}
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
          maxLength={2000}
          rows={6}
          className="input-shell mt-3"
          placeholder="Share a little context for your message"
        />
      </label>
      {status === 'error' && error ? (
        <p role="alert" className="contact-feedback contact-feedback-error">
          {error}
        </p>
      ) : null}
      {status === 'success' ? (
        <p role="status" className="contact-feedback contact-feedback-success">
          Your message has been sent successfully.
        </p>
      ) : null}
      {emailDraft && (
        <p role="status" className="contact-feedback contact-feedback-success">
          Your email draft is ready. If your email app did not open,{' '}
          <a className="text-link" href={emailDraft}>
            open the draft
          </a>{' '}
          or email{' '}
          <a className="text-link" href={`mailto:${recipient}`}>
            {recipient}
          </a>
          . Send the message from your email app to complete your enquiry.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        aria-describedby={
          delivery === 'email' ? 'contact-delivery-note' : undefined
        }
        className="button-primary mt-6 px-6 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting'
          ? 'Sending...'
          : delivery === 'email'
            ? 'Continue in email app'
            : 'Send message'}
      </button>
    </form>
  )
}
