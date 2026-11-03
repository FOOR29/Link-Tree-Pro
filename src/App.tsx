import { useState } from 'react'
import { Footer } from './components/Footer'
import { MovieDiary } from './components/movies/MovieDiary'
import { MusicDashboard } from './components/music/MusicDashboard'
import { ProfileHeader } from './components/profile/ProfileHeader'
import { Tabs, tabPanelId, type TabId } from './components/Tabs'

export default function App() {
  const [tab, setTab] = useState<TabId>('music')

  return (
    <>
      <ProfileHeader />
      <Tabs active={tab} onChange={setTab} />

      <main className="mt-10">
        <section id={tabPanelId('music')} role="tabpanel" aria-labelledby="tab-music" hidden={tab !== 'music'}>
          <MusicDashboard />
        </section>
        <section id={tabPanelId('movies')} role="tabpanel" aria-labelledby="tab-movies" hidden={tab !== 'movies'}>
          <MovieDiary />
        </section>
      </main>

      <Footer />
    </>
  )
}
