
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail } from "lucide-react";

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

export function CustomerCareSection() {
  return (
    <section id="customer-care" className="py-20 bg-muted/40">
        <div className="container space-y-12">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">
                    We're Here to Help
                </h2>
                <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
                    Find answers, or get in touch with our support team.
                </p>
            </div>
            
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
    </section>
  );
}
