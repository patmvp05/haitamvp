'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import { FocusableCard } from './FocusableCard';
import { CheckIcon, LanguageIcon } from './icons';
import { useTvLanguage } from './TvLanguageProvider';
import { TV_LANGUAGES, type TvLanguage } from '@/lib/i18n/tv';

const TRIGGER_ID = 'tv-language-trigger';
const OPTION_ID_PREFIX = 'tv-language-option-';

interface LanguageSelectorProps {
  tvIndex: number;
  actionClassName: string;
  labelClassName: string;
}

function optionId(language: TvLanguage): string {
  return `${OPTION_ID_PREFIX}${language}`;
}

function focusLanguageOption(language: TvLanguage): void {
  document.getElementById(optionId(language))?.focus({ preventScroll: true });
}

export function LanguageSelector({
  tvIndex,
  actionClassName,
  labelClassName,
}: LanguageSelectorProps) {
  const { language, messages, setLanguage } = useTvLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => focusLanguageOption(language));
    return () => cancelAnimationFrame(frame);
  }, [language, open]);

  function closeMenu() {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(TRIGGER_ID)?.focus({ preventScroll: true });
    });
  }

  function chooseLanguage(nextLanguage: TvLanguage) {
    setLanguage(nextLanguage);
    closeMenu();
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
      return;
    }

    if (
      !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(
        event.key,
      )
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    const currentIndex = TV_LANGUAGES.findIndex(
      ({ code }) => optionId(code) === document.activeElement?.id,
    );
    if (currentIndex < 0) {
      focusLanguageOption(language);
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') return;
    const direction = event.key === 'ArrowLeft' ? -1 : 1;
    const nextIndex =
      (currentIndex + direction + TV_LANGUAGES.length) % TV_LANGUAGES.length;
    focusLanguageOption(TV_LANGUAGES[nextIndex].code);
  }

  return (
    <>
      <FocusableCard
        id={TRIGGER_ID}
        onClick={() => setOpen(true)}
        tvSection="actions"
        tvIndex={tvIndex}
        focusScale={1.035}
        pressedScale={0.985}
        className={actionClassName}
        aria-label={messages.chooseLanguage}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <LanguageIcon className="h-[1.2em] w-[1.2em] shrink-0 text-[color:var(--gold)]" />
        <span className={labelClassName}>{messages.language}</span>
        <span className="border-l border-[color:var(--hairline)] pl-[0.55em] text-[clamp(0.62rem,0.76vw,0.7rem)] font-bold text-[color:var(--gold-soft)]">
          {TV_LANGUAGES.find(({ code }) => code === language)?.shortLabel}
        </span>
      </FocusableCard>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tv-language-title"
          onKeyDown={handleMenuKeyDown}
          className="absolute inset-0 z-50 flex items-center justify-center bg-[rgba(14,9,16,0.88)] p-[clamp(2rem,6vw,6rem)] backdrop-blur-[3px]"
        >
          <div className="w-full max-w-[60rem] border border-[color:var(--hairline)] bg-[color:var(--panel)] p-[clamp(1.5rem,3vw,3rem)] shadow-[0_2rem_5rem_rgba(0,0,0,0.48)]">
            <div className="flex items-end justify-between gap-8 border-b border-[color:var(--hairline)] pb-[clamp(1rem,2vw,1.6rem)]">
              <h2
                id="tv-language-title"
                className="text-[clamp(1.7rem,3vw,3rem)] font-semibold tracking-[-0.035em]"
              >
                {messages.chooseLanguage}
              </h2>
              <p className="pb-[0.25em] text-[clamp(0.72rem,0.95vw,0.9rem)] text-[color:var(--ink-dim)]">
                {messages.languageHint}
              </p>
            </div>

            <div className="mt-[clamp(1.2rem,2.5vw,2.2rem)] grid grid-cols-4 gap-[clamp(0.5rem,1vw,0.9rem)]">
              {TV_LANGUAGES.map((option) => {
                const selected = option.code === language;
                return (
                  <FocusableCard
                    key={option.code}
                    id={optionId(option.code)}
                    onClick={() => chooseLanguage(option.code)}
                    focusScale={1.04}
                    pressedScale={0.98}
                    aria-label={`${option.nativeLabel}${selected ? `, ${messages.selected}` : ''}`}
                    aria-pressed={selected}
                    className="tv-focusable-inset flex min-h-[8rem] flex-col items-start justify-between border border-[color:var(--hairline)] bg-[color:var(--ground-2)] p-[clamp(0.9rem,1.7vw,1.5rem)] text-left"
                  >
                    <span className="flex w-full items-center justify-between text-[clamp(0.65rem,0.82vw,0.76rem)] font-bold tracking-[0.08em] text-[color:var(--gold-soft)]">
                      {option.shortLabel}
                      {selected && (
                        <CheckIcon className="h-[1.25em] w-[1.25em]" />
                      )}
                    </span>
                    <span className="text-[clamp(1rem,1.5vw,1.35rem)] font-semibold">
                      {option.nativeLabel}
                    </span>
                  </FocusableCard>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
