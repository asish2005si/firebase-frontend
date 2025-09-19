
"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function PersonalDetailsStep() {
    const { control, trigger } = useFormContext();
    const { toast } = useToast();

    const handleOtp = async (field: 'mobile' | 'email') => {
        const result = await trigger(field);
        if (result) {
            toast({
              title: `Verification OTP Sent to ${field}`,
              description: `A simulated OTP has been sent. In a real app, you'd verify a code.`,
            });
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold font-headline text-primary">Personal Details</h2>
            <p className="text-muted-foreground mt-1 mb-6">Please provide your personal information.</p>
            <div className="space-y-4">
                <FormField
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name (as per PAN)</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <div className="flex gap-2">
                                <FormControl>
                                    <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <Button type="button" variant="outline" onClick={() => handleOtp('email')}>Verify</Button>
                            </div>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <div className="flex gap-2">
                                <FormControl>
                                    <Input type="tel" placeholder="9876543210" {...field} />
                                </FormControl>
                                <Button type="button" variant="outline" onClick={() => handleOtp('mobile')}>Verify</Button>
                            </div>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                        name="pan"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>PAN Number</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="ABCDE1234F" 
                                        {...field} 
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Current Address</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter your full current address" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
        </div>
    );
}
