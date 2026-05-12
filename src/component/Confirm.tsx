import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Confirmation() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-zinc-950 dark:bg-black dark:text-zinc-100">
      <section className="w-full max-w-md rounded-[2rem] border border-amber-300/70 bg-white px-5 py-8 text-center shadow-[0_0_40px_rgba(245,158,11,0.16)] dark:bg-black dark:shadow-[0_0_46px_rgba(250,204,21,0.18)] sm:px-8">
        <div className="mx-auto grid size-20 place-items-center rounded-full border border-amber-300/80 bg-amber-300 text-black shadow-[0_0_26px_rgba(245,158,11,0.28)]">
          <Mail size={34} />
        </div>

        <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-amber-600 dark:text-yellow-300">
          Check inbox
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight">
          Confirmation email sent.
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Validate with the link in your inbox to continue.
        </p>

        <Link
          to="/"
          className="mt-8 flex items-center justify-center gap-2 rounded-full border border-amber-300 bg-amber-300 px-5 py-3 font-black text-black shadow-[0_0_24px_rgba(245,158,11,0.26)] transition hover:shadow-[0_0_34px_rgba(245,158,11,0.38)]"
        >
          Back to Log In
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
