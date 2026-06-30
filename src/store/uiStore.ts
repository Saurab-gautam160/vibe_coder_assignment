import { create } from "zustand";

interface UIStore {
  platform: "instagram" | "youtube" | "tiktok";
  search: string;

  setPlatform: (platform: "instagram" | "youtube" | "tiktok") => void;
  setSearch: (value: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  platform: "instagram",
  search: "",

  setPlatform: (platform) => set({ platform }),

  setSearch: (search) => set({ search }),
}));
