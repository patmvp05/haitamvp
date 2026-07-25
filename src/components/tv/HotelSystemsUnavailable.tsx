'use client';

import { FALLBACK_RECEPTION_PHONE } from '@/lib/constants';
import { FocusableCard } from './FocusableCard';

/**
 * Fallback shown when the guest screen can't load its data. Kept calm and
 * guest-facing (no error codes). The Try Again button is focusable for the
 * remote; the error boundary also auto-retries on a timer for unattended TVs.
 */
export function HotelSystemsUnavailable({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-8 bg-[color:var(--ground)] p-10 text-center text-[color:var(--ink)]">
      <h1 className="text-6xl font-bold">We&apos;ll be right back</h1>
      <p className="max-w-3xl text-3xl text-[color:var(--ink-dim)]">
        We can&apos;t reach the hotel systems right now. Please contact reception at{' '}
        <span className="font-semibold text-[color:var(--gold-soft)]">{FALLBACK_RECEPTION_PHONE}</span>.
      </p>
      <FocusableCard
        onClick={onRetry}
        autoFocus
        className="rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--panel)] px-10 py-5 text-2xl font-semibold text-[color:var(--ink)]"
      >
        Try Again
      </FocusableCard>
    </main>
  );
}
