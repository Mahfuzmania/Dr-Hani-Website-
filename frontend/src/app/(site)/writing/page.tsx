import { PublicationArchive } from '@/src/components/site/publication-archive'
import { PageIntro } from '@/src/components/site/page-intro'
import { getSiteContent } from '@/src/lib/site-api'
import { buildMetadata } from '@/src/lib/metadata'

export const metadata = buildMetadata(
  'Writing',
  'Published columns by Dr Umma Hani on women, health, youth, and public life. Original Bengali titles, English summaries, and publisher links.',
  '/writing',
)

export default async function WritingPage() {
  const content = await getSiteContent()
  return (
    <div className="page-shell archive-page">
      <PageIntro title="Writing & perspectives">
        <p>
          On women, health, and the society we share. Explore Dr Hani’s published columns in their original
          publications.
        </p>
      </PageIntro>
      <PublicationArchive items={content.publications} kind="essay" />
    </div>
  )
}
