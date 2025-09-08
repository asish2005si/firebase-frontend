
"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormHeader } from "../form-header";

const occupationTypes = ["Student", "Salaried", "Self-Employed", "Business", "Housewife", "Retired", "Other"];

export function SavingsAccountDetailsForm() {
  const { control } = useFormContext();

  return (
    <div>
      <FormHeader 
        title="Savings Account Details"
        description="Please provide a few more details to complete your application."
      />
      <div className="space-y-4">
        <FormField
          control={control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your occupation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {occupationTypes.map(occ => <SelectItem key={occ} value={occ.toLowerCase()}>{occ}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={control}
            name="initialDeposit"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Initial Deposit Amount (₹)</FormLabel>
                <FormControl>
                <Input type="number" placeholder="Minimum ₹1,000" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
      </div>
    </div>
  );
}
