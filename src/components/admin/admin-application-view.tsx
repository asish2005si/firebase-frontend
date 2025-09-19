

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ApplicationData } from "@/lib/mock-application-data";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Loader2, FileCheck2, User, CreditCard, PenSquare, Home, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { updateApplicationStatus } from "@/app/actions/applications";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DetailItem = ({ label, value, isHighlight = false }: { label: string; value?: string | number; isHighlight?: boolean }) => {
    if (!value && value !== 0) return null;
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className={`font-semibold capitalize ${isHighlight ? 'text-primary' : ''}`}>{String(value)}</p>
        </div>
    );
}

const DocumentItem = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg bg-muted/50 text-center">
        <div className="text-primary">{icon}</div>
        <p className="text-sm font-medium">{label}</p>
        <div className="flex items-center gap-1 text-xs text-green-600">
            <FileCheck2 className="h-3 w-3" />
            <span>Uploaded</span>
        </div>
    </div>
);


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
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const handleUpdateStatus = async (newStatus: "Approved" | "Rejected", reason?: string) => {
    setIsSubmitting(true);
    const result = await updateApplicationStatus(application.applicationId, newStatus, reason);
    
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
    setIsRejectDialogOpen(false);
    setRejectionReason("");
  };


  return (
    <>
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
            <DetailItem label="Date of Birth" value={application.dob ? new Date(application.dob).toLocaleDateString("en-GB") : ''} />
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

        <Separator />
        <h3 className="text-lg font-semibold text-foreground">Uploaded Documents</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <DocumentItem label="Photograph" icon={<User className="h-6 w-6" />} />
            <DocumentItem label="PAN Card" icon={<CreditCard className="h-6 w-6" />} />
            <DocumentItem label="Signature" icon={<PenSquare className="h-6 w-6" />} />
            <DocumentItem label="Address Proof" icon={<Home className="h-6 w-6" />} />
            <DocumentItem label="Aadhaar Card" icon={<Shield className="h-6 w-6" />} />
        </div>

        {application.status === 'Rejected' && application.reason && (
             <>
                <Separator />
                <h3 className="text-lg font-semibold text-destructive">Rejection Reason</h3>
                <p className="text-sm text-destructive-foreground bg-destructive/10 p-3 rounded-md">{application.reason}</p>
             </>
        )}

      </CardContent>
      {application.status === 'Pending' && (
        <CardFooter className="border-t pt-6 flex justify-end gap-4">
            <Button variant="destructive" onClick={() => setIsRejectDialogOpen(true)} disabled={isSubmitting}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
            </Button>
            <Button onClick={() => handleUpdateStatus("Approved")} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                Approve
            </Button>
        </CardFooter>
      )}
    </Card>

    <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Confirm Rejection</DialogTitle>
                <DialogDescription>
                    Please provide a reason for rejecting this application. This will be visible to the applicant.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea 
                    id="rejection-reason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g., Incomplete documents, information mismatch, etc."
                />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                    variant="destructive"
                    onClick={() => handleUpdateStatus("Rejected", rejectionReason)}
                    disabled={isSubmitting || !rejectionReason}
                >
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
                    Confirm Rejection
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
