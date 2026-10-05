import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  buttonClass,
  Container,
  Lede,
  Section,
  SectionHeading,
} from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

/**
 * Brief §09 — end-of-page action block.
 *
 * §11 CTA Rule: every other section gets one CTA; the final CTA is the stated
 * exception and may carry 2–3 conversion directions (client / partner / talent).
 */
export function FinalCta() {
  const t = useTranslations('finalCta');

  return (
    <Section tone="darker" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-accent-500/12 pointer-events-none absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full blur-3xl"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionHeading className="text-4xl md:text-5xl lg:text-6xl">
            {t('headline')}
          </SectionHeading>
          <Lede className="mx-auto mt-6">{t('body')}</Lede>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className={cn(buttonClass('primary', 'lg'), 'w-full sm:w-auto')}
            >
              {t('primary')}
            </Link>
            <Link
              href="/partnership"
              className={cn(buttonClass('outline', 'lg'), 'w-full sm:w-auto')}
            >
              {t('secondary')}
            </Link>
            <Link href="/careers" className={buttonClass('ghost', 'lg')}>
              {t('tertiary')}
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
