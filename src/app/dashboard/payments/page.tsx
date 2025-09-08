"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundTransferForm } from "@/components/dashboard/payments/fund-transfer-form";
import { BillPaymentForm } from "@/components/dashboard/payments/bill-payment-form";
import { PaymentHistory } from "@/components/dashboard/payments/payment-history";
import { ClientOnly } from "@/components/client-only";

const initialPaymentHistory = [];

export type Payment = {
    id: string;
    date: string;
    type: string;
    description: string;
    amount: number;
    status: string;
};

function PaymentsComponent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'transfer';
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>(initialPaymentHistory);

  const addPaymentToHistory = (payment: Omit<Payment, 'id' | 'date'>) => {
    const newPayment: Payment = {
        ...payment,
        id: `TXN${Math.floor(Math.random() * 90000) + 10000}`,
        date: new Date().toISOString().split('T')[0],
    };
    setPaymentHistory(prev => [newPayment, ...prev]);
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Payments & Transfers</CardTitle>
          <CardDescription>
            Securely transfer funds, pay your bills and view your payment history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transfer">Fund Transfer</TabsTrigger>
              <TabsTrigger value="bill">Bill Payment</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
            </TabsList>
            <TabsContent value="transfer">
                <FundTransferForm onSuccessfulTransfer={addPaymentToHistory} />
            </TabsContent>
            <TabsContent value="bill">
                <BillPaymentForm onSuccessfulPayment={addPaymentToHistory} />
            </TabsContent>
            <TabsContent value="history">
                <PaymentHistory history={paymentHistory} />
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
