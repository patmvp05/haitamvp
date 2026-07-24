import Link from 'next/link';
import { clsx } from 'clsx';

// A single actionable tile. Styled at BOTH `focus:` and `focus-visible:` because
// Android System WebView versions on cheaper TVs vary in :focus-visible support,
// and a TV has no real mouse so plain :focus never misfires. `hover:` exists only
// so a developer testing with a mouse sees the same affordance.
const BASE = clsx(
  'block w-full rounded-2xl border-4 border-transparent bg-neutral-800 p-6',
  'text-neutral-50 no-underline outline-none transition-transform duration-150',
  'hover:border-amber-400 hover:scale-[1.02]',
  'focus:border-amber-400 focus:scale-[1.02] focus:shadow-[0_0_0_6px_rgba(251,191,36,0.35)]',
  'focus-visible:border-amber-400 focus-visible:scale-[1.02] focus-visible:shadow-[0_0_0_6px_rgba(251,191,36,0.35)]',
);

interface FocusableCardProps {
  href: string;
  /** Opens in a new tab with safe rel attributes (for outbound links). */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
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
}: FocusableCardProps) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={clsx(BASE, className)}
    >
      {children}
    </Link>
  );
}
