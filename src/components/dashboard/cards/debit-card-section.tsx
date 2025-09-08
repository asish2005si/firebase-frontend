
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Lock, Unlock, Settings, Pin, ShieldCheck, Truck, Globe } from "lucide-react";
import { debitCardTypes } from "@/lib/card-data";

// Mock data for debit card
const initialDebitCard = {
    cardNumber: "**** **** **** 8432",
    cardHolder: "",
    expiryDate: "12/28",
    cvv: "***",
    isActive: true,
    isBlocked: false,
    deliveryStatus: "Delivered",
    internationalUsage: false,
    cardTypeValue: "platinum-debit",
    limits: {
        atm: 0,
        pos: 0,
        online: 0,
    }
};

const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
    return `INR ${formatted}`;
};

export function DebitCardSection() {
    const [card, setCard] = useState(initialDebitCard);
    const cardInfo = debitCardTypes.find(c => c.value === card.cardTypeValue) || debitCardTypes[0];
    const { toast } = useToast();

    const handleToggleBlock = () => {
        const newBlockedState = !card.isBlocked;
        setCard(prev => ({ ...prev, isBlocked: newBlockedState }));
        toast({
            title: `Card ${newBlockedState ? 'Blocked' : 'Unblocked'}`,
            description: `Your debit card has been successfully ${newBlockedState ? 'blocked' : 'unblocked'}.`,
        });
    };
    
    const handleToggleInternational = () => {
        const newInternationalState = !card.internationalUsage;
        setCard(prev => ({ ...prev, internationalUsage: newInternationalState }));
        toast({
            title: `International Usage ${newInternationalState ? 'Enabled' : 'Disabled'}`,
            description: `International transactions on your debit card are now ${newInternationalState ? 'enabled' : 'disabled'}.`,
        });
    };

    return (
        <Card className="mt-6 border-0 shadow-none">
            <CardHeader>
                <CardTitle>Manage Your Debit Card</CardTitle>
                <CardDescription>View details, set limits, and control your card security.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                   {/* Card Visual */}
                    <div className="p-6 rounded-xl bg-gradient-to-tr from-primary to-secondary text-primary-foreground shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg">{cardInfo.title}</p>
                            <CreditCard className="w-8 h-8" />
                        </div>
                        <p className="font-mono text-xl tracking-widest">{card.cardNumber}</p>
                        <div className="flex justify-between items-end mt-4">
                            <div>
                                <p className="text-xs">Card Holder</p>
                                <p className="font-medium">{card.cardHolder}</p>
                            </div>
                             <div>
                                <p className="text-xs">Expires</p>
                                <p className="font-medium">{card.expiryDate}</p>
                            </div>
                        </div>
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Card Status</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Truck className="w-5 h-5 text-muted-foreground" />
                                <p>Delivery Status</p>
                            </div>
                            <Badge variant={card.deliveryStatus === 'Delivered' ? 'default' : 'secondary'} className={card.deliveryStatus === 'Delivered' ? 'bg-green-600' : ''}>
                                {card.deliveryStatus}
                            </Badge>
                        </CardContent>
                    </Card>
                </div>

                {/* Card Controls */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                             <CardTitle className="text-lg">Security Controls</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                                <Label htmlFor="block-card" className="flex items-center gap-3">
                                    {card.isBlocked ? <Lock className="w-5 h-5 text-destructive" /> : <Unlock className="w-5 h-5 text-green-600" />}
                                    <span>{card.isBlocked ? 'Card Blocked' : 'Block Card (Temporary)'}</span>
                                </Label>
                                <Switch id="block-card" checked={card.isBlocked} onCheckedChange={handleToggleBlock} />
                            </div>
                             <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                                <Label htmlFor="intl-usage" className="flex items-center gap-3">
                                    <Globe className="w-5 h-5" />
                                    <span>International Usage</span>
                                </Label>
                                <Switch id="intl-usage" checked={card.internationalUsage} onCheckedChange={handleToggleInternational} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Card Actions</CardTitle>
                        </CardHeader>
                         <CardContent className="grid grid-cols-2 gap-4">
                            <SetLimitsDialog limits={card.limits} setLimits={(newLimits) => setCard(p => ({...p, limits: newLimits}))}/>
                            <ResetPinDialog />
                         </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}

// Dialog for setting transaction limits
function SetLimitsDialog({ limits, setLimits }: { limits: any, setLimits: any }) {
    const { toast } = useToast();
    const [tempLimits, setTempLimits] = useState(limits);

    const handleSave = () => {
        setLimits(tempLimits);
        toast({ title: "Limits Updated", description: "Your new transaction limits have been set." });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Settings className="mr-2" /> Set Limits</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set Transaction Limits</DialogTitle>
                    <DialogDescription>Adjust your daily limits for different transaction types.</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div>
                        <Label>ATM Withdrawal ({formatCurrency(tempLimits.atm)})</Label>
                        <Slider value={[tempLimits.atm]} onValueChange={(val) => setTempLimits((p:any) => ({...p, atm: val[0]}))} max={100000} step={5000} />
                    </div>
                     <div>
                        <Label>POS / In-Store ({formatCurrency(tempLimits.pos)})</Label>
                        <Slider value={[tempLimits.pos]} onValueChange={(val) => setTempLimits((p:any) => ({...p, pos: val[0]}))} max={200000} step={10000} />
                    </div>
                     <div>
                        <Label>Online / E-commerce ({formatCurrency(tempLimits.online)})</Label>
                        <Slider value={[tempLimits.online]} onValueChange={(val) => setTempLimits((p:any) => ({...p, online: val[0]}))} max={200000} step={10000} />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Dialog for resetting PIN
function ResetPinDialog() {
    const { toast } = useToast();
    const handleReset = () => {
        toast({
            title: "PIN Reset Initiated",
            description: "A secure link to reset your PIN has been sent to your registered mobile number."
        });
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Pin className="mr-2" /> Reset PIN</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Debit Card PIN</DialogTitle>
                    <DialogDescription>Are you sure you want to reset your PIN? A confirmation will be sent to your registered mobile number.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="secondary" className="mt-2">Cancel</Button>
                    <Button onClick={handleReset}>Confirm & Reset</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
