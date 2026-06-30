import { Link } from "react-router-dom";
import { useShortlistStore } from "@/store/shortlistStore";
import { Layout } from "@/components/Layout";
import { ShortlistButton } from "@/components/ShortlistButton";
import { VerifiedBadge } from "@/components/VerifiedBadge";

function formatFollowers(count: number) {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(0) + "K";
  return String(count);
}

export function ShortlistPage() {
  const profiles = useShortlistStore((state) => state.profiles);
  const removeProfile = useShortlistStore((state) => state.removeProfile);
  const clear = useShortlistStore((state) => state.clear);

  return (
    <Layout>
      <section className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-400">
          Saved creators
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-gradient text-3xl font-extrabold sm:text-4xl">
              Your shortlist
            </h1>
            <p className="mt-2 text-slate-400">
              {profiles.length} {profiles.length === 1 ? "creator" : "creators"}{" "}
              ready for review
            </p>
          </div>

          {profiles.length > 0 && (
            <button
              onClick={clear}
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-300 transition-colors hover:bg-rose-500 hover:text-white"
            >
              Clear all
            </button>
          )}
        </div>
      </section>

      {profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-900/30 px-6 py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-3xl">
            ☆
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            No shortlisted creators
          </h2>
          <p className="mb-6 max-w-sm text-slate-400">
            Browse creators and add your favorites to build a shortlist.
          </p>
          <Link
            to="/"
            className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-400"
          >
            Browse creators
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {profiles.map((profile) => (
            <article
              key={profile.user_id}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-slate-900/50 p-4 transition-colors hover:border-indigo-500/30 hover:bg-slate-900/70"
            >
              <img
                src={profile.picture}
                alt={profile.fullname}
                className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-2 ring-white/10"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(profile.fullname) +
                    "&background=6366f1&color=fff";
                }}
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-lg font-semibold text-white">
                    {profile.fullname}
                  </h3>
                  <VerifiedBadge verified={profile.is_verified} />
                </div>
                <p className="text-sm text-indigo-300/80">
                  @{profile.username}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatFollowers(profile.followers)} followers
                </p>
              </div>

              <ShortlistButton
                isSelected
                onToggle={() => removeProfile(profile.user_id)}
              />
            </article>
          ))}
        </div>
      )}
    </Layout>
  );
}
