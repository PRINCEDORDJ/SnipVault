import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnip } from "../context/SnipContext";
import { useError } from "../context/ErrorContext";
import { Languages } from "../constants/languages";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SnipEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const { addSnip } = useSnip()!;
  const { setError } = useError();

  const navigate = useNavigate();

  const Submit = () => {
    if (!title || !code || !language) {
      setError("Please fill in all required fields: Title, Language, and Code");
      return;
    }

    addSnip(title, language, code, note);
    setTitle("");
    setCode("");
    setLanguage("");
    setNote("");
    navigate("/");
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-center pb-2">
      <div className="w-full rounded-[2rem] border border-amber-300/70 bg-white px-4 py-6 shadow-[0_0_34px_rgba(245,158,11,0.14)] dark:bg-black sm:px-6">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-600 dark:text-yellow-300">
          Create
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">
          Add New Snippet
        </h1>

        <div className="flex w-full flex-col gap-4 py-5">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-bold">
              Snippet Title
            </label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              required
              className="w-full rounded-2xl border border-amber-300/70 bg-white p-3 outline-none transition placeholder:text-zinc-400 focus:ring-2 focus:ring-amber-300 dark:bg-black"
            />
          </div>

          <div>
            <label htmlFor="language" className="mb-2 block text-sm font-bold">
              Select language
            </label>
            <Select
              value={language}
              onValueChange={setLanguage}
              indicatorPosition="right"
            >
              <SelectTrigger id="language" aria-label="Select language">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Languages.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="code" className="mb-2 block text-sm font-bold">
              Paste snippet here
            </label>
            <textarea
              placeholder="Paste code here"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              rows={5}
              className="h-50 w-full rounded-2xl border border-amber-300/70 bg-white p-3 font-mono text-sm outline-none transition placeholder:text-zinc-400 focus:ring-2 focus:ring-amber-300 dark:bg-black max-lg:h-40"
            />
          </div>

          <div>
            <label htmlFor="note" className="mb-2 block text-sm font-bold">
              Addition Note
            </label>
            <input
              id="note"
              placeholder="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-2xl border border-amber-300/70 bg-white p-3 outline-none transition placeholder:text-zinc-400 focus:ring-2 focus:ring-amber-300 dark:bg-black"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="rounded-full border border-amber-300/70 p-0.5">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-full px-7 py-2 font-bold"
              >
                Cancel
              </button>
            </div>
            <div className="rounded-full border border-amber-300 p-0.5 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
              <button
                type="button"
                onClick={Submit}
                className="rounded-full bg-amber-300 px-9 py-2 font-black text-black"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnipEditor;
