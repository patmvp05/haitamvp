import { FocusableCard } from './FocusableCard';
import { QrImage } from './QrImage';
import { Ticker } from './Ticker';
import { WifiIcon, ChatIcon, PlayIcon } from './icons';
import type { HotelSettingsRecord } from '@/lib/data/types';

const PILL = 'flex items-center gap-[0.6em] rounded-full border border-[color:var(--hairline)] bg-[color:var(--panel)] py-[0.5em] pl-[0.9em] pr-[0.5em] text-[color:var(--ink)]';
const LABEL = 'whitespace-nowrap text-[clamp(0.72rem,0.95vw,0.85rem)] font-bold';

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
  ].filter(Boolean);
  const receptionIndex = hotelSettings.wifi_ssid ? 1 : 0;
  const moviesIndex =
    (hotelSettings.wifi_ssid ? 1 : 0) +
    (hotelSettings.reception_contact_url ? 1 : 0);

  return (
    <div className="grid h-full min-h-0 grid-cols-[1fr_auto] items-center gap-4 overflow-hidden border-t border-[color:var(--hairline)] bg-[color:var(--ground-2)] px-[clamp(1.2rem,3vw,2.4rem)]">
      <Ticker text={tickerParts.join('  ·  ')} />

      <div
        data-tv-focus-group="actions"
        className="flex flex-none items-center gap-[clamp(0.5rem,1.4vw,0.9rem)] py-[clamp(0.6rem,1.6vh,0.9rem)]"
      >
        {hotelSettings.wifi_ssid && (
          <FocusableCard
            tvSection="actions"
            tvIndex={0}
            className={PILL}
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
            className={PILL}
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
            className={`${PILL} bg-[color:var(--gold)] py-[0.5em] pl-[1.1em] pr-[1.1em] text-[color:var(--ground)]`}
            aria-label="Watch movies"
          >
            <PlayIcon className="h-[1.2em] w-[1.2em] shrink-0" />
            <span className={LABEL}>Movies</span>
          </FocusableCard>
        )}
      </div>
    </div>
  );
}
