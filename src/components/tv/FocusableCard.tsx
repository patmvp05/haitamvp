'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import {
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';

const ACTIVATION_KEYS = new Set(['Enter', ' ', 'Spacebar']);

type TvFocusSection = 'hero' | 'recommendations' | 'actions';
type InteractionStyle = CSSProperties & {
  '--tv-focus-scale': number;
  '--tv-pressed-scale': number;
};

interface FocusableCardProps {
  href?: string;
  /** Opens in a new tab with safe rel attributes (for outbound links). */
  external?: boolean;
  /** Turns a link-less surface into a real button. */
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
  autoFocus?: boolean;
  tvSection?: TvFocusSection;
  tvIndex?: number;
  focusScale?: number;
  pressedScale?: number;
}

/**
 * Shared TV focus contract for links, buttons, and browsable information
 * surfaces. Focus combines scale, outline, and brand-colored glow; Enter/Select
 * and pointer presses briefly scale down and intensify the glow so "pressed" is
 * visibly distinct from merely resting in the focused state.
 */
export function FocusableCard({
  href,
  external,
  onClick,
  className,
  children,
  autoFocus,
  tvSection,
  tvIndex,
  focusScale = 1.05,
  pressedScale = 0.98,
  ...rest
}: FocusableCardProps) {
  const [pressed, setPressed] = useState(false);
  const interactionStyle: InteractionStyle = {
    '--tv-focus-scale': focusScale,
    '--tv-pressed-scale': pressedScale,
  };
  const sharedProps = {
    className: clsx('tv-focusable', className),
    'data-pressed': pressed ? 'true' : 'false',
    'data-tv-focusable': 'true',
    'data-tv-section': tvSection,
    'data-tv-index': tvIndex,
    style: interactionStyle,
    autoFocus,
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (!ACTIVATION_KEYS.has(event.key)) return;
      // Native links/buttons often activate on keydown, which skips the visual
      // pressed interval. Activate on keyup instead so the held state renders.
      event.preventDefault();
      if (!event.repeat) setPressed(true);
    },
    onKeyUp: (event: KeyboardEvent<HTMLElement>) => {
      if (!ACTIVATION_KEYS.has(event.key)) return;
      event.preventDefault();
      setPressed(false);
      if (href || onClick) event.currentTarget.click();
    },
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.button === 0) setPressed(true);
    },
    onPointerUp: () => setPressed(false),
    onPointerCancel: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    onBlur: () => setPressed(false),
    ...rest,
  };

  if (href) {
    return (
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...sharedProps}
      >
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} {...sharedProps}>
        {children}
      </button>
    );
  }

  return (
    <div role="group" tabIndex={0} {...sharedProps}>
      {children}
    </div>
  );
}
