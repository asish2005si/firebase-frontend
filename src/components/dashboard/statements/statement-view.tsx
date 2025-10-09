
"use client";

import { useState, useEffect, useMemo } from "react";
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
    if (!firestore || !user || !dateRange?.from || !dateRange?.to) return null;
    
    const fromDate = new Date(dateRange.from);
    fromDate.setHours(0, 0, 0, 0);

    const toDate = new Date(dateRange.to);
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
    if (!transactions || transactions.length === 0) {
      return {
        openingBalance: 0,
        closingBalance: 0,
        totalCredits: 0,
        totalDebits: 0,
      };
    }
    
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.txn_time).getTime() - new Date(b.txn_time).getTime()
    );

    const firstTxn = sorted[0];
    const openingBalance =
      firstTxn.balance_after +
      (firstTxn.txn_type === "debit" ? firstTxn.amount : -firstTxn.amount);

    const lastTxn = sorted[sorted.length - 1];
    const closingBalance = lastTxn.balance_after;

    const totalCredits = sorted
      .filter((t) => t.txn_type === "credit")
      .reduce((acc, t) => acc + t.amount, 0);
    const totalDebits = sorted
      .filter((t) => t.txn_type === "debit")
      .reduce((acc, t) => acc + t.amount, 0);

    return { openingBalance, closingBalance, totalCredits, totalDebits };
  }, [transactions]);

  return (
    <>
      <StatementHeader customer={customerInfo} range={dateRange} />
      <StatementControls dateRange={dateRange} setDateRange={setDateRange} />
      <StatementSummary summary={summary} />
      <TransactionHistory transactions={transactions || []} isLoading={isLoading} />
    </>
  );
}
