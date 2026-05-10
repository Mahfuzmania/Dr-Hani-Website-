export type GalleryCategory = 'medical' | 'community' | 'events' | 'leadership'

export type InquiryType =
  | 'Professional inquiry'
  | 'Medical communication'
  | 'Public service and outreach'
  | 'Leadership and events'
  | 'Media request'

export type SiteContentV2 = {
  contact: {
    intro: string
    inquiryTypes: InquiryType[]
  }
  galleryItems: Array<{
    altText: string
    caption: string
    category: GalleryCategory
    featuredOnHomepage: boolean
    id: string
    image: string
    sortOrder: number
    status: 'draft' | 'published'
    title: string
  }>
  homepage: {
    biographySummary: string
    ctaPrimaryLabel: string
    ctaSecondaryLabel: string
    heroEyebrow: string
    heroImage: string
    heroSubtitle: string
    heroTitle: string
    identityCards: Array<{
      body: string
      title: string
    }>
    sectionVisibility: {
      contact: boolean
      journey: boolean
      medicalWork: boolean
      media: boolean
      profile: boolean
      publicWork: boolean
      updates: boolean
    }
  }
  importantNotices: Array<{
    category: string
    expiryDate?: string
    id: string
    message: string
    pinned: boolean
    startDate?: string
    status: 'draft' | 'published'
    title: string
  }>
  mediaItems: Array<{
    category: GalleryCategory
    description: string
    featuredOnHomepage: boolean
    id: string
    image?: string
    sourceLink?: string
    status: 'draft' | 'published'
    thumbnail: string
    title: string
    type: 'article' | 'image' | 'video'
    url: string
  }>
  positions: Array<{
    branch?: string
    description: string
    featured: boolean
    id: string
    image?: string
    organization: string
    period: string
    sortOrder: number
    sourceLink?: string
    sourceNote?: string
    sourceType: 'document' | 'news' | 'public-record' | 'internal'
    status: 'draft' | 'published'
    title: string
  }>
  privacyPage: {
    intro: string
    sections: Array<{
      body: string
      title: string
    }>
    title: string
  }
  profile: {
    badges: string[]
    journeyTimeline: Array<{
      description: string
      period: string
      title: string
    }>
    medicalCards: Array<{
      body: string
      image: string
      title: string
    }>
    publicWorkCards: Array<{
      body: string
      title: string
    }>
    storyParagraphs: string[]
  }
  siteSettings: {
    footerText: string
    fullName: string
    identityLine: string
    logo?: string
    primaryEmail: string
    seoDescription: string
    seoTitle: string
    socialLinks: Array<{
      href: string
      label: 'Facebook' | 'Instagram' | 'LinkedIn'
    }>
  }
  updates: Array<{
    body: string[]
    category: string
    date: string
    featured: boolean
    id: string
    image?: string
    pinned: boolean
    slug: string
    sourceLink?: string
    status: 'draft' | 'published'
    summary: string
    title: string
  }>
}

export const siteContentV2: SiteContentV2 = {
  siteSettings: {
    fullName: 'Dr Umma Hani',
    identityLine: "Physician - Women's Health - Community Leadership",
    primaryEmail: 'honeyhaque1078@gmail.com',
    footerText:
      "Medical service, women's health, community work, and public leadership.",
    seoTitle: 'Dr Umma Hani',
    seoDescription:
      "Dr Umma Hani is a Bangladeshi physician whose work connects hospital service, women's health, community service, and public leadership.",
    socialLinks: [
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/share/1D5uANq2DQ/?mibextid=wwXIfr',
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/priethy13?igsh=MWk3aTQxb21kb3Z2aQ%3D%3D&utm_source=qr',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/dr-umme-hani-a60b561a4?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      },
    ],
  },
  homepage: {
    heroEyebrow: "Physician - Women's Health - Community Leadership",
    heroTitle: 'Dr Umma Hani',
    heroSubtitle:
      "A Bangladeshi medical doctor whose work connects clinical service, women's health, and community leadership.",
    heroImage: '/media/homepage-hero-seated.jpg',
    ctaPrimaryLabel: 'Read Biography',
    ctaSecondaryLabel: 'Contact',
    biographySummary:
      'Dr Umma Hani completed MBBS at TMSS Medical College in Bogura under Rajshahi University, trained through internship at TMSS Medical College and Rafatullah Community Hospital, and later served in gynecology, obstetrics, and emergency care in Bogura and Dhaka.',
    identityCards: [
      {
        title: 'Hospital Practice',
        body: 'MBBS training, internship service, emergency work, and patient-facing hospital responsibility form the foundation of her medical career.',
      },
      {
        title: "Women's Health",
        body: "Gynecology and obstetrics appointments connect her clinical work with women's health and patient care.",
      },
      {
        title: 'Community Work',
        body: 'Health-service programs, community visits, and leadership responsibilities show her work beyond hospital settings.',
      },
    ],
    sectionVisibility: {
      profile: true,
      journey: true,
      medicalWork: true,
      publicWork: true,
      media: true,
      updates: true,
      contact: true,
    },
  },
  profile: {
    badges: ['MBBS', "Women's Health", 'Emergency Service'],
    storyParagraphs: [
      'Her academic path begins in Bogura, where she completed SSC in 2009 and HSC in 2011 at Cantonment Public School and College before entering MBBS study at TMSS Medical College under Rajshahi University.',
      'After MBBS study from January 2012 to July 2017, she completed a twelve-month internship at TMSS Medical College and Rafatullah Community Hospital, building experience in patient assessment, diagnosis support, specimen observation, and basic emergency treatment.',
      "Her first hospital appointments followed a women's-health clinical route: Indoor Medical Officer in Gynae and Obs at TMSS Medical College and Rafatullah Community Hospital from January to June 2019, then Honorary Medical Officer in Gynae and Obs at Shaheed Ziaur Rahman Medical College and Hospital from July to November 2019.",
      'Later appointments in Dhaka moved deeper into emergency care, including Emergency Medical Officer service at Famous Specialized Hospital from November 2020 to March 2021 and at Bangladesh Specialized Hospital from November 2020 onward.',
      'Her public activity also includes student health-service work, the Chhatra Dal Bogura District Health Secretary role, and a central Vice-President responsibility from April 2026.',
    ],
    journeyTimeline: [
      {
        period: '2009 - 2011',
        title: 'Schooling in Bogura',
        description:
          'She completed SSC in 2009 and HSC in 2011 at Cantonment Public School and College, Bogura, before moving into formal medical study.',
      },
      {
        period: 'January 2012 - July 2017',
        title: 'MBBS at TMSS Medical College',
        description:
          'MBBS study at TMSS Medical College in Bogura under Rajshahi University remains the academic foundation of her professional path.',
      },
      {
        period: 'Internship',
        title: 'TMSS and Rafatullah hospital grounding',
        description:
          'A twelve-month internship at TMSS Medical College and Rafatullah Community Hospital formed the core practical training period in ward work, patient handling, diagnosis support, and clinical routine.',
      },
      {
        period: 'January 2019 - June 2019',
        title: 'Indoor Medical Officer, Gynae and Obs',
        description:
          'She served as Indoor Medical Officer in Gynae and Obs at TMSS Medical College and Rafatullah Community Hospital in Bogura.',
      },
      {
        period: 'July 2019 - November 2019',
        title: 'Honorary Medical Officer, Gynae and Obs',
        description:
          'She then served in Gynae and Obs at Shaheed Ziaur Rahman Medical College and Hospital in Bogura.',
      },
      {
        period: 'November 2020 - March 2021',
        title: 'Emergency Medical Officer at Famous Specialized Hospital',
        description:
          'She served as Emergency Medical Officer at Famous Specialized Hospital in Banasree, Dhaka.',
      },
      {
        period: 'November 2020 - Present',
        title: 'Emergency Medical Officer at Bangladesh Specialized Hospital',
        description:
          'Her current appointment is Emergency Medical Officer at Bangladesh Specialized Hospital, 21 Mirpur Road, Dhaka 1207.',
      },
      {
        period: '25 September 2025',
        title: 'Jagannath University health-service program',
        description:
          'Amar Sangbad reported that Dr Umma Hani was among the doctors providing first-day gynecology-focused support in a three-day student health-service and medicine-distribution program.',
      },
      {
        period: '11 April 2026',
        title: 'BNP reserved-seat nomination-form coverage',
        description:
          'Jagonews24 reported that Dr Umma Hani collected a BNP nomination form and identified her as Health Secretary of Chhatra Dal, Bogura District Branch.',
      },
      {
        period: '4 April 2026',
        title: 'Chhatra Dal Central Parliament Vice-President selection',
        description:
          'In April 2026, Dr Umma Hani was selected as a Vice-President of Bangladesh Jatiyatabadi Chhatra Dal, Central Parliament.',
      },
    ],
    medicalCards: [
      {
        title: 'Bangladesh Specialized Hospital',
        body: 'Current appointment: Emergency Medical Officer at Bangladesh Specialized Hospital, 21 Mirpur Road, Dhaka 1207.',
        image: '/media/bedside-review.jpg',
      },
      {
        title: 'Famous Specialized Hospital',
        body: 'She also served as Emergency Medical Officer at Famous Specialized Hospital in Banasree, Dhaka, from November 2020 to March 2021.',
        image: '/media/camp-consultation.jpg',
      },
      {
        title: 'Bogura women-focused hospital work',
        body: "Earlier Gynae and Obs roles in Bogura included caesarean support in OT, normal vaginal delivery work, OPD management, intern guidance, and service in a Covid unit.",
        image: '/media/medical-camp-desk.jpg',
      },
    ],
    publicWorkCards: [
      {
        title: 'Community contact',
        body: 'The strongest public images show direct conversation with women, families, and neighborhood groups in everyday community settings.',
      },
      {
        title: 'Health service beyond the ward',
        body: 'Reporting on the Jagannath University program connects her public activity with healthcare and student-facing service.',
      },
      {
        title: 'Leadership responsibilities',
        body: 'Her leadership responsibilities connect student health service, community presence, and organized public work.',
      },
    ],
  },
  galleryItems: [
    {
      id: 'bedside-review',
      title: 'Bangladesh Specialized Hospital appointment',
      image: '/media/bedside-review.jpg',
      altText: 'Dr Umma Hani standing near a patient bed during a clinical review.',
      caption: 'A hospital-service image connected to the current Emergency Medical Officer appointment.',
      category: 'medical',
      featuredOnHomepage: true,
      sortOrder: 1,
      status: 'published',
    },
    {
      id: 'about-doctor-portrait',
      title: 'Clinical portrait',
      image: '/media/about-doctor-portrait.jpg',
      altText: 'Dr Umma Hani seated in medical dress in a hospital setting.',
      caption: 'A clinical portrait from a hospital setting.',
      category: 'medical',
      featuredOnHomepage: true,
      sortOrder: 2,
      status: 'published',
    },
    {
      id: 'medical-camp-team',
      title: 'Medical camp team',
      image: '/media/medical-camp-team.jpg',
      altText: 'Dr Umma Hani with a medical-camp team in an organized service setting.',
      caption: 'A team image from an organized medical outreach setting.',
      category: 'medical',
      featuredOnHomepage: true,
      sortOrder: 3,
      status: 'published',
    },
    {
      id: 'public-leaflet-briefing',
      title: 'Printed outreach conversation',
      image: '/media/public-leaflet-briefing.jpg',
      altText: 'Dr Umma Hani distributing printed materials during public outreach.',
      caption: 'An image of organized field communication and direct contact.',
      category: 'community',
      featuredOnHomepage: true,
      sortOrder: 4,
      status: 'published',
    },
    {
      id: 'media-interview-setup',
      title: 'Interview setting',
      image: '/media/media-interview-setup.jpg',
      altText: 'Dr Umma Hani seated for an interview with microphones visible.',
      caption: 'A media still from an interview and public-appearance setting.',
      category: 'events',
      featuredOnHomepage: true,
      sortOrder: 5,
      status: 'published',
    },
    {
      id: 'women-public-rally',
      title: "Women's public program",
      image: '/media/women-public-rally.jpg',
      altText: 'Dr Umma Hani in a public program setting with women around her.',
      caption: "A public-program image that broadens the gallery beyond the neighborhood visit sequence.",
      category: 'leadership',
      featuredOnHomepage: true,
      sortOrder: 6,
      status: 'published',
    },
    {
      id: 'womencare-community-access',
      title: "Women's community access",
      image: '/media/womencare-community-access.jpg',
      altText: 'Dr Umma Hani standing among women in a community setting.',
      caption: 'A strong image for women-focused public contact.',
      category: 'community',
      featuredOnHomepage: false,
      sortOrder: 7,
      status: 'published',
    },
    {
      id: 'field-presence-portrait',
      title: 'Field presence portrait',
      image: '/media/field-presence-portrait.jpg',
      altText: 'Dr Umma Hani standing beside a service vehicle in a field setting.',
      caption: 'A leadership portrait from a public-service setting.',
      category: 'leadership',
      featuredOnHomepage: false,
      sortOrder: 8,
      status: 'published',
    },
    {
      id: 'community-street-walk',
      title: 'Neighborhood walk-through',
      image: '/media/community-street-walk.jpg',
      altText: 'Dr Umma Hani walking through a neighborhood during outreach activity.',
      caption: 'A street-level community image distinct from the seated gathering sequence.',
      category: 'community',
      featuredOnHomepage: false,
      sortOrder: 9,
      status: 'published',
    },
  ],
  mediaItems: [
    {
      id: 'interview-live-broadcast',
      title: 'Interview and live broadcast',
      type: 'video',
      thumbnail: '/media/media-interview-setup.jpg',
      url: '/media/interview-live-broadcast.mp4',
      description:
        'A media appearance from an interview and live-broadcast setting.',
      category: 'events',
      featuredOnHomepage: true,
      status: 'published',
    },
    {
      id: 'medical-camp-service-video',
      title: 'Medical service video',
      type: 'video',
      thumbnail: '/media/medical-camp-desk.jpg',
      url: '/media/medical-camp-service-clip.mp4',
      description:
        'A medical-camp video connected to organized healthcare service.',
      category: 'medical',
      featuredOnHomepage: false,
      status: 'published',
    },
    {
      id: 'women-gathering-video',
      title: "Women's community visit video",
      type: 'video',
      thumbnail: '/media/womencare-community-access.jpg',
      url: '/media/women-gathering-clip.mp4',
      description:
        "A community-visit video showing women's participation and local contact.",
      category: 'community',
      featuredOnHomepage: false,
      status: 'published',
    },
    {
      id: 'nomination-office-video',
      title: 'Public program office video',
      type: 'video',
      thumbnail: '/media/nomination-form-desk.jpg',
      url: '/media/nomination-office-clip.mp4',
      description:
        'An office-side video from a public program setting.',
      category: 'events',
      featuredOnHomepage: false,
      status: 'published',
    },
    {
      id: 'late-night-field-video',
      title: 'Field visit video',
      type: 'video',
      thumbnail: '/media/leadership-banner-night.jpg',
      url: '/media/late-night-field-clip-a.mp4',
      description:
        'A longer field-visit video showing public-service activity outside formal event settings.',
      category: 'leadership',
      featuredOnHomepage: false,
      status: 'published',
    },
    {
      id: 'jagonews-article',
      title: 'Jagonews24 report on nomination-form collection',
      type: 'article',
      thumbnail: '/media/nomination-form-desk.jpg',
      url: 'https://www.jagonews24.com/politics/news/1109481',
      description:
        'A news report on nomination-form collection and public leadership activity.',
      category: 'events',
      featuredOnHomepage: false,
      status: 'published',
      sourceLink: 'https://www.jagonews24.com/politics/news/1109481',
    },
  ],
  positions: [
    {
      id: 'chhatra-dal-central-vice-president-2026',
      title: 'Vice-President',
      organization: 'Bangladesh Jatiyatabadi Chhatra Dal',
      branch: 'Central Parliament',
      period: '4 April 2026',
      description:
        'On 4 April 2026, Dr Umma Hani was selected as a Vice-President of Bangladesh Jatiyatabadi Chhatra Dal, Central Parliament.',
      image: '/media/nomination-form-submission-2026.jpg',
      sourceType: 'document',
      sourceNote: 'Nomination/selection document dated 4 April 2026.',
      featured: true,
      sortOrder: 1,
      status: 'published',
    },
    {
      id: 'chhatra-dal-bogura-health-secretary',
      title: 'Health Secretary',
      organization: 'Bangladesh Jatiyatabadi Chhatra Dal',
      branch: 'Bogura District Branch',
      period: 'Reported public role',
      description:
        'Public reporting identified Dr Umma Hani as Health Secretary of Chhatra Dal, Bogura District Branch.',
      image: '/media/field-presence-portrait.jpg',
      sourceType: 'news',
      sourceLink: 'https://www.jagonews24.com/politics/news/1109481',
      featured: false,
      sortOrder: 2,
      status: 'published',
    },
  ],
  updates: [
    {
      id: 'chhatra-dal-central-vice-president-2026',
      slug: 'chhatra-dal-central-vice-president-2026',
      title: 'Selected for a Chhatra Dal central Vice-President position',
      category: 'Leadership',
      date: '4 April 2026',
      summary:
        'On 4 April 2026, Dr Umma Hani was selected as a Vice-President of Bangladesh Jatiyatabadi Chhatra Dal, Central Parliament.',
      image: '/media/nomination-form-submission-2026.jpg',
      featured: true,
      pinned: true,
      status: 'published',
      body: [
        'On 4 April 2026, Dr Umma Hani was selected as a Vice-President of Bangladesh Jatiyatabadi Chhatra Dal, Central Parliament.',
        "The role adds to a public journey shaped by medical service, women's healthcare work, student health programs, and community activity.",
        'The milestone is presented as part of her broader professional and public-service work.',
      ],
    },
    {
      id: 'jagannath-university-health-camp-2025',
      slug: 'jagannath-university-health-camp-2025',
      title: 'Joined a student health-service program at Jagannath University',
      category: 'Health Service',
      date: '25 September 2025',
      summary:
        'Amar Sangbad reported on 25 September 2025 that Dr Umma Hani was among the doctors supporting a three-day student health-service and medicine-distribution program at Jagannath University.',
      image: '/media/camp-consultation.jpg',
      featured: true,
      pinned: false,
      status: 'published',
      sourceLink: 'https://www.amarsangbad.com/education/news/324813',
      body: [
        'Amar Sangbad reported that the three-day emergency health-service and medicine-distribution program served around 1,800 students at Jagannath University.',
        'The report identified Dr Umma Hani as one of the doctors providing first-day gynecology-focused care and free medicine support.',
        'The program reflects her continued connection between public activity and healthcare service.',
      ],
    },
    {
      id: 'reserved-seat-nomination-form-2026',
      slug: 'reserved-seat-nomination-form-2026',
      title: 'Collected a reserved-seat nomination form',
      category: 'Public Update',
      date: '11 April 2026',
      summary:
        'Jagonews24 reported on 11 April 2026 that Dr Umma Hani collected a BNP nomination form for a reserved parliamentary seat and identified her as Health Secretary of Chhatra Dal, Bogura District Branch.',
      image: '/media/nomination-form-desk.jpg',
      featured: true,
      pinned: false,
      status: 'published',
      sourceLink: 'https://www.jagonews24.com/politics/news/1109481',
      body: [
        'Jagonews24 reported on 11 April 2026 that Dr Umma Hani collected a Bangladesh Nationalist Party nomination form for a reserved women\'s parliamentary seat.',
        'The report described her as Health Secretary of Chhatra Dal, Bogura District Branch.',
        "The event is part of her recent public-service and leadership activity.",
      ],
    },
  ],
  importantNotices: [
    {
      id: 'contact-channel-notice',
      title: 'Official communication notice',
      message:
        'For professional, medical, leadership, public-service, or media correspondence, please use the contact form or the public email address listed on the site.',
      category: 'Communication',
      pinned: true,
      status: 'published',
    },
  ],
  contact: {
    intro:
      'Use this form for professional correspondence, event invitations, media requests, and community-service communication.',
    inquiryTypes: [
      'Professional inquiry',
      'Medical communication',
      'Public service and outreach',
      'Leadership and events',
      'Media request',
    ],
  },
  privacyPage: {
    title: 'Privacy',
    intro:
      'This privacy note explains how contact messages and public information are handled on this website.',
    sections: [
      {
        title: 'Inquiry data',
        body:
          'Messages submitted through the contact form are stored so they can be reviewed, answered, and followed up by the site team.',
      },
      {
        title: 'Public contact information',
        body:
          'The website publishes a public email address and selected social profile links. Private contact details are intentionally not published.',
      },
      {
        title: 'Profile material',
        body:
          'Website content is based on CV details, provided media, and public reporting related to her medical, community, and leadership work.',
      },
    ],
  },
}
