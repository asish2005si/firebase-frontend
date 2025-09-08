
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormHeader } from "../form-header";
import { Textarea } from "@/components/ui/textarea";
import { DocumentUploadForm } from "./document-upload-form";
import { FileUploadItem } from "./document-upload-form";

export function AddressDetailsForm() {
  const { control, watch, setValue } = useFormContext();
  const isSameAddress = watch("isSameAddress");
  const permanentAddress = watch("permanentAddress");

  return (
    <div>
        <FormHeader 
            title="Address Details"
            description="Enter your permanent and communication address."
        />
      <div className="space-y-4">
        <FormField
          control={control}
          name="permanentAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permanent Address</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="123, Main Street..." 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    if (isSameAddress) {
                      setValue("communicationAddress", e.target.value, { shouldValidate: true });
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="isSameAddress"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (checked) {
                      setValue("communicationAddress", permanentAddress, { shouldValidate: true });
                    } else {
                       setValue("communicationAddress", "", { shouldValidate: true });
                    }
                  }} 
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  My communication address is the same as my permanent address.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        {!isSameAddress && (
          <FormField
            control={control}
            name="communicationAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Communication Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="456, Other Street..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="grid md:grid-cols-3 gap-4">
            <FormField
                control={control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                        <Input placeholder="Mumbai" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="state"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                        <Input placeholder="Maharashtra" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="pincode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>PIN Code</FormLabel>
                    <FormControl>
                        <Input placeholder="400001" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
         <div className="pt-4">
            <FileUploadItem fieldName="addressProof" label="Address Proof (e.g., Electricity Bill, Rent Agreement)"/>
        </div>
      </div>
    </div>
  );
}
