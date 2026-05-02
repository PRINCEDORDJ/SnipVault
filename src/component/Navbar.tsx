import { useLocation, useNavigate } from "react-router-dom";
import { LayoutGridIcon, Menu, Plus, X , LogOut} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
];

const Navbar = ({ theme, setTheme }: { theme: any, setTheme: any }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate()

  const handleOut = () => {
    logOut();
    navigate('/')
  }

  const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  
  }, []);
    
  return (
    <>
      <div className=" absolute left-5 py-2  max-lg:p-0 max-lg:sticky">
        <div className="  bg-black dark:bg-black/50 backdrop-blur-md min-h-200 lg:min-h-180 md:min-h-185 sm:min-h-180 rounded-full w-17 max-lg:hidden">
          {/*Desktop Nav*/}
          <div className=" group-hover:fixed">
            <div className="flex flex-col items-center justify-center">
              <Link to="/" className="pt-10">
                <img src="/logo.png" width={70} />
              </Link>
              <div className="flex flex-col gap-5 pt-20 ">
                {NavLinks.map((l) => {
                  const isActive = location.pathname === l.path;
                  const Icon = l.icon;

                  return (
                    <div
                      key={l.name}
                      className="text-lg font-medium dark:text-gray-950"
                    >
                      <Link
                        to={l.path}
                        title={l.name}
                        className={`flex flex-col`}
                      >
                        <div>
                          <Icon
                            size={50}
                            className={`bg-gray-300  p-3 rounded-full active:scale-95 transiton delay-100 ${isActive ? "text-blue-700 dark:text-blue-700" : ""}`}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="absolute bottom-20">
                <LogOut size={20} color="red" onClick={handleOut} />
              </div>
              <div
                className={`w-10 h-2.5 rounded-full absolute bottom-10 bg-gray-400 mr-5 ml-5 transition delay-75 ${theme === "light" ? "" : "bg-green-400"}`}
              >
                <div
                  className={`w-4.5 h-4.5 -mt-1 rounded-full bg-white transition duration-100 ${theme === "light" ? "translate-x-0" : "translate-x-6"}`}
                  onClick={toggleTheme}
                />
              </div>
            </div>
          </div>
        </div>
        {/*Mobile Navigation*/}
        <div className="lg:hidden z-10 w-full">
          <div className="bg-black/90  dark:bg-slate-950/50 backdrop-blur-sm text-white dark:text-gray-400 px-2 py-3 flex items-center justify-between ">
            <Link to={"/"} className="flex items-center gap-2">
              <img
                src="/logo.png"
                width={40}
                alt="Logo"
                className="border border-gray-400 rounded-full object-cover"
              />
              <h1 className="text-2xl font-bold">SnipVault</h1>
            </Link>
            <div>
              <button onClick={() => setOpen(true)}>
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed right-0 top-0 transition-all delay-150 z-20 backdrop-blur-md ${open ? "w-90" : "w-0 transition delay-300"}`}
      >
        {" "}
        {open && (
          <div className="flex flex-col gap-4 w-full bg-black/70 dark:bg-slate-950/70 h-screen backdrop-blur-sm py-5 px-2 rounded-b-lg text-white">
            <div className="text-white flex justify-between">
              <h1 className="text-2xl font-bold">SnipVault</h1>
              <button
                onClick={() => setOpen(!open)}
                className="bg-gray-400/50 rounded-md w-7 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4 pt-5 text-lg">
              {NavLinks.map((l) => {
                const isActive = location.pathname === l.path;

                const Icon = l.icon;

                return (
                  <div key={l.name} className=" ">
                    <Link
                      to={l.path}
                      className={`group`}
                      onClick={() => setOpen(false)}
                    >
                      <div
                        className={`flex items-center gap-4 group-hover:border p-2 rounded-md ${isActive && "border border-gray-200/30 dark:bg-slate-900/50"}`}
                      >
                        <div>
                          <Icon size={25} />
                        </div>
                        <div>{l.name}</div>
                      </div>
                    </Link>
                  </div>
                );
              })}
              <div className="border-3 absolute bottom-4 p-0.5 border-red-500 rounded-xl">
                <button
                  onClick={handleOut}
                  className=" w-85 bg-red-500 p-2 rounded-lg"
                >
                  Log Out
                </button>
              </div>
            </div>
            <div className="text-white flex items-center justify-between border border-gray-200/50 rounded-md p-3 fixed bottom-20 w-85">
              <div>{theme === "light" ? "Light Mode" : "Dark Mode"}</div>
              <div
                className={`w-15 h-2.5 rounded-full bg-gray-400 mr-5 ml-5 transition delay-75 ${theme === "light" ? "" : "bg-green-400"}`}
              >
                <div
                  className={`w-4.5 h-4.5 -mt-1 rounded-full bg-white transition duration-100 ${theme === "light" ? "translate-x-0" : "translate-x-11"}`}
                  onClick={toggleTheme}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
