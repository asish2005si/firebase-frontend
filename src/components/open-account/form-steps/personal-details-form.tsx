"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Info, UploadCloud, X, FileText } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormHeader } from "../form-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Image from "next/image";

const relationTypes = ["Spouse", "Son", "Daughter", "Father", "Mother", "Brother", "Sister", "Other"];

export const FileUploadItem = ({ fieldName, label }: { fieldName: string, label: string }) => {
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
                             <div className="relative w-full h-48 rounded-md border-2 border-dashed flex items-center justify-center p-2">
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
                                    <p className="text-xs text-muted-foreground">JPG, PNG, or PDF (MAX. 5MB)</p>
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

export function PersonalDetailsForm() {
  const { control } = useFormContext();

  return (
    <div>
        <FormHeader 
            title="Personal Information"
            description="Please provide your personal information as it appears on your official documents."
        />
        <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                Your details must match your Aadhaar/PAN for successful e-KYC verification.
            </AlertDescription>
        </Alert>
      <div className="space-y-4">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's/Mother's Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your father's or mother's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <div className="grid md:grid-cols-2 gap-4">
             <FormField
                control={control}
                name="maritalStatus"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select your marital status" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
              control={control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Number</FormLabel>
                  <FormControl>
                    <Input placeholder="ABCDE1234F" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
         <FormField
            control={control}
            name="aadhaarNumber"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Aadhaar Number</FormLabel>
                <FormControl>
                    <Input type="text" maxLength={12} placeholder="Enter 12-digit Aadhaar number" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <div className="grid md:grid-cols-2 gap-6 pt-4">
            <FileUploadItem fieldName="photo" label="Upload Your Recent Photograph" />
            <FileUploadItem fieldName="panCardUpload" label="Upload Your PAN Card" />
        </div>
        
        <Separator className="my-8" />
        
        <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Nominee Details</h3>
            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                    control={control}
                    name="nomineeName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nominee Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter nominee's full name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={control}
                    name="nomineeRelation"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nominee Relationship</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {relationTypes.map(rel => <SelectItem key={rel} value={rel.toLowerCase()}>{rel}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="nomineePan"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nominee's PAN Number</FormLabel>
                            <FormControl>
                                <Input placeholder="ABCDE1234F" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="nomineeAadhaar"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nominee's Aadhaar Number</FormLabel>
                            <FormControl>
                                <Input type="text" maxLength={12} placeholder="Enter 12-digit Aadhaar number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
