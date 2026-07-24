'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * The TV screen stays on indefinitely, so nothing would otherwise re-fetch.
 * This forces a server re-render on an interval (default 5 min) so weather,
 * the greeting, and any Supabase Studio edits reach the screen without a manual
 * reload. Renders nothing.
 */
export function AutoRefresh({ intervalMs = 300_000 }: { intervalMs?: number }) {
  const router = useRouter();
  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);
  return null;
}
