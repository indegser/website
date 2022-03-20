import create from "zustand";

type State = {
  theme: "system" | "dark" | "light";
  restoreCachedTheme: () => void;
  setTheme: (theme: State["theme"]) => void;
};

export type ThemeType = State["theme"];

const THEME_CACHE_KEY = "indegser-theme";

export const useThemeStore = create<State>((set) => ({
  theme: "light",
  restoreCachedTheme: () => {
    const theme = localStorage.getItem(THEME_CACHE_KEY) as ThemeType;
    if (!theme) return;

    set({ theme });
  },
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem(THEME_CACHE_KEY, theme);
  },
}));
