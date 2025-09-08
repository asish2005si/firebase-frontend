
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

export type LoanApplication = {
    id: string;
    type: string;
    amount: number;
    date: string;
    status: "Pending" | "Approved" | "Rejected";
}

type LoanApplicationsProps = {
    applications: LoanApplication[];
}

const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `INR ${formatted}`;
};

const statusColors: Record<LoanApplication['status'], string> = {
    "Approved": "bg-green-600",
    "Pending": "bg-yellow-500",
    "Rejected": "bg-red-600",
}

export function LoanApplications({ applications }: LoanApplicationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Loan Applications</CardTitle>
        <CardDescription>A history of your past and current loan applications.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Application ID</TableHead>
                        <TableHead>Loan Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.length > 0 ? applications.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge className={statusColors[item.status]}>
                                    {item.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right font-semibold">{formatCurrency(item.amount)}</TableCell>
                            <TableCell className="text-right">
                               <Button variant="outline" size="sm">View Details</Button>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center h-24">No loan applications found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
