
"use client";

import { Suspense } from "react";
import { LoanApplicationForm } from "@/components/dashboard/loans/apply/loan-application-form";
import { ClientOnly } from "@/components/client-only";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function ApplyLoanPage() {
    return (
        <ClientOnly>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="flex flex-col gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Loan Application</CardTitle>
                            <CardDescription>Follow the steps below to complete your loan application.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <LoanApplicationForm />
                        </CardContent>
                    </Card>
                </div>
            </Suspense>
        </ClientOnly>
    )
}

export default ApplyLoanPage;
