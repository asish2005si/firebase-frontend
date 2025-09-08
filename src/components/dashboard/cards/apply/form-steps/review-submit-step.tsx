
"use client";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { creditCardTypes, debitCardTypes } from "@/lib/card-data";

const DetailItem = ({ label, value }: { label: string; value?: string | number }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium capitalize">{value || "-"}</p>
    </div>
);


export function ReviewAndSubmitStep() {
  const { control, getValues } = useFormContext();
  const values = getValues();
  
  const getCardTitle = () => {
    if (values.cardCategory === 'virtual') return "Virtual Card";

    const allCards = [...debitCardTypes, ...creditCardTypes];
    return allCards.find(card => card.value === values.cardType)?.title || values.cardType;
  }

  return (
    <div>
      <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold font-headline text-primary">Review and Submit</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Please confirm your details before submitting the application.</p>
      </div>
      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Application Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <DetailItem label="Card Category" value={values.cardCategory} />
                <DetailItem label="Card Type" value={getCardTitle()} />
                <DetailItem label="Name on Card" value={values.fullName} />
            </CardContent>
        </Card>

        <FormField
          control={control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                    I agree to the terms and conditions and authorize Nexus Bank to process my application.
                </FormLabel>
                <FormDescription>
                  By checking this box, you confirm that you have read and agree to our {" "}
                  <Link href="#" className="text-primary hover:underline">Cardholder Agreement</Link> and {" "}
                  <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                </FormDescription>
                 <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
