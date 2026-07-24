import 'server-only';
import { retry } from './retry';

export interface WeatherSnapshot {
  temperatureC: number;
  highC: number;
  lowC: number;
  conditionCode: number;
  conditionLabel: string;
  locationLabel: string;
}

// Open-Meteo WMO weather codes → human labels. Mirrors the map used in the
// Daily Logos app for consistency across Patrick's projects.
const WEATHER_CODE_MAP: Record<number, string> = {
  0: 'Clear',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Fog',
  51: 'Light Drizzle',
  53: 'Drizzle',
  55: 'Heavy Drizzle',
  56: 'Freezing Drizzle',
  57: 'Freezing Drizzle',
  61: 'Light Rain',
  63: 'Rain',
  65: 'Heavy Rain',
  66: 'Freezing Rain',
  67: 'Freezing Rain',
  71: 'Light Snow',
  73: 'Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Rain Showers',
  81: 'Rain Showers',
  82: 'Heavy Showers',
  85: 'Snow Showers',
  86: 'Snow Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm',
  99: 'Thunderstorm',
};

/**
 * Fetch current + today's weather from Open-Meteo (no API key required).
 * Cached by Next's Data Cache for 10 minutes — Open-Meteo itself only updates
 * roughly hourly, and the TV screen doesn't need second-by-second weather.
 */
export async function fetchWeather(
  lat: number,
  lon: number,
  locationLabel: string,
): Promise<WeatherSnapshot> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weather_code` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
    `&temperature_unit=celsius&timezone=auto`;

  return retry(async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 600 },
      });
      if (!res.ok) throw new Error(`Open-Meteo responded ${res.status}`);

      const data = await res.json();
      if (!data?.current || !data?.daily) {
        throw new Error('Unexpected Open-Meteo payload shape');
      }

      const code: number = data.current.weather_code;
      return {
        temperatureC: Math.round(data.current.temperature_2m),
        highC: Math.round(data.daily.temperature_2m_max[0]),
        lowC: Math.round(data.daily.temperature_2m_min[0]),
        conditionCode: code,
        conditionLabel: WEATHER_CODE_MAP[code] ?? 'Unknown',
        locationLabel,
      };
    } finally {
      clearTimeout(timeout);
    }
  }, 2, 750);
}

/**
 * Weather is non-essential: a broken widget must never take down the guest
 * screen. Returns null (rendered as "Weather unavailable") on any failure or
 * when the room has no coordinates.
 */
export async function fetchWeatherSafely(
  lat: number | null,
  lon: number | null,
  locationLabel: string | null,
): Promise<WeatherSnapshot | null> {
  if (lat == null || lon == null) return null;
  try {
    return await fetchWeather(lat, lon, locationLabel ?? '');
  } catch (error) {
    console.error('[weather] degrading gracefully:', error);
    return null;
  }
}
