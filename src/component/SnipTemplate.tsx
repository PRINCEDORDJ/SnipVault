import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Copy, Trash2 } from "lucide-react";
import { useSnip } from "../context/SnipContext";

interface SnippetProps {
  snippet: {
    id: number;
    title: string;
    language: string;
    code: string;
    note: string;
  };
}

const LANG_COLORS: Record<string, string> = {
  HTML: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  CSS: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Javascript:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  React: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  Python:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "C#": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  C: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  "C++": "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  Rust: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Java: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Other: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
};

const SnipTemplate = ({ snippet }: SnippetProps) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { deleteSnip } = useSnip()!;
  const badgeColor = LANG_COLORS[snippet.language] ?? LANG_COLORS.Other;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    deleteSnip(snippet.id);
  };

  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-amber-300/70 bg-white shadow-[0_0_26px_rgba(245,158,11,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(245,158,11,0.2)] dark:bg-black">
      <button
        type="button"
        className="flex w-full cursor-pointer items-start justify-between gap-3 p-4 text-left transition-colors hover:bg-amber-50/60 dark:hover:bg-yellow-400/5"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="truncate pr-2 text-sm font-black">{snippet.title}</h3>
          {snippet.note && (
            <p className="line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
              {snippet.note}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeColor}`}>
            {snippet.language}
          </span>
          <span className="text-amber-600 dark:text-yellow-300">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-amber-300/60">
          <pre className="max-h-64 overflow-x-auto bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-amber-50">
            {snippet.code}
          </pre>
        </div>
      )}

      <div className="flex items-center justify-end gap-2 border-t border-amber-300/60 bg-amber-50/45 px-4 py-2.5 dark:bg-yellow-400/5">
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
            copied
              ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "border-amber-300/70 bg-white text-zinc-600 hover:text-black hover:shadow-[0_0_14px_rgba(245,158,11,0.2)] dark:bg-black dark:text-zinc-300 dark:hover:text-yellow-200"
          }`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-1.5 rounded-lg border border-amber-300/70 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-red-300 hover:text-red-600 dark:bg-black dark:text-zinc-300 dark:hover:text-red-400"
        >
          <Trash2 size={12} />
          Delete
        </button>
      </div>
    </article>
  );
};

export default SnipTemplate;
