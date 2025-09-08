"use client";
import { useFormContext } from "react-hook-form";
import { FormHeader } from "../form-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import { FileText, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const DetailItem = ({ label, value }: { label: string; value?: string | number }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium capitalize">{value || "-"}</p>
    </div>
)

const FilePreviewItem = ({ label, fileList }: { label: string; fileList: FileList | null }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            return () => URL.revokeObjectURL(url);
        }
    }, [fileList]);


    if (!fileList || fileList.length === 0) {
        return <DetailItem label={label} value="Not uploaded" />;
    }

    const file = fileList[0];

    return (
         <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            {previewUrl && file.type.startsWith("image/") ? (
                <Image src={previewUrl} alt={`${label} preview`} width={100} height={100} className="rounded-md border object-cover aspect-square" />
            ) : (
                <div className="flex items-center gap-2 p-2 rounded-md border bg-muted">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                    <p className="text-sm font-medium truncate">{file.name}</p>
                </div>
            )}
        </div>
    )
}

export function ReviewDetails() {
  const { getValues } = useFormContext();
  const values = getValues();
  const formatCurrency = (amount?: number) => {
    if (amount === undefined || isNaN(amount)) return "-";
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div>
        <FormHeader 
            title="Review Your Application"
            description="Please review all the details carefully before submitting."
        />
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Account Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <DetailItem label="Account Type" value={values.accountType} />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <DetailItem label="Full Name" value={values.fullName} />
                    <DetailItem label="Father's/Mother's Name" value={values.fatherName} />
                    <DetailItem label="Date of Birth" value={values.dob ? format(values.dob, "PPP") : "-"} />
                    <DetailItem label="Gender" value={values.gender} />
                    <DetailItem label="Marital Status" value={values.maritalStatus} />
                    <DetailItem label="PAN Number" value={values.panNumber} />
                </CardContent>
            </Card>
            {values.accountType === 'savings' && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Savings Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <DetailItem label="Occupation" value={values.occupation} />
                        <DetailItem label="Nominee Name" value={values.nomineeName} />
                        <DetailItem label="Nominee Relation" value={values.nomineeRelation} />
                        <DetailItem label="Initial Deposit" value={formatCurrency(values.initialDeposit)} />
                    </CardContent>
                </Card>
            )}
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Contact & Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <DetailItem label="Email" value={values.email} />
                        <DetailItem label="Mobile" value={values.mobile} />
                    </div>
                     <DetailItem label="Permanent Address" value={values.permanentAddress} />
                     <DetailItem label="Communication Address" value={values.isSameAddress ? values.permanentAddress : values.communicationAddress} />
                     <div className="grid grid-cols-3 gap-4">
                        <DetailItem label="City" value={values.city} />
                        <DetailItem label="State" value={values.state} />
                        <DetailItem label="Pincode" value={values.pincode} />
                     </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Uploaded Documents</CardTitle>
                </Header>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <FilePreviewItem label="Photograph" fileList={values.photo} />
                    <FilePreviewItem label="Address Proof" fileList={values.addressProof} />
                </CardContent>
            </Card>

             <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                 <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                 <div className="space-y-1 leading-none">
                     <p className="font-medium">I hereby declare that the information provided is true and correct.</p>
                </div>
            </div>
        </div>
    </div>
  );
}
