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
    <div>
      <div className="text-[clamp(0.62rem,0.85vw,0.72rem)] uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">
        {label}
      </div>
      <div className="mt-1 font-mono text-[clamp(1.05rem,1.7vw,1.4rem)] font-bold tabular-nums">
        {value}
      </div>
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
      focusScale={1.025}
      pressedScale={0.99}
      aria-label={`Welcome and stay details for room ${roomNumber}`}
      className="tv-focusable-inset relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-[color:var(--panel)] p-[clamp(1rem,2.6vw,2.1rem)_clamp(1.2rem,3vw,2.4rem)]"
    >
      {/* Large faint monogram fills the panel's quiet middle ground rather
          than leaving it empty — a device drawn on the brand, not around it. */}
      <svg
        aria-hidden="true"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute right-[-4%] top-[6%] aspect-square w-[62%] text-[color:var(--gold)] opacity-[0.07]"
      >
        <text x="50" y="74" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="92" fontWeight="700" fill="currentColor">
          H
        </text>
      </svg>

      <div className="relative flex items-baseline gap-[0.6em]">
        <span className="text-[clamp(0.72rem,1vw,0.85rem)] font-bold uppercase tracking-[0.22em] text-[color:var(--gold-soft)]">
          Haita
        </span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
        <span className="font-mono text-[clamp(0.68rem,0.95vw,0.8rem)] tracking-[0.08em] text-[color:var(--ink-dim)]">
          ROOM {roomNumber}
        </span>
      </div>

      <div className="relative mt-[clamp(0.9rem,2.6vh,1.8rem)] min-h-0 overflow-hidden">
        <div className="text-[clamp(0.72rem,1vw,0.88rem)] tracking-[0.04em] text-[color:var(--ink-dim)]">
          Good evening
        </div>
        <h1 className="mt-1 text-balance text-[clamp(1.7rem,3.9vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.01em]">
          {guestFirstName ? `Welcome, ${guestFirstName}` : 'Welcome'}
        </h1>
        {specialOccasion && (
          <span className="mt-3 inline-flex items-center gap-[0.45em] rounded-full border border-[color:var(--gold)] px-[0.85em] py-[0.32em] text-[clamp(0.72rem,1vw,0.85rem)] font-bold tracking-[0.03em] text-[color:var(--gold-soft)]">
            <GiftIcon className="h-[1em] w-[1em]" />
            {specialOccasion} Stay
          </span>
        )}
        {welcomeMessage && (
          <p className="mt-[0.85em] line-clamp-2 max-w-[46ch] text-[clamp(0.82rem,1.15vw,1rem)] text-[color:var(--ink-dim)]">
            {welcomeMessage}
          </p>
        )}
      </div>

      <div className="relative mt-auto flex flex-none gap-[clamp(1.4rem,3vw,2.6rem)] border-t border-[color:var(--hairline)] pt-[clamp(0.8rem,2vh,1.4rem)]">
        {checkoutLabel && <Stat label="Checkout" value={checkoutLabel} />}
        {hotelSettings.wifi_ssid && <Stat label="Wi-Fi Network" value={hotelSettings.wifi_ssid} />}
        {breakfast && <Stat label="Breakfast" value={breakfast} />}
      </div>
    </FocusableCard>
  );
}
