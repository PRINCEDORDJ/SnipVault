import { useEffect, useRef, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useSearch } from "../context/SearchContext";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const keyboardHint = useMemo(() => {
    if (typeof navigator === "undefined") {
      return "⌘/Ctrl+K";
    }
    const isMac =
      /Mac|iPhone|iPad|iPod/.test(navigator.userAgent) ||
      navigator.platform.startsWith("Mac");
    return isMac ? "Cmd+K" : "Ctrl+K";
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder={`Search snippets (${keyboardHint})...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-full border border-amber-300/70 bg-white py-3 pl-12 pr-12 placeholder-zinc-400 shadow-[0_0_16px_rgba(245,158,11,0.1)] transition focus:outline-none focus:ring-2 focus:ring-amber-300 dark:border-yellow-400/60 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:ring-yellow-400"
          aria-label="Search snippets"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-700 dark:hover:text-zinc-300"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.focus()}
        title={`Search (${keyboardHint})`}
        className="grid size-12 place-items-center rounded-full border border-amber-300/70 bg-amber-300 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] transition hover:shadow-[0_0_24px_rgba(245,158,11,0.4)] active:scale-95 dark:bg-yellow-400 dark:text-black dark:shadow-[0_0_24px_rgba(250,204,21,0.3)]"
        aria-label="Search"
      >
        <Search size={20} strokeWidth={2.2} />
      </button>
    </div>
  );
};

export default SearchBar;
