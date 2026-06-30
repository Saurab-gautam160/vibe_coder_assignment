import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { ShortlistButton } from "./ShortlistButton";
import { useShortlistStore } from "@/store/shortlistStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowers(count: number) {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(0) + "K";
  return String(count);
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const addProfile = useShortlistStore((s) => s.addProfile);
  const removeProfile = useShortlistStore((s) => s.removeProfile);

  const isSelected = useShortlistStore((s) => s.isSelected(profile.user_id));

  const handleCardClick = () => {
    onProfileClick?.(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <article
      onClick={handleCardClick}
      data-search={searchQuery}
      className={`group flex cursor-pointer items-center justify-between gap-3 sm:gap-4 overflow-hidden rounded-2xl border p-3 sm:p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/10 ${
        isSelected
          ? "border-indigo-500/40 bg-indigo-500/5 shadow-lg shadow-indigo-500/5"
          : "border-white/10 bg-slate-900/50 hover:border-indigo-500/30 hover:bg-slate-900/70"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        <div className="relative shrink-0">
          <img
            src={profile.picture}
            alt={profile.fullname}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(profile.fullname) +
                "&background=6366f1&color=fff";
            }}
            /* Avatar scales down on mobile */
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl object-cover ring-2 ring-white/10 transition-all group-hover:ring-indigo-400/50"
          />
          {isSelected && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-indigo-500 text-[9px] sm:text-[10px] text-white shadow-md">
              ✓
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-2">
            <h3 className="truncate text-sm sm:text-base font-semibold text-white">
              {profile.fullname}
            </h3>
            <VerifiedBadge verified={profile.is_verified} />
          </div>

          <p className="truncate text-xs sm:text-sm text-indigo-300/80">
            @{profile.username}
          </p>

          <p className="mt-1 inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 sm:px-2.5 text-[10px] sm:text-xs font-medium text-slate-400">
            {formatFollowers(profile.followers)} followers
          </p>
        </div>
      </div>

      {/* Button wrapped in a shrink-0 container so it doesn't get squished by long names */}
      <div className="shrink-0 flex-none">
        <ShortlistButton
          isSelected={isSelected}
          onToggle={(e) => {
            e.stopPropagation();
            if (isSelected) {
              removeProfile(profile.user_id);
            } else {
              addProfile(profile);
            }
          }}
        />
      </div>
    </article>
  );
}
