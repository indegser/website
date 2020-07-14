import create from "zustand";

interface AuthStore {
  auth: "ADMIN" | "ANONYMOUS" | "NONE";
  setAuth: (auth: AuthStore["auth"]) => void;
}

export const [useAuthStore] = create<AuthStore>((set) => ({
  auth: "NONE",
  setAuth: (auth) => set({ auth }),
}));
