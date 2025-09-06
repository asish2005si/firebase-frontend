
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

import { useMultistepForm } from "@/hooks/use-multistep-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { LoanDetailsStep } from "./form-steps/loan-details-step";
import { PersonalDetailsStep } from "./form-steps/personal-details-step";
import { EmploymentDetailsStep } from "./form-steps/employment-details-step";
import { DocumentUploadStep } from "./form-steps/document-upload-step";
import { ReviewStep } from "./form-steps/review-step";
import { useEffect } from "react";

const loanApplicationSchema = z.object({
    loanType: z.enum(["home", "personal", "car", "education"]),
    amount: z.coerce.number().min(10000, "Loan amount must be at least 10,000."),
    tenure: z.coerce.number().min(1, "Tenure must be at least 1 year."),

    fullName: z.string().min(2, "Full name is required."),
    dob: z.date({ required_error: "Date of birth is required." }),
    pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format."),
    address: z.string().min(10, "Address is required."),

    employmentType: z.enum(["salaried", "self-employed"]),
    companyName: z.string().min(2, "Company name is required."),
    monthlyIncome: z.coerce.number().min(15000, "Monthly income must be at least 15,000."),

    documents: z.any().refine(files => files?.length > 0, "At least one document is required."),
    
    // Loan specific fields
    propertyInfo: z.string().optional(),
    vehicleDetails: z.string().optional(),
    courseDetails: z.string().optional(),
});

type LoanFormData = z.infer<typeof loanApplicationSchema>;

const formStepsPerLoan: Record<string, (keyof LoanFormData)[][]> = {
    home: [
        ["amount", "tenure"],
        ["fullName", "dob", "pan", "address"],
        ["employmentType", "companyName", "monthlyIncome"],
        ["documents", "propertyInfo"],
        [],
    ],
    personal: [
        ["amount", "tenure"],
        ["fullName", "dob", "pan", "address"],
        ["employmentType", "companyName", "monthlyIncome"],
        ["documents"],
        [],
    ],
    car: [
        ["amount", "tenure"],
        ["fullName", "dob", "pan", "address"],
        ["employmentType", "companyName", "monthlyIncome"],
        ["documents", "vehicleDetails"],
        [],
    ],
    education: [
        ["amount", "tenure"],
        ["fullName", "dob", "pan", "address"],
        ["employmentType", "companyName", "monthlyIncome"],
        ["documents", "courseDetails"],
        [],
    ],
};

const loanConfig = {
    home: { min: 500000, max: 20000000, step: 100000, minTenure: 5, maxTenure: 30, rate: 8.5 },
    personal: { min: 50000, max: 2500000, step: 10000, minTenure: 1, maxTenure: 5, rate: 10.75 },
    car: { min: 100000, max: 5000000, step: 25000, minTenure: 1, maxTenure: 7, rate: 9.25 },
    education: { min: 100000, max: 10000000, step: 50000, minTenure: 5, maxTenure: 15, rate: 7.5 },
}


export function LoanApplicationForm() {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const loanType = searchParams.get("type") || "personal";
    const config = loanConfig[loanType as keyof typeof loanConfig] || loanConfig.personal;

    const methods = useForm<LoanFormData>({
        resolver: zodResolver(loanApplicationSchema),
        defaultValues: {
            loanType: loanType as any,
            amount: config.min,
            tenure: config.minTenure,
            fullName: "",
            dob: undefined,
            pan: "",
            address: "",
            employmentType: "salaried",
            companyName: "",
            monthlyIncome: 15000,
            documents: null,
            propertyInfo: "",
            vehicleDetails: "",
            courseDetails: "",
        },
        mode: "onTouched",
    });

    useEffect(() => {
        methods.setValue("loanType", loanType as any);
        const newConfig = loanConfig[loanType as keyof typeof loanConfig] || loanConfig.personal;
        methods.setValue("amount", newConfig.min);
        methods.setValue("tenure", newConfig.minTenure);
    }, [loanType, methods]);


    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
        <LoanDetailsStep key="loanDetails" />,
        <PersonalDetailsStep key="personal" />,
        <EmploymentDetailsStep key="employment" />,
        <DocumentUploadStep key="docs" />,
        <ReviewStep key="review" />,
    ]);

    async function processForm() {
        const fieldGroups = formStepsPerLoan[loanType];
        if (!fieldGroups) {
            console.error("Invalid loan type:", loanType);
            return;
        }
        const fieldsToValidate = fieldGroups.slice(0, currentStepIndex + 1).flat();
        const result = await methods.trigger(fieldsToValidate as (keyof LoanFormData)[]);
        if (result) {
            next();
        }
    }

    const onSubmit = async (data: LoanFormData) => {
        console.log("Loan Application Submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast({
            title: "Application Submitted!",
            description: "Your loan application has been submitted for review. We will notify you of the status.",
        });
        router.push("/dashboard/loans");
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="max-w-3xl mx-auto p-4 md:p-8 rounded-lg">
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
