
"use client";

import * as React from "react";
import Link from "next/link";
import { Landmark, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { ClientOnly } from "./client-only";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#open-account", label: "Open Account" },
  { href: "#loans", label: "Loans" },
  { href: "#cards", label: "Cards" },
  { href: "#customer-care", label: "Support" },
  { href: "#contact", label: "Contact Us" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Landmark className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">Nexus Bank</span>
        </Link>
        <div className="flex flex-1 items-center justify-end">
            <nav className="hidden md:flex md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2 md:ml-6">
              <ClientOnly>
                 <ThemeToggle />
                <Link href="/login">
                  <Button
                    className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90"
                    size="sm"
                  >
                    Login
                  </Button>
                </Link>
              </ClientOnly>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Main navigation links for the website.</SheetDescription>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                      <Link href="/" className="flex items-center gap-2">
                        <Landmark className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline">Nexus Bank</span>
                      </Link>
                       <SheetClose asChild>
                         <Button variant="ghost" size="icon">
                           <X className="h-5 w-5" />
                           <span className="sr-only">Close Menu</span>
                         </Button>
                       </SheetClose>
                    </div>
                    <nav className="flex flex-col gap-4 p-4 mt-4">
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.label}>
                          <Link
                            href={link.href}
                            className="text-lg font-medium text-foreground/80 hover:text-foreground"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                    <div className="mt-auto p-4 border-t">
                      <SheetClose asChild>
                        <Link href="/login">
                          <Button
                            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          >
                            Login
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
