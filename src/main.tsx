import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SnipProvider } from "./context/SnipContext.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SnipProvider>
        <App />
      </SnipProvider>
   </AuthProvider>
  </StrictMode>,
);
