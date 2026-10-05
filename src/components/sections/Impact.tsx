import { useTranslations } from 'next-intl';
import { publishedMetrics } from '@/content/site-data';
import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from '@/components/ui/primitives';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Brief §06 — proof points.
 *
 * Renders `publishedMetrics`, not `metrics`: the Publishing Rule says an
 * unverified number must be hidden rather than shown as a placeholder, so the
 * filter lives in the data layer and this component cannot accidentally leak one.
 * If every metric were unverified the whole section disappears, by design.
 */
export function Impact() {
  const t = useTranslations('impact');

  if (publishedMetrics.length === 0) return null;

  return (
    <Section id="impact" tone="dark">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionHeading className="mt-5">{t('headline')}</SectionHeading>
        </Reveal>

        <dl className="border-paper/10 mt-12 grid gap-x-8 gap-y-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {publishedMetrics.map((metric, index) => (
            <Reveal key={metric.key} delay={index * 0.05}>
              <div>
                <dd className="text-paper text-5xl font-semibold tracking-tight tabular-nums lg:text-6xl">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </dd>
                <dt className="text-accent-400 mt-4 text-sm font-medium">
                  {t(`metrics.${metric.key}.label` as 'metrics.engineers.label')}
                </dt>
                <p className="text-mist mt-1.5 text-sm">
                  {t(`metrics.${metric.key}.caption` as 'metrics.engineers.caption')}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
