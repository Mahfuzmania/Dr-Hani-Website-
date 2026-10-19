export type Publication = {
  id: string
  kind: 'essay' | 'report'
  title: string
  summary: string
  topics: string[]
  sources: Array<{ publisher: string; url: string; byline: string; publishedAt?: string; dateLabel?: string }>
  image?: string
  relatedActivity?: string
  featured: boolean
  status: 'draft' | 'published'
}

export const publications: Publication[] = [
  {
    id: 'public-trust-national-renewal',
    kind: 'essay',
    title: 'কথার ঊর্ধ্বে কাজ: গণআস্থা ও জাতীয় পুনর্গঠনের নতুন দিগন্ত',
    summary:
      'An argument for earning public trust through accountable institutions, accessible services, and practical improvements in everyday life.',
    topics: ['Public life', 'Governance'],
    featured: true,
    status: 'published',
    sources: [
      {
        publisher: 'Daily Sun',
        url: 'https://bangla.daily-sun.com/opinion/59086',
        byline: 'ডা. উম্মে হানি পৃথ্বী',
        publishedAt: '2026-10-17',
      },
    ],
  },
  {
    id: 'women-capability-society',
    kind: 'essay',
    title: 'নারীর সক্ষমতা বনাম সমাজের ধারণা',
    summary:
      'How expectations at home, in the workplace, and in public life shape women’s confidence, opportunities, and freedom to make decisions.',
    topics: ['Women', 'Society'],
    featured: true,
    status: 'published',
    sources: [
      {
        publisher: 'Daily Sun',
        url: 'https://bangla.daily-sun.com/opinion/58443',
        byline: 'ডা. উম্মে হানি পৃথ্বী',
        publishedAt: '2026-10-09',
      },
    ],
  },
  {
    id: 'women-leadership-participation',
    kind: 'essay',
    title: 'নারী নেতৃত্ব: রাজনীতিকে ভয় নয়, পরিবর্তনের অংশ হিসেবে দেখা',
    summary:
      'A reflection on the conditions women need to participate in politics with safety, dignity, preparation, and a meaningful voice in decisions.',
    topics: ['Women', 'Leadership'],
    featured: true,
    status: 'published',
    sources: [
      {
        publisher: 'Daily Sun',
        url: 'https://bangla.daily-sun.com/opinion/58055',
        byline: 'ডা. উম্মে হানি পৃথ্বী',
        dateLabel: 'October 2026',
      },
    ],
  },
  {
    id: 'child-protection-warning-signs',
    kind: 'essay',
    title: 'নীরবতা নয়, সুরক্ষা: শিশুর যৌন নির্যাতনের সতর্কসংকেত ও সহায়তার পথ',
    summary:
      'A discussion of recognising changes in a child’s behaviour, listening without blame, and making it safer for children to seek support.',
    topics: ['Health', 'Children'],
    featured: false,
    status: 'published',
    sources: [
      {
        publisher: 'Daily Sun',
        url: 'https://bangla.daily-sun.com/opinion/54382',
        byline: 'ডা. উম্মে হানি পৃথ্বী',
        publishedAt: '2026-08-25',
      },
    ],
  },
  {
    id: 'youth-policy-implementation',
    kind: 'essay',
    title: 'ঘোষণা থেকে বাস্তবায়ন: তরুণের বাংলাদেশ কত দূরে?',
    summary:
      'An examination of youth opportunity, skills, and entrepreneurship, and the importance of turning policy announcements into implementation.',
    topics: ['Youth', 'Public life'],
    featured: false,
    status: 'published',
    sources: [
      {
        publisher: 'Daily Sun',
        url: 'https://bangla.daily-sun.com/opinion/53759',
        byline: 'ডা. উম্মে হানি পৃথ্বী',
        publishedAt: '2026-08-17',
      },
    ],
  },
  {
    id: 'women-to-leadership',
    kind: 'essay',
    title: 'নারী থেকে নেতৃত্ব: বেগম খালেদা জিয়া',
    summary:
      'A personal political essay reflecting on Khaleda Zia’s legacy through women’s education, participation, and leadership.',
    topics: ['Women', 'Leadership'],
    featured: false,
    status: 'published',
    sources: [
      {
        publisher: 'Ekushey TV',
        url: 'https://www.ekushey-tv.com/নারী-থেকে-নেতৃত্ব-বেগম-খালেদা-জিয়া/1360873111111177536',
        byline: 'ডা. উম্মে হানি পৃথ্বী',
        publishedAt: '2026-08-15',
      },
      {
        publisher: 'Agamir Somoy',
        url: 'https://www.agamirsomoy.com/miscellaneous/e40tfbidfvy8',
        byline: 'ডা. উম্মে হানি পৃথ্বী',
        publishedAt: '2026-08-15',
      },
    ],
  },
  {
    id: 'bytt-udyog-press',
    kind: 'report',
    title: 'Youth entrepreneurship and access to finance',
    summary:
      'Daily Sun reports on a BYTT press conference calling for wider age eligibility in the UDYOG programme, naming Dr Umme Hani Prithwi among the participants.',
    topics: ['Youth', 'Public life'],
    featured: true,
    status: 'published',
    relatedActivity: 'bytt-youth-finance-2026',
    sources: [
      {
        publisher: 'Daily Sun',
        url: 'https://www.daily-sun.com/index.php/bangladesh/899625/bytt-calls-for-35-yr-age-limit-in-bangladesh-bank-s-loan-scheme',
        byline: 'Daily Sun Report, DU',
        publishedAt: '2026-09-24',
      },
    ],
  },
  {
    id: 'reserved-seat-nomination-press',
    kind: 'report',
    title: 'Reserved-seat nomination-form collection',
    summary:
      'Reports on her collection of a BNP nomination form for a reserved women’s parliamentary seat. These reports describe the application stage.',
    topics: ['Public life'],
    featured: false,
    status: 'published',
    relatedActivity: 'reserved-seat-nomination-form-2026',
    image: '/media/nomination-form-desk.jpg',
    sources: [
      {
        publisher: 'Banglanews24',
        url: 'https://www.banglanews24.com/politics/news/bd/1647903.details',
        byline: 'Staff Correspondent',
        publishedAt: '2026-04-11',
      },
      {
        publisher: 'Jagonews24',
        url: 'https://www.jagonews24.com/politics/news/1109481',
        byline: 'Jagonews24',
        publishedAt: '2026-04-11',
      },
      {
        publisher: 'Creative Dinajpur',
        url: 'https://creativedinajpur.com/article/2883/',
        byline: 'Staff Reporter',
        publishedAt: '2026-04-11',
      },
    ],
  },
  {
    id: 'bogura-public-activity-press',
    kind: 'report',
    title: 'Public activity in Bogura',
    summary:
      'Newspaper coverage names her among doctors taking part in election-related outreach in Bogura. Reports of the same activity are collected here.',
    topics: ['Public life'],
    featured: false,
    status: 'published',
    sources: [
      {
        publisher: 'Bangladesh Pratidin',
        url: 'https://www.bd-pratidin.com/election/2026/01/26/1209413',
        byline: 'Bangladesh Pratidin',
        publishedAt: '2026-01-26',
      },
      {
        publisher: 'Kalbela',
        url: 'https://www.kalbela.com/politics/260589',
        byline: 'Kalbela Reporter',
        publishedAt: '2026-01-26',
      },
      {
        publisher: 'Ittefaq',
        url: 'https://www.ittefaq.com.bd/amp/773111/তারেক-রহমানের-দুটি-আসনে-গনসংযোগে-ব‍্যস্ত-দলের',
        byline: 'Ittefaq Report',
        publishedAt: '2026-02-04',
      },
    ],
  },
  {
    id: 'rayerbazar-health-camp-press',
    kind: 'report',
    title: 'A community health camp in Rayerbazar',
    summary:
      'RTV reports on a free health and awareness camp at a Rayerbazar temple, naming her as The Bangladesh Resonaire’s public relations coordinator at the event.',
    topics: ['Health', 'Community'],
    featured: true,
    status: 'published',
    relatedActivity: 'rayerbazar-health-camp-2025',
    sources: [
      {
        publisher: 'RTV',
        url: 'https://rtvonline.com/capital/346004',
        byline: 'RTV News',
        publishedAt: '2025-09-29',
      },
    ],
  },
  {
    id: 'nursing-help-desk-press',
    kind: 'report',
    title: 'Support for nursing examination candidates',
    summary:
      'RTV covers a help desk at Dhaka College for nursing licensing examination candidates and includes her comments on supporting nursing students.',
    topics: ['Health', 'Community'],
    featured: false,
    status: 'published',
    sources: [{ publisher: 'RTV', url: 'https://rtvonline.com/health/345467', byline: 'RTV / IM' }],
  },
  {
    id: 'jagannath-health-camp-press',
    kind: 'report',
    title: 'Healthcare support for Jagannath University students',
    summary:
      'Coverage of a three-day camp names her among the participating doctors. The reported 1,800 students were served by the whole multi-doctor programme.',
    topics: ['Health', 'Community'],
    featured: true,
    status: 'published',
    relatedActivity: 'jagannath-university-health-camp-2025',
    image: '/media/camp-consultation.jpg',
    sources: [
      {
        publisher: 'Kalbela',
        url: 'https://www.kalbela.com/dainikshiksha/campus/226197',
        byline: 'JnU Correspondent',
        publishedAt: '2025-09-25',
      },
      {
        publisher: 'Sarabangla',
        url: 'https://sarabangla.net/politics/post-1061001/',
        byline: 'JnU Correspondent',
        publishedAt: '2025-09-25',
      },
      {
        publisher: 'Asian TV Online',
        url: 'https://www.asiantvonline.com/news/campus/412a-20250926',
        byline: 'Srijon Saha, JnU Correspondent',
        publishedAt: '2025-09-26',
      },
      {
        publisher: 'Rupali Bangladesh',
        url: 'https://www.rupalibangladesh.com/educational-news/campus/77525',
        byline: 'JnU Correspondent',
        publishedAt: '2025-09-25',
      },
      {
        publisher: 'Banglabazar Patrika',
        url: 'https://banglabazarpatrika.net/education/2025-09-25/7c72p34yn0',
        byline: 'Arafat Chowdhury, JnU Correspondent',
        publishedAt: '2025-09-25',
      },
      {
        publisher: 'Amar Sangbad',
        url: 'https://www.amarsangbad.com/education/news/324813',
        byline: 'Amar Sangbad',
        publishedAt: '2025-09-25',
      },
    ],
  },
]

export function publicationDate(publication: Publication) {
  const dates = publication.sources
    .map((source) => source.publishedAt)
    .filter((date): date is string => Boolean(date))
    .sort()
  return dates[0]
}

export function dateLabel(source: Publication['sources'][number]) {
  if (!source.publishedAt) return source.dateLabel || 'Publication date not listed'
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(source.publishedAt))
}

export function sortPublications(items: Publication[]) {
  const timestamp = (item: Publication) =>
    Date.parse(publicationDate(item) || item.sources[0]?.dateLabel || '') || 0
  return [...items].sort((a, b) => timestamp(b) - timestamp(a))
}
