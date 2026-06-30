import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileListProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {profiles.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-900/30 px-6 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-3xl">
            🔍
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">
            No creators found
          </h3>
          <p className="max-w-sm text-slate-400">
            Try a different search term or switch to another platform.
          </p>
        </div>
      )}

      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}
