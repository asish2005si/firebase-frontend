
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, ArrowRight, User, Settings } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-primary">
                <Landmark className="h-6 w-6" />
                <span className="text-xl font-bold font-headline">Nexus Bank</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
               <Link href="/login">
                <Button variant="outline">Logout</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome, Customer!</h1>
            <p className="text-muted-foreground">Here is your account overview.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Savings Account</CardTitle>
                <CardDescription>Primary</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹10,430.50</p>
                <p className="text-sm text-green-500">+2.5% this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Credit Card</CardTitle>
                <CardDescription>Nexus Platinum</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹1,204.78</p>
                <p className="text-sm text-muted-foreground">Due on 25th</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>What would you like to do?</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-2">
                <Button>Transfer Money <ArrowRight className="ml-2"/></Button>
                <Button variant="secondary">Pay Bills</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
