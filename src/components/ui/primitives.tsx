import type { ComponentProps, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/* -------------------------------------------------------------------------- */
/* Container                                                                   */
/* -------------------------------------------------------------------------- */

export function Container({
  className,
  ...rest
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12', className)}
      {...rest}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Section — owns the vertical rhythm from brief §11                           */
/* -------------------------------------------------------------------------- */

export function Section({
  className,
  tone = 'dark',
  ...rest
}: ComponentProps<'section'> & { tone?: 'dark' | 'darker' | 'light' }) {
  return (
    <section
      className={cn(
        'py-(--spacing-section-sm) lg:py-(--spacing-section)',
        tone === 'dark' && 'bg-navy-950 text-paper',
        tone === 'darker' && 'bg-navy-900 text-paper',
        tone === 'light' && 'bg-paper-soft text-ink',
        className,
      )}
      {...rest}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Eyebrow — small uppercase label above a headline (brief §02)                */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  className,
  ...rest
}: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-ember-500 text-xs font-semibold tracking-[0.18em] uppercase',
        className,
      )}
      {...rest}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* SectionHeading                                                              */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  as: Tag = 'h2',
  className,
  ...rest
}: ComponentProps<'h2'> & { as?: ElementType }) {
  return (
    <Tag
      className={cn(
        'text-3xl leading-[1.15] font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl',
        className,
      )}
      {...rest}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Lede — supporting paragraph                                                 */
/* -------------------------------------------------------------------------- */

export function Lede({ className, ...rest }: ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-mist max-w-2xl text-base leading-relaxed md:text-lg', className)}
      {...rest}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Button styles — shared by <a>, <button> and next-intl <Link>                */
/* -------------------------------------------------------------------------- */

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

export function buttonClass(
  variant: Variant = 'primary',
  size: Size = 'md',
  className?: string,
) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap',
    'transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50',
    size === 'md' && 'px-6 py-3 text-sm',
    size === 'lg' && 'px-8 py-4 text-base',
    variant === 'primary' &&
      'bg-accent-500 text-navy-950 hover:bg-accent-400',
    variant === 'outline' &&
      'border border-paper/35 text-paper hover:border-accent-500 hover:text-accent-400',
    variant === 'ghost' && 'text-paper/80 hover:text-paper underline-offset-4 hover:underline',
    className,
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ComponentProps<'button'> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClass(variant, size, className)} {...rest} />;
}

/* -------------------------------------------------------------------------- */
/* MediaPlaceholder                                                            */
/* -------------------------------------------------------------------------- */

/**
 * The brief asks for real ST United photography. Until the asset pack arrives
 * every image slot renders this, so missing art is obvious in review instead of
 * silently shipping a broken <img>.
 */
export function MediaPlaceholder({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'relative overflow-hidden bg-navy-800',
        'before:absolute before:inset-0 before:bg-[repeating-linear-gradient(135deg,transparent,transparent_14px,rgba(155,139,249,0.06)_14px,rgba(155,139,249,0.06)_28px)]',
        className,
      )}
    >
      <span className="text-mist/50 absolute bottom-3 left-4 text-[10px] font-medium tracking-[0.14em] uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}
