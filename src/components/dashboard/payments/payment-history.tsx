
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/types/transaction";

const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `INR ${formatted}`;
};

type PaymentHistoryProps = {
    history: Transaction[];
}

export function PaymentHistory({ history }: PaymentHistoryProps) {
  return (
    <Card className="mt-6 border-0 shadow-none">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>A record of your recent payments and transfers.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history.length > 0 ? history.map((item) => (
                    <TableRow key={item.txn_id}>
                        <TableCell>{new Date(item.txn_time).toLocaleDateString()}</TableCell>
                        <TableCell>{item.txn_id}</TableCell>
                        <TableCell>{item.txn_type}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                             <Badge variant={"default"} className={"bg-green-600"}>
                                Success
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">No payment history found.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
