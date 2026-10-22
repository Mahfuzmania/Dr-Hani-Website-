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
      <PageIntro title="Published writing">
        <p>
          Columns by Dr Umma Hani, with original Bengali titles, English
          summaries, and links to the publishers.
        </p>
      </PageIntro>
      <PublicationArchive items={content.publications} kind="essay" />
    </div>
  )
}
