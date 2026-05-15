import { ArrowRight, LockKeyhole, Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { logIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setAuthError(null);

    if (register) {
      setSubmitting(true);
      const error = await signUp(email, password).finally(() => {
        setSubmitting(false);
      });

      if (error) {
        setAuthError(error);
        return;
      }

      navigate("/confirm");
    } else {
      logIn(email, password);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-zinc-950 transition-colors dark:bg-black dark:text-zinc-100">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-amber-300/70 bg-white shadow-[0_0_44px_rgba(245,158,11,0.16)] dark:bg-black dark:shadow-[0_0_48px_rgba(250,204,21,0.18)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden min-h-[620px] border-r border-amber-300/60 bg-black text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.28),transparent_34%),radial-gradient(circle_at_78%_78%,rgba(245,158,11,0.24),transparent_30%)]" />
          <div className="relative flex h-full flex-col justify-between p-8">
            <Link
              to="/"
              className="grid size-16 place-items-center rounded-full border border-amber-300/80 bg-black shadow-[0_0_26px_rgba(245,158,11,0.32)]"
              aria-label="SnipVault"
            >
              <img
                src="/logo.png"
                width={54}
                height={54}
                alt="SnipVault"
                className="rounded-full object-cover"
              />
            </Link>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-yellow-300">
                SnipVault
              </p>
              <h1 className="mt-3 max-w-sm text-5xl font-black tracking-tight">
                Keep your code close.
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-amber-300/60 p-4 shadow-[0_0_24px_rgba(245,158,11,0.14)]">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">
                  Mode
                </p>
                <p className="mt-2 text-2xl font-black">Vault</p>
              </div>
              <div className="rounded-3xl border border-amber-300/60 bg-amber-300 p-4 text-black shadow-[0_0_30px_rgba(245,158,11,0.28)]">
                <p className="text-xs font-bold uppercase tracking-[0.22em]">
                  Access
                </p>
                <p className="mt-2 text-2xl font-black">
                  {register ? "New" : "Ready"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-[620px] flex-col justify-center px-5 py-8 sm:px-8 lg:px-10">
          <Link
            to="/"
            className="mx-auto mb-8 grid size-16 place-items-center rounded-full border border-amber-300/80 bg-white shadow-[0_0_24px_rgba(245,158,11,0.18)] dark:bg-black lg:hidden"
            aria-label="SnipVault"
          >
            <img
              src="/logo.png"
              width={54}
              height={54}
              alt="SnipVault"
              className="rounded-full object-cover"
            />
          </Link>

          <div className="mx-auto w-full max-w-md">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-600 dark:text-yellow-300">
              {register ? "Create account" : "Welcome back"}
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              {register ? "Start your vault." : "Open your vault."}
            </h2>

            <form
              className="mt-8 flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              <label className="flex flex-col gap-2 text-sm font-bold">
                Email
                <span className="flex items-center gap-3 rounded-2xl border border-amber-300/70 bg-white px-3 py-3 transition focus-within:ring-2 focus-within:ring-amber-300 dark:bg-black">
                  <Mail size={18} className="text-amber-600 dark:text-yellow-300" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                  />
                </span>
              </label>

              <label className="flex flex-col gap-2 text-sm font-bold">
                Password
                <span className="flex items-center gap-3 rounded-2xl border border-amber-300/70 bg-white px-3 py-3 transition focus-within:ring-2 focus-within:ring-amber-300 dark:bg-black">
                  <LockKeyhole
                    size={18}
                    className="text-amber-600 dark:text-yellow-300"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                  />
                </span>
              </label>

              {authError && (
                <p className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-amber-300 px-5 py-3 font-black text-black shadow-[0_0_24px_rgba(245,158,11,0.26)] transition hover:shadow-[0_0_34px_rgba(245,158,11,0.38)] active:scale-[0.99]"
              >
                {register ? <UserPlus size={18} /> : <ArrowRight size={18} />}
                {submitting ? "Working..." : register ? "Sign Up" : "Log In"}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-amber-300/60 px-4 py-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
              {register ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-black text-amber-700 underline underline-offset-4 dark:text-yellow-300"
                    onClick={() => setRegister(false)}
                  >
                    Log In
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="font-black text-amber-700 underline underline-offset-4 dark:text-yellow-300"
                    onClick={() => setRegister(true)}
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;
