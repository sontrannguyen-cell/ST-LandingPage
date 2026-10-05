import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Messages = Record<string, unknown>;

/**
 * Deep-merge `source` over `base`, so a partially translated locale can ship
 * only the keys it has and inherit the rest from the default locale.
 * Without this, a missing key renders as the raw key path in production.
 */
function deepMerge(base: Messages, source: Messages): Messages {
  const out: Messages = { ...base };

  for (const [key, value] of Object.entries(source)) {
    const existing = out[key];
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      existing &&
      typeof existing === 'object' &&
      !Array.isArray(existing)
    ) {
      out[key] = deepMerge(existing as Messages, value as Messages);
    } else {
      out[key] = value;
    }
  }

  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const fallback = (await import(`../../messages/${routing.defaultLocale}.json`))
    .default as Messages;

  const messages =
    locale === routing.defaultLocale
      ? fallback
      : deepMerge(
          fallback,
          (await import(`../../messages/${locale}.json`)).default as Messages,
        );

  return { locale, messages };
});
