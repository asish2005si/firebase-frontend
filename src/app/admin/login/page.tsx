
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
import { loginAdmin } from "@/app/actions/auth";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});


export default function AdminLoginPage() {
  const router = useRouter();
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
    const result = await loginAdmin(values);
    
    if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome! Redirecting to the Admin Dashboard...",
        });
        router.push(`/admin/applications`);
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
                  <span className="text-3xl font-bold font-headline">Nexus Bank Admin</span>
                </Link>
            </div>
            <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Admin Login</CardTitle>
                <CardDescription>
                Access the management dashboard.
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
                            <FormLabel>Admin Username</FormLabel>
                            <FormControl>
                                <Input
                                placeholder="Enter your admin username"
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
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Signing In..." : "Login"}
                    </Button>
                </form>
                </Form>
            </CardContent>
            </Card>
          </div>
    </div>
  );
}

