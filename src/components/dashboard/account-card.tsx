
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import { ArrowRight, Eye, Send } from "lucide-react";

type Account = {
    type: string;
    number: string;
    balance: number;
    currency: string;
}

type AccountCardProps = {
    account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
    
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  return (
    <Card className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg">
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-headline">{account.type}</CardTitle>
                <Eye className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
            </div>
            <CardDescription>{account.number}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-3xl font-bold text-primary">
                {formatCurrency(account.balance, account.currency)}
            </p>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4 flex justify-end gap-2">
            <Button variant="outline" size="sm">
                <ArrowRight className="mr-2"/>
                View Transactions
            </Button>
            <Button size="sm">
                <Send className="mr-2"/>
                Transfer Funds
            </Button>
        </CardFooter>
    </Card>
  )
}
