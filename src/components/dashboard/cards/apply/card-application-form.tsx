
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from 'react';

import { useMultistepForm } from "@/hooks/use-multistep-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SelectCardStep } from "./form-steps/select-card-step";
import { ReviewAndSubmitStep } from "./form-steps/review-submit-step";


const cardApplicationSchema = z.object({
    cardCategory: z.enum(["debit", "credit", "virtual"], { required_error: "Please select a card category." }),
    cardType: z.string().optional(),
    fullName: z.string().min(1, "Full name on card is required."),
    consent: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions."}),
}).superRefine((data, ctx) => {
    if (data.cardCategory !== 'virtual' && !data.cardType) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["cardType"],
            message: "Please select a specific card type.",
        });
    }
});


type CardFormData = z.infer<typeof cardApplicationSchema>;

const formStepsPerType: Record<string, (keyof CardFormData)[][]> = {
    debit: [
        ["cardCategory", "cardType", "fullName"],
        ["consent"],
    ],
    credit: [
       ["cardCategory", "cardType", "fullName"],
       ["consent"],
    ],
    virtual: [
        ["cardCategory", "fullName"],
        ["consent"],
    ],
};


export function CardApplicationForm() {
    const { toast } = useToast();
    const router = useRouter();

    const methods = useForm<CardFormData>({
        resolver: zodResolver(cardApplicationSchema),
        defaultValues: {
            cardCategory: undefined,
            cardType: undefined,
            fullName: "Jane Doe", // Pre-fill from user session in a real app
            consent: false,
        },
        mode: "onTouched",
    });

    const cardCategory = methods.watch("cardCategory");
    
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
        <SelectCardStep key="select" />,
        <ReviewAndSubmitStep key="review" />,
    ]);

    async function processForm() {
        if (!cardCategory) {
            methods.trigger(["cardCategory"]);
            return;
        }
        
        const fieldGroups = formStepsPerType[cardCategory];
        const fieldsToValidate = fieldGroups[currentStepIndex];
        const result = await methods.trigger(fieldsToValidate as (keyof CardFormData)[]);

        if (result) {
            next();
        }
    }

    const onSubmit = async (data: CardFormData) => {
        console.log("Card Application Submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast({
            title: "Application Submitted!",
            description: `Your application for a ${data.cardType || data.cardCategory} card has been submitted. You will be notified of the status shortly.`,
        });
        router.push("/dashboard/cards");
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="max-w-4xl mx-auto p-4 md:p-8 rounded-lg">
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
                        <Button type={isLastStep ? "submit" : "button"} onClick={isLastStep ? undefined : processForm} disabled={methods.formState.isSubmitting || (isFirstStep && !cardCategory)}>
                            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLastStep ? (methods.formState.isSubmitting ? "Submitting..." : "Submit Application") : "Next Step"}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}
