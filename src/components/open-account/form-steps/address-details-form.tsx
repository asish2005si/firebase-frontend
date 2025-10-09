
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormHeader } from "../form-header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileUploadItem } from "./file-upload-item";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { OtpDialog } from "../otp-dialog";
import { CheckCircle } from "lucide-react";


export function AddressDetailsForm() {
  const { control, watch, setValue, trigger } = useFormContext();
  const isSameAddress = watch("isSameAddress");
  const permanentAddress = watch("permanentAddress");
  const { toast } = useToast();

  const [otpDialogState, setOtpDialogState] = useState<{isOpen: boolean; field: 'mobile' | 'email' | null}>({ isOpen: false, field: null });
  
  const emailVerified = watch("emailVerified");
  const mobileVerified = watch("mobileVerified");

  const handleOpenOtpDialog = async (field: 'mobile' | 'email') => {
      const result = await trigger(field);
      if (result) {
          setOtpDialogState({ isOpen: true, field: field });
          toast({
            title: `Verification OTP Sent`,
            description: `A simulated OTP has been sent to your ${field}. Please enter '123456' to verify.`,
          });
      }
  }

  const handleVerifyOtp = async (otp: string): Promise<boolean> => {
      // In a real app, you'd call a server action here to verify the OTP.
      // For this demo, we'll use a hardcoded value.
      if (otp === '123456') {
          if (otpDialogState.field) {
              setValue(`${otpDialogState.field}Verified`, true, { shouldValidate: true });
              toast({ title: `${otpDialogState.field.charAt(0).toUpperCase() + otpDialogState.field.slice(1)} Verified!`, className: 'bg-green-600 text-white' });
              setOtpDialogState({ isOpen: false, field: null });
              return true;
          }
      }
      return false;
  }

  return (
    <div>
        <FormHeader 
            title="Contact & Address Details"
            description="Enter your contact information and current address. Please verify your email and mobile."
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
                            <Input type="email" placeholder="you@example.com" {...field} disabled={emailVerified}/>
                        </FormControl>
                        {emailVerified ? (
                             <Button variant="secondary" className="w-[100px]" disabled>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                Verified
                            </Button>
                        ) : (
                            <Button type="button" variant="outline" className="w-[100px]" onClick={() => handleOpenOtpDialog('email')}>Verify</Button>
                        )}
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
                            <Input type="tel" placeholder="9876543210" {...field} disabled={mobileVerified}/>
                        </FormControl>
                        {mobileVerified ? (
                             <Button variant="secondary" className="w-[100px]" disabled>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                Verified
                            </Button>
                        ) : (
                            <Button type="button" variant="outline" className="w-[100px]" onClick={() => handleOpenOtpDialog('mobile')}>Verify</Button>
                        )}
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
      {otpDialogState.isOpen && otpDialogState.field && (
        <OtpDialog
            isOpen={otpDialogState.isOpen}
            onClose={() => setOtpDialogState({ isOpen: false, field: null })}
            onVerify={handleVerifyOtp}
            contactMethod={watch(otpDialogState.field)}
        />
      )}
    </div>
  );
}
