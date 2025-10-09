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
import { IfscFinder } from "./ifsc-finder";
import type { Transaction } from "@/types/transaction";
import { OtpDialog } from "./otp-dialog";
import { sendOtp } from "@/app/actions/otp";
import { useUser } from "@/firebase";

const otherBanks = [
    "Allahabad Bank", "Andhra Bank", "Axis Bank", "Bandhan Bank", "Bank of Baroda",
    "Bank of India", "Bank of Maharashtra", "Canara Bank", "Central Bank of India",
    "City Union Bank", "Corporation Bank", "DBS Bank", "DCB Bank", "Dena Bank",
    "Deutsche Bank", "Dhanlaxmi Bank", "Federal Bank", "HDFC Bank", "HSBC Bank",
    "ICICI Bank", "IDBI Bank", "IDFC FIRST Bank", "Indian Bank", "Indian Overseas Bank",
    "IndusInd Bank", "Jammu & Kashmir Bank", "Karnataka Bank", "Karur Vysya Bank",
    "Kotak Mahindra Bank", "Lakshmi Vilas Bank", "Nainital Bank",
    "Oriental Bank of Commerce", "Punjab & Sind Bank", "Punjab National Bank", "RBL Bank",
    "South Indian Bank", "Standard Chartered Bank", "State Bank of India", "Syndicate Bank",
    "Tamilnad Mercantile Bank", "UCO Bank", "Union Bank of India", "United Bank of India",
    "Vijaya Bank", "Yes Bank"
].sort();

const bankIfscPrefixes: Record<string, string> = {
    "State Bank of India": "SBIN",
    "HDFC Bank": "HDFC",
    "ICICI Bank": "ICIC",
    "Axis Bank": "UTIB",
    "Punjab National Bank": "PUNB",
    "Bank of Baroda": "BARB",
    "Canara Bank": "CNRB",
    "Union Bank of India": "UBIN",
    "Kotak Mahindra Bank": "KKBK",
    "IndusInd Bank": "INDB",
    "Yes Bank": "YESB",
};

const transferSchema = z.object({
  transferType: z.enum(["self", "internal", "other"]),
  recipientName: z.string().min(2, "Recipient name is required."),
  recipientAccount: z.string().regex(/^\d{9,18}$/, "Invalid account number (must be 9-18 digits)."),
  bankName: z.string().optional(),
  ifsc: z.string().optional(),
  amount: z.coerce.number().min(1, "Amount must be at least INR 1."),
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
        if (!data.ifsc) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "A valid 11-digit IFSC code is required.",
                path: ["ifsc"],
            });
            return;
        }

        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (!ifscRegex.test(data.ifsc.toUpperCase())) {
             ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "A valid 11-digit IFSC code is required.",
                path: ["ifsc"],
            });
            return;
        }

        const selectedBankPrefix = data.bankName ? bankIfscPrefixes[data.bankName] : undefined;
        if (selectedBankPrefix && !data.ifsc.toUpperCase().startsWith(selectedBankPrefix)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `IFSC code does not match selected bank. Expected prefix: ${selectedBankPrefix}`,
                path: ["ifsc"],
            });
        }
    }
});

export type TransferFormData = z.infer<typeof transferSchema>;

type FundTransferFormProps = {
  onSuccessfulTransfer: (payment: Omit<Transaction, 'txn_id' | 'txn_time'| 'performed_by' | 'balance_after'>) => void;
};

const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `INR ${formatted}`;
}


export function FundTransferForm({ onSuccessfulTransfer }: FundTransferFormProps) {
  const { toast } = useToast();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isIfscFinderOpen, setIsIfscFinderOpen] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [formData, setFormData] = useState<TransferFormData | null>(null);

  const form = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      transferType: "internal",
      recipientName: "",
      recipientAccount: "",
      bankName: "",
      ifsc: "",
      amount: undefined,
      remarks: "",
    },
  });

  const transferType = form.watch("transferType");
  
  const onSubmit = async (values: TransferFormData) => {
    setFormData(values);
    setIsSendingOtp(true);

    const contactMethod = user?.email || user?.phoneNumber;
    if (!contactMethod) {
        toast({ variant: "destructive", title: "Cannot send OTP", description: "No verified contact method found for your account." });
        setIsSendingOtp(false);
        return;
    }

    const result = await sendOtp(contactMethod);

    if (result.success) {
      setShowOtpDialog(true);
      toast({
          title: "OTP Sent",
          description: result.message,
      });
    } else {
        toast({ variant: "destructive", title: "Failed to Send OTP", description: result.message });
    }
    setIsSendingOtp(false);
  }

  const handleOtpVerification = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    setShowOtpDialog(false);
    
    // The OTP verification happens in the OtpDialog now.
    // This function is now just for completing the transaction post-verification.
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSuccessfulTransfer({
        txn_type: "Fund Transfer",
        description: formData.recipientName,
        amount: formData.amount,
        account_no: formData.recipientAccount
    });

    toast({
        title: "Transfer Successful!",
        description: `${formatCurrency(formData.amount)} has been successfully transferred to ${formData.recipientName}.`
    });

    form.reset({
        transferType: "internal",
        recipientName: "",
        recipientAccount: "",
        bankName: "",
        ifsc: "",
        amount: undefined,
        remarks: "",
    });
    setFormData(null);
    setIsSubmitting(false);
  }
  
  const contactMethod = user?.email || user?.phoneNumber;

  return (
    <>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting || isSendingOtp}>
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
                    <Input placeholder="Enter recipient's full name" {...field} disabled={isSubmitting || isSendingOtp}/>
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
                      <Input placeholder="Enter account number" {...field} disabled={isSubmitting || isSendingOtp}/>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting || isSendingOtp}>
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
                            <div className="flex gap-2">
                                <FormControl>
                                    <Input 
                                      placeholder="Enter 11-digit IFSC" 
                                      {...field}
                                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                      disabled={isSubmitting || isSendingOtp}
                                    />
                                </FormControl>
                                <IfscFinder 
                                    form={form} 
                                    isOpen={isIfscFinderOpen} 
                                    setIsOpen={setIsIfscFinderOpen} 
                                />
                            </div>
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
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Amount" {...field} disabled={isSubmitting || isSendingOtp}/>
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
                      <Textarea placeholder="e.g., Monthly rent" {...field} disabled={isSubmitting || isSendingOtp}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting || isSendingOtp}>
              {(isSubmitting || isSendingOtp) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Processing..." : (isSendingOtp ? "Sending OTP..." : "Proceed to Pay")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>

    {contactMethod && formData && (
      <OtpDialog
        isOpen={showOtpDialog}
        onClose={() => setShowOtpDialog(false)}
        onVerify={handleOtpVerification}
        contactMethod={contactMethod}
      />
    )}
    </>
  );
}
