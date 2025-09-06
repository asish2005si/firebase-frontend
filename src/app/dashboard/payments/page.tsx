
"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundTransferForm } from "@/components/dashboard/payments/fund-transfer-form";
import { BillPaymentForm } from "@/components/dashboard/payments/bill-payment-form";
import { PaymentHistory } from "@/components/dashboard/payments/payment-history";
import { ClientOnly } from "@/components/client-only";

const initialPaymentHistory = [
    { id: "PAY84321", date: "2024-07-29", type: "Bill Payment", description: "Adani Electricity", amount: 1500.00, status: "Success" },
    { id: "TRN99823", date: "2024-07-28", type: "Fund Transfer", description: "John Doe", amount: 10000.00, status: "Success" },
    { id: "PAY84320", date: "2024-07-25", type: "Bill Payment", description: "Airtel Postpaid", amount: 599.00, status: "Success" },
    { id: "TRN99822", date: "2024-07-22", type: "Fund Transfer", description: "Jane Smith", amount: 2500.00, status: "Failed" },
    { id: "PAY84319", date: "2024-07-20", type: "Bill Payment", description: "Mahanagar Gas", amount: 850.00, status: "Success" },
];

export type Payment = typeof initialPaymentHistory[0];

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
        <ClientOnly>
            <Suspense fallback={<div>Loading...</div>}>
                <PaymentsComponent />
            </Suspense>
        </ClientOnly>
    )
}
