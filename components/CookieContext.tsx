"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type CookieCategory = "necessary" | "analytics" | "marketing" | "preferences";

export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp?: string;
  version: number;
}

interface CookieContextType {
  preferences: CookiePreferences;
  hasDecided: boolean;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  saveCustomPreferences: (prefs: Partial<CookiePreferences>) => void;
  resetPreferences: () => void;
}

const COOKIE_STORAGE_KEY = "unilife_cookie_consent_v1";
const CURRENT_VERSION = 1;

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
  version: CURRENT_VERSION,
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

function getInitialCookieState(): {
  prefs: CookiePreferences;
  decided: boolean;
} {
  if (typeof window === "undefined") {
    return { prefs: DEFAULT_PREFERENCES, decided: true };
  }
  try {
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (stored) {
      const parsed: CookiePreferences = JSON.parse(stored);
      if (parsed.version === CURRENT_VERSION) {
        return { prefs: { ...parsed, necessary: true }, decided: true };
      }
    }
    return { prefs: DEFAULT_PREFERENCES, decided: false };
  } catch {
    return { prefs: DEFAULT_PREFERENCES, decided: false };
  }
}

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    return getInitialCookieState().prefs;
  });
  const [hasDecided, setHasDecided] = useState<boolean>(() => {
    return getInitialCookieState().decided;
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Sync if storage changes in another tab
    const handleStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_STORAGE_KEY && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (parsed.version === CURRENT_VERSION) {
            setPreferences({ ...parsed, necessary: true });
            setHasDecided(true);
          }
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const persistConsent = (newPrefs: CookiePreferences) => {
    const finalPrefs = {
      ...newPrefs,
      necessary: true,
      timestamp: new Date().toISOString(),
      version: CURRENT_VERSION,
    };
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(finalPrefs));
      // Dispatch standard browser event so any third-party scripts or analytical tools can listen
      window.dispatchEvent(
        new CustomEvent("unilife_cookie_consent_updated", { detail: finalPrefs })
      );
    } catch (e) {
      console.error("Failed to save cookie consent:", e);
    }
    setPreferences(finalPrefs);
    setHasDecided(true);
    setIsSettingsOpen(false);
  };

  const acceptAll = () => {
    persistConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      version: CURRENT_VERSION,
    });
  };

  const rejectNonEssential = () => {
    persistConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      version: CURRENT_VERSION,
    });
  };

  const saveCustomPreferences = (prefs: Partial<CookiePreferences>) => {
    persistConsent({
      necessary: true,
      analytics: !!prefs.analytics,
      marketing: !!prefs.marketing,
      preferences: !!prefs.preferences,
      version: CURRENT_VERSION,
    });
  };

  const resetPreferences = () => {
    try {
      localStorage.removeItem(COOKIE_STORAGE_KEY);
    } catch {
      // ignore
    }
    setPreferences(DEFAULT_PREFERENCES);
    setHasDecided(false);
    setIsSettingsOpen(true);
  };

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasDecided,
        isSettingsOpen,
        openSettings,
        closeSettings,
        acceptAll,
        rejectNonEssential,
        saveCustomPreferences,
        resetPreferences,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieProvider");
  }
  return context;
}
