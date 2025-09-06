
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

const paymentHistory = [
    { id: "PAY84321", date: "2024-07-29", type: "Bill Payment", description: "Adani Electricity", amount: 1500.00, status: "Success" },
    { id: "TRN99823", date: "2024-07-28", type: "Fund Transfer", description: "John Doe", amount: 10000.00, status: "Success" },
    { id: "PAY84320", date: "2024-07-25", type: "Bill Payment", description: "Airtel Postpaid", amount: 599.00, status: "Success" },
    { id: "TRN99822", date: "2024-07-22", type: "Fund Transfer", description: "Jane Smith", amount: 2500.00, status: "Failed" },
    { id: "PAY84319", date: "2024-07-20", type: "Bill Payment", description: "Mahanagar Gas", amount: 850.00, status: "Success" },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
};


export function PaymentHistory() {
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
                {paymentHistory.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                            <Badge variant={item.status === "Success" ? "default" : "destructive"} className={item.status === "Success" ? "bg-green-600" : ""}>
                                {item.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
