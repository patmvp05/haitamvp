'use client';

import { useEffect, useState } from 'react';
import { SunIcon } from './icons';
import type { WeatherSnapshot } from '@/lib/weather';

interface TimeReadoutProps {
  weather: WeatherSnapshot | null;
}

/**
 * The clock/date/weather overlay on the hero photo panel. Ticks from the
 * device's local time (the TV is physically in the hotel), updating every
 * 30s. Time-derived nodes use suppressHydrationWarning since the server's
 * initial render may differ from the client's local time.
 */
export function TimeReadout({ weather }: TimeReadoutProps) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="absolute inset-x-[6%] bottom-[6%]">
      <div
        suppressHydrationWarning
        className="font-mono text-[clamp(2.2rem,4.4vw,3.7rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums"
      >
        {time}
      </div>
      <div
        suppressHydrationWarning
        className="mt-2 text-[clamp(0.76rem,1vw,0.9rem)] text-[color:var(--ink-dim)]"
      >
        {date}
      </div>
      <div className="mt-3 flex items-center gap-[0.6em] text-[clamp(0.8rem,1.08vw,0.96rem)]">
        <SunIcon className="h-[1.3em] w-[1.3em] shrink-0 text-[color:var(--rose)]" />
        {weather ? (
          <>
            <span className="font-mono font-bold tabular-nums">{weather.temperatureC}°C</span>
            <span className="text-[color:var(--ink-dim)]">
              {weather.conditionLabel} · {weather.locationLabel}
            </span>
          </>
        ) : (
          <span className="text-[color:var(--ink-dim)]">Weather unavailable</span>
        )}
      </div>
    </div>
  );
}
