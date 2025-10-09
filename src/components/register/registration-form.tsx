
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from 'react';

import { useMultistepForm } from "@/hooks/use-multistep-form";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { VerifyIdentityStep } from "./form-steps/verify-identity-step";
import { CreateCredentialsStep } from "./form-steps/create-credentials-step";
import { TermsAndSubmitStep } from "./form-steps/terms-and-submit-step";
import { registerUser } from "@/app/actions/auth";

const passwordValidation = z.string()
  .min(8, "Password must be at least 8 characters long")
  .refine(value => /[A-Z]/.test(value), "Password must contain at least one uppercase letter")
  .refine(value => /[a-z]/.test(value), "Password must contain at least one lowercase letter")
  .refine(value => /[0-9]/.test(value), "Password must contain at least one number")
  .refine(value => /[^A-Za-z0-9]/.test(value), "Password must contain at least one special character");

const registrationSchema = z.object({
  accountNumber: z.string().regex(/^\d{9,18}$/, "Invalid account number."),
  email: z.string().email("A valid email is required."),
  username: z.string().min(3, "Username must be at least 3 characters.").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
  password: passwordValidation,
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions."),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


type RegistrationFormData = z.infer<typeof registrationSchema>;

const formStepsValidation: (keyof RegistrationFormData)[][] = [
    ["accountNumber", "email"],
    ["username", "password", "confirmPassword"],
    ["terms"],
];

export function RegistrationForm() {
  const { toast } = useToast();
  const router = useRouter();

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
        accountNumber: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        terms: false,
    },
    mode: "onTouched",
  });
  
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <VerifyIdentityStep key="identity" />,
    <CreateCredentialsStep key="credentials" />,
    <TermsAndSubmitStep key="terms" />,
  ]);

  async function processForm() {
    const fieldsToValidate = formStepsValidation[currentStepIndex];
    const result = await methods.trigger(fieldsToValidate as (keyof RegistrationFormData)[]);
    
    if (result) {
        if (isLastStep) {
            await methods.handleSubmit(onSubmit)();
        } else {
            next();
        }
    }
  }

  const onSubmit = async (data: RegistrationFormData) => {
    const result = await registerUser(data);
    if (result.success) {
      toast({
          title: "Registration Complete!",
          description: "Congratulations! Your online banking registration is complete. You can now log in.",
      });
      router.push("/login");
    } else {
       toast({
          variant: "destructive",
          title: "Registration Failed",
          description: result.message,
      });
    }
  }


  return (
    <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="max-w-xl mx-auto p-4 md:p-8 rounded-lg shadow-xl border bg-card">
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
                    <Button type="button" onClick={processForm} disabled={methods.formState.isSubmitting}>
                        {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLastStep ? (methods.formState.isSubmitting ? "Registering..." : "Register Now") : "Next Step"}
                    </Button>
                </div>
            </div>
        </form>
    </FormProvider>
  );
}
