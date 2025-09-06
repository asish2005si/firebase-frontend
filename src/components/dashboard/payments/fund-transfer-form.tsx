
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const transferSchema = z.object({
  transferType: z.enum(["self", "internal", "other"]),
  recipientName: z.string().min(2, "Recipient name is required."),
  recipientAccount: z.string().regex(/^\d{12,16}$/, "Invalid account number."),
  bankName: z.string().optional(),
  ifsc: z.string().optional(),
  amount: z.coerce.number().min(1, "Amount must be at least ₹1."),
  remarks: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.transferType === "other") {
        if (!data.bankName) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select a bank.",
                path: ["bankName"],
            });
        }
        if (!data.ifsc || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifsc)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "A valid 11-digit IFSC code is required.",
                path: ["ifsc"],
            });
        }
    }
});

const otherBanks = [
    "Axis Bank",
    "Bank of Baroda",
    "Canara Bank",
    "HDFC Bank",
    "ICICI Bank",
    "IndusInd Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "State Bank of India",
    "Yes Bank"
].sort();


export function FundTransferForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof transferSchema>>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      transferType: "internal",
      recipientName: "",
      recipientAccount: "",
      bankName: "",
      ifsc: "",
      amount: 0,
      remarks: "",
    },
  });

  const transferType = form.watch("transferType");
  
  const onSubmit = async (values: z.infer<typeof transferSchema>) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
        title: "Transfer Successful!",
        description: `₹${values.amount} has been successfully transferred to ${values.recipientName}.`
    });
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Card className="mt-6 border-0 shadow-none">
      <CardHeader>
        <CardTitle>Transfer Funds</CardTitle>
        <CardDescription>
          Send money securely to any bank account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="transferType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transfer Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transfer type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="internal">Within Nexus Bank</SelectItem>
                      <SelectItem value="other">Other Bank (NEFT/IMPS)</SelectItem>
                      <SelectItem value="self">To My Other Account</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter recipient's full name" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="recipientAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter account number" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {transferType === "other" && (
                <>
                    <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a bank" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {otherBanks.map(bank => (
                                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ifsc"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>IFSC Code</FormLabel>
                            <FormControl>
                            <Input placeholder="Enter 11-digit IFSC" {...field} disabled={isSubmitting}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </>
              )}
            </div>
             <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Monthly rent" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Processing..." : "Proceed to Pay"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
