import { useApi, type ApiState } from '../../hooks/useApi'
import { getMusicSummary, getNowPlaying } from '../../services/api'
import type { MusicSummary, NowPlaying } from '../../types/api'
import { Card } from '../ui/Card'
import { Skeleton } from '../ui/Skeleton'
import { StatusCard } from '../ui/StatusCard'
import { ListeningTimeCard } from './ListeningTimeCard'
import { NowPlayingCard } from './NowPlayingCard'
import { TopArtistCard, TopArtistsCard } from './TopArtistCards'
import { TopSongCard, TopSongsCard } from './TopTrackCards'

const musicError = {
  title: "Couldn't load listening stats",
  description: "The music service didn't respond. It may be waking up — try again in a moment.",
}

export function MusicDashboard() {
  const summary = useApi(getMusicSummary)
  const nowPlaying = useApi(getNowPlaying)

  // When the whole music service is down (e.g. still waking up), show a single error instead of two.
  const allFailed = summary.state.status === 'error' && nowPlaying.state.status === 'error'
  const retryAll = () => {
    summary.retry()
    nowPlaying.retry()
  }

  return (
    <div className="mx-auto max-w-[778px] px-4 md:px-0">
      <h2 className="animate-fade-up text-[26px] font-extrabold tracking-tight md:text-[30px]">Listening stats</h2>
      {allFailed ? (
        <StatusCard {...musicError} onRetry={retryAll} className="mt-4 animate-fade-up" />
      ) : (
        <div className="mt-4 grid grid-cols-2 items-start gap-3">
          <div className="stagger flex flex-col gap-3">
            <SummaryLeftColumn state={summary.state} onRetry={summary.retry} />
          </div>
          <div className="stagger flex flex-col gap-3">
            <NowPlayingSlot state={nowPlaying.state} onRetry={nowPlaying.retry} />
            <SummaryRightColumn state={summary.state} />
          </div>
        </div>
      )}
    </div>
  )
}

interface SlotProps<T> {
  state: ApiState<T>
  onRetry: () => void
}

function SummaryLeftColumn({ state, onRetry }: SlotProps<MusicSummary>) {
  if (state.status === 'loading') {
    return (
      <>
        <ListeningTimeSkeleton />
        <CardSkeleton round />
      </>
    )
  }
  if (state.status === 'error') return <StatusCard {...musicError} onRetry={onRetry} />

  const { listeningTime, topArtist, topArtists } = state.data
  return (
    <>
      <ListeningTimeCard time={listeningTime} />
      {topArtist && <TopArtistCard artist={topArtist} />}
      {topArtists.length > 0 && <TopArtistsCard artists={topArtists} />}
    </>
  )
}

// The summary error is already shown in the left column.
function SummaryRightColumn({ state }: { state: ApiState<MusicSummary> }) {
  if (state.status === 'loading') return <CardSkeleton />
  if (state.status === 'error') return null

  const { topTrack, topTracks } = state.data
  return (
    <>
      {topTrack && <TopSongCard track={topTrack} />}
      {topTracks.length > 0 && <TopSongsCard tracks={topTracks} />}
    </>
  )
}

function NowPlayingSlot({ state, onRetry }: SlotProps<NowPlaying | null>) {
  if (state.status === 'loading') return <NowPlayingSkeleton />
  if (state.status === 'error') return <StatusCard {...musicError} onRetry={onRetry} />
  if (!state.data) {
    return (
      <StatusCard
        title="Nothing played yet"
        description="Recent scrobbles will appear here as soon as Last.fm reports one."
      />
    )
  }
  return <NowPlayingCard track={state.data} />
}

function ListeningTimeSkeleton() {
  return (
    <Card>
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="mt-4 h-12 w-full md:h-16" />
      <Skeleton className="mt-4 h-3 w-1/2" />
    </Card>
  )
}

function NowPlayingSkeleton() {
  return (
    <Card>
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="mt-4 aspect-square w-[62%]" />
      <Skeleton className="mt-4 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <Skeleton className="mt-2 h-3 w-1/3" />
    </Card>
  )
}

function CardSkeleton({ round = false }: { round?: boolean }) {
  return (
    <Card>
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="mt-2 h-5 w-2/3" />
      <Skeleton className={`mt-4 aspect-square w-full ${round ? 'rounded-full' : ''}`} />
    </Card>
  )
}
