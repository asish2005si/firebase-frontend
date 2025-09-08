
"use client";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard, Shield, Activity, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { debitCardTypes, creditCardTypes } from "@/lib/card-data";
import { AnimatePresence, motion } from "framer-motion";

const cardCategories = [
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

const CardTypeDisplay = ({ cardType, isSelected }: { cardType: typeof debitCardTypes[0] | typeof creditCardTypes[0], isSelected: boolean }) => (
    <Card className={cn(
        "cursor-pointer transition-all duration-200 text-left h-full flex flex-col",
        isSelected
            ? "border-primary ring-2 ring-primary shadow-lg"
            : "border-border hover:shadow-md"
    )}>
        <CardHeader>
            <CardTitle className="text-lg">{cardType.title}</CardTitle>
            <CardDescription>{cardType.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
             <p className="font-semibold text-primary">{cardType.fees}</p>
             <ul className="space-y-2 text-sm text-muted-foreground">
                {cardType.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

export function SelectCardStep() {
  const { control, watch, setValue } = useFormContext();
  const cardCategory = watch("cardCategory");
  const selectedCardType = watch("cardType");

  return (
    <div>
        <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold font-headline text-primary">Select Your Card</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Choose the category and type of card that best fits your needs.</p>
        </div>
        
        {/* Category Selection */}
        <FormField
            control={control}
            name="cardCategory"
            render={({ field }) => (
                <FormItem>
                     <FormLabel className="text-lg font-semibold">1. Choose a Category</FormLabel>
                     <FormControl>
                        <div className="grid md:grid-cols-3 gap-4 mt-2">
                            {cardCategories.map((type) => (
                            <Card 
                                key={type.value} 
                                className={cn(
                                    "cursor-pointer transition-all duration-200 text-center",
                                    field.value === type.value 
                                        ? "border-primary ring-2 ring-primary shadow-lg" 
                                        : "border-border hover:shadow-md"
                                )}
                                onClick={() => {
                                    setValue("cardCategory", type.value, { shouldValidate: true });
                                    setValue("cardType", "", { shouldValidate: false }); // Reset card type on category change
                                }}
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
        
        {/* Card Type Selection */}
        <AnimatePresence>
        {cardCategory && cardCategory !== 'virtual' && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8"
            >
                <FormField
                    control={control}
                    name="cardType"
                    render={({ field }) => (
                         <FormItem>
                            <FormLabel className="text-lg font-semibold">2. Choose a Card Type</FormLabel>
                            <FormControl>
                                <div className="grid md:grid-cols-3 gap-4 mt-2">
                                     {(cardCategory === 'debit' ? debitCardTypes : creditCardTypes).map(type => (
                                        <div key={type.value} onClick={() => setValue("cardType", type.value, { shouldValidate: true })}>
                                            <CardTypeDisplay cardType={type} isSelected={field.value === type.value} />
                                        </div>
                                     ))}
                                </div>
                            </FormControl>
                            <FormMessage className="text-center pt-4" />
                        </FormItem>
                    )}
                />
            </motion.div>
        )}
        </AnimatePresence>

        <div className="mt-8 max-w-sm mx-auto">
            <FormField
                control={control}
                name="fullName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg font-semibold">3. Name on Card</FormLabel>
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
