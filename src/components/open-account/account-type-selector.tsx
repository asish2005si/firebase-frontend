
"use client";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank, WalletCards, Briefcase, GraduationCap, ShieldCheck } from "lucide-react";
import { FormHeader } from "./form-header";
import { cn } from "@/lib/utils";

const accountTypes = [
  {
    value: "savings",
    icon: <PiggyBank className="h-8 w-8" />,
    title: "Savings Account",
  },
  {
    value: "current",
    icon: <WalletCards className="h-8 w-8" />,
    title: "Current Account",
  },
  {
    value: "salary",
    icon: <Briefcase className="h-8 w-8" />,
    title: "Salary Account",
  },
  {
    value: "student",
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Student Account",
  },
];

export function AccountTypeSelector() {
  const { setValue, watch } = useFormContext();
  const selectedType = watch("accountType");

  return (
    <div>
        <FormHeader 
            title="Choose Your Account Type"
            description="Select the type of account you'd like to open with Nexus Bank."
        />
        <div className="grid md:grid-cols-2 gap-4 mt-6">
            {accountTypes.map((type) => (
            <Card 
                key={type.value} 
                className={cn(
                    "cursor-pointer transition-all duration-200",
                    selectedType === type.value 
                        ? "border-primary ring-2 ring-primary shadow-lg" 
                        : "border-border hover:shadow-md"
                )}
                onClick={() => setValue("accountType", type.value)}
            >
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className={cn(
                        "p-3 rounded-full",
                        selectedType === type.value ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                    )}>
                        {type.icon}
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
            </Card>
            ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <span>Your information is safe and encrypted.</span>
        </div>
    </div>
  );
}
