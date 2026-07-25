// Small line icons shared across the guest screen. Kept minimal and
// geometric (not skeuomorphic, not emoji) to match a premium hospitality
// register rather than a generic web-app look.

type IconProps = { className?: string };

const base = 'fill-none stroke-current stroke-[1.8]';

export function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function GiftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`}>
      <path d="M12 3v6M8 6l4 3 4-3M5 21V11a7 7 0 0 1 14 0v10" />
    </svg>
  );
}

export function WifiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`}>
      <path d="M2 8.5a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`}>
      <path d="M4 4h16v12H7l-3 3V4z" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className ?? ''}`}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function LanguageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function RadioIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`}>
      <path d="M4 11a9 9 0 0 1 9-9M4 11a5 5 0 0 1 5-5M4 11a1 1 0 0 1 1-1" />
      <circle cx="4" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`}>
      <path d="M12 21s7-6.6 7-12a7 7 0 0 0-14 0c0 5.4 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
