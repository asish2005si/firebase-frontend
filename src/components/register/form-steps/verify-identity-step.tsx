
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormHeader } from "@/components/open-account/form-header";
import { useToast } from "@/hooks/use-toast";

export function VerifyIdentityStep() {
  const { control } = useFormContext();
  const { toast } = useToast();

  const handleSendOtp = () => {
    // In a real app, you would trigger validation for the fields first
    // and then call an API to send the OTP.
    toast({
      title: "OTP Sent",
      description: "An OTP has been sent to your registered mobile/email.",
    });
    // This is just a simulation. In a real app, you would proceed to the next step
    // after the API call is successful.
  };

  return (
    <div>
        <FormHeader 
            title="Register for Online Banking"
            description="Welcome! If you already have a bank account with us, register here to access online banking securely."
        />
      <div className="space-y-4">
        <FormField
          control={control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your 12-digit account number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="mobileOrEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registered Mobile Number / Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your registered mobile or email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
