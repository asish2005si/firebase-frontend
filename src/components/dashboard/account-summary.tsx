
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Customer = {
    fullName: string;
    accountNumber: string;
    email: string;
    contactNumber: string;
}

type CustomerProfileProps = {
    customer: Customer;
}

export function CustomerProfile({ customer }: CustomerProfileProps) {
  return (
    <Card>
        <CardHeader className="flex flex-row justify-between items-center">
            <div>
                <CardTitle className="text-xl font-headline">Welcome back, {customer.fullName}!</CardTitle>
                <CardDescription>Here’s a summary of your profile information.</CardDescription>
            </div>
            <p className="text-sm text-muted-foreground">Last Login: 05-Sep-2025 [12:45 AM IST]</p>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
            <DetailItem label="Full Name" value={customer.fullName} />
            <DetailItem label="Account Number" value={customer.accountNumber} />
            <DetailItem label="Email Address" value={customer.email} />
        </CardContent>
    </Card>
  )
}

const DetailItem = ({ label, value }: { label: string, value: string }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
    </div>
)
