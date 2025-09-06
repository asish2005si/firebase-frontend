
"use client";

import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
  Landmark,
  PiggyBank,
  Wallet,
  Briefcase,
  GraduationCap,
  Senior,
  FileText,
  Building,
  HeartHandshake,
  Car,
  Contact,
  CreditCard,
  Banknote,
  Smartphone,
  BookUser,
  Settings,
  ShieldCheck,
  MessageSquare,
  BadgeInfo,
  ChevronDown,
  ChevronRight,
  LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";

const menuItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Accounts",
    icon: <Wallet className="h-4 w-4" />,
    subItems: [
      { title: "Savings Account", href: "/dashboard/accounts/savings" },
      { title: "Current Account", href: "/dashboard/accounts/current" },
      { title: "Statements", href: "/dashboard/accounts/statements" },
    ],
  },
  {
    title: "Deposits",
    icon: <PiggyBank className="h-4 w-4" />,
    subItems: [
      { title: "Fixed Deposit", href: "/dashboard/deposits/fd" },
      { title: "Recurring Deposit", href: "/dashboard/deposits/rd" },
    ],
  },
  {
    title: "Loans",
    icon: <Briefcase className="h-4 w-4" />,
    subItems: [
        { title: "Home Loan", href: "/dashboard/loans/home" },
        { title: "Personal Loan", href: "/dashboard/loans/personal" },
        { title: "Car Loan", href: "/dashboard/loans/car" },
        { title: "Education Loan", href: "/dashboard/loans/education" },
    ]
  },
  {
    title: "Cards",
    icon: <CreditCard className="h-4 w-4" />,
    subItems: [
        { title: "Debit Card", href: "/dashboard/cards/debit" },
        { title: "Credit Card", href: "/dashboard/cards/credit" },
    ]
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: <Banknote className="h-4 w-4" />,
  },
];

const secondaryMenuItems = [
    { title: "Profile & Security", href: "/dashboard/security", icon: <ShieldCheck className="h-4 w-4" /> },
    { title: "Customer Support", href: "/dashboard/support", icon: <MessageSquare className="h-4 w-4" /> },
]

export function DashboardSidebar({ isMobile = false }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const SidebarContent = () => (
     <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Landmark className="h-6 w-6 text-primary" />
            <span className="">Nexus Bank</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuItems.map((item) =>
              item.subItems ? (
                <Collapsible key={item.title}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary [&[data-state=open]>svg]:rotate-90">
                     <div className="flex items-center gap-3">
                        {item.icon}
                        {item.title}
                    </div>
                    <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-7 border-l border-dashed border-border py-2">
                        {item.subItems.map((subItem) => (
                        <Link
                            key={subItem.title}
                            href={subItem.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 ml-2 text-muted-foreground transition-all hover:text-primary",
                                isActive(subItem.href) && "bg-muted text-primary"
                            )}
                            >
                            {subItem.title}
                        </Link>
                        ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive(item.href) && "bg-muted text-primary"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )
            )}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
           <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {secondaryMenuItems.map(item => (
                 <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        isActive(item.href) && "bg-muted text-primary"
                    )}
                    >
                    {item.icon}
                    {item.title}
                </Link>
            ))}
             <Link
                href="/login"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-destructive transition-all hover:text-destructive/80 mt-4"
                >
                <LogOut className="h-4 w-4" />
                Logout
            </Link>
           </nav>
        </div>
      </div>
  )

  if (isMobile) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 w-3/4">
                 <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SidebarContent />
            </SheetContent>
        </Sheet>
    )
  }

  return (
    <div className="hidden border-r bg-card lg:block w-64">
      <SidebarContent />
    </div>
  );
}
