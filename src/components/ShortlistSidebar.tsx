import { Link } from "react-router-dom";
import { useShortlistStore } from "@/store/shortlistStore";

function formatFollowers(count: number) {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(0) + "K";
  return String(count);
}

export function ShortlistSidebar() {
  const profiles = useShortlistStore((state) => state.profiles);
  const removeProfile = useShortlistStore((state) => state.removeProfile);

  return (
    <aside className="glass-panel rounded-3xl p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Your Shortlist</h2>
        <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-bold text-indigo-300">
          {profiles.length}
        </span>
      </div>

      {profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-12 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl">
            ☆
          </div>
          <p className="text-sm font-medium text-slate-300">
            Nothing saved yet
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Tap Shortlist on any creator to add them here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {profiles.slice(0, 6).map((profile) => (
            <div
              key={profile.user_id}
              className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/2 p-2.5 transition-colors hover:border-indigo-500/20 hover:bg-indigo-500/5"
            >
              <img
                src={profile.picture}
                alt={profile.fullname}
                className="h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-white/10"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(profile.fullname) +
                    "&background=6366f1&color=fff";
                }}
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {profile.fullname}
                </p>
                <p className="truncate text-xs text-slate-500">
                  @{profile.username} · {formatFollowers(profile.followers)}
                </p>
              </div>

              <button
                onClick={() => removeProfile(profile.user_id)}
                className="rounded-lg px-2 py-1 text-xs font-medium text-slate-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-400"
                aria-label={`Remove ${profile.fullname}`}
              >
                ✕
              </button>
            </div>
          ))}

          {profiles.length > 6 && (
            <p className="pt-1 text-center text-xs text-slate-500">
              +{profiles.length - 6} more in full list
            </p>
          )}

          <Link
            to="/shortlist"
            className="mt-4 block rounded-xl bg-indigo-500 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-400 active:scale-[0.98]"
          >
            View full shortlist
          </Link>
        </div>
      )}
    </aside>
  );
}
