
import { AccountCard } from "@/components/dashboard/account-card";
import { CustomerProfile } from "@/components/dashboard/customer-profile";

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

  return (
    <div className="flex flex-col gap-8">
        <CustomerProfile customer={customer} />
        
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4 text-primary">Your Account</h2>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                <AccountCard account={account} />
            </div>
        </div>
    </div>
  );
}
