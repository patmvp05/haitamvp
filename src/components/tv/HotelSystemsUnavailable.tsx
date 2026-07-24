'use client';

import { FALLBACK_RECEPTION_PHONE } from '@/lib/constants';

/**
 * Fallback shown when the guest screen can't load its data. Kept calm and
 * guest-facing (no error codes). The Try Again button is focusable for the
 * remote; the error boundary also auto-retries on a timer for unattended TVs.
 */
export function HotelSystemsUnavailable({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-8 p-10 text-center">
      <h1 className="text-6xl font-bold">We&apos;ll be right back</h1>
      <p className="max-w-3xl text-3xl text-neutral-300">
        We can&apos;t reach the hotel systems right now. Please contact reception at{' '}
        <span className="font-semibold text-amber-300">{FALLBACK_RECEPTION_PHONE}</span>.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-2xl border-4 border-transparent bg-neutral-800 px-10 py-5 text-2xl font-semibold outline-none transition-transform duration-150 hover:border-amber-400 hover:scale-105 focus:border-amber-400 focus:scale-105 focus:shadow-[0_0_0_6px_rgba(251,191,36,0.35)] focus-visible:border-amber-400 focus-visible:scale-105"
      >
        Try Again
      </button>
    </main>
  );
}
