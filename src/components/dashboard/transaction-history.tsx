
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { Transaction } from "@/types/transaction";

const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `INR ${formatted}`;
};

type TransactionHistoryProps = {
    transactions: Transaction[];
    isLoading: boolean;
}

export function TransactionHistory({ transactions, isLoading }: TransactionHistoryProps) {
  
  if (isLoading) {
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Debit</TableHead>
                        <TableHead className="text-right">Credit</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(5)].map((_, i) => (
                        <TableRow key={i}>
                            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-5 w-28 ml-auto" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
  }
  
  return (
    <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Debit</TableHead>
              <TableHead className="text-right">Credit</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
                transactions.map((txn) => (
                <TableRow key={txn.txn_id}>
                    <TableCell>{new Date(txn.txn_time).toLocaleDateString("en-GB")}</TableCell>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell className="text-right font-medium text-red-600">
                    {txn.txn_type === "debit" ? formatCurrency(txn.amount) : "-"}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                    {txn.txn_type === "credit" ? formatCurrency(txn.amount) : "-"}
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(txn.balance_after)}</TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                        No transactions found for the selected period.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  );
}
