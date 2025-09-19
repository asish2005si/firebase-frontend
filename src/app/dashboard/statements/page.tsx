
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
import { getTransactions, getCustomerInfo } from "@/app/actions/transactions";

type CustomerInfo = {
    fullName: string;
    accountNumber: string;
    accountType: string;
    branch: string;
}

export default function StatementsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
        const [txns, customer] = await Promise.all([
            getTransactions(),
            getCustomerInfo()
        ]);
        setTransactions(txns);
        setCustomerInfo(customer);
    }
    fetchData();

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
        // Find the latest transaction before the start date to estimate an opening balance
        const transactionsBeforeRange = transactions
            .filter(t => dateRange?.from && new Date(t.date) < dateRange.from)
            .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        const openingBalance = transactionsBeforeRange.length > 0 ? transactionsBeforeRange[0].balance : 0;
        
        return { openingBalance, closingBalance: openingBalance, totalCredits: 0, totalDebits: 0 };
    }
    
    const sorted = [...filteredTransactions].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const firstTxn = sorted[0];
    const openingBalance = firstTxn.balance + (firstTxn.type === 'debit' ? firstTxn.amount : -firstTxn.amount);
    
    const lastTxn = sorted[sorted.length - 1];
    const closingBalance = lastTxn.balance;

    const totalCredits = sorted.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
    const totalDebits = sorted.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);

    return { openingBalance, closingBalance, totalCredits, totalDebits };

  }, [filteredTransactions, transactions, dateRange]);
  
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
                    {customerInfo && <StatementHeader customer={customerInfo} range={dateRange}/>}
                    <StatementControls dateRange={dateRange} setDateRange={setDateRange} />
                    <StatementSummary summary={summary} />
                    <TransactionHistory transactions={filteredTransactions} />
                </CardContent>
            </Card>
        </ClientOnly>
    </div>
  );
}
