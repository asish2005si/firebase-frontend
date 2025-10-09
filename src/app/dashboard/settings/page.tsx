
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Bell, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ClientOnly } from "@/components/client-only";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});


function ChangePasswordForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Password change requested for:", values);
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
        form.reset();
        setIsSubmitting(false);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                     {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Password
                </Button>
            </form>
        </Form>
    );
}


export default function SettingsPage() {
  return (
    <ClientOnly>
        <div className="flex flex-col gap-8">
        <Card>
            <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
                Manage your account settings and preferences.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><User /> Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">To update your profile information like address or name, please contact customer support or visit your nearest branch.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Lock /> Security & Password</CardTitle>
                            <CardDescription>Change your login password here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChangePasswordForm />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Bell /> Notifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Notification preferences will appear here. This feature is coming soon.</p>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
        </div>
    </ClientOnly>
  );
}

