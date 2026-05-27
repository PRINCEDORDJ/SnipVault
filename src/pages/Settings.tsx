import { useState } from "react";
import { useUsername } from "../context/UsernameContext";
import { useError } from "../context/ErrorContext";

const Settings = () => {
  const { username, setUsername } = useUsername();
  const { setError } = useError();
  const [inputValue, setInputValue] = useState(username);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    const trimmedName = inputValue.trim();
    
    if (!trimmedName) {
      setError("Username cannot be empty");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Username must be 50 characters or less");
      return;
    }

    setUsername(trimmedName);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    setInputValue(username);
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <section className="rounded-[2rem] border border-amber-300/70 bg-white p-5 shadow-[0_0_34px_rgba(245,158,11,0.14)] dark:bg-black dark:shadow-[0_0_38px_rgba(250,204,21,0.14)] sm:p-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-600 dark:text-yellow-300">
            Settings
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
            Preferences
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Update your account settings and customize your experience.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-300/70 bg-white p-5 shadow-[0_0_34px_rgba(245,158,11,0.14)] dark:bg-black dark:shadow-[0_0_38px_rgba(250,204,21,0.14)] sm:p-6">
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="username" className="block text-sm font-bold mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength={50}
              className="w-full rounded-2xl border border-amber-300/70 bg-white p-4 outline-none transition placeholder:text-zinc-400 focus:ring-2 focus:ring-amber-300 dark:bg-black dark:border-yellow-400/60 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:ring-yellow-400"
            />
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {inputValue.length}/50 characters
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-zinc-300 px-6 py-3 font-bold transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-950"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full border border-amber-300 bg-amber-300 px-6 py-3 font-bold text-black transition hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] dark:bg-yellow-400 dark:text-black dark:hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]"
            >
              Save Changes
            </button>
          </div>

          {isSaved && (
            <div className="rounded-full border border-green-300 bg-green-50 px-4 py-3 text-sm font-bold text-green-700 dark:border-green-700 dark:bg-green-950/30 dark:text-green-300">
              Username saved successfully!
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Settings;
