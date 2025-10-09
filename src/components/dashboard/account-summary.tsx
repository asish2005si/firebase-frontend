
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/firebase";
import { useEffect, useState } from "react";
import { ClientOnly } from "../client-only";

export function CustomerProfile() {
  const { user } = useUser();
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    if (user?.metadata.lastSignInTime) {
      setLastLogin(new Date(user.metadata.lastSignInTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }));
    }
  }, [user]);

  return (
    <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <CardTitle className="text-xl font-headline">Welcome back, {user?.displayName || user?.email || 'Customer'}!</CardTitle>
                <CardDescription>Here’s a summary of your profile information.</CardDescription>
            </div>
            <ClientOnly>
                {lastLogin && <p className="text-sm text-muted-foreground mt-2 md:mt-0">Last Login: {lastLogin}</p>}
            </ClientOnly>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
            <DetailItem label="Full Name" value={user?.displayName || "Not set"} />
            <DetailItem label="Account Number" value={"50100123456789"} />
            <DetailItem label="Email Address" value={user?.email || '-'} />
        </CardContent>
    </Card>
  )
}

const DetailItem = ({ label, value }: { label: string, value: string }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value || '-'}</p>
    </div>
)
