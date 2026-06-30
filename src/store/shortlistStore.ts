import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface ShortlistStore {
  profiles: UserProfileSummary[];

  addProfile: (profile: UserProfileSummary) => void;

  removeProfile: (userId: string) => void;

  isSelected: (userId: string) => boolean;

  clear: () => void;
}

export const useShortlistStore = create<ShortlistStore>()(
  persist(
    (set, get) => ({
      profiles: [],

      addProfile: (profile) => {
        const exists = get().profiles.some(
          (p) => p.user_id === profile.user_id,
        );

        if (exists) return;

        set({
          profiles: [...get().profiles, profile],
        });
      },

      removeProfile: (userId) =>
        set({
          profiles: get().profiles.filter((p) => p.user_id !== userId),
        }),

      isSelected: (userId) => get().profiles.some((p) => p.user_id === userId),

      clear: () => set({ profiles: [] }),
    }),
    {
      name: "shortlist-storage",
    },
  ),
);
