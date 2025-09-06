
"use client";

import { useState, Suspense } from "react";
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

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits."),
});

function OTPFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof otpSchema>) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate OTP check
    if (values.otp === "123456") { // Hardcoded OTP for demo
      toast({
        title: "Login Successful!",
        description: "Welcome to your dashboard.",
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect OTP",
        description: "The OTP you entered is incorrect. Please try again.",
      });
      form.reset();
    }
    setIsSubmitting(false);
  };
  
  const onResend = () => {
    toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your email.",
      });
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
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
            <CardDescription>
              A 6-digit OTP has been sent to {email ? <strong>{email}</strong> : 'your email'}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter OTP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••"
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
                  {isSubmitting ? "Verifying..." : "Verify"}
                </Button>
              </form>
            </Form>
             <div className="mt-4 text-center text-sm">
                Didn't receive the code?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={onResend} disabled={isSubmitting}>
                  Resend OTP
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function OTPPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OTPFormComponent />
        </Suspense>
    )
}
