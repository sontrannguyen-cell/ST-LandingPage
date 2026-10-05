'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { useFormatter } from 'next-intl';

/**
 * Brief §06: "Large counter + short supporting label" with count-up animation.
 * Brief §11: respect reduced motion — then the final value is shown at once.
 *
 * The number is rendered through next-intl's formatter so locale grouping is
 * correct (e.g. 1,300 vs 1.300), and the accessible name is always the final
 * value so screen readers never read a ticking number.
 */
export function Counter({
  value,
  suffix = '',
  durationMs = 1600,
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
}) {
  const format = useFormatter();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [animated, setAnimated] = useState(0);

  // Derived, not stored: under reduced motion the final value is simply what we
  // render, so the effect below never has to run or set state for that case.
  const display = reduced ? value : animated;

  useEffect(() => {
    if (reduced || !inView) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // easeOutExpo — fast start, soft landing.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setAnimated(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, durationMs]);

  const finalLabel = `${format.number(value)}${suffix}`;

  return (
    <span ref={ref} aria-label={finalLabel}>
      <span aria-hidden="true">
        {format.number(display)}
        {suffix}
      </span>
    </span>
  );
}
