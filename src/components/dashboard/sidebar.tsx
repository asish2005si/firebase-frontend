
"use client";

import Link from "next/link";
import {
  Home,
  Users,
  Landmark,
  PiggyBank,
  Wallet,
  GraduationCap,
  Briefcase,
  User,
  Download,
  Building,
  HandCoins,
  CreditCard,
  Send,
  Settings,
  MessageSquare,
  BadgeHelp,
  LogOut,
  ChevronDown
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardSidebarProps = {
    isSheet?: boolean;
}

export function DashboardSidebar({ isSheet = false } : DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const NavItem = ({ href, icon, children, tooltip } : { href: string, icon: React.ReactNode, children: React.ReactNode, tooltip: string }) => (
    <SidebarMenuItem>
      <Link href={href} legacyBehavior passHref>
        <SidebarMenuButton tooltip={tooltip} isActive={isActive(href)}>
          {icon}
          <span>{children}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );

  const NavCollapsible = ({ title, icon, children, defaultOpen = false }: { title: string, icon: React.ReactNode, children: React.ReactNode, defaultOpen?: boolean }) => {
    return (
        <Collapsible defaultOpen={defaultOpen}>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="justify-between">
                         <div className="flex items-center gap-2">
                             {icon}
                            <span>{title}</span>
                         </div>
                        <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
            </SidebarMenuItem>
             <CollapsibleContent>
                <SidebarMenuSub>{children}</SidebarMenuSub>
             </CollapsibleContent>
        </Collapsible>
    )
  }

  const SubNavItem = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <SidebarMenuSubItem>
        <Link href={href} legacyBehavior passHref>
            <SidebarMenuSubButton isActive={isActive(href)}>{children}</SidebarMenuSubButton>
        </Link>
    </SidebarMenuSubItem>
  )

  const content = (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Landmark className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Nexus Bank</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <NavItem href="/dashboard" icon={<Home />} tooltip="Dashboard">Dashboard</NavItem>
          
          <NavCollapsible title="Accounts" icon={<Users />}>
            <SubNavItem href="/dashboard/accounts/savings">Savings Account</SubNavItem>
            <SubNavItem href="/dashboard/accounts/current">Current Account</SubNavItem>
            <SubNavItem href="/dashboard/accounts/salary">Salary Account</SubNavItem>
            <SubNavItem href="/dashboard/accounts/student">Student Account</SubNavItem>
            <SidebarMenuSubItem>
                <Link href="/dashboard/statements" legacyBehavior passHref>
                    <SidebarMenuSubButton isActive={isActive('/dashboard/statements')}>
                        Account Statements <Download className="ml-auto h-4 w-4" />
                    </SidebarMenuSubButton>
                </Link>
            </SidebarMenuSubItem>
          </NavCollapsible>

          <NavCollapsible title="Deposits" icon={<PiggyBank />}>
             <SubNavItem href="/dashboard/deposits/fixed">Fixed Deposit (FD)</SubNavItem>
             <SubNavItem href="/dashboard/deposits/recurring">Recurring Deposit (RD)</SubNavItem>
          </NavCollapsible>

          <NavCollapsible title="Loans" icon={<Building />}>
             <SubNavItem href="/dashboard/loans/home">Home Loan</SubNavItem>
             <SubNavItem href="/dashboard/loans/personal">Personal Loan</SubNavItem>
             <SubNavItem href="/dashboard/loans/education">Education Loan</SubNavItem>
             <SubNavItem href="/dashboard/loans/car">Car Loan</SubNavItem>
             <SubNavItem href="/dashboard/loans/calculator">EMI Calculator</SubNavItem>
          </NavCollapsible>

          <NavCollapsible title="Cards" icon={<CreditCard />}>
             <SubNavItem href="/dashboard/cards/debit">Debit Card</SubNavItem>
             <SubNavItem href="/dashboard/cards/credit">Credit Card</SubNavItem>
             <SubNavItem href="/dashboard/cards/new">Request New Card</SubNavItem>
          </NavCollapsible>

           <NavCollapsible title="Payments" icon={<Send />}>
             <SubNavItem href="/dashboard/payments/transfer">Fund Transfer</SubNavItem>
             <SubNavItem href="/dashboard/payments/upi">UPI Services</SubNavItem>
             <SubNavItem href="/dashboard/payments/bills">Bill Payments</SubNavItem>
          </NavCollapsible>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
             <NavItem href="/dashboard/support" icon={<MessageSquare />} tooltip="Support">Support</NavItem>
             <NavItem href="/dashboard/settings" icon={<Settings />} tooltip="Settings">Settings</NavItem>
             <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push("/login")}>
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
             </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </>
  );

  if (isSheet) {
    return content;
  }

  return <Sidebar collapsible="icon">{content}</Sidebar>;
}
