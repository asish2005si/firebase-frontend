
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Instant Card Issuance",
    description: "Get your card immediately upon account approval.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Secure & Flexible",
    description: "Block/unblock anytime, set spending limits.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Virtual Card Option",
    description: "Shop online safely with temporary cards.",
  },
];

export function SmartCardSection() {
  return (
    <section id="cards" className="py-20 bg-gradient-to-r from-blue-100 to-sky-100 dark:from-background dark:to-muted">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">
            Your Smart Card, Your Power!
          </h2>
          <p className="text-lg text-foreground/80">
            Apply for Debit, Credit, or Virtual cards instantly – secure, flexible, and reward-packed.
          </p>
          <div className="space-y-6 pt-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-primary font-headline">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
              Apply for a Card Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center">
          <Image
            src="https://picsum.photos/500/500"
            alt="Smart card illustration"
            width={500}
            height={500}
            className="rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
            data-ai-hint="credit card"
          />
        </div>
      </div>
    </section>
  );
}
