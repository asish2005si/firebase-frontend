
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, User, Car, GraduationCap, ArrowRight, BadgePercent, CalendarClock, IndianRupee, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const loanTypes = [
  {
    icon: <Home className="h-10 w-10 text-primary" />,
    title: "Home Loan",
    type: "home",
    description: "Finance your dream home with attractive interest rates and flexible tenure.",
    details: [
      { icon: <BadgePercent />, text: "Rates from 8.5% p.a. (Fixed/Floating)" },
      { icon: <CalendarClock />, text: "Tenure up to 30 years" },
      { icon: <IndianRupee />, text: "Max amount based on income" },
    ],
  },
  {
    icon: <User className="h-10 w-10 text-primary" />,
    title: "Personal Loan",
    type: "personal",
    description: "Meet your personal financial needs with our quick and easy personal loans.",
    details: [
      { icon: <BadgePercent />, text: "Rates from 10.75% p.a." },
      { icon: <CalendarClock />, text: "Tenure up to 5 years" },
      { icon: <CheckCircle2 />, text: "Minimal documentation" },
    ],
  },
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: "Car Loan",
    type: "car",
    description: "Get behind the wheel of your new car with our competitive car loan options.",
    details: [
        { icon: <BadgePercent />, text: "Rates from 9.25% p.a." },
        { icon: <CalendarClock />, text: "Tenure up to 7 years" },
        { icon: <IndianRupee />, text: "Up to 100% on-road funding" },
    ],
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "Education Loan",
    type: "education",
    description: "Invest in your future with our education loans for studies in India and abroad.",
    details: [
        { icon: <BadgePercent />, text: "Subsidized interest rates" },
        { icon: <CalendarClock />, text: "Flexible repayment options" },
        { icon: <CheckCircle2 />, text: "Covers tuition, fees, & living costs" },
    ],
  },
];

export function LoanProducts() {
  return (
    <div>
        <h3 className="text-xl font-semibold mb-4">Our Loan Products</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {loanTypes.map((loan, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <div>
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {loan.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{loan.title}</CardTitle>
                    <CardDescription>{loan.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {loan.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="text-primary">{detail.icon}</div>
                        <span>{detail.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
              <CardContent>
                <Link href={`/dashboard/loans/apply?type=${loan.type}`}>
                    <Button className="w-full">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                 </Link>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
}
