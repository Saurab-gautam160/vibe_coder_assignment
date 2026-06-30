import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useShortlistStore } from "@/store/shortlistStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children }: LayoutProps) {
  const count = useShortlistStore((s) => s.profiles.length);
  const location = useLocation();
  const isSearch = location.pathname === "/";
  const isShortlist = location.pathname === "/shortlist";

  return (
    <div className="min-h-screen text-slate-200">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-lg shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
              ✦
            </span>
            <div>
              <p className="text-lg font-bold tracking-tight text-white">
                Influencer Search
              </p>
              <p className="text-xs text-slate-500">Discover top creators</p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isSearch
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Browse
            </Link>
            <Link
              to="/shortlist"
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                isShortlist
                  ? "border border-indigo-400/40 bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                  : "border border-indigo-400/25 bg-indigo-500/10 text-indigo-200 hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-white"
              }`}
            >
              <span aria-hidden>★</span>
              Shortlist
              <span
                className={`inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold ${
                  isShortlist
                    ? "bg-white/20 text-white"
                    : "bg-indigo-500/25 text-indigo-100"
                }`}
              >
                {count}
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
