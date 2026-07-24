import { FocusableCard } from './FocusableCard';

/**
 * Placeholder entertainment entry point. Points at the hotel's Jellyfin server
 * URL from hotel_settings; falls back to a disabled-looking "#" if unset.
 */
export function MovieButton({ jellyfinUrl }: { jellyfinUrl: string | null }) {
  return (
    <FocusableCard
      href={jellyfinUrl ?? '#'}
      external={Boolean(jellyfinUrl)}
      className="flex h-full items-center justify-center text-center"
    >
      <span className="text-3xl font-bold">🎬 Watch Movies</span>
    </FocusableCard>
  );
}
