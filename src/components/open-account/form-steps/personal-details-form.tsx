
"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormHeader } from "../form-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { FileUploadItem } from "./file-upload-item";

const relationTypes = ["Spouse", "Son", "Daughter", "Father", "Mother", "Brother", "Sister", "Other"];

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
        <div className="grid md:grid-cols-2 gap-4">
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
             <FormField
                control={control}
                name="initialDeposit"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Initial Deposit</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="e.g. 5000" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="grid md:grid-cols-3 gap-6 pt-4">
            <FileUploadItem fieldName="photo" label="Upload Your Recent Photograph" />
            <FileUploadItem fieldName="panCardUpload" label="Upload Your PAN Card" />
            <FileUploadItem fieldName="signature" label="Upload Your Signature" />
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
                        name="nomineeDob"
                        render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Nominee Date of Birth</FormLabel>
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
                </div>
                 <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="nomineePan"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nominee's PAN (Optional)</FormLabel>
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
                            <FormLabel>Nominee's Aadhaar (Optional)</FormLabel>
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

    
