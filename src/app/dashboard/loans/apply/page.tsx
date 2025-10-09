
"use client";

import { Suspense } from "react";
import { LoanApplicationForm } from "@/components/dashboard/loans/apply/loan-application-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnly } from "@/components/client-only";

function ApplyLoanPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClientOnly>
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
            </ClientOnly>
        </Suspense>
    )
}

export default ApplyLoanPage;

