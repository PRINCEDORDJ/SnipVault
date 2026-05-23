import { useEffect, useRef, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useSearch } from "../context/SearchContext";

interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar = ({ isMobile = false }: SearchBarProps) => {
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

  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-amber-300/70 bg-white py-2 pl-10 pr-10 text-sm placeholder-zinc-400 shadow-[0_0_16px_rgba(245,158,11,0.1)] transition focus:outline-none focus:ring-2 focus:ring-amber-300 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:ring-yellow-400"
            aria-label="Search snippets"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group relative w-full">
      <button
        type="button"
        onClick={() => inputRef.current?.focus()}
        title={`Search snippets (${keyboardHint})`}
        className="grid size-12 place-items-center rounded-full border border-amber-300/70 bg-white text-zinc-700 transition hover:border-amber-300 hover:text-black hover:shadow-[0_0_18px_rgba(245,158,11,0.22)] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-yellow-400 dark:hover:text-yellow-200"
        aria-label="Search snippets"
      >
        <Search size={20} strokeWidth={2.2} />
      </button>
      <input
        ref={inputRef}
        type="text"
        placeholder={`${keyboardHint}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="absolute left-0 right-0 top-0 w-full rounded-full border border-amber-300/70 bg-white py-3 pl-12 pr-12 shadow-[0_0_20px_rgba(245,158,11,0.12)] transition placeholder-zinc-400 opacity-0 focus:outline-none focus:ring-2 focus:ring-amber-300 group-hover:opacity-100 dark:border-yellow-400/60 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:ring-yellow-400"
        aria-label="Search snippets"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-zinc-500 transition hover:text-zinc-700 dark:hover:text-zinc-300"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
