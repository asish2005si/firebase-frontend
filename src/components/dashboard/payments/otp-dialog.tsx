
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

type OtpDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => Promise<void>;
  isVerifying: boolean;
};

export function OtpDialog({ isOpen, onClose, onVerify, isVerifying }: OtpDialogProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleVerifyClick = async () => {
    setError("");
    if (otp === "123456") { // Simulate correct OTP
      await onVerify();
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };
  
  const handleResend = () => {
    toast({
        title: "OTP Resent",
        description: "A new OTP has been sent.",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Authorization</DialogTitle>
          <DialogDescription>
            Please enter the 6-digit OTP sent to your registered mobile number to authorize this transaction.
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
              <Button variant="link" size="sm" onClick={handleResend} className="p-0 h-auto">Resend OTP</Button>
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
