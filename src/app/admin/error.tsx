'use client';

import { useEffect } from 'react';
import { AdminSystemsUnavailable } from '@/components/admin/AdminSystemsUnavailable';

export default function AdminRootError({
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
    console.error('[admin root error boundary]', error);
  }, [error]);

  return (
    <main className="flex min-h-full items-center justify-center px-5 py-12">
      <div className="w-full max-w-lg">
        <AdminSystemsUnavailable onRetry={() => retry()} />
      </div>
    </main>
  );
}
