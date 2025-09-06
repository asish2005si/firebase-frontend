
"use client";

import Link from "next/link";
import {
  ChevronRight,
  Landmark,
  FileText,
  FileSpreadsheet,
  Users,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const quickLinks = [
  {
    title: "Account Summary",
    href: "/dashboard",
  },
  {
    title: "Account Statement",
    href: "/dashboard/statement",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
  },
  {
    title: "Fund Transfer",
    href: "/dashboard/transfer",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-background md:flex">
      <div className="flex-1">
        <div className="flex h-[60px] items-center justify-between border-b px-4">
          <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
          <ChevronRight className="h-5 w-5" />
        </div>
        <nav className="grid items-start p-2 text-sm font-medium">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === link.href && "bg-muted text-primary"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
