import type { GalleryItem, HomepagePhotoSection } from './photo-curation'

type PhotoSeed = [string, string, string, string, HomepagePhotoSection, boolean]
const photos: PhotoSeed[] = [
  [
    'dhaka-dialogue-backdrop',
    'Dhaka Dialogue',
    'Dr Umma Hani beside the Dhaka Dialogue banner on ending digital and AI-facilitated violence against women.',
    'Dhaka Dialogue',
    'dialogues',
    true,
  ],
  [
    'dhaka-dialogue-conversation',
    'In conversation',
    'Dr Umma Hani in conversation with another attendee at the Dhaka Dialogue venue.',
    'Dhaka Dialogue',
    'dialogues',
    true,
  ],
  [
    'dialogue-portrait-c',
    'An encounter at the dialogue',
    'Dr Umma Hani standing alongside another attendee beside a Dhaka Dialogue banner.',
    'Dhaka Dialogue',
    'dialogues',
    true,
  ],
  [
    'dialogue-portrait-e',
    'At the dialogue venue',
    'Dr Umma Hani alongside another attendee in the dialogue venue.',
    'Dhaka Dialogue',
    'dialogues',
    true,
  ],
  [
    'bay-of-bengal-2026',
    'Bay of Bengal Conversation 2026',
    'Dr Umma Hani beside the Bay of Bengal Conversation 2026 backdrop.',
    'Bay of Bengal Conversation 2026',
    'dialogues',
    true,
  ],
  [
    'conference-portrait',
    'A conference encounter',
    'Dr Umma Hani alongside another attendee wearing conference badges.',
    'Bay of Bengal Conversation 2026',
    'dialogues',
    true,
  ],
  [
    'doctors-backdrop',
    'Doctors’ gathering',
    'Dr Umma Hani beside a Doctors Association of Bangladesh, Dhaka gathering backdrop.',
    'Doctors’ gathering',
    'medical-work',
    true,
  ],
  [
    'doctors-gathering',
    'At the gathering venue',
    'Dr Umma Hani standing in front of the doctors’ gathering stage and backdrop.',
    'Doctors’ gathering',
    'medical-work',
    true,
  ],
  [
    'courtesy-office',
    'An office visit',
    'Dr Umma Hani standing beside a seated person in an office setting.',
    'Courtesy visits',
    'public-work',
    true,
  ],
  [
    'courtesy-portrait',
    'A courtesy visit',
    'Dr Umma Hani alongside another person holding a bouquet of blue flowers.',
    'Courtesy visits',
    'public-work',
    true,
  ],
  [
    'public-flag',
    'With the Bangladesh flag',
    'Dr Umma Hani holding a Bangladesh flag at an outdoor gathering.',
    'Public activities',
    'public-work',
    true,
  ],
  [
    'public-placard',
    'At a public gathering',
    'Dr Umma Hani holding a Bengali placard at an outdoor public gathering.',
    'Public activities',
    'public-work',
    true,
  ],
  [
    'dialogue-portrait-b',
    'A conversation between attendees',
    'Dr Umma Hani smiling alongside another attendee at the dialogue venue.',
    'Dhaka Dialogue',
    'dialogues',
    false,
  ],
  [
    'dialogue-portrait-a',
    'At the dialogue',
    'Dr Umma Hani alongside another attendee near the dialogue banner.',
    'Dhaka Dialogue',
    'dialogues',
    false,
  ],
  [
    'dialogue-portrait-d',
    'An encounter at the venue',
    'Dr Umma Hani alongside another attendee in the dialogue venue.',
    'Dhaka Dialogue',
    'dialogues',
    false,
  ],
  [
    'courtesy-group',
    'A group visit',
    'Dr Umma Hani with a group of visitors holding a bouquet of blue flowers.',
    'Courtesy visits',
    'public-work',
    false,
  ],
]

// This is the review snapshot. Imports never publish existing CMS drafts.
export const editorialGallery: GalleryItem[] = photos.map(
  (
    [id, title, caption, event, homepageSection, featuredOnHomepage],
    index,
  ) => ({
    id,
    title,
    caption,
    altText: caption,
    event,
    homepageSection,
    featuredOnHomepage,
    image: `/media/new/${id}.webp`,
    category:
      homepageSection === 'medical-work'
        ? 'medical'
        : homepageSection === 'public-work'
          ? 'leadership'
          : 'events',
    focalX: 50,
    focalY: 50,
    sortOrder: index + 1,
    status: 'published',
  }),
)
