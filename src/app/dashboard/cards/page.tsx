
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DebitCardSection } from "@/components/dashboard/cards/debit-card-section";
import { CreditCardSection } from "@/components/dashboard/cards/credit-card-section";
import { VirtualCardSection } from "@/components/dashboard/cards/virtual-card-section";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CardsPage() {
    return (
        <div className="flex flex-col gap-8">
            <Alert>
                <AlertTitle className="flex justify-between items-center">
                    Looking to get a new card?
                    <Link href="/dashboard/cards/apply">
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Apply for a New Card
                        </Button>
                    </Link>
                </AlertTitle>
                <AlertDescription>
                    Apply for a new Debit, Credit, or Virtual card through our easy and secure application process.
                </AlertDescription>
            </Alert>
            <Card>
                <CardHeader>
                    <CardTitle>My Cards</CardTitle>
                    <CardDescription>Manage your existing debit, credit, and virtual cards all in one place.</CardDescription>
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
