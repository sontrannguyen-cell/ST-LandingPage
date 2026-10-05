'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Reveal-on-scroll with a hard guarantee that content becomes visible.
 *
 * The trigger is a plain `getBoundingClientRect` check run on mount and then on
 * scroll/resize, not an IntersectionObserver. Both `whileInView` and
 * `useInView` were observed leaving elements stuck at `opacity: 0` forever —
 * once the one-shot observer misses, the section is simply blank, which is a far
 * worse failure than a missing flourish. A rect check cannot miss: it is
 * re-evaluated on every scroll until it passes, and the listeners detach as soon
 * as it does.
 *
 * Brief §11 Motion: subtle reveal, and reduced-motion renders instantly with no
 * transform at all.
 */
function useRevealed<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(!enabled);

  useEffect(() => {
    if (!enabled || revealed) return;

    const check = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      // Visible once any part of it has entered the viewport.
      if (rect.top < viewportH * 0.92 && rect.bottom > 0) setRevealed(true);
    };

    // rAF so layout has settled before the first measurement.
    const raf = requestAnimationFrame(check);
    // Capture phase on `document`, not `window`: scroll events do not bubble,
    // so a window listener misses any scroll that happens inside a nested
    // scroll container (an embedded preview, an app shell with its own
    // scroller). Capture sees them all.
    document.addEventListener('scroll', check, { passive: true, capture: true });
    window.addEventListener('resize', check, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('scroll', check, { capture: true });
      window.removeEventListener('resize', check);
    };
  }, [enabled, revealed]);

  return { ref, revealed };
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { ref, revealed } = useRevealed<HTMLDivElement>(!reduced);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      data-revealed={revealed ? 'true' : 'false'}
      initial={{ opacity: 0, y: 24 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
