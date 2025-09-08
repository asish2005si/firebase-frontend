
"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function EmploymentDetailsStep() {
    const { control } = useFormContext();

    return (
        <div>
            <h2 className="text-2xl font-bold font-headline text-primary">Employment Details</h2>
            <p className="text-muted-foreground mt-1 mb-6">Provide your current employment and income information.</p>
            <div className="space-y-4">
                <FormField
                    control={control}
                    name="employmentType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Employment Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your employment type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="salaried">Salaried</SelectItem>
                                    <SelectItem value="self-employed">Self-Employed / Business</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Company / Business Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your company name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="monthlyIncome"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Gross Monthly Income (INR)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Enter your monthly income" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
