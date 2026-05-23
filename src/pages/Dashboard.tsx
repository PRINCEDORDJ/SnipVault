import { useState } from "react";
import { Languages } from "../constants/languages";
import { useSnip } from "../context/SnipContext";
import { useSearch } from "../context/SearchContext";
import SearchBar from "../component/SearchBar";
import SnipTemplate from "../component/SnipTemplate";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { snippet } = useSnip()!;
  const { searchQuery } = useSearch()!;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = snippet?.filter((s) => {
    const matchesLanguage =
      activeFilter === "All" || s.language === activeFilter;
    const matchesSearch = normalizedQuery === "" ||
      s.title.toLowerCase().includes(normalizedQuery) ||
      s.code.toLowerCase().includes(normalizedQuery) ||
      s.note.toLowerCase().includes(normalizedQuery);

    return matchesLanguage && matchesSearch;
  });

  const totalSnips = snippet?.length ?? 0;
  const activeCount = filtered?.length ?? 0;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <section className="rounded-[2rem] border border-amber-300/70 bg-white p-5 shadow-[0_0_34px_rgba(245,158,11,0.14)] dark:bg-black dark:shadow-[0_0_38px_rgba(250,204,21,0.14)] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-600 dark:text-yellow-300">
              SnipVault
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
              Code at a glance.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Search your saved snippets by language and keep the sharpest bits
              close to the surface.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-72">
            <div className="rounded-3xl border border-amber-300/70 px-4 py-3 shadow-[0_0_24px_rgba(245,158,11,0.12)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                Total
              </p>
              <p className="mt-1 text-3xl font-black">{totalSnips}</p>
            </div>
            <div className="rounded-3xl border border-amber-300/70 bg-amber-300 px-4 py-3 text-black shadow-[0_0_26px_rgba(245,158,11,0.24)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em]">
                Showing
              </p>
              <p className="mt-1 text-3xl font-black">{activeCount}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-300/70 bg-white p-4 shadow-[0_0_30px_rgba(245,158,11,0.1)] dark:bg-black sm:p-5">
        <div className="flex flex-wrap gap-2">
          {["All", ...Languages].map((lang) => {
            const isActive = activeFilter === lang;

            return (
              <button
                type="button"
                key={lang}
                onClick={() => setActiveFilter(lang)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "border-amber-300 bg-amber-300 text-black shadow-[0_0_18px_rgba(245,158,11,0.35)]"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-amber-300 hover:text-black dark:border-zinc-800 dark:bg-black dark:text-zinc-300 dark:hover:border-yellow-400 dark:hover:text-yellow-200"
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-300/70 bg-white p-4 shadow-[0_0_30px_rgba(245,158,11,0.1)] dark:bg-black sm:p-5">
        <SearchBar />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered && filtered.length > 0 ? (
          filtered.map((s) => <SnipTemplate key={s.id} snippet={s} />)
        ) : (
          <p className="rounded-[2rem] border border-amber-300/70 py-16 text-center text-zinc-500 shadow-[0_0_26px_rgba(245,158,11,0.1)] dark:text-zinc-400 md:col-span-2 lg:col-span-3">
            No snippets found.
          </p>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
