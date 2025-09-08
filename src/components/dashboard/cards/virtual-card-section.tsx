
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, PlusCircle, Shield, History, Copy } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AnimatePresence, motion } from "framer-motion";

const generateCardSchema = z.object({
  limit: z.coerce.number().min(100, "Minimum limit is ₹100").max(50000, "Maximum limit is ₹50,000"),
});

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
};

export function VirtualCardSection() {
    const [virtualCard, setVirtualCard] = useState<any>(null);
    const [showForm, setShowForm] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof generateCardSchema>>({
        resolver: zodResolver(generateCardSchema),
        defaultValues: { limit: 1000 },
    });

    const onSubmit = (values: z.infer<typeof generateCardSchema>) => {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 2); // 48-hour expiry

        const newCard = {
            cardNumber: `5573 8400 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
            expiryDate: expiryDate.toLocaleDateString('en-GB', {month: '2-digit', year: '2-digit'}),
            cvv: `${Math.floor(100 + Math.random() * 900)}`,
            limit: values.limit
        };
        setVirtualCard(newCard);
        setShowForm(false);
        form.reset();
        toast({ title: "Virtual Card Created!", description: "Your new virtual card is ready for secure online transactions." });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ description: `${text} copied to clipboard.` });
    };

    return (
        <Card className="mt-6 border-0 shadow-none">
            <CardHeader>
                <CardTitle>Virtual Card for Online Shopping</CardTitle>
                <CardDescription>Instantly generate a temporary card for secure online payments. The card expires automatically after 48 hours.</CardDescription>
            </CardHeader>
            <CardContent>
                <AnimatePresence mode="wait">
                {virtualCard ? (
                     <motion.div
                        key="card-details"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                     >
                        <div className="p-6 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <Shield className="w-8 h-8" />
                                <p className="font-bold text-lg">Nexus Virtual Card</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="font-mono text-xl tracking-widest">{virtualCard.cardNumber}</p>
                                <Copy className="cursor-pointer w-4 h-4" onClick={() => copyToClipboard(virtualCard.cardNumber)} />
                            </div>
                            <div className="flex justify-between items-end mt-4 text-sm">
                                <div>
                                    <p className="opacity-70">Valid Thru</p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">{virtualCard.expiryDate}</p>
                                        <Copy className="cursor-pointer w-4 h-4" onClick={() => copyToClipboard(virtualCard.expiryDate)} />
                                    </div>
                                </div>
                                <div>
                                    <p className="opacity-70">CVV</p>
                                     <div className="flex items-center gap-2">
                                        <p className="font-medium">{virtualCard.cvv}</p>
                                        <Copy className="cursor-pointer w-4 h-4" onClick={() => copyToClipboard(virtualCard.cvv)} />
                                    </div>
                                </div>
                                 <div>
                                    <p className="opacity-70">Limit</p>
                                    <p className="font-medium">{formatCurrency(virtualCard.limit)}</p>
                                </div>
                            </div>
                        </div>
                        <Button onClick={() => setVirtualCard(null)}>Delete and Create New Card</Button>
                    </motion.div>
                ) : showForm ? (
                    <motion.div
                        key="card-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                         <Card className="p-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="limit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Set Card Limit (Max: {formatCurrency(50000)})</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter amount" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex gap-4">
                                        <Button type="submit">Generate Secure Card</Button>
                                        <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                                    </div>
                                </form>
                            </Form>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="card-prompt"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center py-10"
                    >
                        <Shield className="w-16 h-16 mx-auto text-primary mb-4" />
                        <h3 className="text-xl font-semibold">No active virtual card</h3>
                        <p className="text-muted-foreground mt-2 mb-6">Generate a new card to start shopping securely online.</p>
                        <Button onClick={() => setShowForm(true)}>
                            <PlusCircle className="mr-2" /> Generate New Virtual Card
                        </Button>
                    </motion.div>
                )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
