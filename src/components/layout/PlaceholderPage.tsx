import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  buttonClass,
  Container,
  Eyebrow,
  Lede,
  Section,
  SectionHeading,
} from '@/components/ui/primitives';

/**
 * Stub for every route in the proposed sitemap that has no brief yet.
 *
 * It exists so the navigation, mega menus and footer all resolve to a real page
 * instead of a 404 while the inner-page content is still being written.
 */
export function PlaceholderPage({ titleKey }: { titleKey: string }) {
  const t = useTranslations('placeholder');
  const tNav = useTranslations('nav');

  return (
    <Section tone="dark" className="min-h-[70svh] pt-40">
      <Container>
        <Eyebrow>ST United</Eyebrow>
        <SectionHeading as="h1" className="mt-5">
          {tNav(titleKey as 'ecosystem')}
        </SectionHeading>
        <Lede className="mt-6">{t('body')}</Lede>
        <Link href="/" className={buttonClass('outline', 'md', 'mt-10')}>
          {t('backHome')}
        </Link>
      </Container>
    </Section>
  );
}
