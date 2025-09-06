
"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { useMultistepForm } from "@/hooks/use-multistep-form";
import { AccountTypeSelector } from "./account-type-selector";
import { PersonalDetailsForm } from "./form-steps/personal-details-form";
import { AddressDetailsForm } from "./form-steps/address-details-form";
import { DocumentUploadForm } from "./form-steps/document-upload-form";
import { ReviewDetails } from "./form-steps/review-details";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
  pan: z.any().optional(),
  photo: z.any().refine(file => file?.length == 1, "Photograph is required."),
  birthCertificate: z.any().optional(),
}).refine(data => {
    if (data.isSameAddress === false) {
        return !!data.communicationAddress && data.communicationAddress.length >= 5;
    }
    return true;
}, {
    message: "Communication address is required.",
    path: ["communicationAddress"]
}).refine(data => {
    if (data.accountType !== 'student') {
        return data.pan?.length == 1;
    }
    return true;
}, {
    message: "PAN card is required.",
    path: ["pan"]
}).refine(data => {
    if (data.accountType === 'student') {
        return data.birthCertificate?.length == 1;
    }
    return true;
}, {
    message: "Birth Certificate is required for student accounts.",
    path: ["birthCertificate"]
});


type KycFormData = z.infer<typeof kycSchema>;

const formSteps: (keyof KycFormData)[][] = [
    ["accountType"],
    ["fullName", "dob", "gender", "email", "mobile"],
    ["permanentAddress", "isSameAddress", "communicationAddress", "city", "state", "pincode"],
    ["aadhaar", "pan", "photo", "birthCertificate"],
    []
];

export function KycForm() {
  const { toast } = useToast();
  const router = useRouter();

  const methods = useForm<KycFormData>({
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
        aadhaar: null,
        pan: null,
        photo: null,
        birthCertificate: null,
    },
    mode: "onTouched",
  });

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <AccountTypeSelector key="accountType" />,
      <PersonalDetailsForm key="personal" />,
      <AddressDetailsForm key="address" />,
      <DocumentUploadForm key="docs" />,
      <ReviewDetails key="review" />,
    ]);

    async function processForm() {
        const fieldsToValidate = formSteps.slice(0, currentStepIndex + 1).flat();
        const result = await methods.trigger(fieldsToValidate as (keyof KycFormData)[]);
        if(result) {
            next();
        }
    }

    const onSubmit = async (data: KycFormData) => {
        console.log("Form Submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast({
            title: "Application Submitted!",
            description: "Your application (ID: SB12345) has been submitted for review.",
        });
        router.push("/");
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
                    {step}
                </AnimatePresence>
                <div className="mt-8 flex justify-between">
                    {!isFirstStep && (
                    <Button type="button" variant="outline" onClick={back} disabled={methods.formState.isSubmitting}>
                        Go Back
                    </Button>
                    )}
                    <div className="flex-grow"></div>
                    <Button type={isLastStep ? "submit" : "button"} onClick={isLastStep ? undefined : processForm} disabled={methods.formState.isSubmitting}>
                        {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLastStep ? (methods.formState.isSubmitting ? "Submitting..." : "Submit Application") : "Next Step"}
                    </Button>
                </div>
            </div>
        </form>
    </FormProvider>
  );
}
