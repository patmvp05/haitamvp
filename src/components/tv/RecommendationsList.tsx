'use client';

import { RecommendationCard } from './RecommendationCard';
import { useTvLanguage } from './TvLanguageProvider';
import type { RecommendationRecord } from '@/lib/data/types';

export function RecommendationsList({
  recommendations,
}: {
  recommendations: RecommendationRecord[];
}) {
  const { messages } = useTvLanguage();

  return (
    <section
      data-tv-focus-group="recommendations"
      className="grid h-full min-h-0 grid-cols-[18fr_82fr] border-t border-[color:var(--hairline)] bg-[color:var(--ground)]"
    >
      <div className="flex min-w-0 items-end p-[clamp(0.9rem,1.8vw,1.5rem)_clamp(1.2rem,3vw,2.4rem)]">
        <h2 className="max-w-[12ch] text-balance text-[clamp(1rem,1.45vw,1.3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[color:var(--gold-soft)]">
          {messages.recommendationsTitle}
        </h2>
      </div>
      {recommendations.length === 0 ? (
        <p className="flex items-center border-l border-[color:var(--hairline)] px-8 text-[color:var(--ink-dim)]">
          {messages.noRecommendations}
        </p>
      ) : (
        <div className="tv-recommendations-row flex min-h-0 overflow-x-auto overflow-y-hidden">
          {recommendations.map((rec, index) => (
            <RecommendationCard key={rec.id} rec={rec} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
