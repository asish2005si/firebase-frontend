
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type Payment = {
    dueDate: string;
    description: string;
    amount: number;
    status: "Pending" | "Upcoming" | "Paid";
};

type UpcomingPaymentsProps = {
    payments: Payment[];
}


const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => new Date(row.original.dueDate).toLocaleDateString(),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
     cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === 'Pending' ? 'destructive' : status === 'Paid' ? 'default' : 'secondary';
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.description)}
            >
              Copy Details
            </DropdownMenuItem>
            <DropdownMenuItem>Pay Now</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
];


export function UpcomingPayments({ payments }: UpcomingPaymentsProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-headline">Upcoming Payments</CardTitle>
            <CardDescription>Your pending loan EMIs and bill payments.</CardDescription>
        </CardHeader>
        <CardContent>
            <DataTable columns={columns} data={payments} />
        </CardContent>
    </Card>
  )
}
