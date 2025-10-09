"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { useAdmin } from "@/hooks/use-admin";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, isLoading } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If we are on the login page, don't redirect.
    if (pathname === '/admin/login') {
      // If an admin is already logged in and tries to visit login, send them to the dashboard.
      if (!isLoading && isAdmin) {
        router.push('/admin/applications');
      }
      return;
    }

    // For any other admin page, enforce the security check.
    if (!isLoading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, isLoading, router, pathname]);

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
