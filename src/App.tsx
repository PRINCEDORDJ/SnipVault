import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateSnip from "./pages/CreateSnip";
import Auth from "./pages/Auth";
import { useState } from "react";
import Confirmation from "./component/Confirm";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "light",
  );
  const { session } = useAuth();

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-300 dark:bg-black dark:text-zinc-100">
        <Router>
          {session ? (
            <div className="min-h-screen">
              <Navbar theme={theme} setTheme={setTheme} />
              <div className="min-h-screen w-full px-4 pb-10 pt-24 sm:px-6 lg:pl-[124px] lg:pr-8 lg:pt-8">
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
