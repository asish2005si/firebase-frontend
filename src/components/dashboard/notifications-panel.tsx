
"use client";

import { Bell, ArrowUpRight, IndianRupee, ShieldAlert, BadgePercent, Wrench } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const notifications = [
    {
        icon: <IndianRupee className="h-5 w-5 text-green-500" />,
        title: "Credit: Salary",
        description: "Your account has been credited with ₹50,000.",
        time: "2h ago",
    },
    {
        icon: <ShieldAlert className="h-5 w-5 text-yellow-500" />,
        title: "Unusual Login Attempt",
        description: "A login from a new device was detected.",
        time: "1d ago",
    },
    {
        icon: <BadgePercent className="h-5 w-5 text-blue-500" />,
        title: "New Loan Offer",
        description: "Pre-approved personal loan up to ₹5,00,000.",
        time: "3d ago",
    },
     {
        icon: <Wrench className="h-5 w-5 text-gray-500" />,
        title: "System Maintenance",
        description: "Scheduled maintenance on Sunday at 2 AM.",
        time: "5d ago",
    }
]

export function NotificationsPanel() {
  return (
    <div>
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                    <Bell className="h-5 w-5"/>
                    Notifications
                </CardTitle>
                <CardDescription>Recent alerts and offers from Nexus Bank.</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    View All
                </span>
                <ArrowUpRight className="h-4 w-4" />
                </Button>
            </div>
            </CardHeader>
            <CardContent className="p-6 text-sm space-y-4">
               {notifications.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0">{item.icon}</div>
                        <div className="grid gap-1">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                        <p className="ml-auto text-xs text-muted-foreground">{item.time}</p>
                    </div>
               ))}
            </CardContent>
        </Card>
    </div>
  );
}
