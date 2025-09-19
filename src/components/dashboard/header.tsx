
"use client";

import Link from "next/link";
import {
  Landmark,
  Bell,
  CircleUser,
  Menu,
  CreditCard,
  ListOrdered,
  Banknote,
  BadgeIndianRupee,
  PiggyBank,
  LifeBuoy,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "../theme-toggle";
import { ClientOnly } from "../client-only";
import { useToast } from "@/hooks/use-toast";

const navItems = [
    { href: "/dashboard", icon: CircleUser, label: "My Accounts & Profile" },
    { href: "/dashboard/payments", icon: Banknote, label: "Payments / Transfers" },
    { href: "/dashboard/cards", icon: CreditCard, label: "Card Services" },
    { href: "/dashboard/deposits", icon: PiggyBank, label: "Deposit & Investment" },
    { href: "/dashboard/statements", icon: ListOrdered, label: "Statements" },
    { href: "/dashboard/loans", icon: BadgeIndianRupee, label: "Loans" },
    { href: "/dashboard/customer-care", icon: LifeBuoy, label: "Customer Care" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Header() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 sticky top-0 z-30">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Landmark className="h-6 w-6 text-primary" />
          <span className="sr-only">Nexus Bank</span>
        </Link>
        {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
                <item.icon className="h-5 w-5" />
                {item.label}
            </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">Main navigation links for the dashboard.</SheetDescription>
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Landmark className="h-6 w-6" />
              <span className="sr-only">Nexus Bank</span>
            </Link>
            {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
                <item.icon className="h-5 w-5" />
                {item.label}
            </Link>
        ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial" />
        <ClientOnly>
          <ThemeToggle />
          <Button variant="secondary" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => router.push('/dashboard/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push('/dashboard/customer-care')}>
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ClientOnly>
      </div>
    </header>
  );
}
