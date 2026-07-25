'use client';

import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {
  normalizeTvLanguage,
  parseTvLanguage,
  TV_MESSAGES,
  type TvLanguage,
  type TvMessages,
} from '@/lib/i18n/tv';

const STORAGE_KEY = 'haita-tv-language';
const LANGUAGE_CHANGE_EVENT = 'haita-tv-language-change';
let inMemoryLanguage: TvLanguage | null = null;

interface TvLanguageContextValue {
  language: TvLanguage;
  messages: TvMessages;
  setLanguage: (language: TvLanguage) => void;
}

const TvLanguageContext = createContext<TvLanguageContextValue | null>(null);

function subscribeToLanguagePreference(onStoreChange: () => void): () => void {
  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) onStoreChange();
  }

  window.addEventListener('storage', handleStorage);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  };
}

function readLanguagePreference(defaultLanguage: TvLanguage): TvLanguage {
  try {
    return (
      parseTvLanguage(window.localStorage.getItem(STORAGE_KEY)) ??
      inMemoryLanguage ??
      defaultLanguage
    );
  } catch {
    return inMemoryLanguage ?? defaultLanguage;
  }
}

export function TvLanguageProvider({
  initialLanguage,
  children,
}: {
  initialLanguage: string | null | undefined;
  children: ReactNode;
}) {
  const defaultLanguage = normalizeTvLanguage(initialLanguage);
  const language = useSyncExternalStore(
    subscribeToLanguagePreference,
    () => readLanguagePreference(defaultLanguage),
    () => defaultLanguage,
  );

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = language;
    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, [language]);

  const setLanguage = useCallback((nextLanguage: TvLanguage) => {
    inMemoryLanguage = nextLanguage;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch {
      // Some locked-down kiosk browsers disable storage. The in-memory
      // fallback still keeps language switching functional for this session.
    }
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }, []);

  const value = useMemo(
    () => ({
      language,
      messages: TV_MESSAGES[language],
      setLanguage,
    }),
    [language, setLanguage],
  );

  return (
    <TvLanguageContext.Provider value={value}>
      {children}
    </TvLanguageContext.Provider>
  );
}

export function useTvLanguage(): TvLanguageContextValue {
  const context = useContext(TvLanguageContext);
  if (!context) {
    throw new Error('useTvLanguage must be used inside TvLanguageProvider');
  }
  return context;
}
