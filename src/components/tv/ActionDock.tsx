import { FocusableCard } from './FocusableCard';
import { QrImage } from './QrImage';
import { Ticker } from './Ticker';
import { WifiIcon, ChatIcon, PlayIcon } from './icons';
import type { HotelSettingsRecord } from '@/lib/data/types';

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
  const tickerParts = [
    hotelSettings.breakfast_hours && `Breakfast served ${hotelSettings.breakfast_hours}`,
    'Ask reception about our airport pickup service',
    'Late checkout available on request',
  ].filter((part): part is string => Boolean(part));
  const receptionIndex = hotelSettings.wifi_ssid ? 1 : 0;
  const moviesIndex =
    (hotelSettings.wifi_ssid ? 1 : 0) +
    (hotelSettings.reception_contact_url ? 1 : 0);

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
            aria-label="Wi-Fi details"
          >
            <WifiIcon className="h-[1.2em] w-[1.2em] shrink-0 text-[color:var(--gold)]" />
            <span className={LABEL}>Wi-Fi</span>
            {wifiQrDataUrl && (
              <QrImage dataUrl={wifiQrDataUrl} alt="Scan to join the Wi-Fi network" size={36} />
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
            aria-label="Contact reception"
          >
            <ChatIcon className="h-[1.2em] w-[1.2em] shrink-0 text-[color:var(--gold)]" />
            <span className={LABEL}>Reception</span>
            {receptionQrDataUrl && (
              <QrImage dataUrl={receptionQrDataUrl} alt="Scan to contact reception" size={36} />
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
            aria-label="Watch movies"
          >
            <PlayIcon className="h-[1.2em] w-[1.2em] shrink-0 text-[color:var(--gold)]" />
            <span className={LABEL}>Movies</span>
          </FocusableCard>
        )}
      </div>
    </div>
  );
}
