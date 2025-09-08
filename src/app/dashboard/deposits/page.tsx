
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FixedDeposits } from "@/components/dashboard/deposits/fixed-deposits";
import { RecurringDeposits } from "@/components/dashboard/deposits/recurring-deposits";
import type { FixedDeposit, RecurringDeposit } from "@/types/deposits";

const initialFixedDeposits: FixedDeposit[] = [];

const initialRecurringDeposits: RecurringDeposit[] = [];

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
