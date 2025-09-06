
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionHistory, Transaction } from "@/components/dashboard/transaction-history";
import { StatementHeader } from "@/components/dashboard/statements/statement-header";
import { StatementControls } from "@/components/dashboard/statements/statement-controls";
import { StatementSummary } from "@/components/dashboard/statements/statement-summary";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { ClientOnly } from "@/components/client-only";

const initialTransactions: Transaction[] = [
    { id: "TXN75620", date: "2024-07-28", description: "UPI/Google Pay/Amazon", type: "debit", amount: 1250.00, balance: 148750.75 },
    { id: "TXN75619", date: "2024-07-27", description: "Salary Credit July", type: "credit", amount: 75000.00, balance: 150000.75 },
    { id: "TXN75618", date: "2024-07-26", description: "Rent Payment", type: "debit", amount: 20000.00, balance: 75000.75 },
    { id: "TXN75617", date: "2024-07-25", description: "Online Shopping", type: "debit", amount: 3500.00, balance: 95000.75 },
    { id: "TXN75616", date: "2024-07-24", description: "ATM Withdrawal", type: "debit", amount: 5000.00, balance: 98500.75 },
    { id: "TXN75615", date: "2024-07-23", description: "Investment SIP", type: "debit", amount: 10000.00, balance: 103500.75 },
    { id: "TXN75614", date: "2024-07-01", description: "Fund Transfer to Jane", type: "debit", amount: 5000.00, balance: 113500.75 },
    { id: "TXN75613", date: "2024-06-28", description: "Salary Credit June", type: "credit", amount: 75000.00, balance: 118500.75 },
    { id: "TXN75612", date: "2024-05-28", description: "Salary Credit May", type: "credit", amount: 75000.00, balance: 43500.75 },
];

const customerInfo = {
    fullName: "Jane Doe",
    accountNumber: "123456789012345",
    accountType: "Savings Account",
    branch: "Mumbai, Fort",
};
  
export default function StatementsPage() {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    setDateRange({
        from: subDays(new Date(), 29),
        to: new Date(),
    });
  }, []);

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
        const fromDate = dateRange.from;
        const toDate = dateRange.to;
        fromDate.setHours(0,0,0,0);
        toDate.setHours(23,59,59,999);

        const filtered = transactions.filter(txn => {
            const txnDate = new Date(txn.date);
            return txnDate >= fromDate && txnDate <= toDate;
        });
        setFilteredTransactions(filtered);
    } else {
        setFilteredTransactions(transactions);
    }
  }, [dateRange, transactions]);

  const summary = useMemo(() => {
    if (filteredTransactions.length === 0) {
        return { openingBalance: 0, closingBalance: 0, totalCredits: 0, totalDebits: 0 };
    }
    
    const sorted = [...filteredTransactions].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const openingBalance = sorted[0].balance + (sorted[0].type === 'debit' ? sorted[0].amount : -sorted[0].amount);
    const closingBalance = sorted[sorted.length - 1].balance;
    const totalCredits = sorted.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
    const totalDebits = sorted.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);

    return { openingBalance, closingBalance, totalCredits, totalDebits };

  }, [filteredTransactions]);
  
  return (
    <div className="flex flex-col gap-8">
        <ClientOnly>
            <Card>
                <CardHeader>
                <CardTitle>Account Statement</CardTitle>
                <CardDescription>
                    View, filter, and download your transaction history.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <StatementHeader customer={customerInfo} range={dateRange}/>
                    <StatementControls dateRange={dateRange} setDateRange={setDateRange} />
                    <StatementSummary summary={summary} />
                    <TransactionHistory transactions={filteredTransactions} />
                </CardContent>
            </Card>
        </ClientOnly>
    </div>
  );
}
