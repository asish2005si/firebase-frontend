
"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { EmiCalculator } from "../emi-calculator";

const loanConfig = {
    home: { min: 500000, max: 20000000, step: 100000, minTenure: 5, maxTenure: 30, rate: 8.5 },
    personal: { min: 50000, max: 2500000, step: 10000, minTenure: 1, maxTenure: 5, rate: 10.75 },
    car: { min: 100000, max: 5000000, step: 25000, minTenure: 1, maxTenure: 7, rate: 9.25 },
    education: { min: 100000, max: 10000000, step: 50000, minTenure: 5, maxTenure: 15, rate: 7.5 },
}

export function LoanDetailsStep() {
    const { control, watch } = useFormContext();
    const loanType = watch("loanType");
    const config = loanConfig[loanType as keyof typeof loanConfig] || loanConfig.personal;

    const amount = watch("amount") || config.min;
    const tenure = watch("tenure") || config.minTenure;

    return (
        <div>
             <h2 className="text-2xl font-bold font-headline text-primary">Loan Details</h2>
             <p className="text-muted-foreground mt-1 mb-6">Specify the amount and tenure for your loan.</p>
            <div className="space-y-8">
                <FormField
                    control={control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Loan Amount (₹)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 500000" {...field} onChange={e => field.onChange(Number(e.target.value))}/>
                            </FormControl>
                            <Slider
                                defaultValue={[config.min]}
                                min={config.min}
                                max={config.max}
                                step={config.step}
                                onValueChange={(value) => field.onChange(value[0])}
                                value={[field.value || config.min]}
                                className="mt-4"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={control}
                    name="tenure"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Loan Tenure (Years)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 5" {...field} onChange={e => field.onChange(Number(e.target.value))}/>
                            </FormControl>
                             <Slider
                                defaultValue={[config.minTenure]}
                                min={config.minTenure}
                                max={config.maxTenure}
                                step={1}
                                onValueChange={(value) => field.onChange(value[0])}
                                value={[field.value || config.minTenure]}
                                className="mt-4"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <EmiCalculator amount={amount} rate={config.rate} tenure={tenure} />
        </div>
    );
}
