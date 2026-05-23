import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { SnipProvider } from "./context/SnipContext.tsx";
import { ErrorProvider } from "./context/ErrorContext.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ErrorProvider>
      <SnipProvider>
        <App />
      </SnipProvider>
      </ErrorProvider>
   </AuthProvider>
  </StrictMode>,
);
