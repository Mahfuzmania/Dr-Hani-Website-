export type NavGroup = 'footer' | 'primary' | 'services'

export type NavItem = {
  href: string
  label: string
  menu: NavGroup
}

export type CTA = {
  href: string
  label: string
}

export type PageHero = {
  eyebrow?: string
  image?: string
  summary: string
  title: string
}

export type TimelineItem = {
  description: string
  period: string
  title: string
}

export type GalleryCategory =
  | 'medical-service'
  | 'community-outreach'
  | 'events'
  | 'leadership'

export type GalleryItem = {
  altText: string
  caption: string
  category: GalleryCategory
  featured?: boolean
  id: string
  image: string
  title: string
}

export type SocialLink = {
  href: string
  label: 'Facebook' | 'Instagram' | 'LinkedIn'
}

export type FeaturedVideo = {
  duration?: string
  poster: string
  src: string
  summary: string
  title: string
}

export type VideoArchiveItem = {
  id: string
  poster: string
  src: string
  summary: string
  title: string
}

export type SiteContent = {
  aboutPage: {
    biographyIntro: string
    credentials: string[]
    cta: CTA
    educationItems: Array<{ institution: string; period: string; title: string }>
    hero: PageHero
    longFormStory: string[]
    personalProfileItems: Array<{ label: string; value: string }>
    values: Array<{ description: string; title: string }>
  }
  contactPage: {
    contactCards: Array<{ label: string; value: string }>
    hero: PageHero
    inquiryTypeOptions: string[]
    intro: string
    privacyNote: string
  }
  events: Array<{
    category: string
    description: string
    id: string
    image?: string
    period: string
    title: string
  }>
  galleryItems: GalleryItem[]
  homepage: {
    aboutPreview: string
    closingStatement: string
    featuredGalleryItemIds: string[]
    focusAreas: Array<{ description: string; title: string }>
    heroImage: string
    heroPrimaryCTA: CTA
    heroSecondaryCTA: CTA
    heroSubtitle: string
    heroTitle: string
    identityPillars: Array<{ description: string; title: string }>
    missionStatement: string
    motionVideoIds: string[]
    selectedHighlights: Array<{ description: string; title: string }>
  }
  leadershipPage: {
    cta: CTA
    hero: PageHero
    leadershipTimeline: TimelineItem[]
    organizationalRole: string
    publicPurpose: string
    speakingRepresentationBlocks: Array<{ description: string; title: string }>
  }
  medicalServicePage: {
    clinicalCompetencies: string[]
    clinicalResponsibilities: string[]
    cta: CTA
    hero: PageHero
    internshipSummary: string
    rolesTimeline: TimelineItem[]
    servicePhilosophy: string
  }
  mediaEventsPage: {
    appearanceBlocks: Array<{ description: string; title: string }>
    archiveVideos: VideoArchiveItem[]
    cta: CTA
    documentaryImageIds: string[]
    featuredEventIds: string[]
    featuredVideo: FeaturedVideo
    hero: PageHero
    intro: string
  }
  privacyPage: {
    intro: string
    sections: Array<{ body: string; title: string }>
    title: string
  }
  publicServicePage: {
    communityHealthBlocks: Array<{ description: string; title: string }>
    cta: CTA
    featuredImageIds: string[]
    hero: PageHero
    missionText: string
    outreachBlocks: Array<{ description: string; title: string }>
    socialResponseBlocks: Array<{ description: string; title: string }>
  }
  siteSettings: {
    defaultDescription: string
    footerText: string
    fullName: string
    identityLine: string
    navigation: NavItem[]
    primaryEmail: string
    socialLinks: SocialLink[]
  }
  updates: Array<{
    body: string[]
    category: string
    coverImage?: string
    id: string
    publishDate: string
    slug: string
    summary: string
    title: string
  }>
}

export const siteContent: SiteContent = {
  siteSettings: {
    fullName: 'Dr Umma Hani',
    primaryEmail: 'honeyhaque1078@gmail.com',
    identityLine: 'Physician. Public Presence. Community Leadership.',
    defaultDescription:
      "Official profile website for Dr Umma Hani, bringing together her medical service, women's health experience, public engagement, and leadership presence.",
    footerText:
      "Dr Umma Hani's website brings together her medical work, women-centered service, and visible community-facing public life in one composed digital profile.",
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
    navigation: [
      { href: '/', label: 'Home', menu: 'primary' },
      { href: '/about', label: 'About', menu: 'primary' },
      { href: '/medical-service', label: 'Medical Service', menu: 'services' },
      { href: '/public-service', label: 'Public Service', menu: 'services' },
      { href: '/leadership', label: 'Leadership', menu: 'services' },
      { href: '/media-events', label: 'Media & Events', menu: 'primary' },
      { href: '/gallery', label: 'Gallery', menu: 'primary' },
      { href: '/updates', label: 'Updates', menu: 'primary' },
      { href: '/contact', label: 'Contact', menu: 'primary' },
      { href: '/privacy', label: 'Privacy', menu: 'footer' },
    ],
  },
  homepage: {
    heroTitle: 'Dr Umma Hani',
    heroSubtitle:
      'A physician whose record moves between emergency hospital service, women-focused care, and a public presence shaped by direct contact with people and community life.',
    heroImage: '/media/homepage-hero-seated.jpg',
    heroPrimaryCTA: { href: '/about', label: 'Read Her Story' },
    heroSecondaryCTA: { href: '/contact', label: 'Get in Touch' },
    motionVideoIds: ['featured-field', 'women-gathering', 'medical-camp-service'],
    identityPillars: [
      {
        title: 'Medical Practice',
        description:
          'The foundation is clinical: MBBS training, internship discipline, emergency-duty work, and a professional identity formed through hospital responsibility.',
      },
      {
        title: "Women's Health Service",
        description:
          "Her gynecology and obstetrics appointments give the profile a clear women-centered service thread, widening the story from hospital duty to care, dignity, and access.",
      },
      {
        title: 'Public Leadership',
        description:
          'District programs, neighborhood contact, and recognizable organizational visibility place her in civic life with a steady, documentary kind of authority.',
      },
    ],
    aboutPreview:
      'Dr Umma Hani completed MBBS at TMSS Medical College under Rajshahi University, completed a full internship at TMSS Medical College and Rafatullah Community Hospital, and went on to serve in emergency and gynecology-linked hospital roles in both Bogura and Dhaka.',
    missionStatement:
      "A doctor's profile shaped by clinical discipline, public composure, and a recognisable warmth in community-facing settings.",
    focusAreas: [
      {
        title: 'Emergency and Hospital Service',
        description:
          'The clearest professional throughline is emergency and hospital-based work, supported by patient handling, ward review, reporting, and coordinated team practice.',
      },
      {
        title: "Women's Care and Community Access",
        description:
          'Women-focused appointments, consultation settings, and visible contact with women and families give the profile a credible and compassionate social dimension.',
      },
      {
        title: 'Field Presence and Public Engagement',
        description:
          'Field photographs, neighborhood visits, and organized public appearances show a presence that feels lived-in, civic-minded, and unmistakably personal.',
      },
    ],
    selectedHighlights: [
      {
        title: 'Emergency service in Dhaka',
        description:
          'Emergency Medical Officer work in Dhaka anchors the recent professional timeline and keeps the physician-led identity unmistakably clear.',
      },
      {
        title: 'Training, internship, and hospital grounding',
        description:
          'Academic training, internship service, and ward-based responsibility provide the institutional backbone of the biography.',
      },
      {
        title: 'District-level public visibility',
        description:
          'The broader record shows an increasingly visible public role, including district-level leadership context and direct participation in organized community settings.',
      },
    ],
    featuredGalleryItemIds: [
      'homepage-hero-seated',
      'camp-consultation',
      'womencare-community-access',
      'field-presence-portrait',
    ],
    closingStatement:
      'Hospital service, women-centered care, and civic visibility come together here as one calm, authored public profile.',
  },
  aboutPage: {
    hero: {
      eyebrow: 'About',
      title: 'A physician whose public presence grows out of work, discipline, and human contact.',
      summary:
        'Dr Umma Hani is presented here as a doctor first, with a public-facing profile shaped by hospital work, community contact, and a growing leadership presence.',
      image: '/media/about-doctor-portrait.jpg',
    },
    biographyIntro:
      'Dr Umma Hani is a Bangladeshi medical doctor whose profile brings together strong academic grounding, MBBS training through TMSS Medical College under Rajshahi University, emergency-service experience, and women-focused appointments in gynecology and obstetrics.',
    longFormStory: [
      'Her educational path begins in Bogura, where she completed both SSC and HSC at Cantonment Public School and College with GPA 5.00 before entering MBBS study in January 2012.',
      'The 12-month internship at TMSS Medical College and Rafatullah Community Hospital formed the bridge between academic study and clinical responsibility, grounding her in patient review, team support, and the pace of real hospital work.',
      'Subsequent appointments in gynecology and obstetrics added a clear women-focused clinical strand to the record, while later emergency medical officer roles in Dhaka placed her inside demanding hospital service environments.',
      "Alongside the medical path, the wider visual and documentary record points to an increasingly visible role in district programs, civic contact, and public settings where women's participation and representation matter.",
    ],
    values: [
      {
        title: 'Clinical Responsibility',
        description:
          'The strongest throughline is practical patient care, hospital discipline, and a professional identity formed by work rather than performance.',
      },
      {
        title: "Women's Health and Representation",
        description:
          "Her gynecology-linked appointments and field visibility make women's care and women's participation recurring themes across the profile.",
      },
      {
        title: 'Community Trust',
        description:
          'Both the visual record and the written profile emphasize direct contact with people, neighborhoods, and service settings rather than abstract messaging.',
      },
    ],
    educationItems: [
      {
        title: 'MBBS',
        institution: 'TMSS Medical College, Bogura - Rajshahi University',
        period: 'January 2012 - July 2017',
      },
      {
        title: 'Higher Secondary Certificate',
        institution: 'Cantonment Public School and College, Bogura',
        period: '2011 | GPA 5.00',
      },
      {
        title: 'Secondary School Certificate',
        institution: 'Cantonment Public School and College, Bogura',
        period: '2009 | GPA 5.00',
      },
    ],
    credentials: [
      'Bangla - mother tongue',
      'English - fluent',
      'Bangladeshi nationality',
      'Date of birth - 11 December 1994',
    ],
    personalProfileItems: [
      { label: 'Profession', value: 'Medical Doctor' },
      { label: 'Clinical focus', value: 'Emergency medicine, ward service, and women-focused hospital care' },
      { label: 'Personal interests', value: 'Boat riding, shopping, cooking' },
    ],
    cta: { href: '/medical-service', label: 'See Medical Timeline' },
  },
  medicalServicePage: {
    hero: {
      eyebrow: 'Medical Service',
      title: 'Emergency duty, ward experience, and women-focused care define the clinical record.',
      summary:
        "This section follows the documented clinical record closely, with emphasis on emergency service, hospital discipline, and the gynecology and obstetrics roles that deepen the women's-health dimension.",
      image: '/media/bedside-review.jpg',
    },
    rolesTimeline: [
      {
        title: 'Emergency Medical Officer - Bangladesh Specialized Hospital',
        period: 'November 2020 - Present',
        description:
          'This Dhaka-based emergency role is the clearest current professional anchor in the CV and sits at the center of the recent clinical record.',
      },
      {
        title: 'Emergency Medical Officer - Famous Specialized Hospital',
        period: 'November 2020 - March 2021',
        description:
          'The CV also records emergency-service work at Famous Specialized Hospital, reinforcing the hospital-based and acute-care dimension of the profile.',
      },
      {
        title: 'Honorary Medical Officer - Gynae and Obs, Shaheed Ziaur Rahman Medical College and Hospital',
        period: 'July 2019 - November 2019',
        description:
          "This Bogura appointment strengthens the site's women's health narrative through direct association with gynecology and obstetrics service.",
      },
      {
        title: 'Indoor Medical Officer - Gynae and Obs, TMSS Medical College and Rafatullah Community Hospital',
        period: 'January 2019 - June 2019',
        description:
          'An inpatient gynecology and obstetrics role that reflects hands-on responsibility in women-focused hospital care.',
      },
    ],
    internshipSummary:
      'Her internship at TMSS Medical College and Rafatullah Community Hospital lasted 12 months and established the practical foundation for emergency, ward, and procedural work.',
    clinicalResponsibilities: [
      'Assisting senior doctors in patient assessment and day-to-day ward management',
      'Diagnosing disease on the basis of symptoms, examination, and review',
      'Observing diagnostic methods and supporting clinical follow-up',
      'Monitoring patients and preparing progress reports',
      'Providing basic emergency treatment when required',
      'Supporting routine ward, emergency, and hospital-team duties',
      'Assisting in cesarean sections and OT work',
      'Conducting normal vaginal deliveries and managing OPD flow',
      'Guiding intern doctors in supervised environments',
      'Serving in the Covid unit during the pandemic period',
      'Performing arterial and venous line insertion',
      'Managing acute asthma and DKA situations',
    ],
    clinicalCompetencies: [
      'Emergency patient handling and counseling',
      'Gynecology and obstetrics-linked inpatient support',
      'Practical familiarity with common hospital equipment',
      'Arterial and venous line insertion',
      'Chest drain insertion',
      'Acute asthma and DKA management',
    ],
    servicePhilosophy:
      'Her medical identity is defined by direct service: emergency response, bedside communication, supervised procedure support, and women-focused hospital care grounded in the practical demands of clinical work.',
    cta: { href: '/contact', label: 'Medical Correspondence' },
  },
  publicServicePage: {
    hero: {
      eyebrow: 'Public Service',
      title: 'Community outreach, women-centered contact, and a public life shaped by service.',
      summary:
        'The public-service section reflects direct interaction, recognizable field activity, and a style of engagement rooted in people, neighborhoods, and everyday public contact.',
      image: '/media/public-leaflet-briefing.jpg',
    },
    missionText:
      'The visual record shows Dr Umma Hani in direct public-contact settings: neighborhood visits, leaflet distribution, conversations with vendors and families, and repeated interaction with women in community spaces. The tone is civic, service-minded, and unmistakably human.',
    outreachBlocks: [
      {
        title: 'Street-Level Communication',
        description:
          'Multiple images show her speaking directly with citizens in roadside and market environments, giving the public record a close-range and people-facing quality.',
      },
      {
        title: 'Awareness and Printed Outreach',
        description:
          'Leaflet distribution appears repeatedly, suggesting organized communication rather than symbolic visibility alone.',
      },
      {
        title: 'Women and Family Contact',
        description:
          'Some of the strongest images center women and families, helping the section speak not only to public presence but also to representation, dignity, and access.',
      },
    ],
    communityHealthBlocks: [
      {
        title: 'Medical-Camp Service',
        description:
          'Camp photographs bring the outreach record back into a health-service context through consultations, team coordination, and organized patient-facing work.',
      },
      {
        title: "Women's Participation in Service",
        description:
          "The combination of medical background and community interaction creates a broader story of women appearing visibly in public service, healthcare access, and neighborhood-level engagement.",
      },
    ],
    socialResponseBlocks: [
      {
        title: 'Political and Organizational Context',
        description:
          'Where the record clearly supports it, the site acknowledges a BNP-linked and Chhatra Dal-connected public context. That layer is visible here as part of her public identity, while the wider profile remains anchored in medical work.',
      },
      {
        title: 'Community Contact Before Rhetoric',
        description:
          'Even in politically identifiable settings, the strongest public images are the ones rooted in practical contact, community interaction, and visible women-led participation rather than slogan-heavy presentation.',
      },
    ],
    featuredImageIds: [
      'womencare-community-access',
      'medical-relief-visit',
      'community-support-circle',
    ],
    cta: { href: '/gallery', label: 'Open the Gallery' },
  },
  leadershipPage: {
    hero: {
      eyebrow: 'Leadership',
      title: "District-level leadership, organized participation, and a doctor's voice in public life.",
      summary:
        'Leadership is framed here through named role, organized participation, and public-facing presence, without overstating the record.',
      image: '/media/field-presence-portrait.jpg',
    },
    publicPurpose:
      "Dr Umma Hani's leadership record is presented as a factual extension of her wider public profile: a doctor with community visibility, district-level organizational recognition, and a visible place in programs, marches, and gatherings where women's participation matters.",
    leadershipTimeline: [
      {
        title: 'Health Secretary, Chhatra Dal, Bogura District Branch',
        period: 'Role listed in the CV',
        description:
          'This remains the strongest named leadership reference in the project materials and is treated as the central organizing fact of the leadership section.',
      },
      {
        title: 'District programs, marches, and public participation',
        period: 'Documented across the photo archive',
        description:
          'The photo archive shows repeated involvement in organized public settings, including banner-led participation, structured appearances, and visible frontline presence.',
      },
      {
        title: 'Interview and event-stage visibility',
        period: 'Supported by media coverage and public references',
        description:
          'Interview stills and public discussion references show comfort with speaking roles, media-facing settings, and representational visibility.',
      },
    ],
    organizationalRole: 'Health Secretary, Chhatra Dal, Bogura District Branch.',
    speakingRepresentationBlocks: [
      {
        title: 'Organized Public Presence',
        description:
          'The strongest leadership images show composure, recognition, and front-facing presence rather than anonymous crowd photography, helping the section feel personal and credible.',
      },
      {
        title: "Women's Representation in Public Life",
        description:
          "The leadership archive also matters because it places a young female doctor visibly inside public and organizational spaces where women's participation is often underrepresented.",
      },
    ],
    cta: { href: '/media-events', label: 'See Media & Events' },
  },
  mediaEventsPage: {
    hero: {
      eyebrow: 'Media & Events',
      title: 'Interviews, public discussions, and documentary event records.',
      summary:
        'This section brings together interviews, public references, documentary stills, and archive video in one cleaner, more intentional record.',
      image: '/media/media-interview-setup.jpg',
    },
    intro:
      'The archive combines press-style stills, local program documentation, and short field recordings so the record feels broad, visual, and grounded.',
    featuredEventIds: ['policy-studies-discussion'],
    featuredVideo: {
      title: 'Featured field clip',
      summary:
        'A brief field recording adds motion to the archive while keeping the page calm, readable, and documentary in tone.',
      src: '/media/featured-field-video.mp4',
      poster: '/media/field-presence-portrait.jpg',
      duration: '00:47',
    },
    documentaryImageIds: [
      'media-interview-setup',
      'nomination-form-desk',
      'channel24-nomination-screen',
      'mohona-live-screen',
      'public-program-portrait',
      'public-discussion-greeting',
    ],
    archiveVideos: [
      {
        id: 'outreach-street',
        title: 'Street outreach clip',
        summary: 'A short record of roadside public contact and movement through an everyday civic setting.',
        src: '/media/outreach-street-clip.mp4',
        poster: '/media/public-leaflet-briefing.jpg',
      },
      {
        id: 'outreach-vehicle',
        title: 'Vehicle-side public exchange',
        summary: 'A close, mobile clip that carries the tone of direct conversation rather than staged address.',
        src: '/media/outreach-vehicle-clip.mp4',
        poster: '/media/home-hero-outreach.jpg',
      },
      {
        id: 'neighborhood-walk',
        title: 'Neighborhood walk clip',
        summary: 'A moving record of field presence in a real neighborhood context.',
        src: '/media/neighborhood-walk-clip.mp4',
        poster: '/media/community-street-walk.jpg',
      },
      {
        id: 'interview-live',
        title: 'Live broadcast segment',
        summary: 'A longer television-facing clip that extends the interview and public-discussion side of the archive.',
        src: '/media/interview-live-broadcast.mp4',
        poster: '/media/media-interview-setup.jpg',
      },
      {
        id: 'nomination-office',
        title: 'Office-side nomination moment',
        summary: 'A documentary clip from the office setting associated with the nomination-form news coverage.',
        src: '/media/nomination-office-clip.mp4',
        poster: '/media/nomination-form-desk.jpg',
      },
      {
        id: 'women-gathering',
        title: "Women's gathering clip",
        summary: 'A short visual record of women-centered community presence in a lived-in local setting.',
        src: '/media/women-gathering-clip.mp4',
        poster: '/media/womencare-community-access.jpg',
      },
      {
        id: 'medical-camp-service',
        title: 'Medical camp service clip',
        summary: 'A practical field video that brings the healthcare-outreach archive into motion.',
        src: '/media/medical-camp-service-clip.mp4',
        poster: '/media/medical-camp-desk.jpg',
      },
      {
        id: 'medical-camp-portrait',
        title: 'Medical camp portrait clip',
        summary: 'A quieter camp-side video that complements the still photography from the same service context.',
        src: '/media/medical-camp-portrait-clip.mp4',
        poster: '/media/medical-camp-team.jpg',
      },
      {
        id: 'featured-field',
        title: 'Field archive clip',
        summary: 'A compact field moment retained as the homepage and media-page featured motion element.',
        src: '/media/featured-field-video.mp4',
        poster: '/media/field-presence-portrait.jpg',
      },
      {
        id: 'late-night-field-a',
        title: 'Late-night field clip I',
        summary: 'A night-time archive fragment that broadens the timeline and atmosphere of the field record.',
        src: '/media/late-night-field-clip-a.mp4',
        poster: '/media/leadership-banner-night.jpg',
      },
      {
        id: 'late-night-field-b',
        title: 'Late-night field clip II',
        summary: 'A second late-hour field clip preserving the energy of the public-facing archive.',
        src: '/media/late-night-field-clip-b.mp4',
        poster: '/media/public-rally-portrait.jpg',
      },
      {
        id: 'late-night-field-c',
        title: 'Late-night field clip III',
        summary: 'A compact continuation of the late-night field record.',
        src: '/media/late-night-field-clip-c.mp4',
        poster: '/media/women-public-rally.jpg',
      },
      {
        id: 'late-night-field-d',
        title: 'Late-night field clip IV',
        summary: 'A final short archive fragment rounding out the night-time video group.',
        src: '/media/late-night-field-clip-d.mp4',
        poster: '/media/public-program-group.jpg',
      },
    ],
    appearanceBlocks: [
      {
        title: 'Interview and statement setting',
        description:
          'The archive includes a strong interview still with microphones and camera framing, giving the site a credible media reference point.',
      },
      {
        title: 'Press and discussion visibility',
        description:
          'Press-style screenshots, discussion references, and office-side images widen the record beyond street photography into recognisable public visibility.',
      },
      {
        title: 'Program documentation',
        description:
          'Medical-camp scenes, public-group photographs, and event documentation connect healthcare work, public service, and leadership visibility in one visual archive.',
      },
    ],
    cta: { href: '/contact', label: 'Open Media Contact' },
  },
  contactPage: {
    hero: {
      eyebrow: 'Contact',
      title: 'For professional communication, invitations, and public-facing correspondence.',
      summary:
        'The contact area welcomes medical, media, leadership, and community-facing communication while keeping the site itself composed and focused.',
    },
    intro:
      'Use the form for professional correspondence related to medical service, speaking invitations, events, collaboration, media requests, or broader public communication.',
    contactCards: [
      { label: 'Public email', value: 'honeyhaque1078@gmail.com' },
      { label: 'Best for', value: 'Media, speaking, community, and professional inquiries' },
      { label: 'Social presence', value: 'Facebook, Instagram, LinkedIn' },
    ],
    inquiryTypeOptions: [
      'Professional inquiry',
      'Medical communication',
      'Public service and outreach',
      'Leadership and events',
      'Media request',
    ],
    privacyNote:
      'Information submitted through the contact form is used for review and reply handling. The site publishes a public email address and approved social profiles, while more private contact details remain limited.',
  },
  privacyPage: {
    title: 'Privacy',
    intro:
      'This privacy note stays close to the actual features used on the site and avoids generic policy language that does not match the experience.',
    sections: [
      {
        title: 'Inquiry data',
        body:
          'When you use the contact form, the submitted information is stored for review, follow-up, and response handling.',
      },
      {
        title: 'Public contact information',
        body:
          'The site publishes a public email address and approved social profile links. Personal phone numbers and private contact channels are not published here.',
      },
      {
        title: 'Profile content',
        body:
          'Profile content is assembled from the CV, approved media, and a limited set of matching public references used to support factual public-service and event context.',
      },
    ],
  },
  galleryItems: [
    {
      id: 'homepage-hero-seated',
      title: 'Seated public portrait',
      image: '/media/homepage-hero-seated.jpg',
      altText: 'Dr Umma Hani seated at an event in a composed public-facing portrait.',
      caption:
        'The strongest formal portrait in the archive: calm, self-possessed, and ideal for the homepage opening.',
      category: 'leadership',
      featured: true,
    },
    {
      id: 'home-hero-outreach',
      title: 'Roadside public greeting',
      image: '/media/home-hero-outreach.jpg',
      altText: 'Dr Umma Hani greeting and speaking with a man during a public outreach visit.',
      caption:
        'A warm field image built on face-to-face conversation rather than staged presentation.',
      category: 'community-outreach',
      featured: true,
    },
    {
      id: 'leadership-march',
      title: 'Night-time banner march',
      image: '/media/leadership-banner-night.jpg',
      altText: 'Dr Umma Hani visible near the front of a public march carrying a banner in Bogura.',
      caption:
        'A stronger leadership still from the archive, showing organized public participation after dark.',
      category: 'leadership',
      featured: true,
    },
    {
      id: 'public-leaflet-briefing',
      title: 'Printed outreach conversation',
      image: '/media/public-leaflet-briefing.jpg',
      altText: 'Dr Umma Hani distributing printed materials in a roadside setting.',
      caption:
        'A clear outreach image showing structured communication in conversation with local people.',
      category: 'community-outreach',
      featured: true,
    },
    {
      id: 'evening-outreach-crowd',
      title: 'Evening outreach crowd',
      image: '/media/evening-outreach-crowd.jpg',
      altText: 'Dr Umma Hani standing within a crowd during an evening outreach setting.',
      caption:
        'A smaller documentary still that widens the sense of crowd-scale public contact.',
      category: 'community-outreach',
    },
    {
      id: 'community-street-walk',
      title: 'Neighborhood walk-through',
      image: '/media/community-street-walk.jpg',
      altText: 'Dr Umma Hani walking through a neighborhood during outreach activity.',
      caption:
        'The public record feels stronger when it shows movement through real streets and neighborhoods rather than portraiture alone.',
      category: 'community-outreach',
    },
    {
      id: 'vendor-conversation',
      title: 'Conversation with a local vendor',
      image: '/media/vendor-conversation.jpg',
      altText: 'Dr Umma Hani speaking with a street vendor while handing over printed materials.',
      caption:
        'Close-range civic contact with everyday working people adds texture, realism, and credibility to the archive.',
      category: 'community-outreach',
    },
    {
      id: 'community-food-outreach',
      title: 'Women-centered support visit',
      image: '/media/community-food-outreach.jpg',
      altText: 'Dr Umma Hani speaking to a seated woman during a community visit.',
      caption:
        'A quieter image that foregrounds women-focused interaction and a gentler, care-oriented form of outreach.',
      category: 'community-outreach',
    },
    {
      id: 'womencare-community-access',
      title: "Women's care and community access",
      image: '/media/womencare-community-access.jpg',
      altText: 'Dr Umma Hani standing among women in a community setting.',
      caption:
        'One of the strongest images for illustrating women-centered service and community contact together.',
      category: 'community-outreach',
      featured: true,
    },
    {
      id: 'community-support-circle',
      title: "Neighborhood women's gathering",
      image: '/media/community-support-circle.jpg',
      altText: 'Dr Umma Hani standing with women seated nearby during an outreach visit.',
      caption:
        "A wide neighborhood image that reinforces the site's women-facing outreach strand.",
      category: 'community-outreach',
    },
    {
      id: 'medical-relief-visit',
      title: 'Relief and medical support visit',
      image: '/media/medical-relief-visit.jpg',
      altText: 'Dr Umma Hani offering water during a relief and medical support visit.',
      caption:
        'A service-led image that expands the archive beyond meetings and marches into practical support on the ground.',
      category: 'community-outreach',
      featured: true,
    },
    {
      id: 'about-doctor-portrait',
      title: 'Clinical portrait',
      image: '/media/about-doctor-portrait.jpg',
      altText: 'Dr Umma Hani seated in medical scrubs with a stethoscope in a hospital setting.',
      caption:
        'The portrait that keeps the biography anchored in the everyday reality of medical work.',
      category: 'medical-service',
      featured: true,
    },
    {
      id: 'camp-consultation',
      title: 'Medical camp consultation',
      image: '/media/camp-consultation.jpg',
      altText: 'Dr Umma Hani conducting a patient consultation at a medical camp.',
      caption:
        'A direct consultation image that brings warmth, clinical attention, and women-centered care into the archive.',
      category: 'medical-service',
      featured: true,
    },
    {
      id: 'bedside-review',
      title: 'Hospital bedside review',
      image: '/media/bedside-review.jpg',
      altText: 'Dr Umma Hani standing near a patient bed during a clinical review.',
      caption:
        'The bedside image keeps the website anchored in the practical reality of hospital service.',
      category: 'medical-service',
    },
    {
      id: 'medical-camp-desk',
      title: 'Medical camp coordination desk',
      image: '/media/medical-camp-desk.jpg',
      altText: 'A medical camp service desk with Dr Umma Hani and other participants present.',
      caption:
        'This image ties the public archive back to healthcare delivery, logistics, and organized service.',
      category: 'medical-service',
      featured: true,
    },
    {
      id: 'medical-camp-team',
      title: 'Medical camp team portrait',
      image: '/media/medical-camp-team.jpg',
      altText: 'A team photo inside a medical camp tent with Dr Umma Hani visible among participants.',
      caption:
        'A group image showing collaboration and the wider scale of outreach-oriented medical work.',
      category: 'medical-service',
    },
    {
      id: 'clinic-corridor-portrait',
      title: 'Clinic corridor portrait',
      image: '/media/clinic-corridor-portrait.jpg',
      altText: 'Dr Umma Hani standing in a hospital corridor in clinical dress.',
      caption:
        'A clean professional still that deepens the medical side of the visual archive.',
      category: 'medical-service',
    },
    {
      id: 'field-profile-green',
      title: 'Field portrait',
      image: '/media/field-profile-green.jpg',
      altText: 'Dr Umma Hani standing outdoors with an event badge and file in hand.',
      caption:
        'An earlier portrait that still works well for identity, contact, and leadership context.',
      category: 'leadership',
    },
    {
      id: 'field-presence-portrait',
      title: 'Field presence portrait',
      image: '/media/field-presence-portrait.jpg',
      altText: 'Dr Umma Hani standing beside a service vehicle in a field setting.',
      caption:
        'A strong leadership portrait with public-service context visible directly in the frame.',
      category: 'leadership',
      featured: true,
    },
    {
      id: 'public-program-portrait',
      title: 'Public program portrait',
      image: '/media/public-program-portrait.jpg',
      altText: 'Dr Umma Hani standing outdoors near an event vehicle during a public program.',
      caption:
        'A crisp documentary portrait suited to leadership, contact, and media contexts.',
      category: 'leadership',
    },
    {
      id: 'public-program-group',
      title: 'Program-side group moment',
      image: '/media/public-program-group.jpg',
      altText: 'Dr Umma Hani with others during a public program setting.',
      caption:
        'A supporting still that adds social scale to the leadership and event record.',
      category: 'leadership',
    },
    {
      id: 'women-public-rally',
      title: "Women's public rally moment",
      image: '/media/women-public-rally.jpg',
      altText: 'Dr Umma Hani in a public rally setting with women around her.',
      caption:
        'A vivid public-life image that broadens the leadership archive beyond podium-style visibility.',
      category: 'leadership',
    },
    {
      id: 'public-rally-portrait',
      title: 'Public rally portrait',
      image: '/media/public-rally-portrait.jpg',
      altText: 'Dr Umma Hani standing in a public rally setting.',
      caption:
        'A stronger single-frame portrait from the rally sequence, useful for leadership storytelling.',
      category: 'leadership',
    },
    {
      id: 'media-interview-setup',
      title: 'Interview setting',
      image: '/media/media-interview-setup.jpg',
      altText: 'Dr Umma Hani seated for an interview with microphones and a phone camera visible.',
      caption:
        'A composed media still that supports the interviews and appearances section with credibility.',
      category: 'events',
    },
    {
      id: 'channel24-nomination-screen',
      title: 'Channel 24 news screen',
      image: '/media/channel24-nomination-screen.jpg',
      altText: 'A Channel 24 screen capture showing coverage related to Dr Umma Hani.',
      caption:
        'Used as a documentary press reference within the media archive rather than a leading story image.',
      category: 'events',
    },
    {
      id: 'mohona-live-screen',
      title: 'Television-side field still',
      image: '/media/mohona-live-screen.jpg',
      altText: 'A field still with microphones and a live television-style setup.',
      caption:
        'A looser media still that adds texture to the press and appearance record.',
      category: 'events',
    },
    {
      id: 'nomination-form-desk',
      title: 'Nomination-form office moment',
      image: '/media/nomination-form-desk.jpg',
      altText: 'Dr Umma Hani inside an office while handing over documents in a documented public moment.',
      caption:
        'A factual office-side image best suited to dated news and leadership archive contexts.',
      category: 'events',
    },
    {
      id: 'outreach-poster-screen',
      title: 'Poster and statement screen',
      image: '/media/outreach-poster-screen.jpg',
      altText: 'A screenshot-style image from the public archive showing a poster-led event surface.',
      caption:
        'A supporting screen capture that belongs in the documentary archive rather than in leading page sections.',
      category: 'events',
    },
    {
      id: 'public-record-screen',
      title: 'Public record screen capture',
      image: '/media/public-record-screen.jpg',
      altText: 'A screenshot-style public record image from the archive.',
      caption:
        'Retained as evidence-style context for the media and updates archive.',
      category: 'events',
    },
    {
      id: 'leadership-poster-small',
      title: 'Poster-led event reference',
      image: '/media/leadership-poster-small.jpg',
      altText: 'A small poster-led event image from the archive.',
      caption:
        'A small-format supporting image that belongs to the documentary archive rather than the primary storytelling layers.',
      category: 'events',
    },
    {
      id: 'recognition-moment',
      title: 'Recognition moment',
      image: '/media/recognition-moment.jpg',
      altText: 'Dr Umma Hani standing with others in a recognition or event moment.',
      caption:
        'A useful supporting still for the sections that touch on public recognition and formal appearances.',
      category: 'events',
    },
    {
      id: 'public-discussion-greeting',
      title: 'Public discussion greeting',
      image: '/media/public-discussion-greeting.jpg',
      altText: 'Dr Umma Hani greeting others during a public-facing discussion or event moment.',
      caption:
        'An elegant supporting still for the media and appearances side of the profile.',
      category: 'events',
    },
  ],
  events: [
    {
      id: 'policy-studies-discussion',
      title: 'Policy Studies Bangladesh discussion',
      period: '9 May 2025',
      category: 'Discussion',
      description:
        'An event poster references a Policy Studies Bangladesh discussion on "The Fourth Industrial Revolution and Worker Rights" and lists Dr. Umme Hani among the speakers.',
      image: '/media/public-discussion-greeting.jpg',
    },
    {
      id: 'nomination-form-coverage',
      title: 'News coverage around nomination-form collection',
      period: '11 April 2026',
      category: 'Press',
      description:
        'Multiple screenshots and office-side images point to a cluster of April 2026 coverage tied to nomination-form collection for a reserved parliamentary seat.',
      image: '/media/nomination-form-desk.jpg',
    },
  ],
  updates: [
    {
      id: 'jagannath-university-health-camp-2025',
      slug: 'jagannath-university-health-camp-2025',
      title: 'Joined a three-day student health-service program at Jagannath University',
      category: 'Health Service',
      publishDate: '25 September 2025',
      coverImage: '/media/camp-consultation.jpg',
      summary:
        'Public reporting in September 2025 listed Dr Umma Hani among the doctors providing gynecology support during a three-day health-service and medicine-distribution program at Jagannath University.',
      body: [
        'Amar Sangbad reported on 25 September 2025 that a three-day emergency health-service and medicine-distribution program at Jagannath University served around 1,800 students.',
        "The report identified Dr. Umme Hani Prithvi as one of the gynecology specialists supporting the first day of the program, which focused on female students and women's health needs.",
        'This entry is kept in the archive because it links the public record directly to a documented healthcare setting and reinforces the women-focused service strand already present in the clinical timeline.',
      ],
    },
    {
      id: 'reserved-seat-nomination-form-2026',
      slug: 'reserved-seat-nomination-form-2026',
      title: 'Reported in the news after collecting a BNP reserved-seat nomination form',
      category: 'Leadership',
      publishDate: '11 April 2026',
      coverImage: '/media/nomination-form-desk.jpg',
      summary:
        'Jagonews24 reported on 11 April 2026 that Dr Umma Hani was in the news after collecting a BNP nomination form for a reserved parliamentary seat, adding fresh public attention to her leadership profile.',
      body: [
        "Jagonews24 reported on 11 April 2026 that Dr. Umme Hani Prithvi collected a Bangladesh Nationalist Party nomination form for a reserved women's parliamentary seat.",
        'The report described her as Health Secretary of Chhatra Dal, Bogura District Branch and framed the move as part of her broader political and public-service visibility.',
        'This site includes the reference as part of the leadership archive only, presented as a dated public report within a wider physician-led profile.',
      ],
    },
  ],
}
