
"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useMemo, useEffect } from 'react';

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
  photo: z.any().refine(files => files?.length > 0, "Photograph is required."),
  panCardUpload: z.any().refine(files => files?.length > 0, "PAN Card is required."),
  
  // Nominee Details
  nomineeName: z.string().min(2, "Nominee name is required."),
  nomineeRelation: z.string({ required_error: "Nominee relationship is required." }),
  nomineePan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format."),
  nomineeAadhaar: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits."),

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
});


type KycFormData = z.infer<typeof kycSchema>;

const formStepsPerType: Record<string, (keyof KycFormData)[][]> = {
    savings: [
        ["accountType"],
        ["fullName", "fatherName", "dob", "gender", "maritalStatus", "panNumber", "aadhaarNumber", "photo", "panCardUpload", "nomineeName", "nomineeRelation", "nomineePan", "nomineeAadhaar"],
        ["email", "mobile", "permanentAddress", "isSameAddress", "communicationAddress", "city", "state", "pincode", "addressProof", "aadhaarCardUpload"],
        ["occupation"],
        [], // Review step has no validation
    ],
    current: [
        ["accountType"],
        ["fullName", "fatherName", "dob", "gender", "maritalStatus", "panNumber", "aadhaarNumber", "photo", "panCardUpload", "nomineeName", "nomineeRelation", "nomineePan", "nomineeAadhaar"],
        ["email", "mobile", "permanentAddress", "isSameAddress", "communicationAddress", "city", "state", "pincode", "addressProof", "aadhaarCardUpload"],
        ["businessName", "businessType", "gstNumber"],
        [], // Review step has no validation
    ],
};

const getFormSteps = (accountType: string) => {
    const steps = [
        <AccountTypeSelector key="accountType" />,
        <PersonalDetailsForm key="personal" />,
        <AddressDetailsForm key="address" />,
    ];

    if (accountType === 'savings') {
        steps.push(<SavingsAccountDetailsForm key="savings-specific" />);
    } else if (accountType === 'current') {
        steps.push(<CurrentAccountDetailsForm key="current-specific" />);
    }

    steps.push(<ReviewDetailsForm key="review" />);
    return steps;
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
        nomineePan: "",
        nomineeAadhaar: "",
        businessName: "",
        businessType: undefined,
        gstNumber: "",
    },
    mode: "onTouched",
  });
  
  const accountType = methods.watch("accountType");

  const formSteps = useMemo(() => getFormSteps(accountType), [accountType]);

  const {
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    back,
    next,
    goTo,
  } = useMultistepForm(formSteps);

  const currentStepComponent = useMemo(() => {
    const step = steps[currentStepIndex];
    if (React.isValidElement(step) && step.type === ReviewDetailsForm) {
      return React.cloneElement(step, { goTo });
    }
    return step;
  }, [currentStepIndex, steps, goTo]);

  useEffect(() => {
    // Reset the form step to the beginning when account type changes
    // This prevents validation issues with stale data from the previous flow
    goTo(0);
  }, [accountType, goTo]);

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
    const result = await methods.trigger(fieldsToValidate as (keyof KycFormData)[]);

    if (result) {
        next();
    }
  }

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
                    {currentStepComponent}
                </AnimatePresence>
                <div className="mt-8 flex justify-between">
                    {!isFirstStep && (
                    <Button type="button" variant="outline" onClick={back} disabled={methods.formState.isSubmitting}>
                        Go Back
                    </Button>
                    )}
                    <div className="flex-grow"></div>
                    
                    <Button 
                      type={isLastStep ? "submit" : "button"} 
                      onClick={isLastStep ? methods.handleSubmit(onSubmit) : handleNextStep}
                      disabled={methods.formState.isSubmitting || (isFirstStep && !accountType)}
                    >
                        {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLastStep 
                            ? (methods.formState.isSubmitting ? "Submitting..." : "Submit Application")
                            : "Next Step"}
                    </Button>
                </div>
            </div>
        </form>
    </FormProvider>
  );
}
