import { createContext, useContext, useEffect, useState } from "react";
import { Supabase } from "../supabase/Supabase";
import type { Session } from "@supabase/supabase-js";

interface AuthhContextType {
    session: Session | null
    loading: boolean
  logIn: (email: string, password: string) => void;
    signUp: (email: string, password: string) => void;
    logOut: ()=> void
}

export const AuthContext = createContext<AuthhContextType | undefined>(undefined)

export const AuthProvider = ({children}: {children: React.ReactNode})=>{
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchSession = async() => {
        try {
            const currentSession = await Supabase.auth.getSession()
            setSession(currentSession.data.session)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSession();

        const { data: authListener} = Supabase.auth.onAuthStateChange((_, session) => {
            setSession(session)
        })

        return () => {
            authListener.subscription.unsubscribe();
        }
        
        
},[])

    const logIn = async (email:string, password:string) => { 
        const { error } = await Supabase.auth.signInWithPassword({ email, password })
        
        if (error) {
            console.error( 'Error Signing In', error.message)
        }
    }

    const signUp = async (email: string, password: string) => {
        const { error } = await Supabase.auth.signUp({
            email, password, options: {
                emailRedirectTo: `${window.location.origin}/`
            }
            
         })
        
         if (error) {
          console.error("Error Signing Up", error.message);
         }
    }

    const logOut = async () => {
        const { error } = await Supabase.auth.signOut()
        
         if (error) {
          console.error("Error Signing Out", error.message);
         }
    }
    
    return (
        <AuthContext.Provider value={{ session, loading, logIn, signUp, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('Áuth Context should be in a provider');
    }

    return context;
}
