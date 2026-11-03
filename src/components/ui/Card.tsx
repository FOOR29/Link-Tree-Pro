import type { ReactNode } from 'react'
import { LuChevronRight } from 'react-icons/lu'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return <section className={`rounded-xl bg-card p-3.5 md:p-5 ${className}`}>{children}</section>
}

interface CardLabelProps {
  children: ReactNode
  /** When set, a chevron linking to this URL is shown on the right */
  href?: string
}

export function CardLabel({ children, href }: CardLabelProps) {
  return (
    <div className="flex items-center justify-between gap-2 text-sm text-muted">
      <span className="flex items-center gap-1.5">{children}</span>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label="Open on Last.fm"
          className="-m-1 p-1 text-muted transition-[color,translate] duration-300 hover:translate-x-0.5 hover:text-fg"
        >
          <LuChevronRight className="size-4" />
        </a>
      )}
    </div>
  )
}
