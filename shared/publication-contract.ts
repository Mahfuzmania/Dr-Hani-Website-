import { z } from 'zod'
import type { Publication } from './publications'

const sourceSchema = z.object({
  publisher: z.string().trim().min(1),
  url: z.url().refine((value) => new URL(value).protocol === 'https:', 'Use an HTTPS publisher URL.'),
  byline: z.string().trim().min(1),
  publishedAt: z.iso.date().optional(),
  dateLabel: z.string().optional(),
})

export const publicationSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['essay', 'report']),
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  topics: z.array(z.string().trim().min(1)),
  sources: z.array(sourceSchema).min(1),
  image: z.string().optional(),
  relatedActivity: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']),
})

export function publicPublications(records: unknown[]): Publication[] {
  const result: Publication[] = []
  const seen = new Set<string>()
  for (const record of records) {
    const parsed = publicationSchema.safeParse(record)
    if (!parsed.success || parsed.data.status !== 'published' || seen.has(parsed.data.id)) continue
    seen.add(parsed.data.id)
    result.push(parsed.data)
  }
  return result
}
