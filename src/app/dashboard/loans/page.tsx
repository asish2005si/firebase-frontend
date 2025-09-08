
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanProducts } from "@/components/dashboard/loans/loan-products";
import { LoanApplications } from "@/components/dashboard/loans/loan-applications";

const initialLoanApplications = [];

export default function LoansPage() {
  return (
    <div className="flex flex-col gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Loans</CardTitle>
                <CardDescription>Explore loan options, apply, and manage your existing loans.</CardDescription>
            </CardHeader>
            <CardContent>
                <LoanProducts />
            </CardContent>
        </Card>
        <LoanApplications applications={initialLoanApplications} />
    </div>
  );
}
