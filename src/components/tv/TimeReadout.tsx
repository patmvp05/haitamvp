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
        className="font-mono text-[clamp(2.1rem,4.6vw,3.6rem)] font-bold leading-none tabular-nums"
      >
        {time}
      </div>
      <div
        suppressHydrationWarning
        className="mt-2 text-[clamp(0.78rem,1.2vw,1rem)] uppercase tracking-[0.06em] text-[color:var(--ink-dim)]"
      >
        {date}
      </div>
      <div className="mt-3 flex items-center gap-[0.6em] text-[clamp(0.85rem,1.3vw,1.05rem)]">
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
