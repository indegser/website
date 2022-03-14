import create from "zustand";

type State = {
  theme: "dark" | "light";
  setTheme: (theme: State["theme"]) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<State>((set, get) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => {
    const { theme } = get();
    set({ theme: theme === "dark" ? "light" : "dark" });
  },
}));
