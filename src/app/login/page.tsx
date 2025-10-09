
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Landmark, Loader2, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ClientOnly } from "@/components/client-only";
import { loginUser } from "@/app/actions/auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    
    const result = await loginUser(values);

    if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to your dashboard...",
        });
        const destination = redirectUrl || "/dashboard";
        router.push(destination);
    } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: result.message,
        });
        setIsSubmitting(false);
    }
  };

  return (
       <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <Link href="/" className="flex items-center gap-2 justify-center text-primary">
                  <Landmark className="h-8 w-8" />
                  <span className="text-3xl font-bold font-headline">Nexus Bank</span>
                </Link>
            </div>
            <ClientOnly>
              <Card>
              <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                  <CardDescription>
                  Securely access your account anytime, anywhere.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                    placeholder="Enter your email"
                                    {...field}
                                    disabled={isSubmitting}
                                    className="pl-10"
                                    />
                                </div>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                             <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                type="password"
                                placeholder="••••••••"
                                {...field}
                                disabled={isSubmitting}
                                className="pl-10"
                                />
                            </div>
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                      <div className="text-right text-sm">
                      <Link href="/forgot-password"
                          className="font-medium text-primary hover:underline"
                      >
                          Forgot Password?
                      </Link>
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isSubmitting ? "Signing In..." : "Login"}
                      </Button>
                  </form>
                  </Form>
                  <Separator className="my-6" />
                  <div className="text-center text-sm">
                      <p className="text-muted-foreground">Don't have online access yet?</p>
                      <Link
                          href="/register"
                          className="font-medium text-primary hover:underline"
                      >
                          Register for Online Banking
                      </Link>
                  </div>
                  <div className="mt-4 text-center text-sm">
                      <p className="text-muted-foreground">New to Nexus Bank?</p>
                      <Link
                          href="/open-account"
                          className="font-medium text-primary hover:underline"
                      >
                          Open a New Account
                      </Link>
                  </div>
              </CardContent>
              </Card>
            </ClientOnly>
          </div>
    </div>
  );
}
