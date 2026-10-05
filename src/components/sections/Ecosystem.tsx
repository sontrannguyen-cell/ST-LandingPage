import { useTranslations } from 'next-intl';
import { ecosystemBrands } from '@/content/site-data';
import { SmartLink } from '@/components/ui/SmartLink';
import {
  Container,
  Eyebrow,
  MediaPlaceholder,
  Section,
  SectionHeading,
} from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Brief §03 — the four core brands.
 *
 * The brief offers "horizontal tabs OR 4 visual cards"; the card option is used
 * here deliberately. Sections 03, 04 and 05 are all described as tab/card
 * switchers, and running the same pattern three times in a row would produce
 * exactly the "service catalog" look §11 forbids. So: large cards here,
 * tabs in §04, an editorial image grid in §05.
 */
export function Ecosystem() {
  const t = useTranslations('ecosystem');
  const tCommon = useTranslations('common');

  return (
    <Section id="ecosystem" tone="darker">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionHeading className="mt-5">{t('headline')}</SectionHeading>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {ecosystemBrands.map((brand, index) => (
            <li key={brand.key}>
              <Reveal delay={index * 0.06} className="h-full">
                <SmartLink
                  href={brand.href}
                  external={brand.external}
                  newTabLabel={tCommon('opensInNewTab')}
                  className="group border-paper/10 hover:border-accent-500/50 relative flex h-full flex-col overflow-hidden rounded-2xl border transition-colors"
                >
                  <MediaPlaceholder
                    label={`ecosystem / ${brand.key}`}
                    className="aspect-16/9 w-full"
                  />
                  <div className="bg-navy-800/60 flex flex-1 flex-col p-6 lg:p-7">
                    <span className="text-accent-400 text-xs font-semibold tracking-[0.16em] uppercase">
                      {t(`brands.${brand.key}.category` as 'brands.stSoftware.category')}
                    </span>
                    <h3 className="text-paper mt-4 text-2xl leading-snug font-semibold text-balance">
                      {t(`brands.${brand.key}.headline` as 'brands.stSoftware.headline')}
                    </h3>
                    <p className="text-mist mt-4 flex-1 text-sm leading-relaxed">
                      {t(`brands.${brand.key}.body` as 'brands.stSoftware.body')}
                    </p>
                    <span className="text-paper/90 group-hover:text-accent-400 mt-7 inline-flex items-center gap-2 text-sm font-medium transition-colors">
                      {tCommon('learnMore')}
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </SmartLink>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
