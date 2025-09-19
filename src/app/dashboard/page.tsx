
import { CustomerProfile } from "@/components/dashboard/account-summary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Landmark, ArrowRight, IndianRupee, Receipt } from "lucide-react";
import Link from "next/link";
import { TransactionChart } from "@/components/dashboard/transaction-chart";
import { getCustomerInfo } from "@/app/actions/transactions";


const chartData = [
  { month: "Jan", credit: 50000, debit: 35000 },
  { month: "Feb", credit: 65000, debit: 42000 },
  { month: "Mar", credit: 72000, debit: 68000 },
  { month: "Apr", credit: 48000, debit: 51000 },
  { month: "May", credit: 90000, debit: 60000 },
  { month: "Jun", credit: 85000, debit: 75000 },
];

const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `INR ${formatted}`;
  };
  

export default async function DashboardPage() {
  const customer = await getCustomerInfo();

  const account = {
      type: "Savings Account",
      number: "50100123456789",
      balance: 150000.75,
  };


  return (
    <div className="flex flex-col gap-8">
       <div className="bg-card border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">You are here: / <span className="font-medium text-primary">My Accounts &amp; Profile</span></p>
       </div>

      <CustomerProfile customer={customer} />

      <Card>
        <CardHeader>
            <CardTitle>My Account</CardTitle>
            <CardDescription>An overview of your bank account and balance.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Landmark className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">{account.type}</p>
                        <p className="text-muted-foreground">{account.number}</p>
                    </div>
                </div>
                <div className="text-left md:text-right">
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="font-bold text-xl text-primary">{formatCurrency(account.balance)}</p>
                </div>
                <div className="flex gap-2 self-start md:self-center">
                    <Link href="/dashboard/statements">
                        <Button variant="outline" size="sm">View Transactions</Button>
                    </Link>
                    <Link href="/dashboard/payments?tab=transfer">
                      <Button size="sm">Transfer Funds</Button>
                    </Link>
                </div>
            </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
            <CardDescription>A summary of your credits and debits over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
            <TransactionChart data={chartData} />
        </CardContent>
      </Card>
      
       <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Link href="/dashboard/payments?tab=transfer">
                      <Button variant="outline" className="justify-start gap-2 w-full"><IndianRupee/>Fund Transfer</Button>
                    </Link>
                    <Link href="/dashboard/payments?tab=bill">
                      <Button variant="outline" className="justify-start gap-2 w-full"><Receipt/>Bill Payments</Button>
                    </Link>
                    <Link href="/dashboard/cards">
                        <Button variant="outline" className="justify-start gap-2"><CreditCard/>Card Services</Button>
                    </Link>
                    <Button variant="outline" className="justify-start gap-2"><ArrowRight/>Cheque Book Request</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Statements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex justify-between items-center">
                        <p>View and download your statements</p>
                         <Link href="/dashboard/statements">
                            <Button variant="secondary">View Statements</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
