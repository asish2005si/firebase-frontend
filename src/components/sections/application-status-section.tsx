
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { mockApplicationData, ApplicationData } from "@/lib/mock-application-data";
import { StatusCard } from "../application-status/status-card";
import { StatusDetails } from "../application-status/status-details";
import { StatusTimeline } from "../application-status/status-timeline";

const statusSchema = z.object({
  applicationId: z.string().regex(/^NX-\d{4}-\d{3}$/, "Invalid Application ID. Expected format: NX-YYYY-XXX"),
});

export function ApplicationStatusSection() {
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
    defaultValues: { applicationId: "" },
  });

  const onSubmit = async (values: z.infer<typeof statusSchema>) => {
    setIsLoading(true);
    setError(null);
    setApplicationData(null);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const data = mockApplicationData.find(app => app.applicationId.toLowerCase() === values.applicationId.toLowerCase());

    if (data) {
      setApplicationData(data);
    } else {
      setError("No application found with this ID. Please check and try again.");
    }
    setIsLoading(false);
  };

  return (
    <section id="status" className="py-20 bg-muted/40">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">
            Check Your Application Status
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Enter your application ID to see the current status and details of your request.
          </p>
        </div>
        <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Application Status Checker</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
                    <FormField
                      control={form.control}
                      name="applicationId"
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormLabel className="sr-only">Application ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Application ID (e.g., NX-2025-001)" {...field} disabled={isLoading}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Check Status
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
        </div>
        
        {error && (
            <div className="text-center text-red-600 mt-6 font-medium">
                {error}
            </div>
        )}

        {applicationData && (
            <div className="mt-12 max-w-4xl mx-auto space-y-8">
                <StatusCard status={applicationData.status} reason={applicationData.reason} />
                <StatusTimeline status={applicationData.status} />
                <StatusDetails application={applicationData} />
            </div>
        )}
      </div>
    </section>
  );
}
