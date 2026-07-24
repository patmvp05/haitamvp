import { RecommendationCard } from './RecommendationCard';
import type { RecommendationRecord } from '@/lib/data/types';

export function RecommendationsList({
  recommendations,
}: {
  recommendations: RecommendationRecord[];
}) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl bg-neutral-950 p-2">
      <h2 className="mb-4 px-2 text-2xl font-bold">Things to Do Nearby</h2>
      {recommendations.length === 0 ? (
        <p className="px-2 text-lg text-neutral-400">No recommendations available.</p>
      ) : (
        // Two-column grid keeps five items on one screen; overflow-y-auto is a
        // safety net so extra items scroll within this panel rather than
        // pushing the page body into a scroll.
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-4 overflow-y-auto pr-1">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>
      )}
    </div>
  );
}
