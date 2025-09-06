
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

type Notification = {
    date: string;
    message: string;
}

type RecentNotificationsProps = {
    notifications: Notification[];
}

export function RecentNotifications({ notifications }: RecentNotificationsProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-headline">Recent Notifications</CardTitle>
            <CardDescription>Important updates about your account.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {notifications.map((notification, index) => (
                    <div key={index} className="flex items-start gap-4">
                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                            {new Date(notification.date).toLocaleDateString('en-US', { day: '2-digit' })}
                            <br/>
                            {new Date(notification.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(notification.date).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="outline" size="sm" className="mt-6 w-full">
                View All Notifications <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </CardContent>
    </Card>
  )
}
