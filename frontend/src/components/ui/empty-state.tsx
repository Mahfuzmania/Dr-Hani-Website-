export function EmptyState({ message, title }: { message: string; title: string }) {
  return (
    <div className="py-14 text-center">
      <div className="editorial-rule mx-auto" />
      <h2 className="mx-auto mt-8 max-w-3xl font-serif text-[2.7rem] leading-[1.05] tracking-[-0.03em] text-[var(--primary)]">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[var(--muted)]">{message}</p>
    </div>
  )
}
