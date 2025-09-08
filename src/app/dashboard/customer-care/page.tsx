
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MessageSquare, Loader2 } from "lucide-react";
import { submitSupportTicket } from "@/app/actions";

const faqs = [
  {
    question: "How do I reset my login password?",
    answer: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your registered email address."
  },
  {
    question: "How can I update my contact information?",
    answer: "You can update your contact information (email and phone number) in the 'My Accounts & Profile' section of the dashboard. For address changes, please visit your nearest branch."
  },
  {
    question: "What are the charges for NEFT/IMPS transfers?",
    answer: "Online fund transfers via NEFT and IMPS are free of charge. Charges may apply for transactions initiated at a branch. Please refer to our schedule of charges for more details."
  },
  {
    question: "How do I apply for a new cheque book?",
    answer: "You can request a new cheque book through the 'Card Services' section in your dashboard. It will be delivered to your registered communication address within 7-10 working days."
  }
];

const supportTicketSchema = z.object({
  category: z.string({ required_error: "Please select a category." }),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
});

export default function CustomerCarePage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof supportTicketSchema>>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      category: "",
      subject: "",
      description: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof supportTicketSchema>) {
    const result = await submitSupportTicket(values);
    if (result.success) {
      toast({
        title: "Ticket Created!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: result.message,
      });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Customer Care & Support</CardTitle>
          <CardDescription>We're here to help you with any questions or concerns.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-muted/50">
              <CardHeader className="flex-row items-center gap-4">
                <Phone className="h-8 w-8 text-primary" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">1800-200-5555 (Toll-Free)</p>
                <p className="text-sm text-muted-foreground">Available 24/7 for all your banking needs.</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardHeader className="flex-row items-center gap-4">
                <Mail className="h-8 w-8 text-primary" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">support@nexusbank.com</p>
                <p className="text-sm text-muted-foreground">We'll respond within 24 business hours.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Raise a Support Ticket</CardTitle>
            <CardDescription>For specific queries, please fill out the form below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Query Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="account_services">Account Services</SelectItem>
                          <SelectItem value="fund_transfer">Fund Transfer / Payments</SelectItem>
                          <SelectItem value="loans">Loans & Deposits</SelectItem>
                          <SelectItem value="technical_issue">Technical Issue</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Issue with last transaction" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Please describe your issue in detail..." className="min-h-[120px]" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Submitting..." : "Submit Ticket"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
