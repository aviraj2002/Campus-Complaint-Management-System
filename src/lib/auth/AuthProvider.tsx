
"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/client";
import { getUser } from "../data";
import type { User as AuthUser } from "@/types";
import { User as FirebaseUser } from "firebase/auth";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Fetch user profile from our placeholder data to get role
        const appUser = await getUser(firebaseUser.uid);
        
        if (appUser) {
          setUser(appUser);
        } else {
          // If user doesn't exist in our data, create a default one.
          // This can happen on first sign-in.
          const newUser: AuthUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName!,
            photoURL: firebaseUser.photoURL,
            role: 'student', // default role
          };
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
