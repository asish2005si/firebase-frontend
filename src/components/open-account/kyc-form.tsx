
"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";

import { useMultistepForm } from "@/hooks/use-multistep-form";
import { AccountTypeSelector } from "./account-type-selector";
import { PersonalDetailsForm } from "./form-steps/personal-details-form";
import { AddressDetailsForm } from "./form-steps/address-details-form";
import { DocumentUploadForm } from "./form-steps/document-upload-form";
import { ReviewDetails } from "./form-steps/review-details";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const kycSchema = z.object({
  accountType: z.string().min(1, "Please select an account type."),
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  dob: z.date({ required_error: "Date of birth is required."}),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select a gender."}),
  email: z.string().email("Invalid email address."),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits."),
  permanentAddress: z.string().min(5, "Permanent address is required."),
  isSameAddress: z.boolean().default(false),
  communicationAddress: z.string().optional(),
  state: z.string().min(2, "State is required."),
  city: z.string().min(2, "City is required."),
  pincode: z.string().regex(/^\d{6}$/, "PIN code must be 6 digits."),
  aadhaar: z.any().refine(file => file?.length == 1, "Aadhaar card is required."),
  pan: z.any().refine(file => file?.length == 1, "PAN card is required."),
  photo: z.any().refine(file => file?.length == 1, "Photograph is required."),
}).refine(data => {
    if (!data.isSameAddress) {
        return !!data.communicationAddress && data.communicationAddress.length >= 5;
    }
    return true;
}, {
    message: "Communication address is required.",
    path: ["communicationAddress"]
});


export function KycForm() {
  const [formData, setFormData] = useState({});
  const methods = useForm({
    resolver: zodResolver(kycSchema),
    defaultValues: {
        accountType: "",
        fullName: "",
        gender: undefined,
        email: "",
        mobile: "",
        permanentAddress: "",
        isSameAddress: false,
        communicationAddress: "",
        state: "",
        city: "",
        pincode: "",
    }
  });

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } =
    useMultistepForm([
      <AccountTypeSelector key="accountType" />,
      <PersonalDetailsForm key="personal" />,
      <AddressDetailsForm key="address" />,
      <DocumentUploadForm key="docs" />,
      <ReviewDetails key="review" />,
    ]);

    async function processForm() {
        const result = await methods.trigger();
        if(result) {
            next();
        }
    }


  return (
    <FormProvider {...methods}>
        <div className="max-w-3xl mx-auto p-4 md:p-8 rounded-lg shadow-xl border bg-card">
            <div className="mb-8">
                <Progress value={(currentStepIndex + 1) * (100 / steps.length)} className="mb-2" />
                <p className="text-sm text-center text-muted-foreground">
                    Step {currentStepIndex + 1} of {steps.length}
                </p>
            </div>
            <AnimatePresence mode="wait">
                {step}
            </AnimatePresence>
            <div className="mt-8 flex justify-between">
                {!isFirstStep && (
                <Button type="button" variant="outline" onClick={back}>
                    Go Back
                </Button>
                )}
                <div className="flex-grow"></div>
                <Button type="button" onClick={isLastStep ? () => alert("Submitting!") : processForm}>
                    {isLastStep ? "Submit Application" : "Next Step"}
                </Button>
            </div>
        </div>
    </FormProvider>
  );
}
