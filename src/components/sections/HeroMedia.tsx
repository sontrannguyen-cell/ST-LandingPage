'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Background media for one hero slide.
 *
 * Only the active slide plays: the others are paused and rewound so five video
 * decoders are not running at once. The poster is always set, so the slide shows
 * a still immediately and keeps showing one if the clip fails to load or the
 * viewer prefers reduced motion — in which case the video never autoplays at all
 * (brief §11: respect reduced-motion).
 *
 * `aria-hidden` because this is decoration; the slide's heading carries meaning.
 */
export function HeroMedia({
  poster,
  src,
  active,
}: {
  poster: string;
  src?: string;
  active: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (active && !reduced) {
      // play() rejects when autoplay is blocked; the poster stays visible.
      void el.play().catch(() => {});
    } else {
      el.pause();
      if (!active) el.currentTime = 0;
    }
  }, [active, reduced]);

  if (!src) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy-800 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
      />
    );
  }

  return (
    <video
      ref={ref}
      aria-hidden="true"
      poster={poster}
      muted
      loop
      playsInline
      preload={active ? 'auto' : 'metadata'}
      className="absolute inset-0 size-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
