import { FALLBACK_RECEPTION_PHONE } from '@/lib/constants';

/**
 * Shown when the room number in the URL doesn't exist. Distinct from the systems
 * outage screen — retrying won't fix a wrong room number, so there's no retry.
 */
export default function RoomNotFound() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-[color:var(--ground)] p-10 text-center text-[color:var(--ink)]">
      <h1 className="text-6xl font-bold">Room Not Found</h1>
      <p className="max-w-3xl text-3xl text-[color:var(--ink-dim)]">
        We couldn&apos;t find this room. Please contact reception at{' '}
        <span className="font-semibold text-[color:var(--gold-soft)]">{FALLBACK_RECEPTION_PHONE}</span>{' '}
        for assistance.
      </p>
    </main>
  );
}
