import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { publishedStories } from '@/content/site-data';
import { SmartLink } from '@/components/ui/SmartLink';
import {
  buttonClass,
  Container,
  Eyebrow,
  MediaPlaceholder,
  Section,
  SectionHeading,
} from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Brief §07 — featured projects & stories.
 *
 * Renders `publishedStories`, which drops any card still awaiting client
 * approval (today: the ST Software flagship case, marked TBD in the brief) and
 * caps the list at four. Card anatomy follows the Section Rule exactly:
 * image + category + title + one short sentence + CTA.
 */
export function Stories() {
  const t = useTranslations('stories');
  const tCommon = useTranslations('common');

  if (publishedStories.length === 0) return null;

  return (
    <Section id="stories" tone="darker">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <SectionHeading className="mt-5">{t('headline')}</SectionHeading>
          </div>
          <Link href="/stories" className={buttonClass('ghost', 'md', 'px-0')}>
            {t('viewAll')} &rarr;
          </Link>
        </Reveal>

        {/* Brief §07: card grid on desktop, horizontal slider on mobile.
            A scroll-snap row gives the swipe behaviour without a JS carousel. */}
        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {publishedStories.map((story, index) => (
            <li
              key={story.key}
              className="w-[78vw] shrink-0 snap-start sm:w-[58vw] md:w-auto"
            >
              <Reveal delay={index * 0.06} className="h-full">
                <SmartLink
                  href={story.href}
                  external={story.external}
                  newTabLabel={tCommon('opensInNewTab')}
                  className="group border-paper/10 hover:border-accent-500/50 flex h-full flex-col overflow-hidden rounded-2xl border transition-colors"
                >
                  <MediaPlaceholder
                    label={`story / ${story.key}`}
                    className="aspect-16/10 w-full"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-ember-500 text-[11px] font-semibold tracking-[0.16em] uppercase">
                      {t(`categories.${story.categoryKey}` as 'categories.software')}
                    </span>
                    <h3 className="text-paper mt-3 text-lg leading-snug font-semibold text-balance">
                      {t(`items.${story.key}.title` as 'items.aquaxSmartAquaculture.title')}
                    </h3>
                    <p className="text-mist mt-3 flex-1 text-sm leading-relaxed">
                      {t(`items.${story.key}.body` as 'items.aquaxSmartAquaculture.body')}
                    </p>
                    <span className="text-paper/90 group-hover:text-accent-400 mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors">
                      {story.external ? tCommon('viewStory') : tCommon('viewCase')}
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
