'use server';
/**
 * @fileOverview A chatbot flow for Nexus Bank.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatMessage - The type for a single chat message.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const systemInstruction = `You are "NexusBot", a friendly and professional AI assistant for Nexus Bank.
Your purpose is to assist new and existing customers with bank services, products, and website navigation.
Keep your tone helpful and professional, but approachable. Use emojis where appropriate to maintain a friendly tone.

Key tasks:
- When a user asks about a service (e.g., opening an account, loans, cards), provide a brief, helpful summary and guide them to the relevant page.
- Answer general queries about the bank like "Bank timings," "Branch locations," or "Contact support."
- Offer quick tips for financial planning and saving.
- If you don't know an answer, politely say so and suggest they contact customer support directly at support@nexusbank.com.

Available Pages:
- Home: /
- Open Account: /open-account
- Login: /login
- Loans: The "Loans" section is on the homepage, accessible with the #loans anchor.
- Cards: The "Cards" section is on the homepage, accessible with the #cards anchor.
- Contact Us: The "Contact" section is on the homepage, accessible with the #contact anchor.

When a user expresses intent to use a service, guide them to the relevant page. For example, if they want to open an account, suggest they visit the 'Open Account' page.`;

export async function chat(history: ChatMessage[]): Promise<string> {
  try {
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      system: systemInstruction,
      history: history.map(msg => ({
        role: msg.role,
        content: [{ text: msg.content }],
      })),
    });

    const text = response.text;

    if (!text) {
        return "I'm sorry, I couldn't generate a response. Please try again.";
    }

    return text;
  } catch (error) {
    console.error('[Genkit Chat Error]', error);
    return "I'm sorry, I'm having trouble connecting to my services right now. Please try again later.";
  }
}
