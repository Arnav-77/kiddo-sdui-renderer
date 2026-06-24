import React, { createContext, useContext } from 'react';
import type { Theme } from '../types/sdui';

// Default fallbacks for optional theme fields. These are the ONLY hardcoded
// colors allowed outside Placeholder.tsx (CLAUDE.md rule 7) — they exist so
// consumers of useTheme() always receive strings, never undefined.
const ACCENT_FALLBACK = '#666';
const TEXT_FALLBACK = '#1F2937';

// Resolved theme: every field is a guaranteed string after merging defaults.
export type ResolvedTheme = Required<Theme>;

const ThemeContext = createContext<Theme | null>(null);

// Theme values come entirely from the payload, so visual changes ship without
// an app update; nothing downstream hardcodes colors.
export function ThemeProvider({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

// Merge sensible defaults for optional fields so consumers get strings.
function withDefaults(theme: Theme): ResolvedTheme {
  return {
    primary: theme.primary,
    background: theme.background,
    accent: theme.accent ?? ACCENT_FALLBACK,
    text: theme.text ?? TEXT_FALLBACK,
  };
}

// Throws if used outside a ThemeProvider — intentional, surfaces wiring bugs
// early rather than silently rendering with undefined colors.
export function useTheme(): ResolvedTheme {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return withDefaults(theme);
}
