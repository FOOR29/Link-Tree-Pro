const numberFormat = new Intl.NumberFormat('en-US')

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export const formatNumber = (value: number) => numberFormat.format(value)

/** "2026-09-22T10:18:00.000Z" → "Sep 22, 2026" */
export const formatDate = (iso: string) => dateFormat.format(new Date(iso))
