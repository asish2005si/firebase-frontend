"use client";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { FileCheck2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const DetailItem = ({ label, value }: { label: string; value?: string | number }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
);

const FilePreviewItem = ({ label, fileList }: { label: string; fileList?: FileList | null }) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null)
        }
    }, [fileList]);

    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            {preview ? (
                 <div className="relative w-24 h-24 mt-2">
                    {fileList?.[0] && fileList[0].type.startsWith("image/") ? (
                        <Image src={preview} alt="Preview" fill style={{ objectFit: 'cover' }} className="rounded-md" />
                    ) : (
                        <div className="w-full h-full rounded-md bg-muted flex flex-col items-center justify-center p-2 text-center">
                            <FileCheck2 className="h-6 w-6 text-primary" />
                            <p className="text-xs font-semibold truncate mt-1">{fileList?.[0]?.name}</p>
                        </div>
                    )}
                </div>
            ) : (
                 <p className="font-medium text-destructive text-sm">Not Uploaded</p>
            )}
        </div>
    );
};


const formatCurrency = (value?: number) => {
     if (!value) return "-";
     const formatted = new Intl.NumberFormat('en-IN', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
    return `INR ${formatted}`;
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
                <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DetailItem label="Loan Type" value={values.loanType} />
                <DetailItem label="Loan Amount" value={formatCurrency(values.amount)} />
                <DetailItem label="Tenure" value={`${values.tenure} years`} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Personal Details</CardTitle>
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
                <CardTitle>Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <DetailItem label="Employment Type" value={values.employmentType} />
                <DetailItem label="Company/Business Name" value={values.companyName} />
                <DetailItem label="Monthly Income" value={formatCurrency(values.monthlyIncome)} />
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Documents & Other Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <FilePreviewItem label="PAN Card" fileList={values.panCard}/>
                    <FilePreviewItem label="Aadhaar Card" fileList={values.aadhaarCard}/>
                    <FilePreviewItem label="Salary Slip" fileList={values.salarySlip}/>
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
