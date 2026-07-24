import Link from 'next/link';
import { ROOM_NUMBERS } from '@/lib/constants';

/**
 * Development index. Not part of the guest experience — a convenience for
 * opening each room's TV screen during development. Room 101 is seeded with a
 * demo guest; 102–106 are unoccupied.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-10 text-center">
      <div>
        <h1 className="text-4xl font-bold">Haita — Hotel Guest TV</h1>
        <p className="mt-2 text-neutral-400">Open a room screen:</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {ROOM_NUMBERS.map((room) => (
          <Link
            key={room}
            href={`/tv/${room}`}
            className="rounded-xl bg-neutral-800 px-6 py-4 text-2xl no-underline transition-colors hover:bg-neutral-700"
          >
            /tv/{room}
          </Link>
        ))}
      </div>
    </main>
  );
}
