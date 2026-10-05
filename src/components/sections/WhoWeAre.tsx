import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { pillars } from '@/content/site-data';
import {
  buttonClass,
  Container,
  Eyebrow,
  Lede,
  Section,
  SectionHeading,
} from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { PillarPanel } from './PillarPanel';

/**
 * Brief §02 — short ecosystem statement + three pillars.
 *
 * The pillar row follows the Douzone panel pattern: tall portrait photography
 * with the label centred on the image above a short rule. The pillar sentence
 * sits below the panel rather than on it — Douzone's panels are label-only, but
 * §02 specifies body copy for each pillar and stacking it over the photo would
 * either bury it or fight the image.
 */
export function WhoWeAre() {
  const t = useTranslations('whoWeAre');

  return (
    <Section id="who-we-are" tone="dark">
      <Container>
        <Reveal className="max-w-4xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          {/* Brief: large section headline, 2–3 lines max. */}
          <SectionHeading className="mt-5">{t('headline')}</SectionHeading>
          {/* Brief: short copy block, do not exceed ~60 words on desktop. */}
          <Lede className="mt-6">{t('body')}</Lede>
          <Link href="/company" className={buttonClass('ghost', 'md', 'mt-6 px-0')}>
            {t('cta')} &rarr;
          </Link>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {pillars.map((pillar, index) => (
            <li key={pillar.key}>
              <Reveal delay={index * 0.08}>
                <PillarPanel
                  title={t(`pillars.${pillar.key}.title` as 'pillars.technology.title')}
                  body={t(`pillars.${pillar.key}.body` as 'pillars.technology.body')}
                  mediaLabel={`pillar / ${pillar.key}`}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
