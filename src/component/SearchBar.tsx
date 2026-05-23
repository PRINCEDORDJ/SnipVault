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
    <div className="relative w-full max-w-md">
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
        className="w-full rounded-full border border-amber-300/70 bg-white py-3 pl-12 pr-12 shadow-[0_0_20px_rgba(245,158,11,0.12)] transition placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:border-yellow-400/60 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:ring-yellow-400"
        aria-label="Search snippets globally"
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
  );
};

export default SearchBar;
