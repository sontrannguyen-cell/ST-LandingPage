'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Accordion from '@radix-ui/react-accordion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { primaryNav } from '@/content/site-data';
import { SmartLink } from '@/components/ui/SmartLink';
import { buttonClass } from '@/components/ui/primitives';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/cn';

/**
 * Brief §00: "Trên điện thoại (Mobile): Khi bấm mở Menu, danh sách các mục sẽ
 * mở rộng ra phủ kín toàn bộ màn hình." — full-screen overlay, accordion for the
 * sub-levels. Radix Dialog gives focus trap + Escape + scroll lock for free.
 */
export function MobileMenu() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={t('openMenu')}
        className="text-paper -mr-2 inline-flex size-10 items-center justify-center rounded lg:hidden"
      >
        <span aria-hidden="true" className="relative block h-4 w-6">
          <span className="bg-paper absolute inset-x-0 top-0 h-0.5 rounded" />
          <span className="bg-paper absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded" />
          <span className="bg-paper absolute inset-x-0 bottom-0 h-0.5 rounded" />
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-navy-950/80 fixed inset-0 z-50 backdrop-blur-sm" />
        <Dialog.Content className="bg-navy-950 fixed inset-0 z-50 flex flex-col overflow-y-auto">
          <Dialog.Title className="sr-only">{t('openMenu')}</Dialog.Title>

          <div className="flex h-(--header-height) shrink-0 items-center justify-between px-5">
            <Link
              href="/"
              onClick={close}
              className="text-paper text-lg font-semibold tracking-[0.12em] uppercase"
            >
              ST United
            </Link>
            <Dialog.Close
              aria-label={t('closeMenu')}
              className="text-paper -mr-2 inline-flex size-10 items-center justify-center rounded text-2xl leading-none"
            >
              <span aria-hidden="true">&times;</span>
            </Dialog.Close>
          </div>

          <nav className="flex-1 px-5 pt-4 pb-10">
            <Accordion.Root type="single" collapsible className="divide-paper/10 divide-y">
              {primaryNav.map((item) => {
                const label = t(item.key as 'ecosystem');

                if (!item.children) {
                  return (
                    <div key={item.key} className="py-1">
                      <Link
                        href={item.href}
                        onClick={close}
                        className="text-paper block py-4 text-xl font-medium"
                      >
                        {label}
                      </Link>
                    </div>
                  );
                }

                return (
                  <Accordion.Item key={item.key} value={item.key}>
                    <Accordion.Header>
                      <Accordion.Trigger className="text-paper group flex w-full items-center justify-between py-5 text-xl font-medium">
                        {label}
                        <span
                          aria-hidden="true"
                          className="text-mist text-base transition-transform duration-200 group-data-[state=open]:rotate-45"
                        >
                          +
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden">
                      <ul className="space-y-1 pb-5">
                        {item.children.map((child) => (
                          <li key={child.key}>
                            <SmartLink
                              href={child.href}
                              external={child.external}
                              newTabLabel={tCommon('opensInNewTab')}
                              onClick={close}
                              className="text-mist hover:text-paper block py-2.5 text-base transition-colors"
                            >
                              {t(`items.${child.key}` as 'items.stSoftware')}
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                );
              })}
            </Accordion.Root>

            <div className="mt-10 space-y-6">
              {/* Brief §11 Responsive: "keep buttons full-width where helpful". */}
              <Link
                href="/contact"
                onClick={close}
                className={cn(buttonClass('primary', 'lg'), 'w-full')}
              >
                {t('contact')}
              </Link>
              <LanguageSwitcher />
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
