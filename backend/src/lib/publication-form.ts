export function readPublicationSources(form: FormData) {
  const value = (name: string) => String(form.get(name) || '').trim()
  return [...form.keys()]
    .filter((name) => /^publisher\d+$/.test(name))
    .map((name) => name.slice('publisher'.length))
    .map((index) => ({
      publisher: value(`publisher${index}`),
      url: value(`url${index}`),
      byline: value(`byline${index}`),
      publishedAt: value(`publishedAt${index}`) || undefined,
      dateLabel: value(`dateLabel${index}`) || undefined,
    }))
    .filter((source) => source.publisher || source.url || source.byline)
}
