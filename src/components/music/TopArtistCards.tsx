import type { TopArtist } from '../../types/api'
import { Card, CardLabel } from '../ui/Card'
import { FallbackImage } from '../ui/FallbackImage'
import { RankedList } from './RankedList'

export function TopArtistCard({ artist }: { artist: TopArtist }) {
  return (
    <Card>
      <CardLabel href={artist.url}>Top artist</CardLabel>
      <h3 className="mt-0.5 text-xl leading-tight font-extrabold tracking-tight md:text-[28px]">{artist.name}</h3>
      <FallbackImage
        src={artist.image}
        alt={artist.name}
        kind="artist"
        className="mt-3 aspect-square w-full rounded-full"
      />
    </Card>
  )
}

// Collage positions for ranks 1–3 (center, left, right), as % of the collage box.
const collageSlots = [
  'left-[19.5%] top-0 z-10 w-[61%] border-4 border-card',
  'left-0 top-[22%] w-[40.6%] opacity-70',
  'right-0 top-[31%] w-[35.6%] opacity-70',
]

export function TopArtistsCard({ artists }: { artists: TopArtist[] }) {
  const top3 = artists.slice(0, 3)

  return (
    <Card>
      <CardLabel>Top artists</CardLabel>
      <div className="relative mt-4 aspect-[345/210]">
        {top3.map((artist, index) => (
          <FallbackImage
            key={artist.name}
            src={artist.image}
            alt={artist.name}
            kind="artist"
            className={`absolute aspect-square rounded-full ${collageSlots[index]}`}
          />
        ))}
      </div>
      <RankedList items={top3.map((artist) => ({ key: artist.name, title: artist.name }))} />
    </Card>
  )
}
