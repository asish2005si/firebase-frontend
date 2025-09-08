
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const FileUpload = ({ fieldName, label }: { fieldName: string, label: string }) => {
    const { control, watch, setValue } = useFormContext();
    const fileList = watch(fieldName);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName, e.target.files, { shouldValidate: true });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeFile = () => {
        setValue(fieldName, null, { shouldValidate: true });
        setPreview(null);
    }
    
    return (
        <FormField
            control={control}
            name={fieldName}
            render={() => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {preview ? (
                             <div className="relative w-full h-40 rounded-md border-2 border-dashed flex items-center justify-center p-2">
                                {fileList && fileList[0] && fileList[0].type.startsWith("image/") ? (
                                    <Image src={preview} alt="Preview" fill style={{ objectFit: 'contain' }} className="rounded-md" />
                                ) : (
                                    <div className="text-center">
                                        <FileText className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                                        <p className="font-semibold text-sm">{fileList?.[0]?.name}</p>
                                    </div>
                                )}
                                <Button variant="destructive" size="icon" className="absolute -top-3 -right-3 h-7 w-7 rounded-full" onClick={removeFile}>
                                    <X className="h-4 w-4"/>
                                </Button>
                             </div>
                        ) : (
                            <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-center text-muted-foreground">
                                        <span className="font-semibold text-primary">Click to upload</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG (MAX. 5MB)</p>
                                </div>
                                <Input 
                                    type="file" 
                                    className="hidden"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={handleFileChange}
                                />
                            </label>
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export function DocumentUploadStep() {
    const { control, watch } = useFormContext();
    const loanType = watch("loanType");

    return (
        <div>
            <h2 className="text-2xl font-bold font-headline text-primary">Upload Documents</h2>
            <p className="text-muted-foreground mt-1 mb-6">Please upload clear copies of the required documents.</p>
            <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                    <FileUpload fieldName="panCard" label="PAN Card"/>
                    <FileUpload fieldName="aadhaarCard" label="Aadhaar Card"/>
                    <FileUpload fieldName="salarySlip" label="Latest Salary Slip"/>
                </div>
                
                {loanType === 'home' && (
                    <FormField
                        control={control}
                        name="propertyInfo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Property Information</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter details about the property to be purchased..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                 {loanType === 'car' && (
                    <FormField
                        control={control}
                        name="vehicleDetails"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Vehicle Details</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter details of the car you wish to purchase (Model, Year, etc.)" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {loanType === 'education' && (
                    <FormField
                        control={control}
                        name="courseDetails"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course & Institution Details</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter details about the course and university." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </div>
        </div>
    );
}
