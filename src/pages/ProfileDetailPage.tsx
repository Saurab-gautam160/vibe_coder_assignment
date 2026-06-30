import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ShortlistButton } from "@/components/ShortlistButton";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useShortlistStore } from "@/store/shortlistStore";
import type { FullUserProfile, Platform, UserProfileSummary } from "@/types";
import { extractProfiles } from "@/utils/dataHelpers";
import { loadProfileByUsername } from "@/utils/profileLoader";

const platformTheme: Record<
  Platform,
  { banner: string; badge: string; accent: string }
> = {
  instagram: {
    banner: "bg-linear-to-br from-pink-600/30 via-purple-600/20 to-slate-900",
    badge: "bg-pink-500/20 text-pink-200 border-pink-500/30",
    accent: "text-pink-300",
  },
  youtube: {
    banner: "bg-linear-to-br from-red-600/30 via-rose-600/15 to-slate-900",
    badge: "bg-red-500/20 text-red-200 border-red-500/30",
    accent: "text-red-300",
  },
  tiktok: {
    banner: "bg-linear-to-br from-cyan-500/25 via-teal-500/15 to-slate-900",
    badge: "bg-cyan-500/20 text-cyan-100 border-cyan-500/30",
    accent: "text-cyan-300",
  },
};

function toSummary(profile: FullUserProfile): UserProfileSummary {
  return {
    user_id: profile.user_id,
    username: profile.username,
    url: profile.url,
    picture: profile.picture,
    fullname: profile.fullname,
    is_verified: profile.is_verified,
    followers: profile.followers,
    engagements: profile.engagements,
    engagement_rate: profile.engagement_rate,
  };
}

// Added this to handle massive numbers gracefully (e.g. 651.6M instead of 651,606,250)
function formatCompactNumber(value?: number) {
  if (value == null) return "N/A";
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatNumber(value?: number) {
  if (value == null) return "N/A";
  return value.toLocaleString();
}

function formatRate(value?: number) {
  if (value == null) return "N/A";
  return `${(value * 100).toFixed(2)}%`;
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const platform = (searchParams.get("platform") as Platform) || "instagram";
  const [profile, setProfile] = useState<FullUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const addProfile = useShortlistStore((s) => s.addProfile);
  const removeProfile = useShortlistStore((s) => s.removeProfile);
  const isSelected = useShortlistStore((s) =>
    profile ? s.isSelected(profile.user_id) : false,
  );

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      if (!username) return;

      setLoading(true);

      const response = await loadProfileByUsername(username);
      const detailed = response?.data?.user_profile ?? null;

      if (!cancelled) {
        if (detailed) {
          setProfile(detailed);
        } else {
          const fallback = extractProfiles(platform).find(
            (p) => p.username.toLowerCase() === username.toLowerCase(),
          );
          setProfile(fallback ?? null);
        }
        setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [username, platform]);

  const theme = platformTheme[platform];

  if (loading) {
    return (
      <Layout>
        <BackButton onClick={() => navigate(-1)} />
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl">
          <div className="h-48 w-full bg-white/5 animate-pulse" />
          <div className="relative -mt-16 px-6 pb-8 sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end">
                <div className="h-28 w-28 rounded-2xl bg-slate-800 ring-4 ring-slate-900 animate-pulse sm:h-32 sm:w-32" />
                <div className="flex-1 space-y-3 pb-1 w-48">
                  <div className="h-8 w-full rounded-lg bg-white/10 animate-pulse" />
                  <div className="h-4 w-32 rounded-lg bg-white/5 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <BackButton onClick={() => navigate(-1)} />
        <div className="flex flex-col items-center justify-center py-24 bg-slate-800/20 rounded-3xl border border-slate-700/30 backdrop-blur-md shadow-inner text-center">
          <div className="text-6xl mb-5 opacity-50 drop-shadow-lg">🕵️‍♂️</div>
          <h2 className="mb-2 text-xl font-bold text-white tracking-tight">
            Profile not found
          </h2>
          <p className="text-slate-400 font-medium">
            We couldn&apos;t find data for @{username} on {platform}.
          </p>
        </div>
      </Layout>
    );
  }

  const summary = toSummary(profile);
  const postsCount =
    profile.posts_count ?? (profile as { posts?: number }).posts;

  return (
    <Layout>
      <BackButton onClick={() => navigate(-1)} />

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/40">
        <div className={`relative px-6 pt-8 pb-24 sm:px-10 ${theme.banner}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />

          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${theme.badge}`}
              >
                {platform}
              </span>
              {profile.is_verified && (
                <span className="rounded-full border border-sky-500/30 bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200">
                  Verified
                </span>
              )}
            </div>

            <ShortlistButton
              size="lg"
              isSelected={isSelected}
              onToggle={(e) => {
                e.stopPropagation();
                if (isSelected) {
                  removeProfile(profile.user_id);
                } else {
                  addProfile(summary);
                }
              }}
            />
          </div>
        </div>

        <div className="relative -mt-16 px-6 pb-8 sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end">
              <img
                src={profile.picture}
                alt={profile.fullname}
                className="h-28 w-28 rounded-2xl object-cover ring-4 ring-slate-900 shadow-2xl sm:h-32 sm:w-32"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullname)}&background=1e293b&color=fff`;
                }}
              />
              <div className="pb-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    {profile.fullname}
                  </h1>
                  <VerifiedBadge verified={profile.is_verified} />
                </div>
                <p className={`text-lg font-medium ${theme.accent}`}>
                  @{profile.username}
                </p>
                {profile.description && (
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                    {profile.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {/* Switched the massive numbers to use formatCompactNumber */}
            <StatBox
              label="Followers"
              value={formatCompactNumber(profile.followers)}
              highlight
            />
            <StatBox
              label="Engagement"
              value={formatRate(profile.engagement_rate)}
            />
            <StatBox label="Posts" value={formatNumber(postsCount)} />
            <StatBox
              label="Avg likes"
              value={formatCompactNumber(profile.avg_likes)}
            />
            <StatBox
              label="Avg comments"
              value={formatCompactNumber(profile.avg_comments)}
            />
            <StatBox
              label="Engagements"
              value={formatCompactNumber(profile.engagements)}
            />
          </div>

          {(profile.avg_views || profile.gender || profile.age_group) && (
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.avg_views != null && profile.avg_views > 0 && (
                <MetaChip
                  label={`${formatCompactNumber(profile.avg_views)} avg views`}
                />
              )}
              {profile.gender && <MetaChip label={profile.gender} />}
              {profile.age_group && (
                <MetaChip label={`Age ${profile.age_group}`} />
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-white"
    >
      ← Back to search
    </button>
  );
}

function StatBox({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      /* THIS IS THE FIX: min-w-0 flex flex-col justify-center strictly contains the text */
      className={`min-w-0 flex flex-col justify-center rounded-2xl border p-4 transition-colors ${
        highlight
          ? "border-indigo-500/30 bg-indigo-500/10"
          : "border-white/10 bg-white/5 hover:border-indigo-500/20 hover:bg-indigo-500/5"
      }`}
    >
      {/* Added truncate so it cuts off instead of breaking the layout */}
      <span className="mb-1 block truncate text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      {/* Added truncate and a title attribute so users can hover to see the full number */}
      <span
        className={`block truncate text-lg font-bold sm:text-xl ${highlight ? "text-indigo-200" : "text-white"}`}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

function MetaChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
      {label}
    </span>
  );
}
