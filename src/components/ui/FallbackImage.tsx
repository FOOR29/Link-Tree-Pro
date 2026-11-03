import { useState } from 'react'
import type { IconType } from 'react-icons'
import { LuFilm, LuMusic, LuUser } from 'react-icons/lu'

export type ImageKind = 'cover' | 'artist' | 'poster' | 'none'

const fallbackIcons: Record<ImageKind, IconType | null> = {
  cover: LuMusic,
  artist: LuUser,
  poster: LuFilm,
  none: null,
}

interface FallbackImageProps {
  src: string | null
  alt: string
  kind: ImageKind
  /** Size, shape and position classes, applied to both the image and its fallback */
  className?: string
  loading?: 'lazy' | 'eager'
}

/** Renders `src` (fading in once loaded), or a neutral placeholder when it is null or fails to load. */
export function FallbackImage({ src, alt, kind, className = '', loading = 'lazy' }: FallbackImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)

  if (!src || failedSrc === src) {
    const Icon = fallbackIcons[kind]
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-placeholder ${className}`}>
        {Icon && <Icon className="size-1/4 max-w-10 text-accent-soft" aria-hidden />}
      </div>
    )
  }

  // The wrapper keeps the placeholder color visible while the image loads.
  return (
    <div className={`overflow-hidden bg-placeholder ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoadedSrc(src)}
        onError={() => setFailedSrc(src)}
        className={`block size-full object-cover transition-[opacity,scale] duration-700 ease-out-expo ${
          loadedSrc === src ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
        }`}
      />
    </div>
  )
}
