
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
import { ReviewDetails } from "./form-steps/review-details";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SavingsAccountDetailsForm } from "./form-steps/savings-account-details-form";


const kycSchema = z.object({
  accountType: z.string().min(1, "Please select an account type."),
  
  // Personal Details
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters."),
  dob: z.date({ required_error: "Date of birth is required."}),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select a gender."}),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], { required_error: "Please select a marital status."}),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format."),
  photo: z.any().refine(files => files?.length > 0, "Photograph is required."),
  
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

  // Savings Account Specific
  occupation: z.string().optional(),
  nomineeName: z.string().optional(),
  nomineeRelation: z.string().optional(),
  initialDeposit: z.coerce.number().optional(),

  // Other documents (for other account types, kept optional for now)
  aadhaar: z.any().optional(),
  birthCertificate: z.any().optional(),


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
    if (data.accountType === 'savings') {
        return !!data.nomineeName && data.nomineeName.length > 0;
    }
    return true;
}, { message: "Nominee name is required.", path: ["nomineeName"]})
.refine(data => {
    if (data.accountType === 'savings') {
        return !!data.nomineeRelation && data.nomineeRelation.length > 0;
    }
    return true;
}, { message: "Nominee relationship is required.", path: ["nomineeRelation"]})
.refine(data => {
    if (data.accountType === 'savings') {
        return !!data.initialDeposit && data.initialDeposit >= 1000;
    }
    return true;
}, { message: "Minimum initial deposit is ₹1,000.", path: ["initialDeposit"]})
.refine(data => {
    if (data.accountType && data.accountType !== 'student') {
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
        ["fullName", "fatherName", "dob", "gender", "maritalStatus", "panNumber", "photo"],
        ["email", "mobile", "permanentAddress", "isSameAddress", "communicationAddress", "city", "state", "pincode", "addressProof"],
        ["occupation", "nomineeName", "nomineeRelation", "initialDeposit"],
        []
    ],
    // Define steps for other account types if they differ
    current: [
        ["accountType"],
        ["fullName", "fatherName", "dob", "gender", "maritalStatus", "panNumber", "photo"],
        ["email", "mobile", "permanentAddress", "isSameAddress", "communicationAddress", "city", "state", "pincode", "addressProof"],
        [] // No specific 4th step for current account in this example
    ],
    salary: [
        ["accountType"],
        ["fullName", "fatherName", "dob", "gender", "maritalStatus", "panNumber", "photo"],
        ["email", "mobile", "permanentAddress", "isSameAddress", "communicationAddress", "city", "state", "pincode", "addressProof"],
         []
    ],
    student: [
        ["accountType"],
        ["fullName", "fatherName", "dob", "gender", "maritalStatus", "panNumber", "photo"],
        ["email", "mobile", "permanentAddress", "isSameAddress", "communicationAddress", "city", "state", "pincode", "addressProof"],
        []
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
        photo: null,
        email: "",
        mobile: "",
        permanentAddress: "",
        isSameAddress: false,
        communicationAddress: "",
        state: "",
        city: "",
        pincode: "",
        addressProof: null,
        occupation: "",
        nomineeName: "",
        nomineeRelation: "",
    },
    mode: "onTouched",
  });
  
  const accountType = methods.watch("accountType");

  const formSteps = [
      <AccountTypeSelector key="accountType" />,
      <PersonalDetailsForm key="personal" />,
      <AddressDetailsForm key="address" />,
  ];

  if (accountType === 'savings') {
      formSteps.push(<SavingsAccountDetailsForm key="savings-specific" />)
  }
  // Add other account type specific forms here if needed
  
  formSteps.push(<ReviewDetails key="review" />);


  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm(formSteps);

    async function processForm() {
        const fieldGroups = formStepsPerType[accountType || 'savings'];
        const currentFields = fieldGroups ? fieldGroups[currentStepIndex] : [];

        if (!currentFields || currentFields.length === 0) {
            next();
            return;
        }

        const result = await methods.trigger(currentFields as (keyof KycFormData)[]);
        
        if (result) {
            next();
        }
    }

    const onSubmit = async (data: KycFormData) => {
        console.log("Form Submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const currentYear = new Date().getFullYear();
        const randomNumber = Math.floor(Math.random() * 900) + 100; // 100-999
        const newApplicationId = `NX-${currentYear}-${String(randomNumber).padStart(3, '0')}`;
        
        toast({
            title: "Application Submitted!",
            description: `Your application (ID: ${newApplicationId}) has been submitted for review.`,
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
                    <Button type={isLastStep ? "submit" : "button"} onClick={isLastStep ? undefined : processForm} disabled={methods.formState.isSubmitting || (currentStepIndex === 0 && !accountType)}>
                        {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLastStep ? (methods.formState.isSubmitting ? "Submitting..." : "Submit Application") : "Next Step"}
                    </Button>
                </div>
            </div>
        </form>
    </FormProvider>
  );
}
