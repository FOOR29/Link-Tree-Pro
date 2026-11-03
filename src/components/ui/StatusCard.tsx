interface StatusCardProps {
  title: string
  description: string
  /** When set, a "Try again" button is shown (error state) */
  onRetry?: () => void
  className?: string
}

/** Empty and error states. */
export function StatusCard({ title, description, onRetry, className = '' }: StatusCardProps) {
  return (
    <div
      role={onRetry ? 'alert' : 'status'}
      className={`flex flex-col justify-center rounded-xl bg-card px-6 py-8 ${className}`}
    >
      <h3 className="text-lg font-extrabold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 self-start rounded-full border border-accent px-6 py-2.5 text-sm font-bold transition-colors hover:bg-accent"
        >
          Try again
        </button>
      )}
    </div>
  )
}
