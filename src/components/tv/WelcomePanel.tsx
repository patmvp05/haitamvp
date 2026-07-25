import { GiftIcon } from './icons';
import { FocusableCard } from './FocusableCard';
import type { HotelSettingsRecord } from '@/lib/data/types';

interface WelcomePanelProps {
  guestFirstName: string | null;
  welcomeMessage: string | null;
  specialOccasion: string | null;
  roomNumber: string;
  checkoutLabel: string | null;
  hotelSettings: HotelSettingsRecord;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[color:var(--hairline)] py-[clamp(0.55rem,1.4vh,0.9rem)] first:border-t-0">
      <dt className="text-[clamp(0.68rem,0.86vw,0.8rem)] text-[color:var(--ink-faint)]">
        {label}
      </dt>
      <dd className="mt-[0.15em] whitespace-nowrap text-[clamp(0.92rem,1.25vw,1.15rem)] font-semibold tabular-nums">
        {value}
      </dd>
    </div>
  );
}

export function WelcomePanel({
  guestFirstName,
  welcomeMessage,
  specialOccasion,
  roomNumber,
  checkoutLabel,
  hotelSettings,
}: WelcomePanelProps) {
  const breakfast = hotelSettings.breakfast_hours;

  return (
    <FocusableCard
      tvSection="hero"
      tvIndex={0}
      focusScale={1}
      pressedScale={0.995}
      aria-label={`Welcome and stay details for room ${roomNumber}`}
      className="tv-focusable-inset relative grid h-full min-h-0 min-w-0 grid-rows-[auto_1fr] overflow-hidden border-l border-[color:var(--hairline)] bg-[color:var(--panel)] p-[clamp(1.2rem,3vw,2.5rem)_clamp(1.4rem,3.4vw,3rem)]"
    >
      <div className="flex items-baseline justify-between gap-6">
        <span className="font-serif text-[clamp(0.82rem,1.15vw,1rem)] tracking-[0.24em] text-[color:var(--gold-soft)]">
          HAITA
        </span>
        <span className="text-[clamp(0.72rem,0.92vw,0.84rem)] text-[color:var(--ink-dim)]">
          Room {roomNumber}
        </span>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_minmax(16rem,0.56fr)] items-end gap-[clamp(2rem,4vw,4rem)]">
        <div className="min-w-0 self-center">
          <div className="text-[clamp(0.78rem,1.05vw,0.94rem)] text-[color:var(--ink-dim)]">
            Good evening
          </div>
          <h1 className="mt-[0.2em] text-balance text-[clamp(2.4rem,4.3vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            {guestFirstName ? `Welcome, ${guestFirstName}` : 'Welcome'}
          </h1>
          {specialOccasion && (
            <div className="mt-[1em] flex items-center gap-[0.55em] text-[clamp(0.78rem,1vw,0.9rem)] font-semibold text-[color:var(--gold-soft)]">
              <GiftIcon className="h-[1em] w-[1em]" />
              {specialOccasion} Stay
            </div>
          )}
          {welcomeMessage && (
            <p className="mt-[0.9em] line-clamp-2 max-w-[42ch] text-[clamp(0.86rem,1.15vw,1.05rem)] leading-relaxed text-[color:var(--ink-dim)]">
              {welcomeMessage}
            </p>
          )}
        </div>

        <dl className="min-w-0 border-l border-[color:var(--hairline)] pl-[clamp(1.2rem,2.6vw,2.2rem)]">
          {checkoutLabel && <Stat label="Checkout" value={checkoutLabel} />}
          {hotelSettings.wifi_ssid && <Stat label="Wi-Fi" value={hotelSettings.wifi_ssid} />}
          {breakfast && <Stat label="Breakfast" value={breakfast} />}
        </dl>
      </div>
    </FocusableCard>
  );
}
