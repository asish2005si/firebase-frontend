
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormHeader } from "../form-header";
import { Button } from "@/components/ui/button";

export function OtpVerificationStep() {
  const { control, getValues } = useFormContext();
  const mobile = getValues("mobile");
  const email = getValues("email");

  return (
    <div>
      <FormHeader 
        title="Final Verification Step"
        description={`An OTP has been sent to your mobile number (+91******${mobile.slice(-4)}) and email (${email}). Please enter it below to complete your application.`}
      />
      <div className="space-y-4 max-w-sm mx-auto">
        <FormField
          control={control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter 6-Digit OTP</FormLabel>
              <FormControl>
                <Input placeholder="••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center text-sm">
            Didn't receive the code?{" "}
            <Button variant="link" className="p-0 h-auto" type="button">
                Resend OTP
            </Button>
        </div>
      </div>
    </div>
  );
}

    