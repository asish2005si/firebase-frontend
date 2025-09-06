
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ClientOnly } from "@/components/client-only";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientOnly>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex flex-col flex-1">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </ClientOnly>
  );
}
