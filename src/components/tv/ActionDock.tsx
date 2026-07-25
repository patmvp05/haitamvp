'use client';

import { FocusableCard } from './FocusableCard';
import { LanguageSelector } from './LanguageSelector';
import { QrImage } from './QrImage';
import { Ticker } from './Ticker';
import { useTvLanguage } from './TvLanguageProvider';
import { WifiIcon, ChatIcon, PlayIcon } from './icons';
import type { HotelSettingsRecord } from '@/lib/data/types';
import { fillMessage, formatTvHours } from '@/lib/i18n/tv';

const ACTION =
  'tv-focusable-inset my-[0.35rem] flex min-w-[clamp(7.5rem,10vw,10rem)] items-center justify-center gap-[0.6em] border-l border-[color:var(--hairline)] bg-[color:var(--ground-2)] px-[clamp(0.7rem,1.4vw,1.2rem)] text-[color:var(--ink)]';
const LABEL =
  'whitespace-nowrap text-[clamp(0.72rem,0.92vw,0.84rem)] font-semibold';

interface ActionDockProps {
  hotelSettings: HotelSettingsRecord;
  wifiQrDataUrl: string | null;
  receptionQrDataUrl: string | null;
}

export function ActionDock({ hotelSettings, wifiQrDataUrl, receptionQrDataUrl }: ActionDockProps) {
  const { language, messages } = useTvLanguage();
  const breakfastHours = hotelSettings.breakfast_hours
    ? formatTvHours(hotelSettings.breakfast_hours, language)
    : null;
  const tickerParts = [
    breakfastHours &&
      fillMessage(messages.breakfastServed, { hours: breakfastHours }),
    messages.airportPickup,
    messages.lateCheckout,
  ].filter((part): part is string => Boolean(part));
  const receptionIndex = hotelSettings.wifi_ssid ? 1 : 0;
  const moviesIndex =
    (hotelSettings.wifi_ssid ? 1 : 0) +
    (hotelSettings.reception_contact_url ? 1 : 0);
  const languageIndex =
    moviesIndex + (hotelSettings.jellyfin_url ? 1 : 0);

  return (
    <div className="grid h-full min-h-0 grid-cols-[1fr_auto] items-center overflow-hidden border-t border-[color:var(--hairline)] bg-[color:var(--ground-2)] pl-[clamp(1.2rem,3vw,2.4rem)]">
      <Ticker items={tickerParts} />

      <div
        data-tv-focus-group="actions"
        className="flex h-full flex-none items-stretch"
      >
        {hotelSettings.wifi_ssid && (
          <FocusableCard
            tvSection="actions"
            tvIndex={0}
            focusScale={1.035}
            pressedScale={0.985}
            className={ACTION}
            aria-label={messages.wifiDetails}
          >
            <WifiIcon className="h-[1.2em] w-[1.2em] shrink-0 text-[color:var(--gold)]" />
            <span className={LABEL}>Wi-Fi</span>
            {wifiQrDataUrl && (
              <QrImage dataUrl={wifiQrDataUrl} alt={messages.joinWifi} size={36} />
            )}
          </FocusableCard>
        )}

        {hotelSettings.reception_contact_url && (
          <FocusableCard
            href={hotelSettings.reception_contact_url}
            external
            tvSection="actions"
            tvIndex={receptionIndex}
            focusScale={1.035}
            pressedScale={0.985}
            className={ACTION}
            aria-label={messages.contactReception}
          >
            <ChatIcon className="h-[1.2em] w-[1.2em] shrink-0 text-[color:var(--gold)]" />
            <span className={LABEL}>{messages.reception}</span>
            {receptionQrDataUrl && (
              <QrImage dataUrl={receptionQrDataUrl} alt={messages.scanReception} size={36} />
            )}
          </FocusableCard>
        )}

        {hotelSettings.jellyfin_url && (
          <FocusableCard
            href={hotelSettings.jellyfin_url}
            external
            tvSection="actions"
            tvIndex={moviesIndex}
            focusScale={1.035}
            pressedScale={0.985}
            className={ACTION}
            aria-label={messages.watchMovies}
          >
            <PlayIcon className="h-[1.2em] w-[1.2em] shrink-0 text-[color:var(--gold)]" />
            <span className={LABEL}>{messages.movies}</span>
          </FocusableCard>
        )}

        <LanguageSelector
          tvIndex={languageIndex}
          actionClassName={ACTION}
          labelClassName={LABEL}
        />
      </div>
    </div>
  );
}
