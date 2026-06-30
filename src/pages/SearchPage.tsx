import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { ShortlistSidebar } from "@/components/ShortlistSidebar";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useUIStore } from "@/store/uiStore";

export function SearchPage() {
  const [, setSearchParams] = useSearchParams();

  const platform = useUIStore((state) => state.platform);
  const setPlatform = useUIStore((state) => state.setPlatform);

  const searchQuery = useUIStore((state) => state.search);
  const setSearchQuery = useUIStore((state) => state.setSearch);

  useEffect(() => {
    setSearchParams({ platform });
  }, [platform, setSearchParams]);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = (username: string) => {
    console.log("Clicked:", username);
  };

  return (
    <Layout>
      <section className="mb-10 text-center">
        <p className="mb-3 inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-300">
          Creator discovery
        </p>
        <h1 className="text-gradient mb-3 text-4xl font-extrabold sm:text-5xl">
          Find your next influencer
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg">
          Search and shortlist creators across Instagram, YouTube, and TikTok —
          all in one place.
        </p>
      </section>

      <PlatformFilter
        selected={platform}
        onChange={setPlatform}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/2 px-4 py-3 text-sm">
        <p className="text-slate-400">
          Showing{" "}
          <span className="font-semibold text-white">{filtered.length}</span> of{" "}
          <span className="font-semibold text-white">{allProfiles.length}</span>{" "}
          creators
        </p>
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold capitalize text-indigo-300">
          {platform}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_340px]">
        <ProfileList
          profiles={filtered}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={handleProfileClick}
        />

        <div className="xl:sticky xl:top-24 xl:self-start">
          <ShortlistSidebar />
        </div>
      </div>
    </Layout>
  );
}
