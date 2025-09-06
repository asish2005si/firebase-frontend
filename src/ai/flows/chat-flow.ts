'use server';

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({text: z.string()})),
});

type ChatMessage = z.infer<typeof ChatMessageSchema>;

export async function chat(history: ChatMessage[]) {
  const systemInstruction = `You are NexusBot, a friendly and helpful AI assistant for Nexus Bank.
Your purpose is to assist new and existing customers with the bank's services, products, and website navigation.
Your tone should be professional, but approachable. Use emojis where appropriate to maintain a friendly tone.
Services include:
- Opening an account (Savings, Current, Salary, Student)
- Loan information (Home, Personal, Car, Education)
- Cards (Debit, Credit, Virtual)
- KYC/Documentation help

- Keep your answers concise and to the point.
- When a user expresses intent to use a service, guide them to the relevant page. For example, if they want to open an account, suggest they visit the 'Open Account' page.`;

  const response = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    system: systemInstruction,
    history: history,
    prompt: history[history.length - 1].content,
  });

  return response.text;
}
