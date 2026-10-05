import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

type SmartLinkProps = {
  href: string;
  external?: boolean;
  children: ReactNode;
  /**
   * Visually hidden suffix announcing that the link leaves the site.
   * Passed in by the caller so it stays translatable.
   */
  newTabLabel?: string;
} & Omit<ComponentProps<'a'>, 'href'>;

/**
 * One link component for the whole site: locale-aware internal routing via
 * next-intl, and safe `rel` + screen-reader hint for external brand sites.
 */
export function SmartLink({
  href,
  external,
  children,
  newTabLabel,
  ...rest
}: SmartLinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        {newTabLabel ? <span className="sr-only"> ({newTabLabel})</span> : null}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
