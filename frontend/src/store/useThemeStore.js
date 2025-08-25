import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamify-theme") || "dark",
  setTheme: (theme) => {
    // always updating localStorage
    localStorage.setItem("streamify-theme", theme);
    set({ theme });
  },
}));