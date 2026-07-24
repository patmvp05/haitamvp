'use client';

import { useEffect, useState } from 'react';
import { getGreeting } from '@/lib/greeting';

interface GreetingClockProps {
  guestFirstName: string | null;
  welcomeMessage: string | null;
  specialOccasion: string | null;
  roomNumber: string;
  checkoutLabel: string | null;
}

/**
 * The screen header. The greeting and clock derive from the device's local time
 * (the TV is physically in the hotel), updating every 30s so the greeting rolls
 * over at noon/6pm and the clock stays current. Time-derived nodes use
 * suppressHydrationWarning because the server's initial render may differ from
 * the client's local time.
 */
export function GreetingClock({
  guestFirstName,
  welcomeMessage,
  specialOccasion,
  roomNumber,
  checkoutLabel,
}: GreetingClockProps) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const greeting = getGreeting(now);
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <header className="flex items-start justify-between gap-8">
      <div className="min-w-0">
        <p
          suppressHydrationWarning
          className="text-2xl font-semibold uppercase tracking-[0.2em] text-amber-400"
        >
          {greeting}
        </p>
        <h1 className="mt-2 text-6xl font-bold leading-tight">
          {guestFirstName ? `Welcome, ${guestFirstName}` : 'Welcome'}
        </h1>
        {welcomeMessage && (
          <p className="mt-3 max-w-4xl text-2xl text-neutral-300">{welcomeMessage}</p>
        )}
        {specialOccasion && (
          <p className="mt-2 text-2xl font-semibold text-amber-300">
            🎉 Happy {specialOccasion}!
          </p>
        )}
      </div>

      <div className="shrink-0 text-right">
        <p suppressHydrationWarning className="text-5xl font-bold tabular-nums">
          {time}
        </p>
        <p className="mt-4 text-3xl font-semibold">Room {roomNumber}</p>
        {checkoutLabel && (
          <p className="mt-2 text-xl text-neutral-300">
            Checkout
            <br />
            {checkoutLabel}
          </p>
        )}
      </div>
    </header>
  );
}
