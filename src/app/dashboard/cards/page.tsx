
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DebitCardSection } from "@/components/dashboard/cards/debit-card-section";
import { CreditCardSection } from "@/components/dashboard/cards/credit-card-section";
import { VirtualCardSection } from "@/components/dashboard/cards/virtual-card-section";

export default function CardsPage() {
    return (
        <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Card Services</CardTitle>
                    <CardDescription>Manage your debit, credit, and virtual cards all in one place.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="debit" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="debit">Debit Cards</TabsTrigger>
                            <TabsTrigger value="credit">Credit Cards</TabsTrigger>
                            <TabsTrigger value="virtual">Virtual Cards</TabsTrigger>
                        </TabsList>
                        <TabsContent value="debit">
                            <DebitCardSection />
                        </TabsContent>
                        <TabsContent value="credit">
                            <CreditCardSection />
                        </TabsContent>
                        <TabsContent value="virtual">
                           <VirtualCardSection />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
