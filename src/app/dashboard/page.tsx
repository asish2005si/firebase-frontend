
import { AccountSummary } from "@/components/dashboard/account-summary";
import { UpcomingPayments } from "@/components/dashboard/upcoming-payments";
import { RecentNotifications } from "@/components/dashboard/recent-notifications";

export default function DashboardPage() {

    const accounts = [
        { type: "Savings Account", number: "XXXX-XXXX-1234", balance: 5420.50 },
        { type: "Fixed Deposit", number: "XXXX-XXXX-5678", balance: 10000.00 }
    ];

    const upcomingPayments = [
        { dueDate: "2024-07-28", description: "Home Loan EMI", amount: 1500.00, status: "Pending" },
        { dueDate: "2024-08-01", description: "Credit Card Bill", amount: 750.80, status: "Pending" },
        { dueDate: "2024-08-05", description: "Electricity Bill", amount: 120.00, status: "Upcoming" }
    ];

    const notifications = [
        { date: "2024-07-25", message: "Your salary of $2500 has been credited." },
        { date: "2024-07-24", message: "A new login was detected from a new device." },
        { date: "2024-07-22", message: "Your request to update your address has been approved." }
    ];

  return (
    <div className="flex flex-col gap-8">
       <div className="space-y-2">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
              Welcome back, Alex!
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s a summary of your financial activities.
            </p>
        </div>

        <AccountSummary accounts={accounts} />

        <div className="grid gap-8 md:grid-cols-2">
            <UpcomingPayments payments={upcomingPayments} />
            <RecentNotifications notifications={notifications} />
        </div>
    </div>
  );
}
