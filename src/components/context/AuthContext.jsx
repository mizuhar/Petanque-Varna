import { createContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    // Взимаме текущата сесия
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listener за login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (!data.session) {
    throw new Error("No active session. Check email confirmation.");
  }

  setSession(data.session);
  navigate("/admin");
};



  const logout = async () => {
    await supabase.auth.signOut();
  };

  const context = {
    session,
    user: session?.user,
    isAuthenticated: !!session,
    isAdmin: !!session, // Single Admin Mode (засега)
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
