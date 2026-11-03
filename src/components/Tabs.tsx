export type TabId = 'music' | 'movies'

const tabs: { id: TabId; label: string }[] = [
  { id: 'music', label: 'Music' },
  { id: 'movies', label: 'Movies' },
]

interface TabsProps {
  active: TabId
  onChange: (tab: TabId) => void
}

export const tabPanelId = (tab: TabId) => `panel-${tab}`

export function Tabs({ active, onChange }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Sections"
      className="relative mx-4 grid grid-cols-2 rounded-full bg-chip p-1 md:mx-auto md:w-95"
    >
      {/* Sliding pill behind the active tab */}
      <span
        aria-hidden
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-accent shadow-lg shadow-accent/25 transition-transform duration-500 ease-out-expo ${
          active === 'movies' ? 'translate-x-full' : ''
        }`}
      />
      {tabs.map(({ id, label }) => {
        const selected = id === active
        return (
          <button
            key={id}
            id={`tab-${id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={tabPanelId(id)}
            onClick={() => onChange(id)}
            className={`relative h-12 rounded-full text-sm font-black tracking-[0.18em] uppercase transition-[color,scale] duration-300 active:scale-95 md:h-10 ${
              selected ? 'text-fg' : 'text-muted hover:text-fg'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
