import type { WeatherSnapshot } from '@/lib/weather';

/**
 * Current weather. Renders "Weather unavailable" when the snapshot is null (a
 * failed/missing fetch) rather than taking down the whole screen.
 */
export function WeatherWidget({ weather }: { weather: WeatherSnapshot | null }) {
  return (
    <div className="rounded-2xl bg-neutral-900 p-6">
      <h2 className="text-xl font-bold uppercase tracking-wide text-neutral-400">
        Weather
      </h2>
      {weather ? (
        <>
          <p className="mt-2 text-6xl font-bold">{weather.temperatureC}°C</p>
          <p className="mt-1 text-2xl">{weather.conditionLabel}</p>
          <p className="mt-2 text-lg text-neutral-400">
            H {weather.highC}° · L {weather.lowC}°
          </p>
          {weather.locationLabel && (
            <p className="mt-1 text-base text-neutral-500">{weather.locationLabel}</p>
          )}
        </>
      ) : (
        <p className="mt-2 text-lg text-neutral-500">Weather unavailable</p>
      )}
    </div>
  );
}
