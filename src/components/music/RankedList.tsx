interface RankedItem {
  key: string
  title: string
  subtitle?: string
}

export function RankedList({ items }: { items: RankedItem[] }) {
  return (
    <ol className="mt-4 space-y-2 md:space-y-1.5">
      {items.map(({ key, title, subtitle }, index) => (
        <li key={key} className="flex gap-3 text-sm leading-tight">
          <span className={`w-2.5 shrink-0 font-bold ${index === 0 ? 'text-accent-soft' : 'text-muted'}`}>
            {index + 1}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-bold">{title}</span>
            {subtitle && <span className="block truncate text-xs text-subtle">{subtitle}</span>}
          </span>
        </li>
      ))}
    </ol>
  )
}
