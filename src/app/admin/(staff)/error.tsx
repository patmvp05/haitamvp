'use client';

import { useEffect } from 'react';
import { AdminSystemsUnavailable } from '@/components/admin/AdminSystemsUnavailable';

export default function StaffAdminError({
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
    console.error('[staff admin error boundary]', error);
  }, [error]);

  return <AdminSystemsUnavailable onRetry={() => retry()} />;
}
