'use client';

import { useEffect } from 'react';
import { HotelSystemsUnavailable } from '@/components/tv/HotelSystemsUnavailable';

/**
 * Error boundary for the guest screen. Next 16 provides `unstable_retry` (which
 * re-fetches the server component — what we want when Supabase recovers) and
 * keeps `reset` (re-render only) as a fallback. Since the TV is unattended, we
 * also auto-retry every 30s so the screen self-heals without the remote.
 */
export default function RoomError({
  error,
  reset,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}) {
  const retry = unstable_retry ?? reset;

  useEffect(() => {
    console.error('[tv room error]', error);
    const id = setInterval(() => retry(), 30_000);
    return () => clearInterval(id);
  }, [error, reset, unstable_retry, retry]);

  return <HotelSystemsUnavailable onRetry={() => retry()} />;
}
