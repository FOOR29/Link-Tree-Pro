import { LuStar } from 'react-icons/lu'
import type { Movie } from '../../types/api'
import { formatDate } from '../../utils/format'
import { FallbackImage } from '../ui/FallbackImage'

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <article className="group">
      <FallbackImage
        src={movie.poster}
        alt={movie.title}
        kind="poster"
        className="aspect-[2/3] w-full rounded-lg transition-[translate,box-shadow] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/60"
      />
      <div className="mt-2.5 px-0.5">
        <h3 className="text-sm leading-snug font-bold md:text-[15px]">
          {movie.title}
          {movie.year !== null && <span className="font-normal text-muted"> {movie.year}</span>}
        </h3>
        <div className="mt-1 flex items-center justify-between gap-2 text-xs">
          {movie.rating !== null && (
            <span className="flex items-center gap-1.5 font-bold text-accent-soft">
              <LuStar className="size-3 fill-current" aria-hidden />
              <span className="sr-only">Rating:</span>
              {movie.rating}
            </span>
          )}
          <time dateTime={movie.watchedAt} className="ml-auto text-muted">
            {formatDate(movie.watchedAt)}
          </time>
        </div>
      </div>
    </article>
  )
}
