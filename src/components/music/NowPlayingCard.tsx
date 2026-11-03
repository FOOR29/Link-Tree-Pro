import type { NowPlaying } from '../../types/api'
import { Card, CardLabel } from '../ui/Card'
import { FallbackImage } from '../ui/FallbackImage'

export function NowPlayingCard({ track }: { track: NowPlaying }) {
  return (
    <Card>
      <CardLabel href={track.url}>
        {track.isPlaying ? (
          <>
            <span className="relative flex size-2.5" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative size-2.5 rounded-full bg-accent ring-2 ring-accent/40" />
            </span>
            <span className="font-semibold text-accent-soft">Live now</span>
          </>
        ) : (
          'Last played'
        )}
      </CardLabel>

      <div className="relative mt-3 w-[62%]">
        <FallbackImage src={track.image} alt={track.album} kind="cover" className="aspect-square w-full rounded-md" />
        <FallbackImage
          src={track.artistImage}
          alt={track.artist}
          kind="artist"
          className="absolute -right-[13%] -bottom-[10%] aspect-square w-[43%] rounded-full border-[3px] border-card"
        />
      </div>

      <h3 className="mt-5 text-base leading-tight font-extrabold md:text-xl">{track.name}</h3>
      <p className="mt-0.5 text-xs font-bold md:text-sm">{track.artist}</p>
      <p className="text-xs text-muted">{track.album}</p>
    </Card>
  )
}
