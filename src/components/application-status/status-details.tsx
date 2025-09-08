
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, MessageSquare } from "lucide-react";
import type { ApplicationData } from "@/lib/mock-application-data";
import { useToast } from "@/hooks/use-toast";

const DetailItem = ({ label, value, isHighlight = false }: { label: string; value?: string | number; isHighlight?: boolean }) => {
    if (!value) return null;
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

export function StatusDetails({ application }: { application: ApplicationData }) {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Downloading Receipt",
      description: "Your application receipt PDF is being generated and will download shortly.",
    });
  };

  const handleSupport = () => {
    toast({
        title: "Support Request",
        description: "We have received your request. Our team will get in touch with you shortly.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <DetailItem label="Application ID" value={application.applicationId} isHighlight/>
            <DetailItem label="Account Type" value={application.accountType} />
            <DetailItem label="Application Date" value={application.applicationDate} />
            <DetailItem label="Full Name" value={application.fullName} />
            <DetailItem label="Date of Birth" value={application.dob} />
            <DetailItem label="Mobile Number" value={application.mobile} />
            <DetailItem label="Email Address" value={application.email} />
            <DetailItem label="Nominee" value={application.nominee} />
            <DetailItem label="Initial Deposit" value={formatCurrency(application.initialDeposit)} />
            <DetailItem label="Address" value={application.address} />

            {application.status === 'Approved' && (
                <>
                    <DetailItem label="Account Number" value={application.accountNumber} isHighlight/>
                    <DetailItem label="IFSC Code" value={application.ifscCode} isHighlight/>
                </>
            )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download Receipt (PDF)
            </Button>
            {application.status === 'Rejected' && (
                <Button variant="destructive" onClick={handleSupport}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
                </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
