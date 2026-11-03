import { useApi } from '../../hooks/useApi'
import { getRecentMovies } from '../../services/api'
import { Skeleton } from '../ui/Skeleton'
import { StatusCard } from '../ui/StatusCard'
import { MovieCard } from './MovieCard'

const gridClass = 'stagger grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 md:gap-x-4 md:gap-y-7'

export function MovieDiary() {
  const { state, retry } = useApi(getRecentMovies)

  return (
    <div className="mx-auto max-w-[1196px] px-3 md:px-6">
      <div className="animate-fade-up">
        <h2 className="text-[28px] leading-tight font-extrabold tracking-tight md:text-5xl">Movies I've Watched</h2>
        <p className="mt-1 text-[15px] text-muted md:mt-2 md:text-base">Every story leaves something behind.</p>
      </div>

      <div className="mt-6">
        {state.status === 'loading' && (
          <div className={gridClass}>
            {Array.from({ length: 10 }, (_, i) => (
              <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
            ))}
          </div>
        )}
        {state.status === 'error' && (
          <StatusCard
            title="Couldn't load the movie diary"
            description="Trakt data is unavailable right now."
            onRetry={retry}
            className="animate-fade-up"
          />
        )}
        {state.status === 'success' &&
          (state.data.length === 0 ? (
            <StatusCard
              title="No movies logged yet"
              description="Films watched on Trakt will show up here."
              className="animate-fade-up"
            />
          ) : (
            <div className={gridClass}>
              {state.data.map((movie) => (
                <MovieCard key={`${movie.title}-${movie.watchedAt}`} movie={movie} />
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}
