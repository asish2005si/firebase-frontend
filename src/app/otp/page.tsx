
"use client";

import { useState, Suspense, useEffect } from "react";
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
import { ClientOnly } from "@/components/client-only";
import { sendOtp, verifyOtp } from "@/app/actions/otp";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits."),
});

function OTPFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contact = searchParams.get("contact");
  const redirectUrl = searchParams.get("redirect");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (contact) {
      handleResend(false); // Send initial OTP when component loads
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);


  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof otpSchema>) => {
    if (!contact) {
        toast({ variant: "destructive", title: "Error", description: "No contact method specified."});
        return;
    }

    setIsSubmitting(true);
    const result = await verifyOtp(contact, values.otp);

    if (result.success) {
      toast({
        title: "Verification Successful!",
        description: "Your action has been confirmed.",
      });
      router.push(redirectUrl || "/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect OTP",
        description: result.message || "The OTP you entered is incorrect. Please try again.",
      });
      form.reset();
    }
    setIsSubmitting(false);
  };
  
  const handleResend = async (showToast = true) => {
    if (!contact) return;
    setIsResending(true);
    const result = await sendOtp(contact);
    if (result.success && showToast) {
        toast({
            title: "OTP Resent",
            description: result.message,
        });
    } else if (!result.success) {
        toast({
            variant: "destructive",
            title: "Failed to Send OTP",
            description: result.message,
        });
    }
    setIsResending(false);
  }

  if (!contact) {
      return (
           <div className="flex min-h-screen items-center justify-center bg-background px-4">
               <p>No contact method provided for OTP verification.</p>
           </div>
      )
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
              A 6-digit OTP has been sent to {<strong>{contact}</strong>}.
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
                <Button variant="link" className="p-0 h-auto" onClick={() => handleResend()} disabled={isSubmitting || isResending}>
                   {isResending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Resend OTP"}
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
      <ClientOnly>
        <Suspense fallback={<div>Loading...</div>}>
            <OTPFormComponent />
        </Suspense>
      </ClientOnly>
    )
}
