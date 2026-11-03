# CLAUDE.md

Personal link-in-bio page (Forlán · @foor29) with a Spotify-style music dashboard and a movie diary.
Data comes from [reelbeat-api](https://github.com/FOOR29/reelbeat-api) (Last.fm, Deezer, Trakt). Do not modify that repo from here.

## Stack

React 19 · TypeScript 7 · Vite 8 · Tailwind CSS 4 (`@tailwindcss/vite`) · react-icons (Lucide set, `react-icons/lu`) · **pnpm**.

## Commands

```bash
pnpm install     # install dependencies
pnpm dev         # dev server → http://localhost:5173
pnpm build       # type-check (tsc -b) + production build to dist/
pnpm preview     # serve dist/
pnpm lint        # currently broken: typescript-eslint does not support TS 7 yet
```

## Structure

```text
public/images/profile/   avatar.webp, background.webp (profile photos)
src/
  index.css              Tailwind import + color palette (@theme)
  App.tsx                header → tabs → Music/Movies panels → footer
  config/profile.ts      name, username, description, image paths, social links
  services/api.ts        API base URL + one function per endpoint (only place that calls fetch)
  hooks/useApi.ts        loading / error / success state + retry for any service function
  types/api.ts           response types, verified against live API responses
  utils/format.ts        number and date formatting
  components/
    profile/             ProfileHeader (background, avatar, name, socials)
    music/               MusicDashboard (data + layout) and one presentational card per stat
    movies/              MovieDiary (data + grid) and MovieCard
    ui/                  Card, FallbackImage, Skeleton, StatusCard (empty/error)
    Tabs.tsx, Footer.tsx
```

Rules: presentational components receive typed data via props; only `MusicDashboard` and `MovieDiary` call `useApi`.
Both tab panels stay mounted (`hidden`) so each request runs once per page load.

## API

Base URL: `https://reelbeat-api.onrender.com` (override with `VITE_API_URL` in `.env`).

| Endpoint | Used by |
|---|---|
| `GET /api/music/summary` | listening time, top artist(s), top song(s) — one request |
| `GET /api/music/now-playing` | Live now / Last played card (independent request, polled every 15 s via `useApi`'s `refreshIntervalMs`; paused while the browser tab is hidden) |
| `GET /api/movies/recent?limit=50` | movie grid (independent request) |
| `/api/music/top-artists`, `/top-tracks`, `/listening-time`, `/health` | not used (covered by summary) |

Notes:
- Render free plan: first request after idle can take ~1 min → requests time out at 90 s, skeletons show meanwhile.
- Nullable: `image`, `artistImage`, `playedAt`, and every image URL. `FallbackImage` handles null and load errors.
- Top tracks have no album artwork in the API; the artist image is used as the cover.
- `isPlaying: false` → card label shows "Last played" instead of "Live now".
- Errors return `{ "message": string }`.

## Customizing

- **Profile photos:** replace `public/images/profile/avatar.webp` and `background.webp` (same names). Until they exist, neutral fallbacks are shown.
- **Name, username, bio, social links:** `src/config/profile.ts`.
- **Colors:** `src/index.css` → `@theme`. Each `--color-*` token becomes a Tailwind utility (`bg-accent`, `text-muted`…). Never hardcode hex values in components.
  `page`/`hero`/`card`/`chip`/`placeholder`/`skeleton` = backgrounds, `fg`/`muted`/`subtle` = text, `accent`/`accent-soft` = brand purple, `line` = borders.
- **Motion:** also in `src/index.css`. `animate-fade-up` (single element) and `stagger` (all direct children, 60 ms apart) are CSS-only;
  they replay when a tab panel is shown and when data replaces a skeleton. Easing token: `ease-out-expo`.
  Images fade in on load (`FallbackImage`), minutes count up (`useCountUp`). Everything is disabled under `prefers-reduced-motion`.
