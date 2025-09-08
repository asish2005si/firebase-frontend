
"use client";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormHeader } from "../form-header";
import { FileCheck2, Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

const DetailItem = ({ label, value }: { label: string; value?: string | number }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium capitalize">{value || "-"}</p>
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
                 <div className="flex items-center gap-2 mt-1 text-green-600">
                    <FileCheck2 className="h-5 w-5" />
                    <span className="font-medium text-sm">Uploaded</span>
                </div>
            )}
        </div>
    );
};


const ReviewSection = ({ title, stepIndex, goTo, children }: { title: string, stepIndex: number, goTo: (index: number) => void, children: React.ReactNode }) => (
    <Card>
        <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => goTo(stepIndex)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

type ReviewDetailsFormProps = {
    goTo: (index: number) => void;
};


export function ReviewDetailsForm({ goTo }: ReviewDetailsFormProps) {
  const { getValues } = useFormContext();
  const values = getValues();

  const accountTypeSteps = {
    savings: { personal: 1, address: 2, savings: 3 },
    current: { personal: 1, address: 2, current: 3 },
  };

  const steps = accountTypeSteps[values.accountType as keyof typeof accountTypeSteps];

  return (
    <div>
        <FormHeader 
            title="Review Your Application"
            description="Please review all the details carefully before submitting."
        />
        <div className="space-y-6">
            <ReviewSection title="Account Type" stepIndex={0} goTo={goTo}>
                <DetailItem label="Selected Account" value={values.accountType} />
            </ReviewSection>

            <ReviewSection title="Personal & Nominee Details" stepIndex={steps.personal} goTo={goTo}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <DetailItem label="Full Name" value={values.fullName} />
                    <DetailItem label="Father's/Mother's Name" value={values.fatherName} />
                    <DetailItem label="Date of Birth" value={values.dob ? format(values.dob, "PPP") : "-"} />
                    <DetailItem label="Gender" value={values.gender} />
                    <DetailItem label="Marital Status" value={values.maritalStatus} />
                    <DetailItem label="PAN" value={values.panNumber} />
                    <DetailItem label="Aadhaar Number" value={values.aadhaarNumber} />
                </div>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <FilePreviewItem label="Photograph" fileList={values.photo} />
                    <FilePreviewItem label="PAN Card" fileList={values.panCardUpload} />
                </div>
                <Separator className="my-6" />
                <h4 className="text-md font-semibold text-primary mb-4">Nominee Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <DetailItem label="Nominee Name" value={values.nomineeName} />
                    <DetailItem label="Relationship" value={values.nomineeRelation} />
                    <DetailItem label="Nominee PAN" value={values.nomineePan} />
                    <DetailItem label="Nominee Aadhaar" value={values.nomineeAadhaar} />
                    <DetailItem label="Nominee Email" value={values.nomineeEmail} />
                    <DetailItem label="Nominee Mobile" value={values.nomineeMobile} />
                </div>
            </ReviewSection>

            <ReviewSection title="Contact & Address Details" stepIndex={steps.address} goTo={goTo}>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <DetailItem label="Email Address" value={values.email} />
                    <DetailItem label="Mobile Number" value={values.mobile} />
                    <DetailItem label="City" value={values.city} />
                    <DetailItem label="State" value={values.state} />
                    <DetailItem label="PIN Code" value={values.pincode} />
                </div>
                 <div className="mt-4">
                    <DetailItem label="Permanent Address" value={values.permanentAddress} />
                </div>
                 {!values.isSameAddress && (
                    <div className="mt-4">
                        <DetailItem label="Communication Address" value={values.communicationAddress} />
                    </div>
                 )}
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <FilePreviewItem label="Address Proof" fileList={values.addressProof} />
                     <FilePreviewItem label="Aadhaar Card" fileList={values.aadhaarCardUpload} />
                </div>
            </ReviewSection>

            {values.accountType === 'savings' && (
                 <ReviewSection title="Savings Account Details" stepIndex={steps.savings} goTo={goTo}>
                    <DetailItem label="Occupation" value={values.occupation} />
                </ReviewSection>
            )}

            {values.accountType === 'current' && (
                 <ReviewSection title="Business Information" stepIndex={steps.current} goTo={goTo}>
                    <div className="grid grid-cols-2 gap-4">
                        <DetailItem label="Business Name" value={values.businessName} />
                        <DetailItem label="Business Type" value={values.businessType} />
                        <DetailItem label="GST Number" value={values.gstNumber} />
                    </div>
                </ReviewSection>
            )}
        </div>
    </div>
  );
}
