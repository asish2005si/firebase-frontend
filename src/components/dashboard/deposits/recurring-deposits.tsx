
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
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { RecurringDeposit } from "@/types/deposits";

type RecurringDepositsProps = {
    deposits: RecurringDeposit[];
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
};

const statusColors: Record<RecurringDeposit['status'], string> = {
    "Active": "bg-green-600",
    "Matured": "bg-blue-500",
    "Closed": "bg-red-600",
};

export function RecurringDeposits({ deposits }: RecurringDepositsProps) {
  return (
    <Card className="mt-6 border-0 shadow-none">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Your Recurring Deposits</CardTitle>
          <CardDescription>A summary of your RDs with us.</CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Open New RD
        </Button>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>RD Account No.</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Next Due Date</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Monthly Installment</TableHead>
                      <TableHead className="text-right">Amount Deposited</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {deposits.length > 0 ? deposits.map((item) => (
                      <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{new Date(item.startDate).toLocaleDateString()}</TableCell>
                          <TableCell>{item.nextDueDate ? new Date(item.nextDueDate).toLocaleDateString() : 'N/A'}</TableCell>
                          <TableCell>{item.interestRate.toFixed(2)}%</TableCell>
                          <TableCell>
                              <Badge className={statusColors[item.status]}>
                                  {item.status}
                              </Badge>
                          </TableCell>
                          <TableCell className="text-right">{formatCurrency(item.monthlyInstallment)}</TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(item.amountDeposited)}</TableCell>
                      </TableRow>
                  )) : (
                      <TableRow>
                          <TableCell colSpan={7} className="text-center h-24">No recurring deposits found.</TableCell>
                      </TableRow>
                  )}
              </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
