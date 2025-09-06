
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormHeader } from "../form-header";
import { useState } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FileUploadItem = ({ fieldName, label }: { fieldName: string, label: string }) => {
    const { control, watch, setValue } = useFormContext();
    const file = watch(fieldName);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName, e.target.files);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeFile = () => {
        setValue(fieldName, null);
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
                             <div className="relative w-full h-48 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
                                {file && file[0] && file[0].type.startsWith("image/") ? (
                                    <Image src={preview} alt="Preview" fill style={{ objectFit: 'contain' }} className="rounded-md p-2" />
                                ) : (
                                    <div className="text-center p-4">
                                        <p className="font-semibold">File Selected</p>
                                        <p className="text-sm text-muted-foreground">{file?.[0]?.name}</p>
                                    </div>
                                )}
                                <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={removeFile}>
                                    <X className="h-4 w-4"/>
                                </Button>
                             </div>
                        ) : (
                            <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-3 text-gray-500" />
                                    <p className="mb-2 text-sm text-center text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">JPG, PNG, or PDF (MAX. 5MB)</p>
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

export function DocumentUploadForm() {
  const { watch } = useFormContext();
  const accountType = watch("accountType");

  return (
    <div>
        <FormHeader 
            title="Upload Documents"
            description="Please upload clear copies of the required documents for KYC verification."
        />
        <div className="space-y-6">
            <FileUploadItem fieldName="aadhaar" label="Aadhaar Card" />
            {accountType !== 'student' && <FileUploadItem fieldName="pan" label="PAN Card" />}
            <FileUploadItem fieldName="photo" label="Passport-size Photograph" />
        </div>
    </div>
  );
}
