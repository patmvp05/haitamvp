import { PinIcon } from './icons';
import type { RecommendationRecord } from '@/lib/data/types';

/**
 * Informational only — deliberately NOT a FocusableCard. Giving the D-pad a
 * focus stop with no action attached is worse UX than no stop at all.
 */
export function RecommendationCard({ rec }: { rec: RecommendationRecord }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-[clamp(0.15em,0.6vh,0.5em)] overflow-hidden rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--ground-2)] p-[clamp(0.45rem,1vw,0.95rem)]">
      <PinIcon className="h-[1.15em] w-[1.15em] shrink-0 text-[color:var(--gold)]" />
      <div className="truncate text-[clamp(0.78rem,1vw,0.92rem)] font-bold leading-tight">
        {rec.name}
      </div>
      {rec.description && (
        <div className="rec-desc truncate text-[clamp(0.68rem,0.88vw,0.8rem)] leading-tight text-[color:var(--ink-dim)]">
          {rec.description}
        </div>
      )}
      <div className="mt-auto truncate text-[clamp(0.66rem,0.85vw,0.76rem)] text-[color:var(--ink-faint)]">
        {[rec.distance_label, rec.category].filter(Boolean).join(' · ')}
      </div>
    </div>
  );
}
