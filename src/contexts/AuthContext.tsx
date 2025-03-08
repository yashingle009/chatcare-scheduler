
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  user_type: "user" | "expert";
  avatar_url?: string;
  bio?: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, userType: "user" | "expert") => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string) {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile information");
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, password: string, userType: "user" | "expert") {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        toast.success("Registration successful! Please check your email for verification.");
        
        // Redirect to expert dashboard if signed up as expert
        if (userType === "expert") {
          navigate("/expert-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        toast.success("Successfully signed in!");
        
        // Fetch profile to determine where to redirect
        const { data: profileData } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", data.user.id)
          .single();
        
        // Redirect based on user type
        if (profileData && profileData.user_type === "expert") {
          navigate("/expert-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error(error.message || "Incorrect email or password");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      toast.success("Successfully signed out");
      navigate("/auth");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error(error.message || "An error occurred during sign out");
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(updatedProfile: Partial<UserProfile>) {
    try {
      setLoading(true);
      
      if (!user) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from("profiles")
        .update(updatedProfile)
        .eq("id", user.id);

      if (error) {
        throw error;
      }
      
      // Update local profile state
      if (profile) {
        setProfile({ ...profile, ...updatedProfile });
      }
      
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  const value = {
    session,
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
