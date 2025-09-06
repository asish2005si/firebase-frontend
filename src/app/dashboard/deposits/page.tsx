
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FixedDeposits } from "@/components/dashboard/deposits/fixed-deposits";
import { RecurringDeposits } from "@/components/dashboard/deposits/recurring-deposits";
import type { FixedDeposit, RecurringDeposit } from "@/types/deposits";

const initialFixedDeposits: FixedDeposit[] = [
    { id: "FD7362", amount: 100000, tenure: 1, interestRate: 7.1, startDate: "2023-11-15", maturityDate: "2024-11-15", maturityAmount: 107299, status: "Active" },
    { id: "FD8934", amount: 50000, tenure: 3, interestRate: 7.0, startDate: "2021-08-20", maturityDate: "2024-08-20", maturityAmount: 61543, status: "Matured" },
    { id: "FD1234", amount: 250000, tenure: 5, interestRate: 7.5, startDate: "2020-01-10", maturityDate: "2025-01-10", maturityAmount: 362458, status: "Active" },
];

const initialRecurringDeposits: RecurringDeposit[] = [
    { id: "RD4521", monthlyInstallment: 5000, tenure: 2, interestRate: 6.8, startDate: "2023-01-01", nextDueDate: "2024-08-01", amountDeposited: 95000, maturityAmount: 128956, status: "Active" },
    { id: "RD9982", monthlyInstallment: 10000, tenure: 5, interestRate: 7.2, startDate: "2019-09-10", nextDueDate: "", amountDeposited: 600000, maturityAmount: 725432, status: "Matured" },
];

export default function DepositsPage() {
    const [fds, setFds] = useState<FixedDeposit[]>(initialFixedDeposits);
    const [rds, setRds] = useState<RecurringDeposit[]>(initialRecurringDeposits);

    const addFd = (newFd: Omit<FixedDeposit, "id" | "startDate" | "maturityDate" | "status">) => {
        const today = new Date();
        const maturityDate = new Date(today);
        maturityDate.setFullYear(maturityDate.getFullYear() + newFd.tenure);

        const newFdWithDetails: FixedDeposit = {
            ...newFd,
            id: `FD${Math.floor(Math.random() * 9000) + 1000}`,
            startDate: today.toISOString().split('T')[0],
            maturityDate: maturityDate.toISOString().split('T')[0],
            status: "Active",
        };
        setFds(prev => [newFdWithDetails, ...prev]);
    };

    return (
        <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Deposits & Investments</CardTitle>
                    <CardDescription>Manage your fixed deposits, recurring deposits, and other investments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="fd" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="fd">Fixed Deposits</TabsTrigger>
                            <TabsTrigger value="rd">Recurring Deposits</TabsTrigger>
                            <TabsTrigger value="schemes">Special Schemes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="fd">
                            <FixedDeposits deposits={fds} addFd={addFd} />
                        </TabsContent>
                        <TabsContent value="rd">
                            <RecurringDeposits deposits={rds} />
                        </TabsContent>
                        <TabsContent value="schemes">
                           <div className="py-20 text-center text-muted-foreground">
                             Special investment schemes will be shown here.
                           </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
