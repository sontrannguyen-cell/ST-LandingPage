import { useTranslations } from 'next-intl';
import { industries } from '@/content/site-data';
import {
  Container,
  Eyebrow,
  MediaPlaceholder,
  Section,
  SectionHeading,
} from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

/**
 * Brief §05 — five impact areas.
 *
 * Pattern: the Douzone "Work&Life Total Solutions" image-card grid, with the
 * label sitting on the photography. §05 explicitly asks to "use photography
 * rather than generic icons where possible", so the image carries the section
 * and the copy stays short. The first card spans two columns to break the grid
 * rhythm and keep this from reading as another tab strip.
 */
export function Industries() {
  const t = useTranslations('industries');

  return (
    <Section id="industries" tone="darker">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionHeading className="mt-5">{t('headline')}</SectionHeading>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <li
              key={industry.key}
              className={cn(index === 0 && 'md:col-span-2 lg:col-span-2')}
            >
              <Reveal delay={index * 0.05} className="h-full">
                <article className="group border-paper/10 relative h-full overflow-hidden rounded-2xl border">
                  <MediaPlaceholder
                    label={`industry / ${industry.key}`}
                    className={cn(
                      'w-full',
                      index === 0 ? 'aspect-16/9 lg:aspect-21/9' : 'aspect-3/2',
                    )}
                  />
                  <div
                    aria-hidden="true"
                    className="from-navy-950 absolute inset-0 bg-gradient-to-t via-navy-950/55 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <span className="text-accent-400 text-[11px] font-semibold tracking-[0.16em] uppercase">
                      {t(`items.${industry.key}.label` as 'items.businessEnterprise.label')}
                    </span>
                    <h3 className="text-paper mt-3 text-xl leading-snug font-semibold text-balance lg:text-2xl">
                      {t(
                        `items.${industry.key}.headline` as 'items.businessEnterprise.headline',
                      )}
                    </h3>
                    <p className="text-mist mt-3 max-w-xl text-sm leading-relaxed">
                      {t(`items.${industry.key}.body` as 'items.businessEnterprise.body')}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
