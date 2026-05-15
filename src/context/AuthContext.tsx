import { createContext, useContext } from "react";
import type { Session } from "@supabase/supabase-js";

export interface AuthContextType {
    session: Session | null
    loading: boolean
    logIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<string | null>;
    logOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('Áuth Context should be in a provider');
    }

    return context;
}
