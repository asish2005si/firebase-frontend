
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClientOnly } from "@/components/client-only";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  role: z.enum(["customer", "admin"], { required_error: "Please select a role." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "customer",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (values.role === "admin") {
      if (values.email.toLowerCase() === "admin@nexusbank.com") {
        toast({
          title: "Admin Login Successful",
          description: "Redirecting to admin dashboard...",
        });
        router.push("/admin");
      } else {
         toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "The email you entered is not a valid admin account.",
        });
      }
    } else {
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP.",
      });
      router.push(`/otp?email=${encodeURIComponent(values.email)}`);
    }

    setIsSubmitting(false);
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
                Sign in to access your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="customer">Customer</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input
                            type="email"
                            placeholder="you@example.com"
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
                <div className="mt-6 text-center text-sm">
                New here?{" "}
                <Link
                    href="/#open-account"
                    className="font-medium text-primary hover:underline"
                >
                    Open an Account
                </Link>
                </div>
            </CardContent>
            </Card>
        </ClientOnly>
      </div>
    </div>
  );
}
