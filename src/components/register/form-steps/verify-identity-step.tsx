
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormHeader } from "@/components/open-account/form-header";

export function VerifyIdentityStep() {
  const { control } = useFormContext();

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registered Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your registered email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
