import Image from 'next/image'

import { OrganizationStrip } from '@/src/components/sections/organization-strip'
import { CTASection } from '@/src/components/sections/cta-section'
import { SectionIntro } from '@/src/components/sections/section-intro'
import { StatementBlock } from '@/src/components/sections/statement-block'
import { DEFAULT_SITE_IMAGE, getGalleryImage, getHeroImage } from '@/src/lib/content-helpers'
import { buildMetadata } from '@/src/lib/metadata'
import { getSiteContent } from '@/src/lib/site-api'

export const metadata = buildMetadata(
  'Medical Service',
  'Role timeline, clinical responsibilities, and competencies for Dr Umma Hani.',
  '/medical-service',
)

export default async function MedicalServicePage() {
  const { galleryItems, medicalServicePage } = await getSiteContent()
  const competencyHighlights = medicalServicePage.clinicalCompetencies.slice(0, 3)
  const additionalCompetencies = medicalServicePage.clinicalCompetencies.slice(3)
  const serviceImages = [
    getGalleryImage(galleryItems, 'about-doctor-portrait', getHeroImage(medicalServicePage.hero, DEFAULT_SITE_IMAGE)),
    getGalleryImage(galleryItems, 'camp-consultation', getHeroImage(medicalServicePage.hero, DEFAULT_SITE_IMAGE)),
    getGalleryImage(galleryItems, 'clinic-corridor-portrait', getHeroImage(medicalServicePage.hero, DEFAULT_SITE_IMAGE)),
    getGalleryImage(galleryItems, 'medical-camp-team', getHeroImage(medicalServicePage.hero, DEFAULT_SITE_IMAGE)),
  ]

  return (
    <div className="pb-24">
      <section className="page-shell pt-28 md:pt-36">
        <div className="grid gap-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <div>
              <p className="eyebrow">{medicalServicePage.hero.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl font-serif text-[3.6rem] leading-[0.92] tracking-[-0.05em] text-[var(--primary)] md:text-[5.6rem] lg:text-[6.8rem]">
                {medicalServicePage.hero.title}
              </h1>
            </div>
            <p className="max-w-md font-serif text-[1.15rem] italic leading-8 text-[var(--muted)] md:text-[1.35rem]">
              {medicalServicePage.hero.summary}
            </p>
          </div>
          <div className="image-frame relative aspect-[21/9]">
            <Image
              src={getHeroImage(medicalServicePage.hero, serviceImages[0] ?? '/media/bedside-review.jpg')}
              alt={medicalServicePage.hero.title}
              fill
              priority
              loading="eager"
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Core competencies</p>
            <h2 className="mt-4 font-serif text-[2.7rem] leading-[1.02] tracking-[-0.03em] text-[var(--primary)] md:text-[4rem]">
              Practical strengths drawn from the clinical record.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
            The presentation stays close to the documented record: emergency work, patient handling, procedure readiness, and hospital teamwork.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {competencyHighlights.map((item, index) => (
            <article
              key={item}
              className={index === 1 ? 'panel-contrast p-8 text-white' : 'panel-soft p-8'}
            >
              <p className={`text-[0.76rem] font-semibold uppercase tracking-[0.16em] ${index === 1 ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(15,28,44,0.46)]'}`}>
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-10 font-serif text-[2rem] leading-tight">{item}</h3>
              <p className={`mt-4 text-sm leading-8 ${index === 1 ? 'text-[rgba(255,255,255,0.74)]' : 'text-[var(--muted)]'}`}>
                A practical strength reflected in the clinical record and shown here in plain, direct language.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-tone section-space-lg">
        <div className="page-shell max-w-5xl">
          <StatementBlock>{medicalServicePage.servicePhilosophy}</StatementBlock>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="lg:sticky lg:top-36 lg:h-fit">
            <SectionIntro
              eyebrow="Clinical path"
              title="Hospital appointments and internship experience form the backbone of the medical record."
              body={medicalServicePage.internshipSummary}
            />
          </div>
          <div className="space-y-16">
            {medicalServicePage.rolesTimeline.map((item, index) => {
              const responsibilitySlice = medicalServicePage.clinicalResponsibilities.slice(index * 3, index * 3 + 3)

              return (
                <article key={`${item.title}-${item.period}`} className="grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[rgba(15,28,44,0.42)]">
                      {item.period}
                    </p>
                    <h3 className="mt-3 font-serif text-[2.2rem] leading-tight text-[var(--primary)]">{item.title}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-8 text-[var(--muted)]">{item.description}</p>
                    {responsibilitySlice.length ? (
                      <div className="mt-6 space-y-3">
                        {responsibilitySlice.map((detail) => (
                          <p key={detail} className="text-sm leading-7 text-[var(--muted)]">
                            {detail}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className={`image-frame relative aspect-[4/5] ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <Image
                      src={serviceImages[index] ?? serviceImages[0] ?? '/media/bedside-review.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 220px, 100vw"
                    />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {additionalCompetencies.length ? (
        <section className="page-shell section-space">
          <SectionIntro eyebrow="Additional strengths" title="Further competencies named in the clinical record." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {additionalCompetencies.map((item) => (
              <div key={item} className="panel-soft p-6 text-sm leading-7 text-[var(--foreground)]">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <OrganizationStrip
              title="Referenced hospitals and university connection"
              items={['bangladesh-specialized-hospital', 'tmss-medical-college', 'rajshahi-university']}
            />
          </div>
        </section>
      ) : null}

      <section className="page-shell pb-8">
        <CTASection cta={medicalServicePage.cta} title="For professional medical correspondence, the contact page remains the clearest route." />
      </section>
    </div>
  )
}

