
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnly } from "@/components/client-only";

const requestSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

const resetSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long.")
        .regex(/[0-9]/, "Password must include at least one number.")
        .regex(/[^a-zA-Z0-9]/, "Password must include at least one special character."),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
});


export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const requestForm = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onRequestSubmit = async (values: z.infer<typeof requestSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
        title: "Reset Link Sent",
        description: `A password reset link has been sent to ${values.email}.`
    });
    
    setRequestSent(true);
    setIsSubmitting(false);
  };
  
  const onResetSubmit = async (values: z.infer<typeof resetSchema>) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
        title: "Password Updated",
        description: "Your password has been successfully updated."
    });
    resetForm.reset();
    setIsSubmitting(false);
    router.push("/login");
  }

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
              {!requestSent ? (
                   <>
                      <CardHeader className="text-center">
                          <CardTitle className="text-2xl">Forgot Password</CardTitle>
                          <CardDescription>
                          Enter your email to receive a password reset link.
                          </CardDescription>
                      </CardHeader>
                      <CardContent>
                          <Form {...requestForm}>
                          <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-6">
                              <FormField
                              control={requestForm.control}
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
                              <Button type="submit" className="w-full" disabled={isSubmitting}>
                                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                  {isSubmitting ? "Sending Link..." : "Send Reset Link"}
                              </Button>
                          </form>
                          </Form>
                      </CardContent>
                   </>
              ) : (
                  <>
                  <CardHeader className="text-center">
                      <CardTitle className="text-2xl">Reset Your Password</CardTitle>
                      <CardDescription>
                          Create a new, strong password.
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Form {...resetForm}>
                      <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-6">
                          <FormField
                          control={resetForm.control}
                          name="password"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                  <Input
                                  type="password"
                                  placeholder="••••••••"
                                  {...field}
                                  disabled={isSubmitting}
                                  />
                              </FormControl>
                               <FormDescription>
                                  Password must be at least 8 characters, include a number, and a special character.
                              </FormDescription>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                           <FormField
                          control={resetForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
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
                              {isSubmitting ? "Resetting..." : "Reset Password"}
                          </Button>
                      </form>
                      </Form>
                  </CardContent>
                </>
              )}
             
              <CardContent className="mt-0 pt-0 text-center text-sm">
                   <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Back to Login
                </Link>
              </CardContent>
          </Card>
        </ClientOnly>
      </div>
    </div>
  );
}
