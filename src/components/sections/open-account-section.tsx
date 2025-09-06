

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank, WalletCards, ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

const accountTypes = [
  {
    icon: <PiggyBank className="h-10 w-10 text-primary" />,
    title: "Savings Account",
    description: "Build your future with our high-interest savings accounts. Secure, flexible, and easy to manage.",
  },
  {
    icon: <WalletCards className="h-10 w-10 text-primary" />,
    title: "Current Account",
    description: "Manage your day-to-day finances with ease. Enjoy features like online bill pay and mobile deposits.",
  },
   {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Salary Account",
    description: "Get your salary credited and enjoy a host of benefits, including special offers and overdraft facilities.",
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "Student Account",
    description: "A zero-balance account for students to manage their finances, with educational offers and discounts.",
  },
];

export function OpenAccountSection() {
  return (
    <section id="open-account" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">
            Open Your Nexus Bank Account Today
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Choose your account type and get started in minutes. It's simple, secure, and smart.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 justify-center">
          {accountTypes.map((account) => (
            <Card key={account.title} className="flex flex-col text-center items-center border-secondary/50 hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-300 transform hover:-translate-y-2 max-w-md">
              <CardHeader className="items-center">
                <div className="p-4 bg-secondary/10 rounded-full mb-4">
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
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
