"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { verifyOtp, sendOtp } from "@/app/actions/otp";

type OtpDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => Promise<void>;
  contactMethod: string;
};

export function OtpDialog({ isOpen, onClose, onVerify, contactMethod }: OtpDialogProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleVerifyClick = async () => {
    setError("");
    setIsVerifying(true);
    const result = await verifyOtp(contactMethod, otp);

    if (result.success) {
      await onVerify(); // This proceeds to the next step (e.g., completing the transaction)
    } else {
      setError(result.message || "An unknown error occurred.");
    }
    setIsVerifying(false);
  };
  
  const handleResend = async () => {
    setIsResending(true);
    const result = await sendOtp(contactMethod);
    if(result.success) {
      toast({
          title: "OTP Resent",
          description: `A new OTP has been sent to ${contactMethod}.`,
      });
    } else {
       toast({
          variant: "destructive",
          title: "Failed to Resend",
          description: result.message,
      });
    }
    setIsResending(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Authorization</DialogTitle>
          <DialogDescription>
            Please enter the 6-digit OTP sent to {contactMethod}. The code is logged in your server console.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2">
          <Label htmlFor="otp">Enter OTP</Label>
          <Input 
            id="otp" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            maxLength={6}
            placeholder="••••••"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
           <div className="text-right text-sm">
              <Button variant="link" size="sm" onClick={handleResend} className="p-0 h-auto" disabled={isResending || isVerifying}>
                {isResending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : 'Resend OTP'}
              </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isVerifying}>
            Cancel
          </Button>
          <Button onClick={handleVerifyClick} disabled={isVerifying || otp.length !== 6}>
            {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify & Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
