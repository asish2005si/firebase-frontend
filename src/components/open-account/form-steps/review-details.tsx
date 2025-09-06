
"use client";
import { useFormContext } from "react-hook-form";
import { FormHeader } from "../form-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";

const DetailItem = ({ label, value }: { label: string; value: string | undefined }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
)

const FilePreviewItem = ({ label, fileList }: { label: string; fileList: FileList | null }) => {
    if (!fileList || fileList.length === 0) return <DetailItem label={label} value="Not uploaded" />;

    const file = fileList[0];
    const previewUrl = URL.createObjectURL(file);

    return (
         <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            {file.type.startsWith("image/") ? (
                <Image src={previewUrl} alt={`${label} preview`} width={100} height={100} className="mt-1 rounded-md border" />
            ) : (
                <p className="font-medium">{file.name}</p>
            )}
        </div>
    )
}

export function ReviewDetails() {
  const { getValues } = useFormContext();
  const values = getValues();

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
                <CardContent className="grid grid-cols-2 gap-4">
                    <DetailItem label="Full Name" value={values.fullName} />
                    <DetailItem label="Date of Birth" value={values.dob ? format(values.dob, "PPP") : "-"} />
                    <DetailItem label="Gender" value={values.gender} />
                    <DetailItem label="Email" value={values.email} />
                    <DetailItem label="Mobile" value={values.mobile} />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Address Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                    <FilePreviewItem label="Aadhaar Card" fileList={values.aadhaar} />
                    {values.accountType === 'student' && <FilePreviewItem label="Birth Certificate" fileList={values.birthCertificate} />}
                    {values.accountType !== 'student' && <FilePreviewItem label="PAN Card" fileList={values.pan} />}
                    <FilePreviewItem label="Photograph" fileList={values.photo} />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
