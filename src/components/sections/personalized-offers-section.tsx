
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generatePersonalizedOffers, type PersonalizedOfferOutput } from "@/ai/flows/personalized-offer-generation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, Loader2 } from "lucide-react";

const formSchema = z.object({
  userData: z.string().min(50, "Please provide more details (at least 50 characters) about your financial situation, goals, and what you're looking for.").max(1000),
});

export function PersonalizedOffersSection() {
  const [offers, setOffers] = useState<PersonalizedOfferOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userData: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setOffers(null);
    try {
      const result = await generatePersonalizedOffers(values);
      setOffers(result);
    } catch (e) {
      setError("An error occurred while generating offers. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">
            AI-Driven Personalized Offers
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Describe your financial status and goals, and let our AI find the perfect banking products for you.
          </p>
        </div>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Lightbulb className="text-accent" />
              Find Your Perfect Match
            </CardTitle>
            <CardDescription>
              Example: "I am a 30-year-old software engineer earning $120k/year. I have a good credit score, about $50k in savings, and I'm looking to buy my first home in the next two years. I'm interested in mortgage options and long-term investment plans."
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="userData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Your financial details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself..."
                          className="min-h-[120px] resize-none"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Analyzing..." : "Generate Offers"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                   <Skeleton className="h-4 w-1/2 mt-1" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {error && <p className="mt-8 text-center text-destructive">{error}</p>}

        {offers && offers.offers.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8 font-headline">Your Personalized Results</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.offers.map((offer, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="font-headline">{offer.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <p className="text-foreground/80">{offer.description}</p>
                    <div>
                      <h4 className="font-semibold mb-1">Terms</h4>
                      <p className="text-sm text-foreground/70">{offer.terms}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {offers && offers.offers.length === 0 && !isLoading && (
            <p className="mt-8 text-center text-foreground/80">We couldn't find any specific offers based on your description. Please try again with more details.</p>
        )}
      </div>
    </section>
  );
}
