import Image from 'next/image'

import { DocumentIcon, MailIcon, MessageIcon, ShareIcon } from '@/src/components/branding/elegant-icons'
import { SocialIcon } from '@/src/components/branding/social-icon'
import { ContactForm } from '@/src/components/forms/contact-form'
import { StatementBlock } from '@/src/components/sections/statement-block'
import { getGalleryImage } from '@/src/lib/content-helpers'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Contact',
  'Public email, social links, and professional correspondence for Dr Umma Hani.',
  '/contact',
)

export default async function ContactPage() {
  const { contactPage, galleryItems, siteSettings } = await getSiteContent()
  const inquiryImage = getGalleryImage(galleryItems, 'field-presence-portrait', '/media/field-presence-portrait.jpg')

  return (
    <div className="pb-24">
      <section className="page-shell pt-28 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <div>
            <p className="eyebrow">{contactPage.hero.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-serif text-[3.7rem] leading-[0.92] tracking-[-0.05em] text-[var(--primary)] md:text-[5.7rem] lg:text-[6.9rem]">
              {contactPage.hero.title}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-[var(--muted)] md:text-[1.1rem] md:leading-9">
              {contactPage.hero.summary}
            </p>
          </div>
          <div className="image-frame relative aspect-[4/5]">
            <Image
              src={inquiryImage}
              alt="Contact and inquiry"
              fill
              loading="eager"
              className="object-cover grayscale-[0.08]"
              sizes="(min-width: 1024px) 30vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="section-tone section-space-lg mt-16">
        <div className="page-shell max-w-5xl">
          <StatementBlock>{contactPage.intro}</StatementBlock>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <ContactForm inquiryTypes={contactPage.inquiryTypeOptions} />
          <div className="space-y-6">
            <article className="panel-contrast p-8 text-white md:p-10">
              <p className="eyebrow text-[rgba(255,255,255,0.54)]">Direct access</p>
              <div className="mt-10 space-y-8">
                {contactPage.contactCards.map((item, index) => (
                  <div key={item.label} className="ghost-line-contrast pt-5 first:border-t-0 first:pt-0">
                    <p className="inline-flex items-center gap-2 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(255,255,255,0.56)]">
                      <span className="icon-chip icon-chip-contrast h-8 w-8">
                        {index === 0 ? (
                          <MailIcon className="h-4 w-4" />
                        ) : index === 1 ? (
                          <MessageIcon className="h-4 w-4" />
                        ) : (
                          <ShareIcon className="h-4 w-4" />
                        )}
                      </span>
                      <span>{item.label}</span>
                    </p>
                    <p className="mt-3 break-words font-serif text-[1.4rem] italic leading-7 text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </article>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <article className="panel-soft p-8">
                <p className="eyebrow">Inquiry scope</p>
                <div className="mt-8 space-y-3">
                  {contactPage.inquiryTypeOptions.map((item) => (
                    <p key={item} className="inline-flex items-center gap-3 text-sm leading-7 text-[var(--muted)]">
                      <span className="icon-chip h-8 w-8">
                        <DocumentIcon className="h-4 w-4 text-[rgba(15,28,44,0.62)]" />
                      </span>
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </article>
              <article className="panel-soft p-8">
                <p className="eyebrow">Social presence</p>
                <div className="mt-8 flex flex-col gap-3 text-[0.84rem] font-semibold uppercase tracking-[0.14em] text-[rgba(15,28,44,0.5)]">
                  {siteSettings.socialLinks.map((item) => {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 transition-colors hover:text-[var(--primary)]"
                      >
                        <span className="icon-chip h-8 w-8">
                          <SocialIcon label={item.label} className="h-4 w-4" />
                        </span>
                        <span>{item.label}</span>
                      </a>
                    )
                  })}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tone section-space pb-8">
        <div className="page-shell max-w-5xl">
          <StatementBlock>{contactPage.privacyNote}</StatementBlock>
        </div>
      </section>
    </div>
  )
}
