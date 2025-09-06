
"use client";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { FileCheck2 } from "lucide-react";

const DetailItem = ({ label, value }: { label: string; value?: string | number }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
);

const DocumentStatusItem = ({ label, fileList }: { label: string; fileList?: FileList | null }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        {fileList && fileList.length > 0 ? (
            <div className="flex items-center gap-2 mt-1 text-green-600">
                <FileCheck2 className="h-5 w-5" />
                <span className="font-medium text-sm">Uploaded</span>
            </div>
        ) : (
            <p className="font-medium text-destructive text-sm">Not Uploaded</p>
        )}
    </div>
);

const formatCurrency = (value?: number) => {
     if (!value) return "-";
     return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(value);
}

export function ReviewStep() {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div>
      <h2 className="text-2xl font-bold font-headline text-primary">Review Your Application</h2>
      <p className="text-muted-foreground mt-1 mb-6">Please review all the details carefully before submitting.</p>
      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DetailItem label="Loan Type" value={values.loanType} />
                <DetailItem label="Loan Amount" value={formatCurrency(values.amount)} />
                <DetailItem label="Tenure" value={`${values.tenure} years`} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <DetailItem label="Full Name" value={values.fullName} />
                <DetailItem label="Date of Birth" value={values.dob ? format(values.dob, "PPP") : "-"} />
                <DetailItem label="PAN" value={values.pan} />
                <DetailItem label="Address" value={values.address} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <DetailItem label="Employment Type" value={values.employmentType} />
                <DetailItem label="Company/Business Name" value={values.companyName} />
                <DetailItem label="Monthly Income" value={formatCurrency(values.monthlyIncome)} />
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="text-lg">Documents & Other Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <DocumentStatusItem label="PAN Card" fileList={values.panCard}/>
                    <DocumentStatusItem label="Aadhaar Card" fileList={values.aadhaarCard}/>
                    <DocumentStatusItem label="Salary Slip" fileList={values.salarySlip}/>
                </div>
                {values.propertyInfo && <DetailItem label="Property Info" value={values.propertyInfo} />}
                {values.vehicleDetails && <DetailItem label="Vehicle Details" value={values.vehicleDetails} />}
                {values.courseDetails && <DetailItem label="Course Details" value={values.courseDetails} />}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
