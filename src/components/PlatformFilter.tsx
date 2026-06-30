import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const platformConfig: Record<
  Platform,
  {
    activeBorder: string;
    activeBg: string;
    activeGlow: string;
    iconBg: string;
    icon: React.ReactNode;
  }
> = {
  instagram: {
    activeBorder: "border-pink-500/60",
    activeBg: "bg-pink-500/10",
    activeGlow: "shadow-pink-500/20",
    iconBg: "bg-linear-to-br from-pink-500 to-purple-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  youtube: {
    activeBorder: "border-red-500/60",
    activeBg: "bg-red-500/10",
    activeGlow: "shadow-red-500/20",
    iconBg: "bg-linear-to-br from-red-500 to-rose-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  tiktok: {
    activeBorder: "border-cyan-400/60",
    activeBg: "bg-cyan-500/10",
    activeGlow: "shadow-cyan-500/20",
    iconBg: "bg-linear-to-br from-cyan-400 to-teal-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
};

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  const activeConfig = platformConfig[selected];

  return (
    <div className="mx-auto mb-10 w-full max-w-3xl">
      <div className="group relative mb-8">
        <div
          className={`pointer-events-none absolute -inset-px rounded-2xl opacity-60 blur-sm transition-opacity duration-300 group-focus-within:opacity-100 ${activeConfig.activeBg}`}
        />
        <div
          className={`relative flex items-center gap-3 rounded-2xl border bg-slate-950/90 px-4 py-3.5 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all group-focus-within:border-white/20 ${activeConfig.activeBorder}`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-colors group-focus-within:text-indigo-300">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search creators..."
            className="
            w-full bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 text-white 
            pl-12 sm:pl-16 /* Less left-padding on mobile */
            pr-4 sm:pr-6 
            py-3 sm:py-4 /* Thinner on mobile */
            rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
            transition-all duration-300 shadow-xl placeholder:text-slate-400 
            text-base sm:text-lg /* Standard text on mobile, large on desktop */
          "
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {PLATFORMS.map((platform) => {
          const config = platformConfig[platform];
          const isActive = selected === platform;

          return (
            <button
              key={platform}
              type="button"
              onClick={() => onChange(platform)}
              aria-pressed={isActive}
              className={`group/btn flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                isActive
                  ? `${config.activeBorder} ${config.activeBg} shadow-lg ${config.activeGlow} scale-[1.02]`
                  : "border-white/8 bg-slate-900/50 hover:border-white/15 hover:bg-slate-900/80"
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-lg transition-transform group-hover/btn:scale-105 ${config.iconBg}`}
              >
                {config.icon}
              </span>
              <div className="min-w-0">
                <p
                  className={`truncate text-sm font-bold ${isActive ? "text-white" : "text-slate-300"}`}
                >
                  {getPlatformLabel(platform)}
                </p>
                <p className="text-xs text-slate-500">
                  {isActive ? "Currently browsing" : "Switch platform"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
