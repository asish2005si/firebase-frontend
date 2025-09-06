'use server';
/**
 * @fileOverview A chatbot AI flow for Nexus Bank.
 *
 * - chat - A function that handles the chat interaction.
 * - ChatMessage - The type for a single chat message.
 */
import {ai} from '@/ai/genkit';
import {generate} from 'genkit/ai';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// System instruction for the Nexus Bank chatbot
const systemInstruction = `You are a friendly and helpful virtual assistant for Nexus Bank.
Your goal is to answer user questions about the bank's services based on the information available on the website.
Keep your answers concise and informative.

You can provide information on:
- Account Types: Savings, Current, Salary, and Student accounts.
- Loan Types: Home, Personal, Car, and Education loans.
- Card Services: Debit, Credit, and Virtual cards.
- How to contact the bank.

If a user asks about something outside of these topics, politely state that you can only provide information about Nexus Bank's products and services.
Do not make up information that is not available on the website.
Start the first conversation with a welcoming message.`;

export async function chat(history: ChatMessage[]) {
  const response = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    system: systemInstruction,
    history: history.map(msg => ({
      role: msg.role,
      content: msg.content || '',
    })),
  });

  return response.text();
}
