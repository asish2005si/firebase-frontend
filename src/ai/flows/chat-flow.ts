'use server';
/**
 * @fileOverview A chatbot flow for Nexus Bank.
 * 
 * - chat - A function that handles the chatbot conversation.
 * - ChatMessage - The type for a single chat message.
 */

import {ai} from '@/ai/genkit';
import type { ChatMessage } from '@/ai/schemas/chat-schema';

export async function chat(history: ChatMessage[]): Promise<string> {
    const systemInstruction = `You are NexusBot, a friendly and helpful AI banking assistant for Nexus Bank.
Your goal is to assist users with their banking needs, answer their questions, and guide them through the bank's services.
Be concise and clear in your responses.
Available services:
- Opening an account (Savings, Current, Salary, Student)
- Applying for loans (Home, Personal, Car, Education)
- Applying for cards (Debit, Credit, Virtual)
When a user expresses intent to use a service, guide them to the relevant page. For example, if they want to open an account, suggest they visit the 'Open Account' page.`;

    const response = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        system: systemInstruction,
        history: history.map(msg => ({
            role: msg.role,
            content: [{text: msg.content}],
        })),
    });

    return response.text ?? 'Sorry, I am having trouble connecting. Please try again later.';
}
