
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionHistory, Transaction } from "@/components/dashboard/transaction-history";

const initialTransactions: Transaction[] = [
    { id: "TXN75620", date: "2024-07-28", description: "UPI/Google Pay/Amazon", type: "debit", amount: 1250.00, balance: 148750.75 },
    { id: "TXN75619", date: "2024-07-27", description: "Salary Credit July", type: "credit", amount: 75000.00, balance: 150000.75 },
    { id: "TXN75618", date: "2024-07-26", description: "Rent Payment", type: "debit", amount: 20000.00, balance: 75000.75 },
    { id: "TXN75617", date: "2024-07-25", description: "Online Shopping", type: "debit", amount: 3500.00, balance: 95000.75 },
    { id: "TXN75616", date: "2024-07-24", description: "ATM Withdrawal", type: "debit", amount: 5000.00, balance: 98500.75 },
    { id: "TXN75615", date: "2024-07-23", description: "Investment SIP", type: "debit", amount: 10000.00, balance: 103500.75 },
];
  
export default function StatementsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Account Statement</CardTitle>
          <CardDescription>
            View your transaction history.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <TransactionHistory transactions={transactions} />
        </CardContent>
      </Card>
    </div>
  );
}
