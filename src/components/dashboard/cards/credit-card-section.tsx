
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, IndianRupee, Star, Calendar, Info } from "lucide-react";

// Mock data for credit card
const initialCreditCard = {
    cardNumber: "**** **** **** 5678",
    cardHolder: "Jane Doe",
    expiryDate: "10/29",
    cardType: "Nexus Rewards Platinum",
    totalLimit: 200000,
    availableLimit: 150000,
    unbilledAmount: 25000,
    billDueDate: "2025-09-20",
    dueAmount: 25000,
    rewardPoints: 1250,
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
};

export function CreditCardSection() {
    const [card] = useState(initialCreditCard);
    const usagePercentage = ((card.totalLimit - card.availableLimit) / card.totalLimit) * 100;

    return (
        <Card className="mt-6 border-0 shadow-none">
            <CardHeader>
                <CardTitle>Your Credit Card</CardTitle>
                <CardDescription>Manage your credit card, view statements, and pay bills.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    {/* Card Visual */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg">{card.cardType}</p>
                            <Star className="w-8 h-8 text-yellow-400" />
                        </div>
                        <p className="font-mono text-xl tracking-widest">{card.cardNumber}</p>
                        <div className="flex justify-between items-end mt-4">
                            <div>
                                <p className="text-xs opacity-70">Card Holder</p>
                                <p className="font-medium">{card.cardHolder}</p>
                            </div>
                            <div>
                                <p className="text-xs opacity-70">Expires</p>
                                <p className="font-medium">{card.expiryDate}</p>
                            </div>
                        </div>
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Credit Usage</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted-foreground">Used: {formatCurrency(card.totalLimit - card.availableLimit)}</span>
                                    <span>Total: {formatCurrency(card.totalLimit)}</span>
                                </div>
                                <Progress value={usagePercentage} />
                                <p className="text-right text-sm mt-1 font-medium">Available: {formatCurrency(card.availableLimit)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Billing & Rewards</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <InfoItem icon={<IndianRupee />} label="Outstanding Amount" value={formatCurrency(card.dueAmount)} />
                         <InfoItem icon={<Calendar />} label="Bill Due Date" value={new Date(card.billDueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
                         <InfoItem icon={<Star />} label="Reward Points" value={`${card.rewardPoints} Points`} />
                    </CardContent>
                    <CardContent className="flex gap-4">
                        <PayBillDialog dueAmount={card.dueAmount} />
                        <Button variant="outline">View Statement</Button>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
        <div className="flex items-center gap-3">
             <div className="text-muted-foreground">{icon}</div>
            <span className="text-sm">{label}</span>
        </div>
        <span className="font-semibold">{value}</span>
    </div>
);


function PayBillDialog({ dueAmount }: { dueAmount: number }) {
    const { toast } = useToast();
    const [amount, setAmount] = useState(dueAmount);

    const handlePay = () => {
        if (amount > 0) {
            toast({
                title: "Payment Successful",
                description: `${formatCurrency(amount)} has been paid towards your credit card bill.`
            });
        }
    };
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                 <Button>Pay Bill</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Pay Credit Card Bill</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm">Total due amount is {formatCurrency(dueAmount)}.</p>
                     <div className="flex gap-2 my-4">
                        <Button variant="outline" size="sm" onClick={() => setAmount(dueAmount)}>Pay Total Due</Button>
                        <Button variant="outline" size="sm" onClick={() => setAmount(dueAmount * 0.05)}>Pay Minimum Due</Button>
                    </div>
                    <Label htmlFor="amount">Enter Amount to Pay</Label>
                    <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                </div>
                <DialogFooter>
                    <Button onClick={handlePay}>Pay Now</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
