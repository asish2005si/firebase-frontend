
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function DocumentUploadStep() {
    const { control, watch } = useFormContext();
    const loanType = watch("loanType");

    return (
        <div>
            <h2 className="text-2xl font-bold font-headline text-primary">Upload Documents</h2>
            <p className="text-muted-foreground mt-1 mb-6">Please upload the required documents.</p>
            <div className="space-y-6">
                <FormField
                    control={control}
                    name="documents"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Required Documents</FormLabel>
                            <FormControl>
                                 <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-3 text-gray-500" />
                                        <p className="mb-2 text-sm text-center text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PAN, Aadhaar, Salary Slips, etc. (PDF, JPG, PNG)</p>
                                    </div>
                                    <Input 
                                        type="file" 
                                        className="hidden"
                                        multiple 
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={(e) => field.onChange(e.target.files)}
                                    />
                                </label>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {watch("documents")?.length > 0 && (
                    <div className="p-4 border rounded-md">
                        <h4 className="font-semibold mb-2">Selected Files:</h4>
                        <ul className="space-y-1 list-disc list-inside">
                           {Array.from(watch("documents")).map((file: any, index) => (
                                <li key={index} className="text-sm flex items-center gap-2">
                                    <FileText className="h-4 w-4"/>
                                    {file.name}
                                </li>
                           ))}
                        </ul>
                    </div>
                )}
                
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

