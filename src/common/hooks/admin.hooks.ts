import { supabase } from "apis/supabase";
import create from "zustand";

type AdminState = {
  status: "unset" | "anonymous" | "admin";
  isAdmin: boolean;
  setStatus: (status: AdminState["status"]) => void;
};

const initialUser = supabase.auth.user();

export const useAdminStore = create<AdminState>((set) => ({
  status: initialUser === null ? "unset" : "admin",
  isAdmin: Boolean(initialUser),
  setStatus: (status) => {
    set({
      status,
      isAdmin: status === "admin",
    });
  },
}));

export const useIsAdmin = () => {
  return useAdminStore((s) => s.isAdmin);
};
