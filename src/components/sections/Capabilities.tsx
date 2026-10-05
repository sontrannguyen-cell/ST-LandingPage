'use client';

import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { capabilities } from '@/content/site-data';
import {
  buttonClass,
  Container,
  Eyebrow,
  Lede,
  MediaPlaceholder,
  Section,
  SectionHeading,
} from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Brief §04 — capability tabs, the Douzone "SaaS Integration Platform" pattern:
 * a horizontal tab strip where selecting a tab swaps both the image and the copy.
 *
 * Radix Tabs is used rather than hand-rolled state so the tab strip is a real
 * ARIA tablist with arrow-key navigation, as §11 Accessibility requires.
 * Mobile falls back to an accordion — a 6-item tab strip cannot work at 375px.
 */
export function Capabilities() {
  const t = useTranslations('capabilities');

  return (
    <Section id="capabilities" tone="dark">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionHeading className="mt-5">{t('headline')}</SectionHeading>
          <Lede className="mt-6">{t('body')}</Lede>
        </Reveal>

        {/* Desktop: tabs */}
        <Tabs.Root
          defaultValue={capabilities[0].key}
          className="mt-14 hidden lg:block"
        >
          <Tabs.List
            aria-label={t('tablistLabel')}
            className="border-paper/10 flex flex-wrap gap-x-8 gap-y-2 border-b"
          >
            {capabilities.map((item) => (
              <Tabs.Trigger
                key={item.key}
                value={item.key}
                className="text-paper/55 data-[state=active]:text-paper data-[state=active]:border-accent-500 -mb-px border-b-2 border-transparent py-4 text-sm font-medium transition-colors hover:text-paper/85"
              >
                {t(`items.${item.key}.title` as 'items.softwareDevelopment.title')}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {capabilities.map((item) => (
            <Tabs.Content
              key={item.key}
              value={item.key}
              className="grid grid-cols-5 items-center gap-12 pt-12 focus-visible:outline-none"
            >
              <div className="col-span-2">
                <h3 className="text-paper text-3xl leading-snug font-semibold text-balance">
                  {t(`items.${item.key}.title` as 'items.softwareDevelopment.title')}
                </h3>
                <p className="text-mist mt-5 text-base leading-relaxed">
                  {t(`items.${item.key}.body` as 'items.softwareDevelopment.body')}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border-paper/15 text-mist rounded-full border px-3 py-1 text-xs"
                    >
                      {t(`tags.${tag}` as 'tags.web')}
                    </li>
                  ))}
                </ul>
              </div>
              <MediaPlaceholder
                label={`capability / ${item.key}`}
                className="col-span-3 aspect-16/9 rounded-2xl"
              />
            </Tabs.Content>
          ))}
        </Tabs.Root>

        {/* Mobile: accordion */}
        <Accordion.Root
          type="single"
          collapsible
          defaultValue={capabilities[0].key}
          className="divide-paper/10 mt-10 divide-y lg:hidden"
        >
          {capabilities.map((item) => (
            <Accordion.Item key={item.key} value={item.key}>
              <Accordion.Header>
                <Accordion.Trigger className="text-paper group flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium">
                  {t(`items.${item.key}.title` as 'items.softwareDevelopment.title')}
                  <span
                    aria-hidden="true"
                    className="text-mist shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45"
                  >
                    +
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden">
                <div className="pb-7">
                  <MediaPlaceholder
                    label={`capability / ${item.key}`}
                    className="aspect-16/9 w-full rounded-xl"
                  />
                  <p className="text-mist mt-5 text-sm leading-relaxed">
                    {t(`items.${item.key}.body` as 'items.softwareDevelopment.body')}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border-paper/15 text-mist rounded-full border px-3 py-1 text-xs"
                      >
                        {t(`tags.${tag}` as 'tags.web')}
                      </li>
                    ))}
                  </ul>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="mt-14">
          <Link href="/capabilities" className={buttonClass('outline', 'md')}>
            {t('cta')}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
