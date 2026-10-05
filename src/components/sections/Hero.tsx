'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { HERO_AUTOPLAY_MS, heroSlides } from '@/content/site-data';
import { SmartLink } from '@/components/ui/SmartLink';
import { Container } from '@/components/ui/primitives';
import { HeroMedia } from './HeroMedia';
import { cn } from '@/lib/cn';

/**
 * Brief §01 Carousel Interaction, implemented point by point:
 *  - 5 slides over full-screen video/imagery.
 *  - A clear indicator: five progress segments, with a full-bleed labelled tab
 *    strip beneath (the Douzone pattern the brief references).
 *  - Auto-advance every 5–7s → HERO_AUTOPLAY_MS = 6000.
 *  - Arrows and clickable tabs for manual control.
 *  - Pauses while the pointer is over the banner on desktop.
 *  - Swipe on mobile (Embla default).
 *  - Exactly ONE CTA per slide.
 *  - §11 Motion: under prefers-reduced-motion autoplay is never registered and
 *    the progress bar renders as a static state rather than a running timer.
 */
export function Hero() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const reduced = useReducedMotion();

  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, duration: 28 },
    reduced
      ? []
      : [
          Autoplay({
            delay: HERO_AUTOPLAY_MS,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ],
  );

  const [selected, setSelected] = useState(0);
  /** 0 → 1 fill of the active progress segment. */
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      setSelected(embla.selectedScrollSnap());
      setProgress(0);
    };
    onSelect();
    embla.on('select', onSelect).on('reInit', onSelect);
    return () => {
      embla.off('select', onSelect).off('reInit', onSelect);
    };
  }, [embla]);

  // Drive the progress segment from the autoplay timer.
  useEffect(() => {
    if (!embla || reduced) return;
    const autoplay = embla.plugins().autoplay;
    if (!autoplay) return;

    let frame = 0;
    const tick = () => {
      const remaining = autoplay.timeUntilNext();
      if (remaining !== null) {
        setProgress(1 - remaining / HERO_AUTOPLAY_MS);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [embla, reduced]);

  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);
  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t('label')}
      className="bg-navy-950 relative"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.key}
              className="relative min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${heroSlides.length}`}
              aria-hidden={selected !== index}
            >
              <div className="relative flex min-h-[88svh] items-center lg:min-h-screen">
                <HeroMedia
                  poster={slide.image}
                  src={slide.video}
                  active={selected === index}
                />
                {/* Readability scrim — the brief warns against copy that fights
                    the background video. */}
                <div
                  aria-hidden="true"
                  className="from-navy-950/92 via-navy-950/55 to-navy-950/80 absolute inset-0 bg-gradient-to-r"
                />

                <Container className="relative pb-40 lg:pb-48">
                  <div className="max-w-3xl">
                    {/* Small ring marker ahead of the headline. */}
                    <span
                      aria-hidden="true"
                      className="border-paper/80 mb-5 block size-2.5 rounded-full border-2"
                    />
                    <Headline index={index}>
                      {t(`slides.${slide.key}.headline` as 'slides.stUnited.headline')}
                    </Headline>
                    <p className="text-mist mt-6 max-w-xl text-base leading-relaxed md:text-lg">
                      {t(`slides.${slide.key}.body` as 'slides.stUnited.body')}
                    </p>
                    <div className="mt-9">
                      <SmartLink
                        href={slide.cta.href}
                        external={slide.cta.external}
                        newTabLabel={tCommon('opensInNewTab')}
                        tabIndex={selected === index ? undefined : -1}
                        className="border-paper/40 text-paper hover:border-accent-500 hover:text-accent-400 inline-flex items-center gap-2 border px-8 py-3.5 text-sm font-medium transition-colors"
                      >
                        {t(`slides.${slide.key}.cta` as 'slides.stUnited.cta')}
                        <span aria-hidden="true" className="text-xs">
                          &#8599;
                        </span>
                      </SmartLink>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — desktop only; mobile uses swipe. */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 items-center justify-between px-6 lg:flex">
        <button
          type="button"
          onClick={prev}
          aria-label={tCommon('previousSlide')}
          className="border-paper/25 text-paper hover:border-accent-500 hover:text-accent-400 pointer-events-auto inline-flex size-12 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
        >
          <span aria-hidden="true">&#8249;</span>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={tCommon('nextSlide')}
          className="border-paper/25 text-paper hover:border-accent-500 hover:text-accent-400 pointer-events-auto inline-flex size-12 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
        >
          <span aria-hidden="true">&#8250;</span>
        </button>
      </div>

      {/* Progress segments, sitting just above the tab strip. */}
      <div className="absolute inset-x-0 bottom-(--hero-tabs-h) pb-7">
        <Container>
          {/* Same 5-column grid as the tab strip below, so each segment starts
              exactly on its tab's left edge. The visual gap comes from inner
              padding rather than a grid gap — a gap would shrink the cells and
              drift the two rows apart by a few pixels per column. */}
          <div aria-hidden="true" className="grid grid-cols-5">
            {heroSlides.map((slide, index) => (
              <span key={slide.key} className="block pr-2 last:pr-0">
                <span className="bg-paper/25 block h-px overflow-hidden">
                  <span
                    className="bg-paper block h-full origin-left"
                    style={{
                      transform: `scaleX(${
                        index < selected ? 1 : index === selected ? (reduced ? 1 : progress) : 0
                      })`,
                    }}
                  />
                </span>
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* Labelled tab strip. Aligned to the same container grid as everything
          else on the page, so each tab sits directly under its own progress
          segment — full-bleed here would put the two on different grids. */}
      <div className="absolute inset-x-0 bottom-0">
        <Container>
          <ul className="grid h-(--hero-tabs-h) grid-cols-5">
            {heroSlides.map((slide, index) => (
              <li key={slide.key} className="min-w-0">
                <button
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={tCommon('goToSlide', { number: index + 1 })}
                  aria-current={selected === index ? 'true' : undefined}
                  className={cn(
                    'flex size-full items-center justify-center px-2 text-center transition-colors duration-300',
                    selected === index
                      ? 'bg-accent-500 text-navy-950'
                      : 'bg-navy-950/70 text-paper/65 hover:bg-navy-900/85 hover:text-paper backdrop-blur-sm',
                  )}
                >
                  <span className="line-clamp-2 text-[11px] leading-tight font-semibold md:text-sm">
                    {t(`slides.${slide.key}.tab` as 'slides.stUnited.tab')}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

const HEADLINE_CLASS =
  'text-paper text-4xl leading-[1.08] font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl';

function Headline({ index, children }: { index: number; children: React.ReactNode }) {
  // Only the first slide carries the page's H1 — five H1s would wreck both the
  // heading outline and SEO.
  const Tag = index === 0 ? 'h1' : 'h2';
  return <Tag className={HEADLINE_CLASS}>{children}</Tag>;
}
