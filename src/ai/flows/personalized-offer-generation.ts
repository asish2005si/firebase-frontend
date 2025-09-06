'use server';

/**
 * @fileOverview An AI agent that analyzes user data to generate personalized banking offers.
 *
 * - generatePersonalizedOffers - A function that generates personalized banking offers.
 * - PersonalizedOfferInput - The input type for the generatePersonalizedOffers function.
 * - PersonalizedOfferOutput - The return type for the generatePersonalizedOffers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedOfferInputSchema = z.object({
  userData: z
    .string()
    .describe('A detailed description of the user, including their financial history, banking activity, and preferences.'),
});
export type PersonalizedOfferInput = z.infer<typeof PersonalizedOfferInputSchema>;

const PersonalizedOfferOutputSchema = z.object({
  offers: z
    .array(
      z.object({
        title: z.string().describe('The title of the offer.'),
        description: z.string().describe('A detailed description of the offer.'),
        terms: z.string().describe('The terms and conditions of the offer.'),
      })
    )
    .describe('A list of personalized banking offers for the user.'),
});
export type PersonalizedOfferOutput = z.infer<typeof PersonalizedOfferOutputSchema>;

export async function generatePersonalizedOffers(
  input: PersonalizedOfferInput
): Promise<PersonalizedOfferOutput> {
  return personalizedOfferFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedOfferPrompt',
  input: {schema: PersonalizedOfferInputSchema},
  output: {schema: PersonalizedOfferOutputSchema},
  prompt: `You are an expert financial advisor specializing in personalized banking offers.

You will analyze the user's financial data and generate a list of personalized banking offers, such as loan options or investment opportunities.
Consider the user's financial history, banking activity, and preferences to determine the most relevant and beneficial offers.

User Data: {{{userData}}}

Offers:`,
});

const personalizedOfferFlow = ai.defineFlow(
  {
    name: 'personalizedOfferFlow',
    inputSchema: PersonalizedOfferInputSchema,
    outputSchema: PersonalizedOfferOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
