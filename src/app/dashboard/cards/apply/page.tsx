
"use client";

import { Suspense } from "react";
import { CardApplicationForm } from "@/components/dashboard/cards/apply/card-application-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnly } from "@/components/client-only";

function ApplyCardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClientOnly>
                <div className="flex flex-col gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Application</CardTitle>
                            <CardDescription>Follow the steps below to complete your card application.</CardDescription>
                        </CardHeader>
                        <CardContent>
                                <CardApplicationForm />
                        </CardContent>
                    </Card>
                </div>
            </ClientOnly>
        </Suspense>
    )
}

export default ApplyCardPage;

