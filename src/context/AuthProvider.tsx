import { useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { AuthContext } from "./AuthContext";
import { useError } from "./ErrorContext";
import { Supabase } from "../supabase/Supabase";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const { setError } = useError()

    const fetchSession = async () => {
        try {
            const currentSession = await Supabase.auth.getSession()
            setSession(currentSession.data.session)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSession();

        const { data: authListener } = Supabase.auth.onAuthStateChange((_, session) => {
            setSession(session)
        })

        return () => {
            authListener.subscription.unsubscribe();
        }
    }, [])

    const logIn = async (email: string, password: string) => {
        const { error } = await Supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(`Login failed: ${error.message}`)
        }
    }

    const signUp = async (email: string, password: string) => {
        const { error } = await Supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/`,
            },
        })

        if (error) {
            console.error("Error Signing Up", error.message);
            return error.message;
        }

        return null;
    }

    const logOut = async () => {
        const { error } = await Supabase.auth.signOut()

        if (error) {
            setError(`Logout failed: ${error.message}`);
        }
    }

    return (
        <AuthContext.Provider value={{ session, loading, logIn, signUp, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}
