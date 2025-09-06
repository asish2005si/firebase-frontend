

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Send, IndianRupee, Landmark, AlertCircle, ArrowUpRight } from "lucide-react";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { TransactionHistory } from "@/components/dashboard/transaction-history";

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>Your Accounts</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              An overview of your account balances and recent activity.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>View All Accounts</Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Total Balance</CardDescription>
            <CardTitle className="text-4xl flex items-center">
              <IndianRupee className="h-7 w-7"/>1,25,000
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +5.2% from last month
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">
              Add Funds
            </Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Loan EMI Reminder</CardDescription>
            <CardTitle className="text-3xl flex items-center">
             <IndianRupee className="h-6 w-6"/>12,500
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Home loan EMI due on 10th Sept
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm">Pay Now</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
            <CardHeader>
                <CardTitle>Expense Tracker</CardTitle>
                <CardDescription>Your spending summary for this month.</CardDescription>
            </CardHeader>
            <CardContent>
                <ExpenseChart />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Savings Goals</CardTitle>
                <CardDescription>You are 70% complete with your car fund!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="font-semibold">Car Fund</span>
                        <span className="text-muted-foreground">₹1,75,000 / ₹2,50,000</span>
                    </div>
                    <Progress value={70} aria-label="70% complete"/>
                </div>
                 <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="font-semibold">Vacation Fund</span>
                        <span className="text-muted-foreground">₹20,000 / ₹1,00,000</span>
                    </div>
                    <Progress value={20} aria-label="20% complete"/>
                </div>
            </CardContent>
             <CardFooter>
                <Button>Manage Goals</Button>
            </CardFooter>
        </Card>
      </div>

      <TransactionHistory />
      
    </>
  );
}
