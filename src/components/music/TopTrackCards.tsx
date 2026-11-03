import type { TopTrack } from '../../types/api'
import { Card, CardLabel } from '../ui/Card'
import { FallbackImage } from '../ui/FallbackImage'
import { RankedList } from './RankedList'

// The API has no album artwork for top tracks, so the artist image is used as the cover.

export function TopSongCard({ track }: { track: TopTrack }) {
  return (
    <Card>
      <CardLabel href={track.url}>Top song</CardLabel>
      <h3 className="mt-0.5 text-xl leading-tight font-extrabold tracking-tight md:text-[28px]">{track.name}</h3>
      <p className="text-sm text-muted">{track.artist}</p>
      <FallbackImage
        src={track.artistImage}
        alt={`${track.name} — ${track.artist}`}
        kind="cover"
        className="mt-3 aspect-square w-full rounded-md"
      />
    </Card>
  )
}

// Stack positions for ranks 1–3 (front, back-left, back-right), as % of the stack box.
const stackSlots = [
  'left-[22%] top-0 z-10 w-[56%] shadow-2xl shadow-black/50',
  'left-[1.5%] top-[11%] w-[45%] -rotate-6 opacity-60',
  'right-[1.5%] top-[11%] w-[45%] rotate-6 opacity-60',
]

export function TopSongsCard({ tracks }: { tracks: TopTrack[] }) {
  const top3 = tracks.slice(0, 3)

  return (
    <Card>
      <CardLabel>Top songs</CardLabel>
      <div className="relative mt-4 aspect-[345/195]">
        {top3.map((track, index) => (
          <FallbackImage
            key={track.url}
            src={track.artistImage}
            alt={`${track.name} — ${track.artist}`}
            kind="cover"
            className={`absolute aspect-square rounded-md ${stackSlots[index]}`}
          />
        ))}
      </div>
      <RankedList items={top3.map((track) => ({ key: track.url, title: track.name, subtitle: track.artist }))} />
    </Card>
  )
}
