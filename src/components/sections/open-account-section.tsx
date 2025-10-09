

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

const accountTypes = [
  {
    icon: <PiggyBank className="h-10 w-10 text-primary" />,
    title: "Savings Account",
    description: "Build your future with our high-interest savings accounts. Secure, flexible, and easy to manage.",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Current Account",
    description: "Streamline your business finances with our feature-rich current accounts, designed for growth.",
  },
];

export function OpenAccountSection() {
  return (
    <section id="open-account" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-headline">
            Open Your Nexus Bank Account Today
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your account type and get started in minutes. It's simple, secure, and smart.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 justify-center">
          {accountTypes.map((account) => (
            <Card key={account.title} className="flex flex-col text-center items-center bg-card border-border hover:shadow-2xl hover:shadow-primary/5 transition-shadow duration-300 transform hover:-translate-y-2 max-w-md mx-auto">
              <CardHeader className="items-center">
                <div className="p-4 bg-muted rounded-full mb-4">
                  {account.icon}
                </div>
                <CardTitle className="font-headline text-xl">{account.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{account.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/open-account">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg rounded-full px-8">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
