import { profile, socialLinks } from '../../config/profile'
import { FallbackImage } from '../ui/FallbackImage'

export function ProfileHeader() {
  return (
    <header className="relative isolate overflow-hidden px-4 pt-32 pb-10 text-center md:border-b md:border-line md:pt-44 md:pb-7">
      <FallbackImage
        src={profile.background}
        alt=""
        kind="none"
        loading="eager"
        className="absolute inset-0 -z-20 size-full bg-linear-to-b from-hero to-page"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-page/50 to-page" />

      <div className="stagger">
        <div className="mx-auto w-fit rounded-full border border-line p-1">
          <FallbackImage
            src={profile.avatar}
            alt={profile.name}
            kind="artist"
            loading="eager"
            className="size-29 rounded-full md:size-32"
          />
        </div>

        <h1 className="mt-3 text-[34px] leading-tight font-extrabold tracking-tight md:text-[44px]">{profile.name}</h1>
        <p className="font-semibold text-muted">@{profile.username}</p>

        <ul className="mt-4 flex flex-wrap justify-center gap-2 md:gap-2.5">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="grid size-11 place-items-center rounded-full border border-line bg-chip transition-[color,border-color,translate,scale] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent hover:text-accent-soft active:scale-95 md:size-10"
              >
                <Icon className="size-[18px]" aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[15px] text-fg/90">{profile.description}</p>
      </div>
    </header>
  )
}
