
"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormHeader } from "../form-header";

const businessTypes = ["Proprietorship", "Partnership", "LLP", "Company"];

export function CurrentAccountDetailsForm() {
  const { control } = useFormContext();

  return (
    <div>
      <FormHeader 
        title="Business Information"
        description="Please provide details about your business for your Current Account."
      />
      <div className="space-y-4">
        <FormField
          control={control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Acme Innovations Pvt. Ltd." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessTypes.map(type => <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={control}
            name="gstNumber"
            render={({ field }) => (
                <FormItem>
                <FormLabel>GST Number</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 22AAAAA0000A1Z5" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
      </div>
    </div>
  );
}
