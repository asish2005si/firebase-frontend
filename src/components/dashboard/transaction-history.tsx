
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type Transaction = {
    id: string;
    date: string;
    description: string;
    type: "debit" | "credit";
    amount: number;
    balance: number;
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
};

type TransactionHistoryProps = {
    transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Debit</TableHead>
              <TableHead className="text-right">Credit</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
                transactions.map((txn) => (
                <TableRow key={txn.id}>
                    <TableCell>{new Date(txn.date).toLocaleDateString("en-GB")}</TableCell>
                    <TableCell>{txn.id}</TableCell>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell className="text-right font-medium text-red-600">
                    {txn.type === "debit" ? formatCurrency(txn.amount) : "-"}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                    {txn.type === "credit" ? formatCurrency(txn.amount) : "-"}
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(txn.balance)}</TableCell>
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
