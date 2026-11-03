// Response shapes of https://reelbeat-api.onrender.com, verified against live responses.

export interface NowPlaying {
  isPlaying: boolean
  name: string
  artist: string
  artistImage: string | null
  album: string
  image: string | null
  url: string
  /** null while the track is still playing */
  playedAt: string | null
}

export interface ListeningTime {
  period: string
  totalSeconds: number
  totalMinutes: number
  totalHours: number
  tracksCounted: number
  tracksWithoutDuration: number
}

export interface TopArtist {
  rank: number
  name: string
  playcount: number
  url: string
  image: string | null
}

export interface TopTrack {
  rank: number
  name: string
  artist: string
  artistImage: string | null
  playcount: number
  durationSeconds: number | null
  url: string
}

export interface MusicSummary {
  period: string
  listeningTime: ListeningTime
  topArtist: TopArtist | null
  topArtists: TopArtist[]
  topTrack: TopTrack | null
  topTracks: TopTrack[]
}

export interface Movie {
  title: string
  year: number | null
  rating: number | null
  watchedAt: string
  poster: string | null
}
