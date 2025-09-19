
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Landmark, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required."),
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
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, you'd check credentials. For demo, we'll simulate a successful login.
    // And for this demo, we won't distinguish between customer/admin for simplicity now.
    const destination = redirectUrl || "/dashboard";

    toast({
      title: "Login Successful",
      description: "Redirecting to your dashboard...",
    });
    router.push(destination);

    // Note: isSubmitting is not set back to false because of the navigation
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                placeholder="Enter your username"
                                {...field}
                                disabled={isSubmitting}
                                />
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
                            <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            disabled={isSubmitting}
                            />
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
          </div>
    </div>
  );
}
