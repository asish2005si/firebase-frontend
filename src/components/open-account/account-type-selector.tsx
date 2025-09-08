
"use client";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, Briefcase, ShieldCheck } from "lucide-react";
import { FormHeader } from "./form-header";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

const accountTypes = [
  {
    value: "savings",
    icon: <PiggyBank className="h-8 w-8" />,
    title: "Savings Account",
  },
  {
    value: "current",
    icon: <Briefcase className="h-8 w-8" />,
    title: "Current Account",
  },
];

export function AccountTypeSelector() {
  const { control, setValue, watch } = useFormContext();
  const selectedType = watch("accountType");

  return (
    <div>
        <FormHeader 
            title="Choose Your Account Type"
            description="Select the type of account you'd like to open with Nexus Bank."
        />
        <FormField
            control={control}
            name="accountType"
            render={({ field }) => (
                <FormItem>
                     <FormControl>
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            {accountTypes.map((type) => (
                            <Card 
                                key={type.value} 
                                className={cn(
                                    "cursor-pointer transition-all duration-200",
                                    field.value === type.value 
                                        ? "border-primary ring-2 ring-primary shadow-lg" 
                                        : "border-border hover:shadow-md"
                                )}
                                onClick={() => setValue("accountType", type.value, { shouldValidate: true })}
                            >
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className={cn(
                                        "p-3 rounded-full",
                                        field.value === type.value ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                                    )}>
                                        {type.icon}
                                    </div>
                                    <CardTitle className="text-lg">{type.title}</CardTitle>
                                </CardHeader>
                            </Card>
                            ))}
                        </div>
                     </FormControl>
                     <FormMessage className="text-center pt-2" />
                </FormItem>
            )}
        />
       
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <span>Your information is safe and encrypted.</span>
        </div>
    </div>
  );
}
