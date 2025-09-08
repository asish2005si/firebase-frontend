
"use client";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard, Shield, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const cardTypes = [
  {
    value: "debit",
    icon: <Activity className="h-8 w-8" />,
    title: "Debit Card",
    description: "For everyday spending, linked directly to your account.",
  },
  {
    value: "credit",
    icon: <CreditCard className="h-8 w-8" />,
    title: "Credit Card",
    description: "Build credit, earn rewards, and enjoy financial flexibility.",
  },
  {
    value: "virtual",
    icon: <Shield className="h-8 w-8" />,
    title: "Virtual Card",
    description: "Instantly generated for secure online shopping.",
  },
];

export function SelectCardStep() {
  const { control, watch, setValue } = useFormContext();
  const selectedCard = watch("cardType");

  return (
    <div>
        <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold font-headline text-primary">Select Card Type</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Choose the card that best fits your needs.</p>
        </div>
        <FormField
            control={control}
            name="cardType"
            render={({ field }) => (
                <FormItem>
                     <FormControl>
                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            {cardTypes.map((type) => (
                            <Card 
                                key={type.value} 
                                className={cn(
                                    "cursor-pointer transition-all duration-200 text-center",
                                    field.value === type.value 
                                        ? "border-primary ring-2 ring-primary shadow-lg" 
                                        : "border-border hover:shadow-md"
                                )}
                                onClick={() => setValue("cardType", type.value, { shouldValidate: true })}
                            >
                                <CardHeader className="items-center">
                                    <div className={cn(
                                        "p-3 rounded-full mb-2",
                                        field.value === type.value ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                                    )}>
                                        {type.icon}
                                    </div>
                                    <CardTitle className="text-lg">{type.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{type.description}</CardDescription>
                                </CardContent>
                            </Card>
                            ))}
                        </div>
                     </FormControl>
                     <FormMessage className="text-center pt-4" />
                </FormItem>
            )}
        />
        <div className="mt-8 max-w-sm mx-auto">
            <FormField
                control={control}
                name="fullName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter the name to be printed on the card" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </div>
  );
}
