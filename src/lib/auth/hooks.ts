"use client";

import { useContext } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/client";
import { AuthContext } from "./AuthProvider";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    return null;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export type { User };
