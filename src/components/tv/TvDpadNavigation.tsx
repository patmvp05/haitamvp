'use client';

import { useEffect } from 'react';

type TvSection = 'hero' | 'recommendations' | 'actions';

const FOCUSABLE_SELECTOR = '[data-tv-focusable="true"]';

function sectionElements(
  screen: HTMLElement,
  section: TvSection,
): HTMLElement[] {
  return Array.from(
    screen.querySelectorAll<HTMLElement>(
      `${FOCUSABLE_SELECTOR}[data-tv-section="${section}"]`,
    ),
  );
}

function focusTarget(target: HTMLElement | undefined): void {
  if (!target) return;

  target.focus({ preventScroll: true });
  target.scrollIntoView({
    behavior: 'auto',
    block: 'nearest',
    inline: 'nearest',
  });
}

function mapIndex(
  sourceIndex: number,
  sourceLength: number,
  targetLength: number,
): number {
  if (sourceLength <= 1 || targetLength <= 1) return 0;
  return Math.round(
    (sourceIndex / (sourceLength - 1)) * (targetLength - 1),
  );
}

/**
 * Makes the screen's axes explicit instead of depending on each kiosk
 * browser's spatial-navigation heuristics:
 * - Up/down: welcome hero → recommendations → action dock.
 * - Left/right: neighboring recommendations or neighboring dock actions.
 */
export function TvDpadNavigation() {
  useEffect(() => {
    const screen = document.querySelector<HTMLElement>('[data-tv-screen]');
    if (!screen) return;

    let lastRecommendationIndex = 0;
    let lastActionIndex = 0;

    const initialFocusFrame = requestAnimationFrame(() => {
      if (
        document.activeElement instanceof HTMLElement &&
        screen.contains(document.activeElement) &&
        document.activeElement.matches(FOCUSABLE_SELECTOR)
      ) {
        return;
      }

      focusTarget(
        sectionElements(screen, 'hero')[0] ??
          sectionElements(screen, 'recommendations')[0] ??
          sectionElements(screen, 'actions')[0],
      );
    });

    function handleFocusIn(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement)) return;

      const section = event.target.dataset.tvSection as TvSection | undefined;
      if (section === 'recommendations') {
        const recommendations = sectionElements(screen!, 'recommendations');
        lastRecommendationIndex = Math.max(
          0,
          recommendations.indexOf(event.target),
        );
      } else if (section === 'actions') {
        const actions = sectionElements(screen!, 'actions');
        lastActionIndex = Math.max(0, actions.indexOf(event.target));
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (
        !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(
          event.key,
        )
      ) {
        return;
      }

      const active =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      if (!active || !screen!.contains(active)) {
        event.preventDefault();
        focusTarget(
          sectionElements(screen!, 'hero')[0] ??
            sectionElements(screen!, 'recommendations')[0] ??
            sectionElements(screen!, 'actions')[0],
        );
        return;
      }

      const section = active.dataset.tvSection as TvSection | undefined;
      if (!section) return;

      const currentSection = sectionElements(screen!, section);
      const currentIndex = Math.max(0, currentSection.indexOf(active));
      const recommendations = sectionElements(screen!, 'recommendations');
      const actions = sectionElements(screen!, 'actions');
      let target: HTMLElement | undefined;

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const direction = event.key === 'ArrowLeft' ? -1 : 1;
        target = currentSection[currentIndex + direction];
      } else if (section === 'hero' && event.key === 'ArrowDown') {
        event.preventDefault();
        target =
          recommendations[lastRecommendationIndex] ??
          recommendations[0] ??
          actions[lastActionIndex] ??
          actions[0];
      } else if (section === 'recommendations' && event.key === 'ArrowUp') {
        event.preventDefault();
        target = sectionElements(screen!, 'hero')[0];
      } else if (
        section === 'recommendations' &&
        event.key === 'ArrowDown'
      ) {
        event.preventDefault();
        lastActionIndex = mapIndex(
          currentIndex,
          recommendations.length,
          actions.length,
        );
        target = actions[lastActionIndex];
      } else if (section === 'actions' && event.key === 'ArrowUp') {
        event.preventDefault();
        target =
          recommendations[lastRecommendationIndex] ??
          recommendations[0] ??
          sectionElements(screen!, 'hero')[0];
      } else {
        // Hold the edge instead of allowing native spatial navigation to jump
        // to an unrelated section or browser chrome.
        event.preventDefault();
      }

      focusTarget(target);
    }

    screen.addEventListener('focusin', handleFocusIn);
    screen.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(initialFocusFrame);
      screen.removeEventListener('focusin', handleFocusIn);
      screen.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
