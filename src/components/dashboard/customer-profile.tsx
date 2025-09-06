
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, ShieldCheck } from "lucide-react";

type Customer = {
    fullName: string;
    customerId: string;
    email: string;
    contactNumber: string;
}

type CustomerProfileProps = {
    customer: Customer;
}

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center gap-3">
        <div className="text-muted-foreground">{icon}</div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium text-foreground">{value}</p>
        </div>
    </div>
)

export function CustomerProfile({ customer }: CustomerProfileProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-headline">Welcome back, {customer.fullName}!</CardTitle>
            <CardDescription>Here’s a summary of your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2">
           <DetailItem icon={<User />} label="Full Name" value={customer.fullName} />
           <DetailItem icon={<ShieldCheck />} label="Customer ID" value={customer.customerId} />
           <DetailItem icon={<Mail />} label="Email Address" value={customer.email} />
           <DetailItem icon={<Phone />} label="Contact Number" value={customer.contactNumber} />
        </CardContent>
    </Card>
  )
}
