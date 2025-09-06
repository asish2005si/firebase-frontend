
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { MaturityCalculator } from "./maturity-calculator";
import type { FixedDeposit } from "@/types/deposits";

const fdSchema = z.object({
  amount: z.coerce.number().min(5000, "Minimum deposit is ₹5,000.").max(10000000, "Maximum deposit is ₹1,00,00,000."),
  tenure: z.coerce.number().min(1, "Minimum tenure is 1 year.").max(10, "Maximum tenure is 10 years."),
  interestPayout: z.enum(["cumulative", "quarterly", "monthly"]),
});

type OpenFdFormProps = {
  addFd: (fd: Omit<FixedDeposit, "id" | "startDate" | "maturityDate" | "status">) => void;
  onFormClose: () => void;
};

// Simplified interest rate based on tenure
const getInterestRate = (tenure: number) => {
    if (tenure < 2) return 6.8;
    if (tenure < 3) return 7.1;
    if (tenure < 5) return 7.0;
    return 7.5;
}

export function OpenFdForm({ addFd, onFormClose }: OpenFdFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof fdSchema>>({
    resolver: zodResolver(fdSchema),
    defaultValues: {
      amount: 50000,
      tenure: 1,
      interestPayout: "cumulative",
    },
  });

  const amount = form.watch("amount");
  const tenure = form.watch("tenure");
  const interestRate = getInterestRate(tenure);

  const calculateMaturityAmount = () => {
    const p = amount;
    const r = interestRate / 100;
    const n = 4; // Compounded quarterly
    const t = tenure;
    return p * Math.pow((1 + r / n), n * t);
  };

  const onSubmit = async (values: z.infer<typeof fdSchema>) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const maturityAmount = calculateMaturityAmount();

    addFd({ ...values, interestRate, maturityAmount });
    
    toast({
        title: "Fixed Deposit Created!",
        description: `Your FD of ₹${values.amount} for ${values.tenure} year(s) has been successfully created.`
    });
    onFormClose();
    setIsSubmitting(false);
  };

  return (
    <div className="p-6 border rounded-lg bg-background">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Deposit Amount (₹)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 50000" {...field} onChange={e => field.onChange(Number(e.target.value))}/>
                        </FormControl>
                        <Slider
                            min={5000}
                            max={1000000}
                            step={1000}
                            onValueChange={(value) => field.onChange(value[0])}
                            value={[field.value]}
                            className="mt-4"
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="tenure"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tenure (Years)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 5" {...field} onChange={e => field.onChange(Number(e.target.value))}/>
                        </FormControl>
                         <Slider
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(value) => field.onChange(value[0])}
                            value={[field.value]}
                            className="mt-4"
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="interestPayout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Payout</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payout option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cumulative">On Maturity (Cumulative)</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <MaturityCalculator
                amount={amount}
                tenure={tenure}
                rate={interestRate}
                maturityAmount={calculateMaturityAmount()}
            />

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onFormClose} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Processing..." : "Create Fixed Deposit"}
                </Button>
            </div>
        </form>
        </Form>
    </div>
  );
}
