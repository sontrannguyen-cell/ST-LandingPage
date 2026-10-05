import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  company,
  familySites,
  primaryNav,
  socialLinks,
} from '@/content/site-data';
import { SmartLink } from '@/components/ui/SmartLink';
import { Container } from '@/components/ui/primitives';

/**
 * Brief §10 — corporate footer with the Douzone "Family Site" pattern:
 * company block, multi-column links, family brand links, legal row, social.
 */
export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-paper/10 border-t">
      <Container className="py-12 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Company block */}
          <div className="lg:col-span-4">
            <p className="text-paper text-lg font-semibold tracking-[0.12em] uppercase">
              {company.name}
            </p>
            <address className="text-mist mt-5 space-y-0.5 text-sm not-italic lg:space-y-2">
              <p>{t('address')}</p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-paper inline-block py-1.5 transition-colors lg:py-0"
                >
                  {company.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${company.phone}`}
                  className="hover:text-paper inline-block py-1.5 transition-colors lg:py-0"
                >
                  {company.phoneDisplay}
                </a>
              </p>
            </address>

            <ul className="mt-7 flex gap-5">
              {socialLinks.map((social) => (
                <li key={social.key}>
                  <SmartLink
                    href={social.href}
                    external
                    newTabLabel={tCommon('opensInNewTab')}
                    className="text-mist hover:text-paper inline-block py-1.5 text-sm transition-colors lg:py-0"
                  >
                    {t(`social.${social.key}` as 'social.linkedin')}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Sitemap columns */}
          <nav className="grid gap-8 sm:grid-cols-3 lg:col-span-5">
            {primaryNav.slice(0, 3).map((item) => (
              <div key={item.key}>
                <Link
                  href={item.href}
                  className="text-paper inline-block py-1.5 text-sm font-semibold lg:py-0"
                >
                  {tNav(item.key as 'ecosystem')}
                </Link>
                {item.children && (
                  <ul className="mt-3 space-y-0.5 lg:mt-4 lg:space-y-2.5">
                    {item.children.map((child) => (
                      <li key={child.key}>
                        <SmartLink
                          href={child.href}
                          external={child.external}
                          newTabLabel={tCommon('opensInNewTab')}
                          className="text-mist hover:text-paper inline-block py-1.5 text-sm transition-colors lg:py-0"
                        >
                          {tNav(`items.${child.key}` as 'items.stSoftware')}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3">
            {primaryNav.slice(3).map((item) => (
              <div key={item.key}>
                <Link
                  href={item.href}
                  className="text-paper inline-block py-1.5 text-sm font-semibold lg:py-0"
                >
                  {tNav(item.key as 'company')}
                </Link>
                {item.children && (
                  <ul className="mt-3 space-y-0.5 lg:mt-4 lg:space-y-2.5">
                    {item.children.map((child) => (
                      <li key={child.key}>
                        <Link
                          href={child.href}
                          className="text-mist hover:text-paper inline-block py-1.5 text-sm transition-colors lg:py-0"
                        >
                          {tNav(`items.${child.key}` as 'items.about')}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Family sites */}
        <div className="border-paper/10 mt-10 border-t pt-8">
          <p className="text-mist text-xs font-semibold tracking-[0.16em] uppercase">
            {t('familySites')}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-0.5 lg:mt-4 lg:gap-y-3">
            {familySites.map((site) => (
              <li key={site.key}>
                <SmartLink
                  href={site.href}
                  external={site.external}
                  newTabLabel={tCommon('opensInNewTab')}
                  className="text-paper/85 hover:text-accent-400 inline-block py-1.5 text-sm font-medium transition-colors lg:py-0"
                >
                  {tNav(`items.${site.key}` as 'items.stSoftware')}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal row */}
        <div className="border-paper/10 text-mist mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-8 text-xs">
          <Link href="/privacy" className="hover:text-paper inline-block py-1.5 transition-colors lg:py-0">
            {t('privacy')}
          </Link>
          <Link href="/terms" className="hover:text-paper inline-block py-1.5 transition-colors lg:py-0">
            {t('terms')}
          </Link>
          <p className="ml-auto">{t('rights', { year })}</p>
        </div>
      </Container>
    </footer>
  );
}
