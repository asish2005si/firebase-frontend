"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { useAdmin } from "@/hooks/use-admin";
import { useUser } from "@/firebase";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading: isUserLoading } = useUser();
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const isLoading = isUserLoading || isAdminLoading;

  useEffect(() => {
    if (isLoading) {
      return; // Wait until loading is complete
    }

    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
      // If an admin is already logged in and tries to visit login, send them to the dashboard.
      if (isAdmin) {
        router.push('/admin/applications');
      }
      return;
    }

    // For any other admin page, enforce the security check.
    if (!isAdmin) {
      // If a user is logged in but is not an admin, send them to their dashboard
      if (user) {
        toast({
            variant: "destructive",
            title: "Unauthorized Access",
            description: "You are not authorized to access the admin panel.",
        });
        router.push('/dashboard');
      } else {
        // If no user is logged in, send to admin login
        router.push('/admin/login');
      }
    }
  }, [isAdmin, isLoading, user, router, pathname, toast]);

  // If we are on the login page, we just render the children (the login form).
  // The useEffect above handles redirecting away if already logged in.
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Verifying admin access...</p>
      </div>
    );
  }
  
  if (!isAdmin) {
    // This will show briefly before the redirect happens, or not at all.
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <AdminHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
