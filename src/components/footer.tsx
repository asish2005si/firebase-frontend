"use client";

import Link from "next/link";
import { Landmark, Facebook, Twitter, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Landmark className="h-7 w-7" />
              <span className="text-xl font-bold font-headline">Smart Bank</span>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Your financial partner for a smarter future.
            </p>
          </div>
          <div>
            <h4 className="font-headline text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:underline text-primary-foreground/80">Services</Link></li>
              <li><Link href="#" className="text-sm hover:underline text-primary-foreground/80">Open Account</Link></li>
              <li><Link href="#" className="text-sm hover:underline text-primary-foreground/80">Loans</Link></li>
              <li><Link href="#" className="text-sm hover:underline text-primary-foreground/80">Cards</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:underline text-primary-foreground/80">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm hover:underline text-primary-foreground/80">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm hover:underline text-primary-foreground/80">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook"><Facebook className="h-6 w-6 text-primary-foreground/80 hover:text-primary-foreground" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 text-primary-foreground/80 hover:text-primary-foreground" /></Link>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-primary-foreground/80 hover:text-primary-foreground" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {currentYear} Smart Bank. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}