
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatementView } from "@/components/dashboard/statements/statement-view";
import { useUser } from "@/firebase";

export default function StatementsPage() {
  const { user } = useUser();

  const customerInfo = {
    fullName: user?.displayName || user?.email || "Customer",
    accountNumber: "50100123456789",
    accountType: "Savings Account",
    branch: "Mumbai - Fort",
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Account Statement</CardTitle>
          <CardDescription>
            View, filter, and download your transaction history.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <StatementView customerInfo={customerInfo} />
        </CardContent>
      </Card>
    </div>
  );
}
