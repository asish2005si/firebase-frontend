
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, Home, Car, User, GraduationCap, Star, BadgePercent, Gift } from "lucide-react";

const loanProducts = [
  {
    value: "home",
    icon: <Home className="h-5 w-5" />,
    title: "Home Loan",
    tagline: "Your Dream Home is Closer Than You Think.",
    description: "Whether you are buying, building, or renovating, our home loans offer the flexibility and support you need to turn your dream into an address.",
    visual: "https://picsum.photos/800/600",
    visualHint: "happy family new house",
    interestRate: "Starting from 8.5% p.a.",
    highlights: [
      "Flexible tenure options up to 30 years",
      "Special rates for women borrowers",
      "Minimal documentation & quick processing",
      "Top-up loan facility available",
    ],
    testimonial: {
      text: "Nexus Bank made our dream of owning a home a reality. The process was transparent and the team was incredibly supportive throughout.",
      author: "The Sharma Family",
    },
    festiveOffer: "Zero processing fees for all applications this month!",
  },
  {
    value: "car",
    icon: <Car className="h-5 w-5" />,
    title: "Car Loan",
    tagline: "Get Behind the Wheel of Your Dream Car.",
    description: "Drive home your brand new car with our attractive loan options, offering up to 100% on-road funding and flexible repayment schedules.",
    visual: "https://picsum.photos/800/600",
    visualHint: "new car road",
    interestRate: "Rates from 9.25% p.a.",
    highlights: [
      "Up to 100% on-road price funding",
      "Flexible repayment tenure up to 7 years",
      "Quick disbursal process",
      "Tie-ups with all major car dealers",
    ],
    testimonial: {
      text: "The car loan from Nexus Bank was approved in just a day! The experience was seamless and hassle-free. Highly recommended!",
      author: "Rohan Singh",
    },
    festiveOffer: "Get a free car accessory kit with every loan disbursal!",
  },
  {
    value: "personal",
    icon: <User className="h-5 w-5" />,
    title: "Personal Loan",
    tagline: "Your Goals, Your Loan, Your Terms.",
    description: "From weddings to vacations to unexpected expenses, our personal loans provide the financial boost you need, exactly when you need it.",
    visual: "https://picsum.photos/800/600",
    visualHint: "working professionals meeting",
    interestRate: "Attractive rates from 10.75% p.a.",
    highlights: [
      "Loans up to ₹25 Lakhs",
      "No collateral or security required",
      "Instant approval for pre-qualified customers",
      "Repay in easy installments over 5 years",
    ],
    testimonial: {
      text: "I needed funds urgently for a medical emergency, and Nexus Bank's personal loan came through instantly. Thank you for the swift support.",
      author: "Priya Menon",
    },
    festiveOffer: "50% waiver on processing fees for all personal loans.",
  },
  {
    value: "education",
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Education Loan",
    tagline: "Invest in Your Future, We'll Handle the Finances.",
    description: "Don't let finances hold you back from achieving your academic dreams. We cover courses in India and abroad with tax benefits under Sec 80E.",
    visual: "https://picsum.photos/800/600",
    visualHint: "student graduation",
    interestRate: "Subsidized rates for premier institutes.",
    highlights: [
      "Covers tuition, living & other expenses",
      "Moratorium period after course completion",
      "Tax benefits for the borrower",
      "Doorstep service and guidance",
    ],
    testimonial: {
      text: "Thanks to Nexus Bank, I could pursue my Master's degree in the US without any financial burden on my parents. Their process is student-friendly.",
      author: "Aarav Patel",
    },
    festiveOffer: "Get a free international student card with every education loan.",
  },
];

export function LoanProductsSection() {
  return (
    <section id="loans" className="py-20 bg-muted/40">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">
            Tailored Loans for Every Need
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Explore our range of loan products designed to help you achieve your life's milestones. With competitive rates and a simple application process, your goals are now within reach.
          </p>
        </div>
        
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            {loanProducts.map((loan) => (
                <TabsTrigger key={loan.value} value={loan.value} className="py-2.5">
                    {loan.icon}
                    <span className="ml-2">{loan.title}</span>
                </TabsTrigger>
            ))}
          </TabsList>
          
          {loanProducts.map((loan) => (
            <TabsContent key={loan.value} value={loan.value} className="mt-8">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                        <Image 
                            src={loan.visual}
                            alt={loan.title}
                            fill
                            className="object-cover"
                            data-ai-hint={loan.visualHint}
                        />
                    </div>
                    <div className="p-8 flex flex-col">
                        <BadgePercent className="h-8 w-8 text-primary mb-4" />
                        <h3 className="text-2xl font-bold font-headline text-primary">{loan.tagline}</h3>
                        <p className="text-muted-foreground mt-2">{loan.description}</p>
                        
                        <div className="my-6 space-y-3">
                            {loan.highlights.map(highlight => (
                                <div key={highlight} className="flex items-center">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                    <span className="text-sm">{highlight}</span>
                                </div>
                            ))}
                        </div>
                        
                        <Card className="bg-muted/50 my-4">
                            <CardContent className="p-4">
                                <div className="flex items-center text-yellow-500 mb-2">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                                </div>
                                <blockquote className="text-sm italic">"{loan.testimonial.text}"</blockquote>
                                <p className="text-right font-semibold text-primary mt-2">- {loan.testimonial.author}</p>
                            </CardContent>
                        </Card>

                        <div className="bg-accent/10 border-l-4 border-accent text-accent-foreground p-3 rounded-r-md text-sm font-semibold flex items-center gap-3">
                           <Gift className="h-5 w-5"/> {loan.festiveOffer}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6">
                            <Link href={`/dashboard/loans/apply?type=${loan.value}`} className="w-full sm:w-auto">
                                <Button size="lg" className="w-full">
                                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                <Download className="ml-2 h-4 w-4" /> Download Brochure
                            </Button>
                        </div>
                    </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
