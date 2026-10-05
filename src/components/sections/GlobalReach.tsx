import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { markets } from '@/content/site-data';
import {
  buttonClass,
  Container,
  Eyebrow,
  Lede,
  Section,
  SectionHeading,
} from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { WorldMap } from './WorldMap';

/**
 * Brief §08 — global reach.
 *
 * Data Rule: no percentage split by country. Each market carries a relationship
 * label instead ("Headquarters" / "Client market" / "Partner market"), which is
 * what the brief asks for and what the business data can actually support.
 *
 * The map is a positioned pin layer over an image slot. Pins are decorative;
 * the authoritative, accessible version of the same data is the list beneath,
 * which is what screen readers and no-JS users get.
 */
export function GlobalReach() {
  const t = useTranslations('globalReach');

  return (
    <Section id="global-reach" tone="dark">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <SectionHeading className="mt-5">{t('headline')}</SectionHeading>
            {/* Brief: 2–3 lines max. */}
            <Lede className="mt-6">{t('body')}</Lede>
            <Link href="/company" className={buttonClass('outline', 'md', 'mt-8')}>
              {t('cta')}
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="border-paper/10 bg-navy-900/40 overflow-hidden rounded-2xl border p-3 sm:p-5">
              <WorldMap
                label={t('mapLabel')}
                marketNames={Object.fromEntries(
                  markets.map((m) => [m.key, t(`markets.${m.key}` as 'markets.vietnam')]),
                )}
              />
            </div>

            <ul className="border-paper/10 mt-8 grid gap-x-8 gap-y-3 border-t pt-8 sm:grid-cols-2">
              {markets.map((market) => (
                <li
                  key={market.key}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="text-paper text-sm font-medium">
                    {t(`markets.${market.key}` as 'markets.vietnam')}
                  </span>
                  <span className="text-mist text-xs">
                    {t(`relations.${market.relationKey}` as 'relations.client')}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
