import type { Movie, MusicSummary, NowPlaying } from '../types/api'

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'https://reelbeat-api.onrender.com'

// Render's free plan can take ~1 minute to wake up, so don't give up early.
const REQUEST_TIMEOUT_MS = 90_000

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS)
  const response = await fetch(`${API_BASE_URL}${path}`, {
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  })

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null)
    const message =
      body && typeof body === 'object' && 'message' in body && typeof body.message === 'string'
        ? body.message
        : `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return response.json() as Promise<T>
}

// null is handled as "nothing played yet", in case the account has no scrobbles.
export const getNowPlaying = (signal?: AbortSignal) =>
  getJson<NowPlaying | null>('/api/music/now-playing', signal)

export const getMusicSummary = (signal?: AbortSignal) =>
  getJson<MusicSummary>('/api/music/summary', signal)

export const getRecentMovies = (signal?: AbortSignal) =>
  getJson<Movie[]>('/api/movies/recent?limit=50', signal)
