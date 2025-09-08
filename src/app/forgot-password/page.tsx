
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Landmark, Loader2, CheckCircle } from "lucide-react";

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
import { ClientOnly } from "@/components/client-only";

const requestSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const requestForm = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: { email: "" },
  });

  const onRequestSubmit = async (values: z.infer<typeof requestSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSubmittedEmail(values.email);

    toast({
        title: "Reset Link Sent",
        description: `A password reset link has been sent to ${values.email}.`
    });
    
    setRequestSent(true);
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
                  <CardHeader className="text-center items-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <CardTitle className="text-2xl">Check Your Email</CardTitle>
                      <CardDescription>
                          We've sent a password reset link to <span className="font-bold text-primary">{submittedEmail}</span>. Please check your inbox and follow the instructions to reset your password.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button onClick={() => router.push('/login')}>Back to Login</Button>
                  </CardContent>
                </>
              )}
             
             {!requestSent && (
                <CardContent className="mt-0 pt-0 text-center text-sm">
                    <Link
                    href="/login"
                    className="font-medium text-primary hover:underline"
                    >
                    Back to Login
                    </Link>
                </CardContent>
             )}
          </Card>
        </ClientOnly>
      </div>
    </div>
  );
}
