import type { IconType } from 'react-icons'
import { LuCodeXml, LuInstagram } from 'react-icons/lu'
import { TbBrandTiktok } from 'react-icons/tb'

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
  description: '覗いていって',
  avatar: '/images/profile/profile.jpeg',
  background: '/images/profile/backgraund.jpg',
} as const

// Order matches the design. TODO: replace each `href: '#'` with the real URL.
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/FOOR29', icon: LuCodeXml },
  { label: 'Instagram', href: 'https://www.instagram.com/foorvx/', icon: LuInstagram },
  { label: 'TikTok', href: '#', icon: TbBrandTiktok },
  // { label: 'Last.fm', href: '#', icon: LuMusic },       // necesita LuMusic
  // { label: 'Portfolio', href: '#', icon: LuBriefcase }, // necesita LuBriefcase
  // { label: 'Activity', href: '#', icon: LuActivity },   // necesita LuActivity
  // { label: 'Trakt', href: '#', icon: LuFilm },          // necesita LuFilm
  // { label: 'Email', href: 'mailto:foordonez12@gmail.com', icon: LuMail }, // necesita LuMail
]