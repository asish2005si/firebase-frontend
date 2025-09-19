
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ApplicationData } from "@/lib/mock-application-data";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { updateApplicationStatus } from "@/app/actions/applications";
import { useState } from "react";


const DetailItem = ({ label, value, isHighlight = false }: { label: string; value?: string | number; isHighlight?: boolean }) => {
    if (!value && value !== 0) return null;
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className={`font-semibold capitalize ${isHighlight ? 'text-primary' : ''}`}>{String(value)}</p>
        </div>
    );
}

const formatCurrency = (amount: number) => {
    if (typeof amount !== 'number') return '-';
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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateStatus = async (newStatus: "Approved" | "Rejected") => {
    setIsSubmitting(true);
    const result = await updateApplicationStatus(application.applicationId, newStatus);
    
    if (result.success) {
      toast({
        title: `Application ${newStatus}`,
        description: `Application ${application.applicationId} has been marked as ${newStatus.toLowerCase()}.`,
        variant: newStatus === "Rejected" ? "destructive" : "default",
      });
      router.refresh(); // Refresh the page to show the updated status
    } else {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: result.message || "Could not update the application status.",
      });
    }
    setIsSubmitting(false);
  };


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
            <DetailItem label="Father's/Mother's Name" value={application.fatherName} />
            <DetailItem label="Date of Birth" value={new Date(application.dob).toLocaleDateString("en-GB")} />
            <DetailItem label="Gender" value={application.gender} />
            <DetailItem label="Marital Status" value={application.maritalStatus} />
            <DetailItem label="Mobile Number" value={application.mobile} />
            <DetailItem label="Email Address" value={application.email} />
            <DetailItem label="PAN Number" value={application.panNumber} />
            <DetailItem label="Aadhaar Number" value={application.aadhaarNumber} />
            <DetailItem label="Address" value={application.address} />
            {application.accountType === "Savings Account" && <DetailItem label="Occupation" value={application.occupation} />}
        </div>
        
        {application.accountType === "Current Account" && (
            <>
                <Separator />
                <h3 className="text-lg font-semibold text-foreground">Business Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <DetailItem label="Business Name" value={application.businessName} />
                    <DetailItem label="Business Type" value={application.businessType} />
                    <DetailItem label="GST Number" value={application.gstNumber} />
                </div>
            </>
        )}

        {application.nomineeName && (
            <>
                <Separator />
                <h3 className="text-lg font-semibold text-foreground">Nominee Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <DetailItem label="Nominee Name" value={application.nomineeName} />
                    <DetailItem label="Relationship" value={application.nomineeRelation} />
                    <DetailItem label="Nominee DOB" value={application.nomineeDob ? new Date(application.nomineeDob).toLocaleDateString("en-GB") : ''} />
                    <DetailItem label="Nominee PAN" value={application.nomineePan} />
                    <DetailItem label="Nominee Aadhaar" value={application.nomineeAadhaar} />
                </div>
            </>
        )}
      </CardContent>
      {application.status === 'Pending' && (
        <CardFooter className="border-t pt-6 flex justify-end gap-4">
            <Button variant="destructive" onClick={() => handleUpdateStatus("Rejected")} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
                Reject
            </Button>
            <Button onClick={() => handleUpdateStatus("Approved")} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                Approve
            </Button>
        </CardFooter>
      )}
    </Card>
  );
}
