import type { SiteContentV2 } from './site-content-v2'

export const editorialGallery: SiteContentV2['galleryItems'] = [
  { id: 'dhaka-dialogue-backdrop', title: 'Dhaka Dialogue', image: '/media/new/dhaka-dialogue-backdrop.webp', altText: 'Dr Umma Hani beside the Dhaka Dialogue banner on ending digital and AI-facilitated violence against women.', caption: 'At the Dhaka Dialogue on ending digital and AI-facilitated violence against women.', category: 'events', event: 'Dhaka Dialogue', featuredOnHomepage: true, sortOrder: 1, status: 'published' },
  { id: 'dhaka-dialogue-conversation', title: 'Conversation at the dialogue', image: '/media/new/dhaka-dialogue-conversation.webp', altText: 'Dr Umma Hani in conversation with another attendee in the dialogue venue.', caption: 'A conversation at the Dhaka Dialogue venue.', category: 'events', event: 'Dhaka Dialogue', featuredOnHomepage: false, sortOrder: 2, status: 'published' },
  { id: 'bay-of-bengal-2026', title: 'Bay of Bengal Conversation 2026', image: '/media/new/bay-of-bengal-2026.webp', altText: 'Dr Umma Hani standing beside the Centre for Governance Studies Bay of Bengal Conversation 2026 backdrop.', caption: 'At Bay of Bengal Conversation 2026, organised by the Centre for Governance Studies.', category: 'events', event: 'Bay of Bengal Conversation 2026', featuredOnHomepage: true, sortOrder: 3, status: 'published' },
  { id: 'doctors-gathering', title: 'Doctors’ gathering', image: '/media/new/doctors-gathering.webp', altText: 'Dr Umma Hani beside a Doctors Association of Bangladesh gathering backdrop.', caption: 'At a Doctors Association of Bangladesh gathering.', category: 'medical', event: 'Doctors’ gathering', featuredOnHomepage: true, sortOrder: 4, status: 'published' },
  ...[
    ['conference-portrait', 'Conference portrait', 'Bay of Bengal Conversation 2026'],
    ['dialogue-portrait-a', 'Dialogue portrait', 'Dhaka Dialogue'],
    ['dialogue-portrait-b', 'Dialogue portrait', 'Dhaka Dialogue'],
    ['dialogue-portrait-c', 'Dialogue portrait', 'Dhaka Dialogue'],
    ['dialogue-portrait-d', 'Dialogue portrait', 'Dhaka Dialogue'],
    ['dialogue-portrait-e', 'Dialogue portrait', 'Dhaka Dialogue'],
    ['courtesy-group', 'Courtesy visit', 'Courtesy visits'],
    ['courtesy-portrait', 'Courtesy visit', 'Courtesy visits'],
    ['courtesy-office', 'Courtesy visit', 'Courtesy visits'],
    ['doctors-backdrop', 'Doctors’ gathering', 'Doctors’ gathering'],
    ['public-flag', 'Public gathering', 'Public activities'],
    ['public-placard', 'Public gathering', 'Public activities'],
  ].map(([id, title, event], index) => ({ id, title, event, image: `/media/new/${id}.webp`, altText: `Dr Umma Hani at a ${event.toLowerCase()} setting.`, caption: title, category: 'events' as const, featuredOnHomepage: false, sortOrder: index + 5, status: 'draft' as const })),
]
