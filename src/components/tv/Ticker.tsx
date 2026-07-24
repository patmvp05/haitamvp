import { RadioIcon } from './icons';

/**
 * Scrolling ambient-info strip (breakfast hours, service reminders). Pure CSS
 * animation defined in globals.css (`.animate-ticker`), which itself respects
 * prefers-reduced-motion — no client JS needed for the scroll itself.
 */
export function Ticker({ text }: { text: string }) {
  return (
    <div className="flex min-w-0 items-center gap-[0.7em] text-[clamp(0.74rem,1vw,0.88rem)] text-[color:var(--ink-dim)]">
      <RadioIcon className="h-[1.1em] w-[1.1em] shrink-0 text-[color:var(--rose)]" />
      <div className="relative min-w-0 flex-1 overflow-hidden whitespace-nowrap">
        <span className="animate-ticker inline-block pl-[100%]">{text}</span>
      </div>
    </div>
  );
}
