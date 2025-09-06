
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, User, Car, GraduationCap, ArrowRight } from "lucide-react";

const loanTypes = [
  {
    icon: <Home className="h-10 w-10 text-primary" />,
    title: "Home Loan",
    description: "Starting at 7.5% p.a.",
  },
  {
    icon: <User className="h-10 w-10 text-primary" />,
    title: "Personal Loan",
    description: "Instant processing",
  },
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: "Car Loan",
    description: "Minimal documentation",
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "Education Loan",
    description: "Finance your future with ease",
  },
];

export function LoanSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">
            Grab Your Dream Loan Today!
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Fast Approval • Low Interest • Flexible Tenure
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {loanTypes.map((loan, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="flex flex-col text-center items-center h-full border-secondary/50 hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-300 transform hover:-translate-y-2">
                    <CardHeader className="items-center">
                      <div className="p-4 bg-secondary/10 rounded-full mb-4">
                        {loan.icon}
                      </div>
                      <CardTitle className="font-headline text-xl">
                        {loan.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{loan.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center mt-12">
           <p className="text-sm text-foreground/60 mb-4">
              100% secure, instant approval process.
            </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
            Apply Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
