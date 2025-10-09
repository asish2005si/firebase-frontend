
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanProducts } from "@/components/dashboard/loans/loan-products";
import { LoanApplications, type LoanApplication } from "@/components/dashboard/loans/loan-applications";
import { getLoanApplications } from "@/app/actions/applications";

export default async function LoansPage() {
    const applications = await getLoanApplications();

  return (
    <div className="flex flex-col gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Loans</CardTitle>
                <CardDescription>Explore loan options, apply, and manage your existing loans.</CardDescription>
            </CardHeader>
            <CardContent>
                <LoanProducts />
            </CardContent>
        </Card>
        <LoanApplications applications={applications} />
    </div>
  );
}

