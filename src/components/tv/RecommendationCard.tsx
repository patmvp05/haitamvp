import type { RecommendationRecord } from '@/lib/data/types';

/**
 * Informational only — deliberately NOT a FocusableCard. Giving the D-pad a
 * focus stop with no action attached is worse UX than no stop at all.
 */
export function RecommendationCard({ rec }: { rec: RecommendationRecord }) {
  return (
    <div className="rounded-xl bg-neutral-900 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-xl font-semibold">{rec.name}</h3>
        {rec.category && (
          <span className="shrink-0 text-sm font-medium text-amber-300">
            {rec.category}
          </span>
        )}
      </div>
      <p className="mt-1 text-base text-neutral-300">{rec.description}</p>
      <div className="mt-2 flex flex-wrap gap-4 text-sm text-neutral-400">
        {rec.distance_label && <span>📍 {rec.distance_label}</span>}
        {rec.hours_label && <span>🕒 {rec.hours_label}</span>}
      </div>
    </div>
  );
}
