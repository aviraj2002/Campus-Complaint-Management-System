import { SignInForm } from "@/components/auth/SignInForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl font-bold">LNCT Bhopal</CardTitle>
          <CardDescription>Complaint Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm text-muted-foreground">
           <div className="mt-4 text-center text-xs text-muted-foreground/80">
            <p className="font-semibold">Demo Admin:</p>
            <p>Email: admin@lnctbhopal.edu.in</p>
            <p>Password: admin123</p>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
