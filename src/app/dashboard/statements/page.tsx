
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Printer,
  Calendar as CalendarIcon,
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { TransactionHistory, Transaction } from "@/components/dashboard/transaction-history";

const initialTransactions: Transaction[] = [
    { id: "TXN75620", date: "2024-07-28", description: "UPI/Google Pay/Amazon", type: "debit", amount: 1250.00, balance: 148750.75 },
    { id: "TXN75619", date: "2024-07-27", description: "Salary Credit July", type: "credit", amount: 75000.00, balance: 150000.75 },
    { id: "TXN75618", date: "2024-07-26", description: "Rent Payment", type: "debit", amount: 20000.00, balance: 75000.75 },
    { id: "TXN75617", date: "2024-07-25", description: "Online Shopping", type: "debit", amount: 3500.00, balance: 95000.75 },
    { id: "TXN75616", date: "2024-07-24", description: "ATM Withdrawal", type: "debit", amount: 5000.00, balance: 98500.75 },
    { id: "TXN75615", date: "2024-07-23", description: "Investment SIP", type: "debit", amount: 10000.00, balance: 103500.75 },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
};
  
export default function StatementsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 6, 22),
    to: addDays(new Date(2024, 6, 28), 0),
  });

  const openingBalance = transactions[transactions.length - 1]?.balance + transactions[transactions.length - 1]?.amount || 0;
  const closingBalance = transactions[0]?.balance || 0;
  const totalCredits = transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
  const totalDebits = transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);
  
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Account Statement</CardTitle>
          <CardDescription>
            View, print, or download your transaction history.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                    <p className="text-sm text-muted-foreground">Customer Name</p>
                    <p className="font-medium">Jane Doe</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Account Number</p>
                    <p className="font-medium">XXXX-XXXX-XX9876</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Account Type</p>
                    <p className="font-medium">Savings Account</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Branch</p>
                    <p className="font-medium">Mumbai Main Branch</p>
                </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 border rounded-lg">
             <div className="flex gap-4 items-center">
                <Select defaultValue="last7days">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="last7days">Last 7 days</SelectItem>
                        <SelectItem value="last1month">Last 1 month</SelectItem>
                        <SelectItem value="last3months">Last 3 months</SelectItem>
                    </SelectContent>
                </Select>
                <div className={cn("grid gap-2")}>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                    </div>
             </div>
             <div className="flex gap-2">
                <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                <Button><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
             </div>
          </div>

           <TransactionHistory transactions={transactions} />

            <div className="grid md:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/50">
                 <div>
                    <p className="text-sm text-muted-foreground">Opening Balance</p>
                    <p className="font-bold text-lg">{formatCurrency(openingBalance)}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Total Credits</p>
                    <p className="font-bold text-lg text-green-600">{formatCurrency(totalCredits)}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Total Debits</p>
                    <p className="font-bold text-lg text-red-600">{formatCurrency(totalDebits)}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Closing Balance</p>
                    <p className="font-bold text-lg text-primary">{formatCurrency(closingBalance)}</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
