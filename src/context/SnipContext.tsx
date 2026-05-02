import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Supabase } from "../supabase/Supabase";

interface Snippet {
  title: string;
  language: string;
  code: string;
  note: string;
  email: string;
}

export  interface SnipContextType {
  snippet: Snippet[] | null;
  addSnip: (
    title: string,
    language: string,
    code: string,
    note: string,
    email: string,
  ) => void;
  deleteSnip: (id: number) => void;
}

export const SnipContext = createContext<SnipContextType | undefined>(
  undefined,
);

export const SnipProvider = ({ children }: { children: React.ReactNode }) => {
  const [snippet, setSnippet] = useState<Snippet[] | null>(null);
    const { session } = useAuth();

    const fetchSnippets = async () => {
        const { data, error } = await Supabase.from('Snippets').select('*').order('created_at', {ascending: true})
        setSnippet(data)

      if (error) {
        console.error('Error Loading Snippets', error.message);
        return;
      }
    }
    
  useEffect(() => { 
    fetchSnippets();
      
  }, [])

  useEffect(() => {
      const channel = Supabase.channel("channel1");
      channel.on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "Snippets",
      }, (payload) => {
        const newSnippets = payload.new
        setSnippet((prev: any)=> [...prev, newSnippets])
      }).subscribe();
    
    return () => {
      Supabase.removeChannel(channel)
    }
  },[])
  

  const addSnip = async (
    title: string,
    language: string,
    code: string,
    note: string,
  ) => {
    const { error } = await Supabase.from("Snippets").insert({
      title,
      language,
      code,
      note,
      email: session?.user.email,
    });

    if (error) {
      console.error("Error adding snippets", error.message);
      return;
    }
  };

  const deleteSnip = async (id: number) => {
    const { error } = await Supabase.from("Snippets").delete().eq("id", id);
    if (error) {
      console.error("Error snippets", error.message);
      return;
    }
    setSnippet((prev)=>prev?.filter((p:any)=> p.id !== id) ?? null)
  };

  return (
    <SnipContext.Provider value={{ snippet, addSnip, deleteSnip }}>
      {children}
    </SnipContext.Provider>
  );
};

export const useSnip = () => {
  const context = useContext(SnipContext);
  if (!context) {
    console.error("useSnip must be in a Provider");
  }

  return context;
};
