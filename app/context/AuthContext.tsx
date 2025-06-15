"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createSupabaseClient } from "@/app/lib/supabase";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createSupabaseClient();

  // Helper function to transform Supabase user to our User interface
  const transformUser = (supabaseUser: SupabaseUser): User => ({
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
    email: supabaseUser.email || '',
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          setError("Failed to load user session");
        } else {
          setSession(session);
          if (session?.user) {
            setUser(transformUser(session.user));
          }
        }
      } catch (err) {
        console.error("Failed to initialize auth", err);
        setError("Failed to load user session");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);

        if (session?.user) {
          setUser(transformUser(session.user));
        } else {
          setUser(null);
        }

        setIsLoading(false);
        setError(null);

        // Redirect based on auth state
        if (event === 'SIGNED_IN') {
          router.push('/dashboard');
        } else if (event === 'SIGNED_OUT') {
          router.push('/');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, router]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // User state will be updated automatically via onAuthStateChange
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        throw error;
      }

      // If email confirmation is required, show a message
      if (data.user && !data.session) {
        setError("Please check your email to confirm your account before signing in.");
        return;
      }

      // User state will be updated automatically via onAuthStateChange
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // User state will be updated automatically via onAuthStateChange
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setError(message);
      console.error("Logout error:", err);
    }
  };

  const value = {
    user,
    session,
    login,
    logout,
    register,
    isAuthenticated: !!user && !!session,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};