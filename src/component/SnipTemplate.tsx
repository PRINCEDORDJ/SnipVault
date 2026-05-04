import { useState } from "react";
import { useSnip } from "../context/SnipContext";
import { Trash2, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";

// Matches exactly what Supabase returns — id comes from the database
interface SnippetProps {
  snippet: {
    id: number;
    title: string;
    language: string;
    code: string;
    note: string;
  };
}

// Maps language names to badge colors
// Extend this as you add more languages
const LANG_COLORS: Record<string, string> = {
  HTML: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  CSS: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Javascript:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  React: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  Python:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "C#": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  C: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  "C++": "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  Rust: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Java: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Other: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

const SnipTemplate = ({ snippet }: SnippetProps) => {
  // Controls whether the code block is visible
  const [expanded, setExpanded] = useState(false);

  // Controls the "Copied!" feedback on the copy button
  const [copied, setCopied] = useState(false);

  // Pull deleteSnip from context — we need it for the delete button
  const { deleteSnip } = useSnip()!;

  const badgeColor = LANG_COLORS[snippet.language] ?? LANG_COLORS["Other"];

  // Writes the code to clipboard and shows "Copied!" for 2 seconds
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Deletes from Supabase — SnipContext handles removing it from local state
  const handleDelete = () => {
    deleteSnip(snippet.id);
  };

  return (
    <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 transition-shadow hover:shadow-md">
      {/* ── Card header — always visible, click to expand ── */}
      <div
        className="flex items-start justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {/* Title — truncate if too long */}
          <h3 className="font-semibold text-sm truncate pr-2">
            {snippet.title}
          </h3>

          {/* Note — only render the element if a note exists */}
          {snippet.note && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
              {snippet.note}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Language badge */}
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}
          >
            {snippet.language}
          </span>

          {/* Expand/collapse chevron */}
          <div className="text-gray-400">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </div>

      {/* ── Code block — only renders when expanded ── */}
      {expanded && (
        <div className="border-t border-gray-100 dark:border-slate-700">
          <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto max-h-64 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200">
            {snippet.code}
          </pre>
        </div>
      )}

      {/* ── Card footer — copy and delete buttons ── */}
      <div className="flex items-center justify-end gap-2 px-4 py-2.5 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80">
        {/* Copy button — icon swaps to a checkmark when copied */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors
            ${
              copied
                ? "bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400"
                : "bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:border-blue-300"
            }`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>

        {/* Delete button — calls deleteSnip from context */}
        <button
          onClick={handleDelete}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-500 dark:text-gray-400 hover:text-red-600 hover:border-red-300 dark:hover:text-red-400 font-medium transition-colors"
        >
          <Trash2 size={12} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default SnipTemplate;
