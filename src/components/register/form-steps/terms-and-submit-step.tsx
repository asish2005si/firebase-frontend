
"use client";
import { useFormContext } from "react-hook-form";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FormHeader } from "@/components/open-account/form-header";

export function TermsAndSubmitStep() {
  const { control } = useFormContext();

  return (
    <div>
        <FormHeader 
            title="Terms and Conditions"
            description="Please review and agree to the terms of service for online banking."
        />
        <div className="space-y-6">
            <div className="h-48 overflow-y-auto p-4 border rounded-md text-sm text-muted-foreground">
                <p>Welcome to Nexus Bank's Online Banking service. By registering, you agree to comply with and be bound by the following terms and conditions of use. Please review them carefully.</p>
                <p className="font-bold mt-2">1. Acceptance of Agreement</p>
                <p>You agree to the terms and conditions outlined in this Terms of Use Agreement with respect to our online banking service. This Agreement constitutes the entire and only agreement between us and you.</p>
                <p className="font-bold mt-2">2. Security</p>
                <p>You are responsible for maintaining the confidentiality of your username and password. You are responsible for all activities that occur under your account.</p>
                <p className="font-bold mt-2">3. Service Availability</p>
                <p>We will strive to make the service available 24/7, but we are not liable for any downtime or unavailability of the service.</p>
            </div>

            <FormField
            control={control}
            name="terms"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                    <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                    />
                </FormControl>
                <div className="space-y-1 leading-none">
                    <FormLabel>
                        I agree to the <Link href="#" className="text-primary hover:underline">Terms and Conditions</Link> of Online Banking.
                    </FormLabel>
                    <FormMessage />
                </div>
                </FormItem>
            )}
            />
      </div>
    </div>
  );
}
