
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTransactions, getCustomerInfo } from "@/app/actions/transactions";
import { StatementView } from "@/components/dashboard/statements/statement-view";

export default async function StatementsPage() {
  const [transactions, customerInfo] = await Promise.all([
    getTransactions(),
    getCustomerInfo(),
  ]);

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
          <StatementView
            initialTransactions={transactions}
            customerInfo={customerInfo}
          />
        </CardContent>
      </Card>
    </div>
  );
}
