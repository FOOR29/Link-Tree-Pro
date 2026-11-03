import { profile } from '../config/profile'

export function Footer() {
  return (
    <footer className="mx-4 mt-16 border-t border-line py-8 text-center md:mx-auto md:max-w-5xl">
      <p className="text-[13px] text-muted">Music via Last.fm &amp; Deezer · Movies via Trakt</p>
      <p className="mt-1 text-xs text-subtle">
        {profile.name} · @{profile.username}
      </p>
    </footer>
  )
}
