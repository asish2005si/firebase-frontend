
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ApplicationData } from "@/lib/mock-application-data";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";


const DetailItem = ({ label, value, isHighlight = false }: { label: string; value?: string | number; isHighlight?: boolean }) => {
    if (!value && value !== 0) return null;
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className={`font-semibold ${isHighlight ? 'text-primary' : ''}`}>{value}</p>
        </div>
    );
}

const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `INR ${formatted}`;
};

const statusColors: Record<ApplicationData['status'], string> = {
    "Approved": "bg-green-600",
    "Pending": "bg-yellow-500",
    "Rejected": "bg-red-600",
};

export function AdminApplicationView({ application }: { application: ApplicationData }) {
  const { toast } = useToast();

  const handleApprove = () => {
    // In a real app, you'd call a server action here to update the status.
    toast({
      title: "Application Approved",
      description: `Application ${application.applicationId} has been marked as approved.`,
    });
  };

  const handleReject = () => {
    // In a real app, you'd call a server action here to update the status.
    toast({
        variant: "destructive",
        title: "Application Rejected",
        description: `Application ${application.applicationId} has been marked as rejected.`,
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
            <CardTitle>Application Details</CardTitle>
        </div>
        <Badge className={statusColors[application.status]}>{application.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <DetailItem label="Application ID" value={application.applicationId} isHighlight/>
            <DetailItem label="Account Type" value={application.accountType} />
            <DetailItem label="Application Date" value={new Date(application.applicationDate).toLocaleDateString("en-GB")} />
            <DetailItem label="Initial Deposit" value={formatCurrency(application.initialDeposit)} />
        </div>
        
        <Separator />
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <DetailItem label="Full Name" value={application.fullName} />
            <DetailItem label="Date of Birth" value={new Date(application.dob).toLocaleDateString("en-GB")} />
            <DetailItem label="Mobile Number" value={application.mobile} />
            <DetailItem label="Email Address" value={application.email} />
            <DetailItem label="Address" value={application.address} />
        </div>
        
        {application.nomineeName && (
            <>
                <Separator />
                <h3 className="text-lg font-semibold text-foreground">Nominee Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <DetailItem label="Nominee Name" value={application.nomineeName} />
                </div>
            </>
        )}
      </CardContent>
      {application.status === 'Pending' && (
        <CardFooter className="border-t pt-6 flex justify-end gap-4">
            <Button variant="destructive" onClick={handleReject}>
                <XCircle className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button onClick={handleApprove}>
                <CheckCircle className="mr-2 h-4 w-4" /> Approve
            </Button>
        </CardFooter>
      )}
    </Card>
  );
}
