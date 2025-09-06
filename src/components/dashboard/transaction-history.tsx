
"use client";

import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const transactions = [
    { 
        name: "Anya Sharma", 
        email: "anya.sharma@example.com", 
        amount: "+₹50,000.00", 
        type: "Credit", 
        date: "2024-07-01",
        status: "Success" 
    },
    { 
        name: "Rohan Verma", 
        email: "rohan.verma@example.com", 
        amount: "-₹2,500.00", 
        type: "Debit", 
        date: "2024-06-28",
        status: "Success"
    },
    { 
        name: "Priya Singh", 
        email: "priya.singh@example.com", 
        amount: "-₹1,200.00", 
        type: "Debit", 
        date: "2024-06-25",
        status: "Success"
    },
    { 
        name: "Tech Solutions Inc.", 
        email: "contact@techsolutions.com", 
        amount: "-₹15,000.00", 
        type: "Debit", 
        date: "2024-06-22",
        status: "Success"
    },
     { 
        name: "Amit Kumar", 
        email: "amit.kumar@example.com", 
        amount: "+₹8,000.00", 
        type: "Credit", 
        date: "2024-06-20",
        status: "Success"
    },
];

export function TransactionHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your accounts.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <a href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <div className="font-medium">{transaction.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                        {transaction.email}
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={transaction.type === 'Credit' ? 'default' : 'secondary'}>
                        {transaction.type}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                         <Badge className="text-xs" variant="outline">
                            {transaction.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{transaction.date}</TableCell>
                    <TableCell className="text-right">{transaction.amount}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
