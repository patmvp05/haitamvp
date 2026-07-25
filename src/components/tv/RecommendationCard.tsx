import { PinIcon } from './icons';
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
      focusScale={1.05}
      pressedScale={0.97}
      aria-label={[rec.name, meta].filter(Boolean).join('. ')}
      className="flex h-full min-h-0 min-w-[18.5%] basis-[18.5%] flex-col gap-[clamp(0.2em,0.7vh,0.55em)] overflow-hidden rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--ground-2)] p-[clamp(0.55rem,1.1vw,1rem)]"
    >
      <PinIcon className="h-[1.15em] w-[1.15em] shrink-0 text-[color:var(--gold)]" />
      <div className="line-clamp-2 text-[clamp(0.88rem,1.12vw,1rem)] font-bold leading-tight">
        {rec.name}
      </div>
      <div className="mt-auto truncate text-[clamp(0.72rem,0.92vw,0.82rem)] font-medium text-[color:var(--ink-dim)]">
        {meta}
      </div>
    </FocusableCard>
  );
}
