import { defineRouting } from 'next-intl/routing';

/**
 * Brief §00 Language: EN | VI | KR | JP.
 * BCP-47 codes are `ko` / `ja`; the brief's "KR" / "JP" are display labels only.
 */
export const locales = ['en', 'vi', 'ko', 'ja'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  vi: 'VI',
  ko: 'KR',
  ja: 'JP',
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  // EN lives at `/`, the rest at `/vi`, `/ko`, `/ja` — mirrors the old site's `/` + `/korean`.
  localePrefix: 'as-needed',
});
