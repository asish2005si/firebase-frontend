
import { CustomerProfile } from "@/components/dashboard/account-summary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard, Landmark, ArrowRight, FileText, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const customer = {
  fullName: "Jane Doe",
  customerId: "CUST123456",
  email: "jane.doe@example.com",
  contactNumber: "+91 9876543210",
  address: "123, Sunshine Apartments, Mumbai, Maharashtra, 400001",
};

const accounts = [
    {
        type: "Savings Account",
        number: "XXXX-XXXX-XX9876",
        balance: 150000.75,
    },
    {
        type: "Current Account",
        number: "XXXX-XXXX-XX5432",
        balance: 45000.00,
    }
]

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };
  

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
       <div className="bg-card border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">You are here: / <span className="font-medium text-primary">My Accounts &amp; Profile</span></p>
       </div>

      <CustomerProfile customer={customer} />

      <Card>
        <CardHeader>
            <CardTitle>My Accounts</CardTitle>
            <CardDescription>An overview of your bank accounts and balances.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {accounts.map((account) => (
                 <div key={account.number} className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-secondary/20 rounded-full">
                            <Landmark className="h-6 w-6 text-secondary" />
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
                        <Button variant="outline" size="sm">View Transactions</Button>
                        <Button size="sm">Transfer Funds</Button>
                    </div>
                 </div>
            ))}
        </CardContent>
      </Card>
      
       <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start gap-2"><DollarSign/>Fund Transfer</Button>
                    <Button variant="outline" className="justify-start gap-2"><FileText/>Bill Payments</Button>
                    <Button variant="outline" className="justify-start gap-2"><CreditCard/>Card Services</Button>
                    <Button variant="outline" className="justify-start gap-2"><ArrowRight/>Cheque Book Request</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Statements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p>Download Monthly Statement (PDF)</p>
                        <Button variant="secondary" size="icon"><Download className="h-5 w-5" /></Button>
                    </div>
                     <Separator />
                     <div className="flex justify-between items-center">
                        <p>Download Last 6 Months (CSV)</p>
                        <Button variant="secondary" size="icon"><Download className="h-5 w-5" /></Button>
                    </div>
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
