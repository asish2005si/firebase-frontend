
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanProducts } from "@/components/dashboard/loans/loan-products";
import { LoanApplications } from "@/components/dashboard/loans/loan-applications";

const initialLoanApplications = [
    { id: "LOAN4521", type: "Personal Loan", amount: 500000, date: "2024-06-15", status: "Approved" },
    { id: "LOAN8934", type: "Car Loan", amount: 800000, date: "2024-03-20", status: "Rejected" },
    { id: "LOAN1234", type: "Home Loan", amount: 5000000, date: "2023-01-10", status: "Approved" },
];

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
