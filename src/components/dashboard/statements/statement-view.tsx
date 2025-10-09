
"use client";

import { useState, useMemo } from "react";
import type { Transaction } from "@/types/transaction";
import { StatementHeader } from "@/components/dashboard/statements/statement-header";
import { StatementControls } from "@/components/dashboard/statements/statement-controls";
import { StatementSummary } from "@/components/dashboard/statements/statement-summary";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";

type CustomerInfo = {
  fullName: string;
  accountNumber: string;
  accountType: string;
  branch: string;
};

type StatementViewProps = {
  customerInfo: CustomerInfo;
};

export function StatementView({
  customerInfo,
}: StatementViewProps) {
  const { user } = useUser();
  const firestore = useFirestore();

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
    from: subDays(new Date(), 29),
    to: new Date(),
  }));

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user || !dateRange?.from) return null;
    
    const fromDate = new Date(dateRange.from);
    fromDate.setHours(0, 0, 0, 0);

    const toDate = dateRange.to ? new Date(dateRange.to) : new Date();
    toDate.setHours(23, 59, 59, 999);

    return query(
      collection(firestore, "transactions"),
      where("performed_by", "==", user.uid),
      where("txn_time", ">=", fromDate.toISOString()),
      where("txn_time", "<=", toDate.toISOString()),
      orderBy("txn_time", "desc")
    );
  }, [firestore, user, dateRange]);

  const { data: transactions, isLoading } = useCollection<Transaction>(transactionsQuery);

  const summary = useMemo(() => {
    const openingBalance = 150000; // Mock opening balance for now
    
    if (!transactions || transactions.length === 0) {
      return {
        openingBalance: openingBalance,
        closingBalance: openingBalance,
        totalCredits: 0,
        totalDebits: 0,
      };
    }
    
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.txn_time).getTime() - new Date(b.txn_time).getTime()
    );

    const { totalCredits, totalDebits } = sorted.reduce((acc, t) => {
        if (t.txn_type === "credit") {
            acc.totalCredits += t.amount;
        } else if (t.txn_type === "debit") {
            acc.totalDebits += t.amount;
        }
        return acc;
    }, { totalCredits: 0, totalDebits: 0 });
      
    const closingBalance = openingBalance + totalCredits - totalDebits;

    return { openingBalance, closingBalance, totalCredits, totalDebits };
  }, [transactions]);

  const transactionsWithBalance = useMemo(() => {
    if (!transactions) return [];

    const sorted = [...transactions].sort(
        (a, b) => new Date(a.txn_time).getTime() - new Date(b.txn_time).getTime()
    );

    let currentBalance = summary.openingBalance;
    const balancedTransactions = sorted.map(txn => {
        if (txn.txn_type === 'credit') {
            currentBalance += txn.amount;
        } else {
            currentBalance -= txn.amount;
        }
        return { ...txn, balance_after: currentBalance };
    });
    
    return balancedTransactions.sort((a,b) => new Date(b.txn_time).getTime() - new Date(a.txn_time).getTime());

  }, [transactions, summary.openingBalance]);


  return (
    <>
      <StatementHeader customer={customerInfo} range={dateRange} />
      <StatementControls dateRange={dateRange} setDateRange={setDateRange} />
      <StatementSummary summary={summary} />
      <TransactionHistory transactions={transactionsWithBalance} isLoading={isLoading} />
    </>
  );
}
