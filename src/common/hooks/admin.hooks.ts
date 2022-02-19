import create from "zustand";

type AdminState = {
  status: "unset" | "anonymous" | "admin";
  isAdmin: boolean;
  setStatus: (status: AdminState["status"]) => void;
};

export const useAdminStore = create<AdminState>((set) => ({
  status: "unset",
  isAdmin: false,
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
