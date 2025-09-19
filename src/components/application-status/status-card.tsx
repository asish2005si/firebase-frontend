
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock } from "lucide-react";

type StatusCardProps = {
  status: "Approved" | "Pending" | "Rejected";
  reason?: string;
};

const statusConfig = {
  Approved: {
    icon: <CheckCircle className="h-12 w-12 text-green-500" />,
    title: "Congratulations! Your Application is Approved.",
    description: "Your account is ready. Welcome to Nexus Bank!",
    bgColor: "bg-green-500/10 border-green-500/50",
  },
  Pending: {
    icon: <Clock className="h-12 w-12 text-yellow-500" />,
    title: "Your Application is Under Review.",
    description: "Our team is verifying your details. This usually takes 24-48 hours. Please check back later.",
    bgColor: "bg-yellow-500/10 border-yellow-500/50",
  },
  Rejected: {
    icon: <XCircle className="h-12 w-12 text-red-500" />,
    title: "Your Application Has Been Rejected.",
    description: "We were unable to approve your application at this time.",
    bgColor: "bg-red-500/10 border-red-500/50",
  },
};

export function StatusCard({ status, reason }: StatusCardProps) {
  const config = statusConfig[status];

  return (
    <Card className={config.bgColor}>
      <CardHeader className="text-center items-center">
        {config.icon}
        <CardTitle className="text-2xl mt-4">{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
        {status === "Rejected" && reason && (
            <div className="text-left w-full mt-4 p-3 bg-red-900/20 rounded-md border border-red-500/30">
              <p className="font-semibold text-destructive mb-1">Reason for Rejection:</p>
              <p className="text-sm text-destructive-foreground/80">{reason}</p>
            </div>
        )}
      </CardHeader>
    </Card>
  );
}
