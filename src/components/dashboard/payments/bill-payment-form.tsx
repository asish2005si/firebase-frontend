
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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Transaction } from "@/types/transaction";
import { OtpDialog } from "./otp-dialog";

const billPaymentSchema = z.object({
  category: z.string({ required_error: "Please select a bill category." }),
  biller: z.string({ required_error: "Please select a biller." }),
  consumerNumber: z.string().min(5, "A valid consumer number is required."),
  amount: z.coerce.number().min(1, "Amount must be at least INR 1."),
});

const billers: Record<string, string[]> = {
    "Electricity": ["Adani Electricity", "Tata Power", "BEST Undertaking"],
    "Mobile": ["Airtel Postpaid", "Jio Postpaid", "Vodafone Idea Postpaid"],
    "Gas": ["Mahanagar Gas", "Adani Gas"],
    "Internet": ["JioFiber", "Airtel Xstream Fiber", "Hathway Broadband"],
}

export type BillPaymentFormData = z.infer<typeof billPaymentSchema>;

type BillPaymentFormProps = {
  onSuccessfulPayment: (payment: Omit<Transaction, 'txn_id' | 'txn_time' | 'performed_by' | 'balance_after'>) => void;
}

const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `INR ${formatted}`;
}

export function BillPaymentForm({ onSuccessfulPayment }: BillPaymentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [formData, setFormData] = useState<BillPaymentFormData | null>(null);

  const form = useForm<BillPaymentFormData>({
    resolver: zodResolver(billPaymentSchema),
    defaultValues: {
      consumerNumber: "",
      amount: undefined,
    },
  });

  const selectedCategory = form.watch("category");

  const onSubmit = async (values: BillPaymentFormData) => {
    setFormData(values);
    setShowOtpDialog(true);
    toast({
        title: "OTP Sent",
        description: "An OTP has been sent to authorize this payment.",
    });
  }

  const handleOtpVerification = async () => {
      if (!formData) return;
      
      setIsSubmitting(true);
      setShowOtpDialog(false);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSuccessfulPayment({
          txn_type: "Bill Payment",
          description: formData.biller,
          amount: formData.amount,
      });

      toast({
          title: "Bill Paid Successfully!",
          description: `Your payment of ${formatCurrency(formData.amount)} for ${formData.biller} was successful.`
      });
      form.reset({
        consumerNumber: "",
        amount: undefined,
        category: undefined,
        biller: undefined,
      });
      setFormData(null);
      setIsSubmitting(false);
  }

  return (
    <>
    <Card className="mt-6 border-0 shadow-none">
      <CardHeader>
        <CardTitle>Pay Your Bills</CardTitle>
        <CardDescription>
          A simple and secure way to manage and pay your utility bills.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Biller Category</FormLabel>
                    <Select onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("biller", "");
                    }} value={field.value} disabled={isSubmitting}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {Object.keys(billers).map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="biller"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Biller</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting || !selectedCategory}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a biller" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {selectedCategory && billers[selectedCategory].map(biller => (
                                <SelectItem key={biller} value={biller}>{biller}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="consumerNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumer Number / ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your consumer number" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Amount" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Processing..." : "Pay Bill"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
     <OtpDialog
        isOpen={showOtpDialog}
        onClose={() => setShowOtpDialog(false)}
        onVerify={handleOtpVerification}
        isVerifying={isSubmitting}
    />
    </>
  );
}
