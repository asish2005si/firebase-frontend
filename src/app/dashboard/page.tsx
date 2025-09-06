
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  PiggyBank,
  Briefcase,
  Car,
  GraduationCap,
  FileText,
  Wallet,
  Smartphone,
  MessageSquare,
  BarChart,
  Bell,
  Banknote,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart as BarChartComponent,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';

const accountSummary = [
  {
    title: "Savings Balance",
    account: "XXXX1234",
    amount: "1,25,000",
    icon: <PiggyBank className="h-6 w-6 text-primary" />,
  },
  {
    title: "Credit Card",
    account: "XXXX5678",
    amount: "12,450",
    label: "Outstanding",
    icon: <CreditCard className="h-6 w-6 text-primary" />,
  },
  {
    title: "Fixed Deposit",
    account: "XXXX9012",
    amount: "5,00,000",
    icon: <Landmark className="h-6 w-6 text-primary" />,
  },
  {
    title: "Car Loan",
    account: "XXXX3456",
    amount: "3,50,000",
    label: "Active",
    icon: <Car className="h-6 w-6 text-primary" />,
  },
];

const quickActions = [
    { title: "Fund Transfer", icon: <Banknote /> },
    { title: "Pay Bills & Recharge", icon: <Smartphone /> },
    { title: "Request Cheque Book", icon: <FileText /> },
    { title: "Apply Loan", icon: <Briefcase /> },
    { title: "Manage Cards", icon: <CreditCard /> },
];

const transactions = [
    { date: "07-Sep", description: "Amazon Purchase", amount: "-₹1,499", status: "Success", icon: <ArrowDownRight className="text-red-500" /> },
    { date: "06-Sep", description: "Salary Credit", amount: "+₹55,000", status: "Success", icon: <ArrowUpRight className="text-green-500" /> },
    { date: "05-Sep", description: "Zomato Order", amount: "-₹350", status: "Success", icon: <ArrowDownRight className="text-red-500" /> },
    { date: "04-Sep", description: "Mobile Recharge", amount: "-₹299", status: "Failed", icon: <ArrowDownRight className="text-gray-400" /> },
    { date: "02-Sep", description: "FD Interest", amount: "+₹2,500", status: "Success", icon: <ArrowUpRight className="text-green-500" /> },
];

const expenseData = [
  { name: "Food", value: 400 },
  { name: "Travel", value: 300 },
  { name: "Shopping", value: 300 },
  { name: "Bills", value: 200 },
];

const incomeExpenseData = [
  { name: 'Mar', income: 4000, expense: 2400 },
  { name: 'Apr', income: 3000, expense: 1398 },
  { name: 'May', income: 2000, expense: 9800 },
  { name: 'Jun', income: 2780, expense: 3908 },
  { name: 'Jul', income: 1890, expense: 4800 },
  { name: 'Aug', income: 2390, expense: 3800 },
];

const goals = [
    { name: "Laptop Goal", completed: 45000, total: 60000 },
]

const COLORS = ["#0a3d91", "#2196f3", "#82ca9d", "#ffc658"];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {accountSummary.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{item.amount}</div>
              <p className="text-xs text-muted-foreground">
                {item.label ? `${item.label} on ${item.account}`: `on A/c ${item.account}`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickActions.map(action => (
                <Button key={action.title} variant="outline" className="flex flex-col h-24 gap-2 items-center justify-center">
                    {React.cloneElement(action.icon, { className: "h-6 w-6 text-primary" })}
                    <span className="text-xs text-center">{action.title}</span>
                </Button>
            ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your last 5 transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {transactions.map(tx => (
                    <div key={tx.description} className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarFallback>{tx.icon}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{tx.description}</p>
                            <p className="text-sm text-muted-foreground">{tx.date}</p>
                        </div>
                        <div className="ml-auto font-medium text-right">
                            <p className="text-sm">{tx.amount}</p>
                            <p className={`text-xs ${tx.status === "Success" ? "text-green-500" : "text-red-500"}`}>{tx.status}</p>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense & Income Analytics</CardTitle>
            <CardDescription>Comparison of your income vs. expenses for the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChartComponent data={incomeExpenseData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip />
                <Bar dataKey="income" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
              </BarChartComponent>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Spending Categories</CardTitle>
            <CardDescription>Your spending breakdown for this month.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={expenseData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                        {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Goals & Savings Tracker</CardTitle>
                <CardDescription>You saved ₹15,000 more than last month 🎉</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {goals.map(goal => (
                    <div key={goal.name}>
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-primary">{goal.name}</span>
                            <span className="text-sm font-medium">₹{goal.completed.toLocaleString()} / ₹{goal.total.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-accent h-2.5 rounded-full" style={{ width: `${(goal.completed/goal.total) * 100}%` }}></div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
