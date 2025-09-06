
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";

type Account = {
    type: string;
    number: string;
    balance: number;
}

type AccountSummaryProps = {
    accounts: Account[];
}

export function AccountSummary({ accounts }: AccountSummaryProps) {
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-xl font-headline">Account Summary</CardTitle>
                <CardDescription>Your balances across all accounts.</CardDescription>
            </div>
            <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-3xl font-bold text-primary">
                    ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            {accounts.map(account => (
                <Card key={account.number} className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-base font-medium">{account.type}</CardTitle>
                        <CardDescription>{account.number}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-2xl font-semibold">
                            ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button variant="ghost" size="sm"><EyeOff className="mr-2 h-4 w-4" /> Hide Balances</Button>
            <Button variant="outline" size="sm">View Statements</Button>
        </CardFooter>
    </Card>
  )
}
