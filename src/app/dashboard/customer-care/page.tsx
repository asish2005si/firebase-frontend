
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
import { Phone, Mail, Loader2 } from "lucide-react";

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

export default function CustomerCarePage() {
  const { toast } = useToast();

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

      <div className="grid grid-cols-1 gap-8 items-start">
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
  )
}
