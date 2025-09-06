
import { AccountCard } from "@/components/dashboard/account-card";
import { CustomerProfile } from "@/components/dashboard/customer-profile";
import { RecentNotifications } from "@/components/dashboard/recent-notifications";
import { UpcomingPayments } from "@/components/dashboard/upcoming-payments";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {

    const customer = {
        fullName: "Alex Thompson",
        accountNumber: "123456789012",
        email: "alex.thompson@example.com",
        contactNumber: "+1-202-555-0178"
    };

    const account = { 
        type: "Savings Account", 
        number: "XXXX-XXXX-1234", 
        balance: 5420.50,
        currency: "INR"
    };
    
    const notifications = [
        { date: "2024-07-22", message: "Your credit card statement for July is now available." },
        { date: "2024-07-21", message: "A fund transfer of INR 500.00 to John Doe was successful." },
        { date: "2024-07-20", message: "Reminder: Your personal loan EMI of INR 2500.00 is due on July 28th." }
    ];

    const payments = [
        { dueDate: "2024-07-28", description: "Personal Loan EMI", amount: 2500.00, status: "Upcoming" },
        { dueDate: "2024-07-25", description: "Electricity Bill", amount: 850.00, status: "Pending" },
        { dueDate: "2024-07-15", description: "Credit Card Bill", amount: 1200.00, status: "Paid" }
    ];

  return (
    <div className="flex flex-col gap-8">
        <CustomerProfile customer={customer} />
        
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                 <div>
                    <h2 className="text-2xl font-bold font-headline mb-4 text-primary">Your Account</h2>
                    <div className="grid gap-6">
                        <AccountCard account={account} />
                    </div>
                </div>
                 <div>
                    <h2 className="text-2xl font-bold font-headline mb-4 text-primary">Upcoming Payments</h2>
                    <UpcomingPayments payments={payments} />
                </div>
            </div>
            <div className="lg:col-span-1">
                 <h2 className="text-2xl font-bold font-headline mb-4 text-primary">Notifications</h2>
                 <RecentNotifications notifications={notifications}/>
            </div>
        </div>
    </div>
  );
}
