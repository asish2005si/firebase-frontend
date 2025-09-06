
"use client";

import { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundTransferForm } from "@/components/dashboard/payments/fund-transfer-form";
import { PaymentHistory } from "@/components/dashboard/payments/payment-history";

function PaymentsComponent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'transfer';

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Payments & Transfers</CardTitle>
          <CardDescription>
            Securely transfer funds and view your payment history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transfer">Fund Transfer</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
            </TabsList>
            <TabsContent value="transfer">
                <FundTransferForm />
            </TabsContent>
            <TabsContent value="history">
                <PaymentHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}


export default function PaymentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentsComponent />
        </Suspense>
    )
}
