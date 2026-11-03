import type { IconType } from 'react-icons'
import {
  LuActivity,
  LuBriefcase,
  LuCodeXml,
  LuFilm,
  LuInstagram,
  LuMail,
  LuMusic,
} from 'react-icons/lu'

export interface SocialLink {
  label: string
  href: string
  icon: IconType
}

/**
 * Everything personal lives here: edit this file to update the profile.
 * Images are served from public/images/profile/ — replace the files keeping the same names.
 */
export const profile = {
  name: 'Forlán',
  username: 'foor29',
  description: 'Developer, music enthusiast & movie lover.',
  avatar: '/images/profile/avatar.webp',
  background: '/images/profile/background.webp',
} as const

// Order matches the design. TODO: replace each `href: '#'` with the real URL.
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/FOOR29', icon: LuCodeXml },
  { label: 'Instagram', href: '#', icon: LuInstagram },
  { label: 'Last.fm', href: '#', icon: LuMusic },
  { label: 'Portfolio', href: '#', icon: LuBriefcase },
  { label: 'Activity', href: '#', icon: LuActivity },
  { label: 'Trakt', href: '#', icon: LuFilm },
  { label: 'Email', href: 'mailto:', icon: LuMail },
]
