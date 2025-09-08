
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

type EmiCalculatorProps = {
    amount: number;
    rate: number;
    tenure: number; // in years
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function EmiCalculator({ amount, rate, tenure }: EmiCalculatorProps) {
    const emi = useMemo(() => {
        if (!(amount > 0 && rate > 0 && tenure > 0)) {
            return 0;
        }
        const principal = amount;
        const monthlyRate = rate / 12 / 100;
        const months = tenure * 12;

        if (monthlyRate === 0) return principal / months;

        const calculatedEmi =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
        
        return isNaN(calculatedEmi) ? 0 : calculatedEmi;
    }, [amount, rate, tenure]);

    const totalPayable = emi > 0 ? emi * tenure * 12 : 0;
    const totalInterest = emi > 0 ? totalPayable - amount : 0;

    return (
        <Card className="mt-8 bg-muted/50">
            <CardHeader>
                <CardTitle>EMI Estimate</CardTitle>
                <CardDescription>Your estimated monthly payment based on the selected amount and tenure.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(emi)}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Total Interest</p>
                    <p className="text-lg font-semibold">{formatCurrency(totalInterest)}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Total Payable</p>
                    <p className="text-lg font-semibold">{formatCurrency(totalPayable)}</p>
                </div>
            </CardContent>
        </Card>
    );
}
