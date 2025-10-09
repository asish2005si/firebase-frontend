
"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundTransferForm } from "@/components/dashboard/payments/fund-transfer-form";
import { BillPaymentForm } from "@/components/dashboard/payments/bill-payment-form";
import { PaymentHistory } from "@/components/dashboard/payments/payment-history";
import { ClientOnly } from "@/components/client-only";
import { addDocumentNonBlocking, useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import type { Transaction } from "@/types/transaction";

function PaymentsComponent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'transfer';
  const { user } = useUser();
  const firestore = useFirestore();

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, "transactions"),
      where("performed_by", "==", user.uid),
      orderBy("txn_time", "desc")
    );
  }, [firestore, user]);

  const { data: paymentHistory } = useCollection<Transaction>(transactionsQuery);

  const addPaymentToHistory = async (payment: Omit<Transaction, 'txn_id' | 'txn_time' | 'performed_by' | 'balance_after'>) => {
    if (!firestore || !user) return;
    const transactionsRef = collection(firestore, "transactions");
    const newPayment = {
      ...payment,
      txn_time: new Date().toISOString(),
      performed_by: user.uid,
      balance_after: 0 // This would be calculated on the backend in a real scenario
    };
    await addDocumentNonBlocking(transactionsRef, newPayment);
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
                <PaymentHistory history={paymentHistory || []} />
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
            <ClientOnly>
                <PaymentsComponent />
            </ClientOnly>
        </Suspense>
    )
}
