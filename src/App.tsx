import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateSnip from "./pages/CreateSnip";
import Auth from "./pages/Auth";
import { useState } from "react";
import Confirmation from "./component/Confirm";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const [theme, setTheme] = useState("light");
  const { session } = useAuth();

  return (
      <div className={theme}>
        <div className={`dark:bg-slate-900 dark:text-slate-200 min-h-screen`}>
          <Router>
            {session ? (
              <div className="flex max-lg:flex-col gap-2 max-lg:gap-5">
                <div className="fixed w-full">
                  <Navbar theme={theme} setTheme={setTheme} />
                </div>
                <div className="lg:pl-30 md:pl-30 pt-15 sm:pt-15 max-lg:pt-20 max-lg:px-2 min-h-screen w-full">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/create" element={<CreateSnip />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <div>
                <Routes>
                  <Route path="/" element={<Auth />} />
                  <Route path="/confirm" element={<Confirmation />} />
                </Routes>
              </div>
            )}
          </Router>
        </div>
      </div>
  );
};

export default App;
