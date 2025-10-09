
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Landmark, Loader2, User, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { registerAdmin } from "@/app/actions/auth";

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export default function AdminSignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    const result = await registerAdmin(values);
    
    if (result.success) {
        toast({
          title: "Registration Successful",
          description: "Admin account created. You can now sign in.",
        });
        router.push(`/admin/login`);
    } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: result.message,
        });
        setIsSubmitting(false);
    }
  };

  return (
       <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <Link href="/" className="flex items-center gap-2 justify-center text-primary">
                  <Landmark className="h-8 w-8" />
                  <span className="text-3xl font-bold font-headline">Nexus Bank Admin</span>
                </Link>
            </div>
            <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create Admin Account</CardTitle>
                <CardDescription>
                Register a new administrator for the dashboard.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                             <FormControl>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                    placeholder="Enter full name"
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Admin Email</FormLabel>
                             <FormControl>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                    placeholder="Enter admin email"
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
                    <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
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
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Registering..." : "Register"}
                    </Button>
                </form>
                </Form>
                 <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/admin/login" className="font-medium text-primary hover:underline">
                        Sign In
                    </Link>
                </div>
            </CardContent>
            </Card>
          </div>
    </div>
  );
}
