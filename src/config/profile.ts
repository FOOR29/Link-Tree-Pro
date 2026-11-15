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
import { PiTiktokLogo } from "react-icons/pi";

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
  username: 'foorvx',
  description: 'Listen and watch socio',
  avatar: '/images/profile/profile.jpeg',
  background: '/images/profile/backgraund.jpg',
} as const

// Order matches the design. TODO: replace each `href: '#'` with the real URL.
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/FOOR29', icon: LuCodeXml },
  { label: 'Instagram', href: 'https://www.instagram.com/foorvx/', icon: LuInstagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/@foorvx', icon: PiTiktokLogo },
  // { label: 'Last.fm', href: '#', icon: LuMusic },
  // { label: 'Portfolio', href: '#', icon: LuBriefcase },
  // { label: 'Activity', href: '#', icon: LuActivity },
  // { label: 'Trakt', href: '#', icon: LuFilm },
  // { label: 'Email', href: 'mailto:foordonez12@gmail.com', icon: LuMail },
]