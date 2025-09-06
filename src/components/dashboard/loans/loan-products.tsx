
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, User, Car, GraduationCap, ArrowRight } from "lucide-react";

const loanTypes = [
  {
    icon: <Home className="h-10 w-10 text-primary" />,
    title: "Home Loan",
    description: "Finance your dream home with attractive interest rates and flexible tenure.",
  },
  {
    icon: <User className="h-10 w-10 text-primary" />,
    title: "Personal Loan",
    description: "Meet your personal financial needs with our quick and easy personal loans.",
  },
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: "Car Loan",
    description: "Get behind the wheel of your new car with our competitive car loan options.",
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "Education Loan",
    description: "Invest in your future with our education loans for studies in India and abroad.",
  },
];

export function LoanProducts() {
  return (
    <div>
        <h3 className="text-xl font-semibold mb-4">Our Loan Products</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {loanTypes.map((loan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  {loan.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{loan.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground mb-4 flex-grow">{loan.description}</p>
                <Button>
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
}
