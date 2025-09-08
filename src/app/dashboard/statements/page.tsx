
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

const initialTransactions: Transaction[] = [];

const customerInfo = {
    fullName: "",
    accountNumber: "",
    accountType: "Savings Account",
    branch: "",
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
