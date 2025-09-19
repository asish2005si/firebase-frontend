
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanProducts } from "@/components/dashboard/loans/loan-products";
import { LoanApplications, type LoanApplication } from "@/components/dashboard/loans/loan-applications";
import { getLoanApplications } from "@/app/actions/applications";

export default function LoansPage() {
    const [applications, setApplications] = useState<LoanApplication[]>([]);

    useEffect(() => {
        async function fetchLoanApplications() {
            const apps = await getLoanApplications();
            setApplications(apps);
        }
        fetchLoanApplications();
    }, []);

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
        <LoanApplications applications={applications} />
    </div>
  );
}
