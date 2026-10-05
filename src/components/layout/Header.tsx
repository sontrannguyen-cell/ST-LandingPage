'use client';

import { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { primaryNav } from '@/content/site-data';
import { SmartLink } from '@/components/ui/SmartLink';
import { buttonClass, Container } from '@/components/ui/primitives';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/cn';

/**
 * Brief §00 Header Behavior — four rules, implemented literally:
 *  1. At the top of the page the bar is transparent and sits over the hero.
 *  2. Once scrolled it switches to a solid background so the text stays legible.
 *  3. On desktop it is sticky at the top edge.
 *  4. On mobile the hamburger opens a full-screen menu (see MobileMenu).
 */
export function Header() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'bg-navy-950/92 border-paper/10 border-b backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-(--header-height) items-center justify-between gap-4 xl:gap-6">
        <Link
          href="/"
          className="text-paper shrink-0 text-lg font-semibold tracking-[0.12em] whitespace-nowrap uppercase"
        >
          ST United
        </Link>

        {/* Desktop navigation — horizontal bar per brief §00 */}
        <NavigationMenu.Root
          aria-label={t('mainLabel')}
          className="relative hidden lg:block"
        >
          <NavigationMenu.List className="flex items-center xl:gap-1">
            {primaryNav.map((item) => {
              const label = t(item.key as 'ecosystem');

              if (!item.children) {
                return (
                  <NavigationMenu.Item key={item.key}>
                    <NavigationMenu.Link asChild>
                      <Link
                        href={item.href}
                        className="text-paper/85 hover:text-paper rounded px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors xl:px-4"
                      >
                        {label}
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                );
              }

              return (
                // `relative` anchors the panel to its own trigger; without it every
                // dropdown opens at the left edge of the nav bar.
                <NavigationMenu.Item key={item.key} className="relative">
                  <NavigationMenu.Trigger className="text-paper/85 hover:text-paper data-[state=open]:text-paper rounded px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors xl:px-4">
                    {label}
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content
                    className={cn(
                      'absolute top-full left-0 mt-2 rounded-xl p-2',
                      'bg-navy-900/98 border-paper/10 border shadow-2xl backdrop-blur-md',
                      'data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in',
                    )}
                  >
                    <ul
                      className={cn(
                        'grid gap-1',
                        item.columns === 2
                          ? 'w-[580px] grid-cols-2'
                          : 'w-[320px] grid-cols-1',
                      )}
                    >
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <NavigationMenu.Link asChild>
                            <SmartLink
                              href={child.href}
                              external={child.external}
                              newTabLabel={tCommon('opensInNewTab')}
                              className="hover:bg-navy-700/60 block rounded-lg px-4 py-3 transition-colors"
                            >
                              <span className="text-paper block text-sm font-medium">
                                {t(`items.${child.key}` as 'items.stSoftware')}
                              </span>
                              {/* Brief §00: "Mega menu với brand name + 1-line descriptor." */}
                              {item.key === 'ecosystem' && (
                                <span className="text-mist mt-0.5 block text-xs">
                                  {t(
                                    `descriptors.${child.key}` as 'descriptors.stSoftware',
                                  )}
                                </span>
                              )}
                            </SmartLink>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex shrink-0 items-center gap-3 xl:gap-4">
          <LanguageSwitcher className="hidden md:flex" />
          <Link
            href="/contact"
            className={cn(buttonClass('outline', 'md'), 'hidden px-5 py-2.5 md:inline-flex')}
          >
            {t('contact')}
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
