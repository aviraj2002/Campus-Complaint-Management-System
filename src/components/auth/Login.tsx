
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, signInWithGoogle } from "@/lib/auth/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck, FileText } from "lucide-react";
import { createUserProfile } from "@/lib/data";


function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.25,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
  );
}


export function Login() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const userCred = await signInWithGoogle();
      if (userCred) {
        // Here we pass the core user info to our data layer to create the profile
        await createUserProfile({
          uid: userCred.user.uid,
          email: userCred.user.email!,
          name: userCred.user.displayName!,
          photoURL: userCred.user.photoURL,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Sign in failed", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-3xl">LNCT Bhopal</CardTitle>
        <CardDescription>Complaint Management System</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        <Button
          onClick={handleSignIn}
          disabled={isSigningIn}
          className="w-full"
          size="lg"
        >
          {isSigningIn ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <GoogleIcon />
              <span>Sign in with Google</span>
            </>
          )}
        </Button>
        <div className="flex items-center text-sm text-muted-foreground">
          <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
          <span>Secure Sign-in by Firebase</span>
        </div>
      </CardContent>
    </Card>
  );
}
