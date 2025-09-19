
"use client";

import { useState, useEffect, useMemo } from "react";
import type { Transaction } from "@/components/dashboard/transaction-history";
import { StatementHeader } from "@/components/dashboard/statements/statement-header";
import { StatementControls } from "@/components/dashboard/statements/statement-controls";
import { StatementSummary } from "@/components/dashboard/statements/statement-summary";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

type CustomerInfo = {
  fullName: string;
  accountNumber: string;
  accountType: string;
  branch: string;
};

type StatementViewProps = {
  initialTransactions: Transaction[];
  customerInfo: CustomerInfo;
};

export function StatementView({
  initialTransactions,
  customerInfo,
}: StatementViewProps) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
    from: subDays(new Date(), 29),
    to: new Date(),
  }));

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const fromDate = dateRange.from;
      const toDate = dateRange.to;
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);

      const filtered = transactions.filter((txn) => {
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
      const transactionsBeforeRange = transactions
        .filter((t) => dateRange?.from && new Date(t.date) < dateRange.from)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

      const openingBalance =
        transactionsBeforeRange.length > 0
          ? transactionsBeforeRange[0].balance
          : 0;

      return {
        openingBalance,
        closingBalance: openingBalance,
        totalCredits: 0,
        totalDebits: 0,
      };
    }

    const sorted = [...filteredTransactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const firstTxn = sorted[0];
    const openingBalance =
      firstTxn.balance +
      (firstTxn.type === "debit" ? firstTxn.amount : -firstTxn.amount);

    const lastTxn = sorted[sorted.length - 1];
    const closingBalance = lastTxn.balance;

    const totalCredits = sorted
      .filter((t) => t.type === "credit")
      .reduce((acc, t) => acc + t.amount, 0);
    const totalDebits = sorted
      .filter((t) => t.type === "debit")
      .reduce((acc, t) => acc + t.amount, 0);

    return { openingBalance, closingBalance, totalCredits, totalDebits };
  }, [filteredTransactions, transactions, dateRange]);

  return (
    <>
      <StatementHeader customer={customerInfo} range={dateRange} />
      <StatementControls dateRange={dateRange} setDateRange={setDateRange} />
      <StatementSummary summary={summary} />
      <TransactionHistory transactions={filteredTransactions} />
    </>
  );
}
