import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGridIcon,
  LogOut,
  Menu,
  Moon,
  Plus,
  Settings,
  Sun,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NavLinks = [
  {
    name: "Overview",
    path: "/",
    icon: LayoutGridIcon,
  },
  {
    name: "Create",
    path: "/create",
    icon: Plus,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Navbar = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleOut = () => {
    logOut();
    navigate("/");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  return (
    <>
      <div className="fixed left-0 top-0 z-20 w-full lg:left-5 lg:top-4 lg:w-auto">
        <aside className="hidden h-[calc(100vh-2rem)] w-[78px] rounded-full border border-amber-300/70 bg-white/90 shadow-[0_0_34px_rgba(245,158,11,0.24)] backdrop-blur-xl dark:border-yellow-400/60 dark:bg-black/90 dark:shadow-[0_0_42px_rgba(250,204,21,0.28)] lg:block">
          <div className="relative flex h-full flex-col items-center">
            <Link
              to="/"
              className="mt-5 rounded-full border border-amber-300/70 bg-white p-1 shadow-[0_0_18px_rgba(245,158,11,0.25)] transition hover:scale-105 dark:bg-black"
              aria-label="SnipVault dashboard"
            >
              <img
                src="/logo.png"
                width={54}
                height={54}
                alt="SnipVault"
                className="rounded-full object-cover"
              />
            </Link>

            <nav className="mt-18 flex flex-col gap-4">
              {NavLinks.map((l) => {
                const isActive = location.pathname === l.path;
                const Icon = l.icon;

                return (
                  <Link
                    key={l.name}
                    to={l.path}
                    title={l.name}
                    aria-label={l.name}
                    className={`group grid size-12 place-items-center rounded-full border transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "border-amber-300 bg-amber-300 text-black shadow-[0_0_20px_rgba(245,158,11,0.48)]"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-amber-300 hover:text-black hover:shadow-[0_0_18px_rgba(245,158,11,0.22)] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-yellow-400 dark:hover:text-yellow-200"
                    }`}
                  >
                    <Icon size={22} strokeWidth={2.2} />
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-5 flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={theme === "light" ? "Dark mode" : "Light mode"}
                className="grid size-12 place-items-center rounded-full border border-amber-300/80 bg-white text-zinc-900 shadow-[0_0_18px_rgba(245,158,11,0.2)] transition hover:bg-amber-100 dark:bg-zinc-950 dark:text-yellow-200 dark:hover:bg-yellow-400 dark:hover:text-black"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                type="button"
                onClick={handleOut}
                aria-label="Log out"
                title="Log out"
                className="grid size-12 place-items-center rounded-full border border-red-400/70 bg-white text-red-500 transition hover:bg-red-50 dark:bg-zinc-950 dark:hover:bg-red-950/50"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </aside>

        <div className="border-b border-amber-300/70 bg-white/92 px-4 py-3 shadow-[0_8px_26px_rgba(245,158,11,0.14)] backdrop-blur-xl dark:bg-black/92 lg:hidden">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                width={42}
                height={42}
                alt="SnipVault"
                className="rounded-full border border-amber-300 object-cover"
              />
              <h1 className="text-xl font-black tracking-tight">SnipVault</h1>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-amber-300 text-zinc-900 shadow-[0_0_16px_rgba(245,158,11,0.18)] dark:text-zinc-100"
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`w-full h-screen fixed left-0 top-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out lg:hidden ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`fixed right-0 top-0 z-30 w-90 h-screen overflow-hidden transition-transform duration-300 ease-in-out lg:hidden ${
            open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          {open && (
            <div className="ml-auto flex h-full w-[min(360px,100vw)] flex-col border-l border-amber-300/70 bg-white/95 px-4 py-5 shadow-[-18px_0_36px_rgba(245,158,11,0.18)] backdrop-blur-xl dark:bg-black/95">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3"
                >
                  <img
                    src="/logo.png"
                    width={42}
                    height={42}
                    alt="SnipVault"
                    className="rounded-full border border-amber-300 object-cover"
                  />
                  <h1 className="text-xl font-black tracking-tight">
                    SnipVault
                  </h1>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-full border border-amber-300/80"
                  aria-label="Close navigation"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-3">
                {NavLinks.map((l) => {
                  const isActive = location.pathname === l.path;
                  const Icon = l.icon;

                  return (
                    <Link
                      key={l.name}
                      to={l.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-bold transition ${
                        isActive
                          ? "border-amber-300 bg-amber-300 text-black shadow-[0_0_20px_rgba(245,158,11,0.34)]"
                          : "border-zinc-200 hover:border-amber-300 dark:border-zinc-800 dark:hover:border-yellow-400"
                      }`}
                    >
                      <Icon size={20} />
                      {l.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-3 pb-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center justify-between rounded-full border border-amber-300/80 px-4 py-3 text-sm font-bold"
                >
                  <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                  {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
                </button>
                <button
                  type="button"
                  onClick={handleOut}
                  className="flex items-center justify-center gap-2 rounded-full border border-red-400/80 px-4 py-3 text-sm font-bold text-red-500"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
