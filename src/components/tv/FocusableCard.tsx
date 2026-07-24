import Link from 'next/link';
import { clsx } from 'clsx';

// A single actionable element. Styled at BOTH `focus:` and `focus-visible:`
// because Android System WebView versions on cheaper TVs vary in
// :focus-visible support, and a TV has no real mouse so plain :focus never
// misfires. `hover:` exists only so a developer testing with a mouse sees the
// same affordance. Deliberately unopinionated about shape/size/color beyond
// the interaction states — callers own their own container styling via
// className so a pill and a full tile can share one focus contract without
// fighting over which rounding/padding utility wins the cascade.
const BASE = clsx(
  'outline-none no-underline transition-transform duration-150 border-4 border-transparent',
  'hover:border-[color:var(--gold)] hover:scale-[1.02]',
  'focus:border-[color:var(--gold)] focus:scale-[1.02] focus:shadow-[0_0_0_6px_rgba(217,162,75,0.3)]',
  'focus-visible:border-[color:var(--gold)] focus-visible:scale-[1.02] focus-visible:shadow-[0_0_0_6px_rgba(217,162,75,0.3)]',
);

interface FocusableCardProps {
  href: string;
  /** Opens in a new tab with safe rel attributes (for outbound links). */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}

/**
 * Renders a real <a>/next/link element (never a <div onClick>) so Chromium's
 * built-in spatial navigation in kiosk WebViews maps the D-pad to focus/activate
 * without extra JavaScript.
 */
export function FocusableCard({
  href,
  external,
  className,
  children,
  ...rest
}: FocusableCardProps) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={clsx(BASE, className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
