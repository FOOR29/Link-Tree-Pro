import { useCountUp } from '../../hooks/useCountUp'
import type { ListeningTime } from '../../types/api'
import { formatNumber } from '../../utils/format'
import { Card, CardLabel } from '../ui/Card'

export function ListeningTimeCard({ time }: { time: ListeningTime }) {
  const minutes = useCountUp(time.totalMinutes)
  const hours = useCountUp(time.totalHours)

  return (
    <Card>
      <CardLabel>Minutes listened</CardLabel>
      <p className="mt-1 text-[40px] leading-none font-black tracking-tighter tabular-nums md:mt-2 md:text-[76px]">
        <span className="sr-only">{formatNumber(time.totalMinutes)}</span>
        <span aria-hidden>{formatNumber(minutes)}</span>
      </p>
      <p className="mt-2 text-sm text-muted">
        <span className="font-bold text-accent-soft tabular-nums">{formatNumber(hours)}</span> hours
      </p>
      <p className="mt-1 text-xs text-subtle">
        {formatNumber(time.tracksWithoutDuration)} tracks without duration
      </p>
    </Card>
  )
}
