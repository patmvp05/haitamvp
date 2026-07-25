import { RecommendationCard } from './RecommendationCard';
import type { RecommendationRecord } from '@/lib/data/types';

export function RecommendationsList({
  recommendations,
}: {
  recommendations: RecommendationRecord[];
}) {
  return (
    <div
      data-tv-focus-group="recommendations"
      className="flex h-full min-h-0 flex-col border-t border-[color:var(--hairline)] p-[clamp(0.8rem,1.8vh,1.3rem)_clamp(1.2rem,3vw,2.4rem)]"
    >
      <div className="flex flex-none items-baseline gap-[0.6em]">
        <span className="text-[clamp(0.68rem,0.95vw,0.8rem)] font-bold uppercase tracking-[0.14em] text-[color:var(--gold-soft)]">
          Things To Do Nearby
        </span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
      </div>
      {recommendations.length === 0 ? (
        <p className="mt-4 text-[color:var(--ink-dim)]">No recommendations available.</p>
      ) : (
        <div className="tv-recommendations-row mt-[clamp(0.45rem,1vh,0.7rem)] flex min-h-0 flex-1 gap-[clamp(0.55rem,1.1vw,1rem)] overflow-x-auto overflow-y-hidden p-[0.4rem]">
          {recommendations.map((rec, index) => (
            <RecommendationCard key={rec.id} rec={rec} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
