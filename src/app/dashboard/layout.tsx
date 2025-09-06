
"use client";

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { NotificationsPanel } from "@/components/dashboard/notifications-panel";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider>
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <DashboardSidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <DashboardHeader />
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                  <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    {children}
                  </div>
                  <NotificationsPanel />
              </main>
            </div>
          </div>
      </SidebarProvider>
  );
}
