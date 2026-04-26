import { DocumentIcon, MailIcon, ShareIcon } from '@/src/components/branding/elegant-icons'
import { SocialIcon } from '@/src/components/branding/social-icon'
import { ContactForm } from '@/src/components/forms/contact-form'
import type { SiteContent } from '../../../../shared/site-content'

export function HomeContactSection({
  contactPage,
  siteSettings,
}: {
  contactPage: SiteContent['contactPage']
  siteSettings: SiteContent['siteSettings']
}) {
  return (
    <section id="contact" className="anchor-offset section-contrast section-space-lg">
      <div className="page-shell grid gap-8 xl:grid-cols-[0.98fr_1.02fr] xl:items-start">
        <div>
          <p className="eyebrow text-[rgba(255,255,255,0.58)]">Contact &amp; Communication</p>
          <h2 className="mt-4 max-w-2xl font-serif text-[2.8rem] leading-[0.96] tracking-[-0.035em] text-white md:text-[4rem]">
            Professional correspondence, invitations, and public-facing communication.
          </h2>
          <p className="mt-6 max-w-xl text-[0.98rem] leading-8 text-[rgba(255,255,255,0.8)]">
            {contactPage.intro}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {contactPage.contactCards.map((item, index) => (
              <article key={item.label} className="glass-card px-5 py-5">
                <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.62)]">
                  {index === 0 ? <MailIcon className="h-3.5 w-3.5" /> : index === 1 ? <DocumentIcon className="h-3.5 w-3.5" /> : <ShareIcon className="h-3.5 w-3.5" />}
                  <span>{item.label}</span>
                </p>
                <p className="mt-3 font-serif text-[1.3rem] italic leading-6 text-white">{item.value}</p>
              </article>
            ))}
          </div>
          {siteSettings.socialLinks.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {siteSettings.socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/12"
                >
                  <span className="icon-chip icon-chip-contrast h-8 w-8">
                    <SocialIcon label={item.label} className="h-4 w-4" />
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <div className="relative">
          <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(126,214,245,0.45),rgba(126,214,245,0))] blur-3xl lg:block" />
          <div className="absolute -right-4 bottom-8 hidden h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(245,197,66,0.3),rgba(245,197,66,0))] blur-3xl lg:block" />
          <div className="rounded-[1.9rem] border border-white/12 bg-[linear-gradient(180deg,rgba(247,244,238,0.98),rgba(255,255,255,0.88))] p-3 shadow-[0_28px_78px_rgba(5,14,28,0.28)]">
            <ContactForm framed={false} inquiryTypes={contactPage.inquiryTypeOptions} />
          </div>
        </div>
      </div>
    </section>
  )
}
