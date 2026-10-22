'use client'

import { useActionState, useState } from 'react'
import { savePublicationAction } from './publication-actions'

type Source = { publisher?: string; url?: string; byline?: string; publishedAt?: string; dateLabel?: string }
export type PublicationRecord = {
  id?: string | number
  externalId?: string
  kind?: string
  title?: string
  summary?: string
  topics?: { label: string }[]
  sources?: Source[]
  imagePath?: string
  relatedActivity?: string
  featured?: boolean
  status?: string
  verificationNotes?: string
}

function PublicationForm({ entry, canPublish }: { entry: PublicationRecord; canPublish: boolean }) {
  const [state, action, pending] = useActionState(savePublicationAction, { message: '', success: false })
  const [title, setTitle] = useState(entry.title || '')
  const [summary, setSummary] = useState(entry.summary || '')
  const [kind, setKind] = useState(entry.kind || 'essay')
  const [sources, setSources] = useState<Source[]>(entry.sources?.length ? entry.sources : [{}])
  const changeSource = (index: number, field: keyof Source, value: string) =>
    setSources((current) =>
      current.map((source, sourceIndex) => (sourceIndex === index ? { ...source, [field]: value } : source)),
    )
  const fieldClass = 'admin-field mt-2 w-full rounded-lg px-3 py-2'
  return (
    <form action={action} className="admin-card rounded-xl p-6 mt-5">
      <input type="hidden" name="recordId" value={entry.id || ''} />
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          Archive ID
          <input
            className={fieldClass}
            name="externalId"
            defaultValue={entry.externalId}
            required
            pattern="[a-z0-9-]+"
            readOnly={Boolean(entry.id)}
            placeholder="a-short-unique-id"
          />
        </label>
        <label>
          Type
          <select className={fieldClass} name="kind" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="essay">Authored essay</option>
            <option value="report">Press report</option>
          </select>
        </label>
      </div>
      <label className="block mt-4">
        Original title
        <input
          className={fieldClass}
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="block mt-4">
        English summary
        <textarea
          className={fieldClass}
          name="summary"
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <label>
          Topics, separated by commas
          <input
            className={fieldClass}
            name="topics"
            defaultValue={entry.topics?.map((topic) => topic.label).join(', ')}
          />
        </label>
        <label>
          Related activity slug
          <input
            className={fieldClass}
            name="relatedActivity"
            defaultValue={entry.relatedActivity}
            placeholder="From Activities / Updates"
          />
        </label>
      </div>
      <label className="block mt-4">
        Image path (optional)
        <input
          className={fieldClass}
          name="imagePath"
          defaultValue={entry.imagePath}
          placeholder="/media/..."
        />
      </label>
      <fieldset className="mt-6">
        <legend className="font-semibold">Publication sources</legend>
        <p className="text-sm mt-2">
          Add each publisher of the same work here. Leave the date empty if it has not been verified.
        </p>
        {sources.map((source, index) => (
          <div key={index} className="border-t mt-5 pt-4 grid gap-4 md:grid-cols-2">
            <label>
              Publisher
              <input
                name={`publisher${index}`}
                className={fieldClass}
                value={source.publisher || ''}
                onChange={(e) => changeSource(index, 'publisher', e.target.value)}
                required
              />
            </label>
            <label>
              Original link
              <input
                name={`url${index}`}
                type="url"
                className={fieldClass}
                value={source.url || ''}
                onChange={(e) => changeSource(index, 'url', e.target.value)}
                required
              />
            </label>
            <label>
              Original byline
              <input
                name={`byline${index}`}
                className={fieldClass}
                value={source.byline || ''}
                onChange={(e) => changeSource(index, 'byline', e.target.value)}
                required
              />
            </label>
            <label>
              Publication date
              <input
                name={`publishedAt${index}`}
                type="date"
                className={fieldClass}
                value={source.publishedAt?.slice(0, 10) || ''}
                onChange={(e) => changeSource(index, 'publishedAt', e.target.value)}
              />
            </label>
            <label>
              Month / year label (if needed)
              <input
                name={`dateLabel${index}`}
                className={fieldClass}
                value={source.dateLabel || ''}
                onChange={(e) => changeSource(index, 'dateLabel', e.target.value)}
                placeholder="October 2026"
              />
            </label>
            <button
              type="button"
              className="underline text-left"
              onClick={() => setSources(sources.filter((_, sourceIndex) => sourceIndex !== index))}
            >
              Remove source
            </button>
          </div>
        ))}
        <button
          className="admin-field rounded-lg px-4 py-2 mt-4"
          type="button"
          onClick={() => setSources([...sources, {}])}
        >
          Add publisher
        </button>
      </fieldset>
      <label className="block mt-5">
        Internal verification notes
        <textarea
          name="verificationNotes"
          className={fieldClass}
          rows={3}
          defaultValue={entry.verificationNotes}
        />
      </label>
      <div className="flex flex-wrap items-center gap-6 mt-5">
        <label>
          <input type="checkbox" name="featured" defaultChecked={entry.featured} /> Feature on homepage
        </label>
        <label>
          Visibility
          <select name="status" className={fieldClass} defaultValue={entry.status || 'draft'}>
            <option value="draft">Draft</option>
            {canPublish && <option value="published">Published</option>}
          </select>
        </label>
      </div>
      <details className="my-6">
        <summary className="cursor-pointer font-semibold">Preview publication</summary>
        <article className="p-5 border rounded-xl mt-3">
          <h3 className="font-serif text-2xl leading-relaxed" lang={kind === 'report' ? 'en' : 'bn'}>
            {title || 'Your title'}
          </h3>
          <p className="mt-4">{summary || 'Your summary'}</p>
          <div className="text-sm mt-4 space-y-3">
            {sources.map((source, index) => (
              <p key={index}>
                <strong>{source.publisher || 'Publisher'}</strong> ·{' '}
                {source.publishedAt || source.dateLabel || 'Publication date not listed'}
                <br />
                By {source.byline || 'Original byline'}
                {source.url?.startsWith('https://') && (
                  <>
                    <br />
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">
                      Read original publication
                    </a>
                  </>
                )}
              </p>
            ))}
          </div>
        </article>
      </details>
      {state.message && (
        <p role="status" className={`mb-4 ${state.success ? '' : 'text-red-800'}`}>
          {state.message}
        </p>
      )}
      <button className="rounded-lg bg-[var(--navy)] text-white px-5 py-3" disabled={pending}>
        {pending ? 'Saving…' : 'Save publication'}
      </button>
    </form>
  )
}

export function PublicationManager({
  entries,
  canPublish,
}: {
  entries: PublicationRecord[]
  canPublish: boolean
}) {
  const [query, setQuery] = useState('')
  return (
    <>
      <details className="my-6">
        <summary className="cursor-pointer text-xl font-serif">Add a publication</summary>
        <PublicationForm entry={{}} canPublish={canPublish} />
      </details>
      <label>
        Find a publication
        <input
          className="admin-field block mt-2 mb-6 rounded-lg p-3 w-full"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {entries
        .filter((entry) =>
          `${entry.title} ${entry.kind}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
        )
        .map((entry) => (
          <details className="border-t py-5" key={entry.id}>
            <summary className="cursor-pointer">
              <strong>{entry.title}</strong>
              <span className="block text-sm mt-1">
                {entry.kind === 'essay' ? 'Authored essay' : 'Press report'} · {entry.status}
                {entry.featured ? ' · Featured' : ''}
              </span>
            </summary>
            <PublicationForm entry={entry} canPublish={canPublish} />
          </details>
        ))}
      {!entries.length && <p>No entries yet. Import the reviewed source register or add a publication.</p>}
    </>
  )
}
