
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MaturityCalculatorProps = {
    amount: number;
    rate: number;
    tenure: number; // in years
    maturityAmount: number;
};

const formatCurrency = (value: number) => {
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
    return `INR ${formatted}`;
}

export function MaturityCalculator({ amount, rate, tenure, maturityAmount }: MaturityCalculatorProps) {
    const totalInterest = maturityAmount > 0 && amount > 0 ? maturityAmount - amount : 0;

    return (
        <Card className="bg-muted/50">
            <CardHeader>
                <CardTitle>Maturity Calculation</CardTitle>
                <CardDescription>Estimated returns on your investment.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="text-xl font-bold text-primary">{rate.toFixed(2)}% p.a.</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Total Interest</p>
                    <p className="text-lg font-semibold">{formatCurrency(totalInterest)}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Maturity Amount</p>
                    <p className="text-lg font-semibold">{formatCurrency(maturityAmount)}</p>
                </div>
            </CardContent>
        </Card>
    );
}
