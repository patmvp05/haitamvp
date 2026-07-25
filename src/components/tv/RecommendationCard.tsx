import { FocusableCard } from './FocusableCard';
import type { RecommendationRecord } from '@/lib/data/types';

/**
 * A browsable information surface: left/right moves through the hotel-curated
 * row, while the card keeps only the name and at-a-glance location metadata
 * visible at a ten-foot viewing distance.
 */
export function RecommendationCard({
  rec,
  index,
}: {
  rec: RecommendationRecord;
  index: number;
}) {
  const meta = [rec.distance_label, rec.category].filter(Boolean).join(' · ');

  return (
    <FocusableCard
      tvSection="recommendations"
      tvIndex={index}
      focusScale={1.025}
      pressedScale={0.985}
      aria-label={[rec.name, meta].filter(Boolean).join('. ')}
      className="tv-focusable-inset my-[0.35rem] flex min-h-0 min-w-[27%] basis-[27%] flex-col justify-between overflow-hidden border-l border-[color:var(--hairline)] bg-[color:var(--ground)] p-[clamp(0.8rem,1.6vw,1.35rem)]"
    >
      <div className="truncate text-[clamp(0.68rem,0.88vw,0.78rem)] text-[color:var(--ink-dim)]">
        {meta}
      </div>
      <div className="line-clamp-2 text-[clamp(1rem,1.42vw,1.28rem)] font-semibold leading-[1.08] tracking-[-0.018em]">
        {rec.name}
      </div>
    </FocusableCard>
  );
}
