'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeLabels, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

/** Brief §00: "Language switch aligned right" — EN | VI | KR | JP. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations('nav');
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="group"
      aria-label={t('language')}
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span aria-hidden="true" className="text-paper/25 px-1 text-xs">
              |
            </span>
          )}
          <button
            type="button"
            lang={locale}
            aria-current={locale === active ? 'true' : undefined}
            disabled={isPending}
            onClick={() =>
              startTransition(() => {
                router.replace(pathname, { locale });
              })
            }
            className={cn(
              'rounded px-1.5 py-2 text-xs font-medium tracking-wide transition-colors',
              locale === active
                ? 'text-paper'
                : 'text-paper/55 hover:text-paper',
            )}
          >
            {localeLabels[locale]}
          </button>
        </span>
      ))}
    </div>
  );
}
