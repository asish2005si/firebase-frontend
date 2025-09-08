
"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useMemo } from 'react';

import { useMultistepForm } from "@/hooks/use-multistep-form";
import { AccountTypeSelector } from "./account-type-selector";
import { PersonalDetailsForm } from "./form-steps/personal-details-form";
import { AddressDetailsForm } from "./form-steps/address-details-form";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SavingsAccountDetailsForm } from "./form-steps/savings-account-details-form";
import { CurrentAccountDetailsForm } from "./form-steps/current-account-details-form";
import { ReviewDetailsForm } from "./form-steps/review-details-form";
import { OtpVerificationStep } from "./form-steps/otp-verification-step";


const kycSchema = z.object({
  accountType: z.string().min(1, "Please select an account type."),
  
  // Personal Details
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters."),
  dob: z.date({ required_error: "Date of birth is required."}),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select a gender."}),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], { required_error: "Please select a marital status."}),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format."),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits."),
  initialDeposit: z.coerce.number().min(1000, "Minimum initial deposit is INR 1,000."),
  photo: z.any().refine(files => files?.length > 0, "Photograph is required."),
  panCardUpload: z.any().refine(files => files?.length > 0, "PAN Card is required."),
  
  // Nominee Details
  nomineeName: z.string().min(2, "Nominee name is required."),
  nomineeRelation: z.string({ required_error: "Nominee relationship is required." }),
  nomineeDob: z.date({ required_error: "Nominee date of birth is required."}),
  nomineePan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format.").optional().or(z.literal('')),
  nomineeAadhaar: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits.").optional().or(z.literal('')),

  // Contact Details
  email: z.string().email("Invalid email address."),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits."),

  // Address Details
  permanentAddress: z.string().min(10, "Permanent address must be at least 10 characters."),
  isSameAddress: z.boolean().default(false),
  communicationAddress: z.string().optional(),
  state: z.string().min(2, "State is required."),
  city: z.string().min(2, "City is required."),
  pincode: z.string().regex(/^\d{6}$/, "PIN code must be 6 digits."),
  addressProof: z.any().refine(files => files?.length > 0, "Address proof is required."),
  aadhaarCardUpload: z.any().refine(files => files?.length > 0, "Aadhaar Card is required."),

  // Savings Account Specific
  occupation: z.string().optional(),
  
  // Current Account Specific
  businessName: z.string().optional(),
  businessType: z.enum(["proprietorship", "partnership", "llp", "company"]).optional(),
  gstNumber: z.string().optional(),

  // OTP
  otp: z.string().optional(),

}).refine(data => {
    if (!data.isSameAddress) {
        return !!data.communicationAddress && data.communicationAddress.length >= 10;
    }
    return true;
}, {
    message: "Communication address must be at least 10 characters.",
    path: ["communicationAddress"]
}).refine(data => {
    if (data.accountType === 'savings') {
        return !!data.occupation && data.occupation.length > 0;
    }
    return true;
}, { message: "Occupation is required for a Savings Account.", path: ["occupation"]})
.refine(data => {
    if (data.accountType === 'current') {
        return !!data.businessName && data.businessName.length > 2;
    }
    return true;
}, { message: "Business name is required.", path: ["businessName"]})
.refine(data => {
    if (data.accountType === 'current') {
        return !!data.businessType;
    }
    return true;
}, { message: "Business type is required.", path: ["businessType"]})
.refine(data => {
    if (data.accountType === 'current') {
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        return !!data.gstNumber && gstRegex.test(data.gstNumber);
    }
    return true;
}, { message: "A valid GST Number is required.", path: ["gstNumber"]})
.refine(data => {
    if (data.accountType === 'savings' || data.accountType === 'current') {
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        return data.dob <= eighteenYearsAgo;
    }
    return true;
}, {
    message: "You must be at least 18 years old for this account type.",
    path: ["dob"],
})
.refine(data => {
    // This is the final check before submission, so we validate OTP here
    if (data.accountType) { // This check should happen on the last step
        return !!data.otp && data.otp.length === 6;
    }
    return true;
}, {
    message: "A valid 6-digit OTP is required.",
    path: ["otp"]
});


type KycFormData = z.infer<typeof kycSchema>;

const formStepsPerType: Record<string, (keyof KycFormData)[][]> = {
    savings: [
        ["accountType"],
        ["fullName", "fatherName", "dob", "gender", "maritalStatus", "panNumber", "aadhaarNumber", "initialDeposit", "photo", "panCardUpload", "nomineeName", "nomineeRelation", "nomineeDob", "nomineePan", "nomineeAadhaar"],
        ["email", "mobile", "permanentAddress", "isSameAddress", "communicationAddress", "city", "state", "pincode", "addressProof", "aadhaarCardUpload"],
        ["occupation"],
        [], // Review step has no validation
        ["otp"], // OTP step validation
    ],
    current: [
        ["accountType"],
        ["fullName", "fatherName", "dob", "gender", "maritalStatus", "panNumber", "aadhaarNumber", "initialDeposit", "photo", "panCardUpload", "nomineeName", "nomineeRelation", "nomineeDob", "nomineePan", "nomineeAadhaar"],
        ["email", "mobile", "permanentAddress", "isSameAddress", "communicationAddress", "city", "state", "pincode", "addressProof", "aadhaarCardUpload"],
        ["businessName", "businessType", "gstNumber"],
        [], // Review step has no validation
        ["otp"], // OTP step validation
    ],
};

export function KycForm() {
  const { toast } = useToast();
  const router = useRouter();

  const methods = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
        accountType: "",
        fullName: "",
        fatherName: "",
        dob: undefined,
        gender: undefined,
        maritalStatus: undefined,
        panNumber: "",
        aadhaarNumber: "",
        initialDeposit: 1000,
        photo: null,
        panCardUpload: null,
        email: "",
        mobile: "",
        permanentAddress: "",
        isSameAddress: false,
        communicationAddress: "",
        state: "",
        city: "",
        pincode: "",
        addressProof: null,
        aadhaarCardUpload: null,
        occupation: "",
        nomineeName: "",
        nomineeRelation: "",
        nomineeDob: undefined,
        nomineePan: "",
        nomineeAadhaar: "",
        businessName: "",
        businessType: undefined,
        gstNumber: "",
        otp: "",
    },
    mode: "onTouched",
  });
  
  const accountType = methods.watch("accountType");

  const stepsArray = useMemo(() => {
    const baseSteps = [
      <AccountTypeSelector key="accountType" />,
      <PersonalDetailsForm key="personal" />,
      <AddressDetailsForm key="address" />,
    ];
    
    if (accountType === 'savings') {
      baseSteps.push(<SavingsAccountDetailsForm key="savings-specific" />);
    } else if (accountType === 'current') {
      baseSteps.push(<CurrentAccountDetailsForm key="current-specific" />);
    }
    
    baseSteps.push(<ReviewDetailsForm key="review" />);
    baseSteps.push(<OtpVerificationStep key="otp" />);
    
    return baseSteps;
  }, [accountType]);


  const {
    currentStepIndex,
    step,
    steps,
    isFirstStep,
    isLastStep,
    back,
    next,
    goTo,
  } = useMultistepForm(stepsArray);

  const onSubmit = async (data: KycFormData) => {
      console.log("Form Submitted:", data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const currentYear = new Date().getFullYear();
      const sequentialNumber = Math.floor(Math.random() * 900) + 100;
      const newApplicationId = `NX-${currentYear}-${String(sequentialNumber).padStart(3, '0')}`;
      
      toast({
          title: "Application Submitted!",
          description: `Your application (ID: ${newApplicationId}) has been submitted for review. You can use this ID to track its status.`,
      });
      router.push("/");
  }

  async function handleNextStep() {
    const fieldGroups = formStepsPerType[accountType || 'savings'];
    if (!fieldGroups || currentStepIndex >= fieldGroups.length) {
        next();
        return;
    }

    const fieldsToValidate = fieldGroups[currentStepIndex];
    if (fieldsToValidate.length === 0) { // For review step
        next();
        return;
    }

    const result = await methods.trigger(fieldsToValidate as (keyof KycFormData)[]);

    if (result) {
        next();
    }
  }
  
  const currentStepWithProps = React.cloneElement(step, { goTo });

  return (
    <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="max-w-3xl mx-auto p-4 md:p-8 rounded-lg shadow-xl border bg-card">
                <div className="mb-8">
                    <Progress value={(currentStepIndex + 1) * (100 / steps.length)} className="mb-2" />
                    <p className="text-sm text-center text-muted-foreground">
                        Step {currentStepIndex + 1} of {steps.length}
                    </p>
                </div>
                <AnimatePresence mode="wait">
                    {currentStepWithProps}
                </AnimatePresence>
                <div className="mt-8 flex justify-between">
                    {!isFirstStep && (
                    <Button type="button" variant="outline" onClick={back} disabled={methods.formState.isSubmitting}>
                        Go Back
                    </Button>
                    )}
                    <div className="flex-grow"></div>
                    
                    {!isLastStep ? (
                       <Button 
                          type="button" 
                          onClick={handleNextStep}
                          disabled={methods.formState.isSubmitting || (isFirstStep && !accountType)}
                        >
                            Next Step
                        </Button>
                    ) : (
                        <Button 
                          type="submit" 
                          disabled={methods.formState.isSubmitting}
                        >
                            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {methods.formState.isSubmitting ? "Verifying & Submitting..." : "Verify & Submit"}
                        </Button>
                    )}
                </div>
            </div>
        </form>
    </FormProvider>
  );
}
