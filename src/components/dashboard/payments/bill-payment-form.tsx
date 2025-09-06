
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

const billerSchema = z.object({
  category: z.string().min(1, "Please select a category."),
  biller: z.string().min(1, "Please select a biller."),
  consumerNumber: z.string().min(1, "Consumer number is required."),
  amount: z.coerce.number().min(1, "Amount must be greater than 0."),
});

const billersByCategory = {
  electricity: ["Adani Electricity", "Tata Power", "BEST"],
  mobile: ["Airtel", "Jio", "Vodafone Idea"],
  internet: ["JioFiber", "Airtel Xstream", "Hathway"],
  gas: ["Mahanagar Gas", "Adani Gas"],
};

export function BillPaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof billerSchema>>({
    resolver: zodResolver(billerSchema),
    defaultValues: {
      category: "",
      biller: "",
      consumerNumber: "",
      amount: 0,
    },
  });

  const selectedCategory = form.watch("category") as keyof typeof billersByCategory | "";

  const onSubmit = async (values: z.infer<typeof billerSchema>) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
        title: "Bill Paid Successfully!",
        description: `Your payment of ₹${values.amount} to ${values.biller} was successful.`
    });
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Card className="mt-6 border-0 shadow-none">
      <CardHeader>
        <CardTitle>Pay Your Bills</CardTitle>
        <CardDescription>Select a biller and make a payment from your account.</CardDescription>
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
                        <FormLabel>Bill Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="electricity">Electricity</SelectItem>
                                <SelectItem value="mobile">Mobile Recharge</SelectItem>
                                <SelectItem value="internet">Broadband</SelectItem>
                                <SelectItem value="gas">Piped Gas</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                {selectedCategory && (
                    <FormField
                        control={form.control}
                        name="biller"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Biller Name</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a biller" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {billersByCategory[selectedCategory].map(biller => (
                                        <SelectItem key={biller} value={biller}>{biller}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                )}
            </div>
             <FormField
                control={form.control}
                name="consumerNumber"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Consumer / Account Number</FormLabel>
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
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="0.00" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Processing Payment..." : "Pay Bill"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
