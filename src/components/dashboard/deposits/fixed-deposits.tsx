
"use client";

import { useState } from "react";
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
import type { FixedDeposit } from "@/types/deposits";
import { OpenFdForm } from "./open-fd-form";

type FixedDepositsProps = {
    deposits: FixedDeposit[];
    addFd: (fd: Omit<FixedDeposit, "id" | "startDate" | "maturityDate" | "status">) => void;
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
};

const statusColors: Record<FixedDeposit['status'], string> = {
    "Active": "bg-green-600",
    "Matured": "bg-blue-500",
    "Closed": "bg-red-600",
};

export function FixedDeposits({ deposits, addFd }: FixedDepositsProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <Card className="mt-6 border-0 shadow-none">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Your Fixed Deposits</CardTitle>
          <CardDescription>A summary of your FDs with us.</CardDescription>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <PlusCircle className="mr-2 h-4 w-4" /> {showForm ? "Cancel" : "Open New FD"}
        </Button>
      </CardHeader>
      <CardContent>
        {showForm ? (
          <OpenFdForm addFd={addFd} onFormClose={() => setShowForm(false)} />
        ) : (
          <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>FD Account No.</TableHead>
                        <TableHead>Deposit Date</TableHead>
                        <TableHead>Maturity Date</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Deposit Amount</TableHead>
                        <TableHead className="text-right">Maturity Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deposits.length > 0 ? deposits.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{new Date(item.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(item.maturityDate).toLocaleDateString()}</TableCell>
                            <TableCell>{item.interestRate.toFixed(2)}%</TableCell>
                            <TableCell>
                                <Badge className={statusColors[item.status]}>
                                    {item.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                            <TableCell className="text-right font-semibold">{formatCurrency(item.maturityAmount)}</TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center h-24">No fixed deposits found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
