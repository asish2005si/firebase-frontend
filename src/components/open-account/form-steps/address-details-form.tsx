
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormHeader } from "../form-header";
import { Textarea } from "@/components/ui/textarea";
import { FileUploadItem } from "./document-upload-form";
import { Button } from "@/components/ui/button";

export function AddressDetailsForm() {
  const { control, watch, setValue, trigger } = useFormContext();
  const isSameAddress = watch("isSameAddress");
  const permanentAddress = watch("permanentAddress");

  const handleOtp = async (field: 'mobile' | 'email') => {
      const result = await trigger(field);
      if (result) {
          alert(`OTP verification simulation for ${field}. In a real app, an OTP would be sent.`)
      }
  }

  return (
    <div>
        <FormHeader 
            title="Contact & Address Details"
            description="Enter your contact information and current address."
        />
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
            <FormField
                control={control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <div className="flex gap-2">
                        <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" onClick={() => handleOtp('email')}>Verify</Button>
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="mobile"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                     <div className="flex gap-2">
                        <FormControl>
                            <Input type="tel" placeholder="9876543210" {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" onClick={() => handleOtp('mobile')}>Verify</Button>
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
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
         <div className="grid md:grid-cols-2 gap-6 pt-4">
            <FileUploadItem fieldName="addressProof" label="Address Proof (e.g., Electricity Bill, Rent Agreement)"/>
            <FileUploadItem fieldName="aadhaarCardUpload" label="Upload Your Aadhaar Card"/>
        </div>
      </div>
    </div>
  );
}
