import { createContext, useContext, useState, useEffect } from "react";

interface UsernameContextType {
  username: string;
  setUsername: (name: string) => void;
}

const UsernameContext = createContext<UsernameContextType | undefined>(undefined);

export const UsernameProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsernameState] = useState<string>(() => {
    return localStorage.getItem("username") || "User";
  });

  const setUsername = (name: string) => {
    setUsernameState(name);
    localStorage.setItem("username", name);
  };

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = (): UsernameContextType => {
  const context = useContext(UsernameContext);
  if (!context) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
};
