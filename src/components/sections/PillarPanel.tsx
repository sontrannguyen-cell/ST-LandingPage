'use client';

import { useState } from 'react';
import { MediaPlaceholder } from '@/components/ui/primitives';
import { cn } from '@/lib/cn';

/**
 * A §02 pillar panel: tall photography with the label centred on it, and the
 * pillar sentence revealed on interaction (the Douzone panel pattern).
 *
 * "Reveal on hover" alone would hide the copy from keyboard and touch users, so
 * three inputs all open it:
 *   - pointer hover (mouse)
 *   - press and hold (touch — pointerdown/up, which is what a long press fires)
 *   - focus (keyboard)
 *
 * The detail text stays in the DOM and is never `aria-hidden`, so screen
 * readers always announce it regardless of the visual state. The panel is a
 * real <button> with aria-expanded so a tap latches it open on touch devices,
 * where there is no hover to rely on.
 */
export function PillarPanel({
  title,
  body,
  mediaLabel,
}: {
  title: string;
  body: string;
  mediaLabel: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const [latched, setLatched] = useState(false);

  const open = hovered || pressed || focused || latched;

  return (
    <button
      type="button"
      aria-expanded={open}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onPointerDown={(e) => e.pointerType !== 'mouse' && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => setLatched((v) => !v)}
      className="group block w-full cursor-pointer text-left select-none"
    >
      <span className="relative block overflow-hidden rounded-xl">
        <MediaPlaceholder
          label={mediaLabel}
          className={cn(
            'aspect-4/3 w-full transition-transform duration-500 sm:aspect-[3/4]',
            open && 'scale-105',
          )}
        />

        {/* Scrim deepens while open so the detail copy stays readable. */}
        <span
          aria-hidden="true"
          className={cn(
            'from-navy-950/85 via-navy-950/35 to-navy-950/70 absolute inset-0 bg-gradient-to-b transition-colors duration-300',
            open && 'from-navy-950/90 via-navy-950/75 to-navy-950/90',
          )}
        />

        <span className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <span
            className={cn(
              'text-paper block text-xl leading-tight font-semibold text-balance drop-shadow-sm transition-transform duration-300 lg:text-2xl',
              open && '-translate-y-1',
            )}
          >
            {title}
          </span>

          <span
            aria-hidden="true"
            className={cn(
              'mt-4 block h-px w-7 transition-colors duration-300',
              open ? 'bg-accent-500' : 'bg-paper/70',
            )}
          />

          {/* Detail. Always in the accessibility tree; only its appearance
              changes, so this is a visual affordance rather than hidden content. */}
          <span
            className={cn(
              'text-mist mt-4 block max-w-[26ch] text-sm leading-relaxed transition-all duration-300',
              open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
            )}
          >
            {body}
          </span>
        </span>
      </span>
    </button>
  );
}
