import { useState } from "react";
import { Languages } from "../component/SnipEditor";
import { useSnip } from "../context/SnipContext";
import SnipTemplate from "../component/SnipTemplate";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { snippet }:any = useSnip();

  // Step 3 — derive filtered list, no useEffect needed
  const filtered =
    activeFilter === "All"
      ? snippet
      : snippet?.filter((s:any) => s.language === activeFilter);

  return (
    <div className="max-lg:pt-2 px-4">
      {/* Step 4 — filter pills */}
      <div className="flex flex-wrap lg:items-center lg:justify-center shrink-0 gap-2">
        {["All", ...Languages].map((lang) => {
          const isActive = activeFilter === lang;

          return (
            <div
              key={lang}
              onClick={() => setActiveFilter(lang)}
              className={`cursor-pointer border px-5 py-1 rounded-full transition-colors
                ${
                  isActive
                    ? "bg-slate-700 text-white border-slate-700 dark:bg-slate-200 dark:text-black"
                    : "border-gray-400 hover:border-slate-500"
                }`}
            >
              {lang}
            </div>
          );
        })}
      </div>

      {/* Step 5 — render filtered snippets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {filtered && filtered.length > 0 ? (
          filtered.map((s: any) => <SnipTemplate key={s.id} snippet={s} />)
        ) : (
          <p className="text-gray-400 col-span-2 text-center pt-10">
            No snippets found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
