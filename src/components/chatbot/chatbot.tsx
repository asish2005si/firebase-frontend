
"use client";

import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { Bot } from "lucide-react";
import { chat } from "@/ai/flows/chat-flow";

export const ChatMessageSchema = z.object({
  role: z.enum(["user", "model"]),
  text: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const quickActions = [
    "Open an Account",
    "Loan Information",
    "Cards & Services",
    "Expense Tracking Tips",
];

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
        const history: ChatMessage[] = [...messages, userMessage];
        const botResponse = await chat(history);
        
        const botMessage: ChatMessage = { role: "model", text: botResponse };
        setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: ChatMessage = {
        role: "model",
        text: "I'm sorry, I'm having trouble connecting to my services right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-24 right-4 w-[90vw] max-w-sm h-[70vh] max-h-[600px] flex flex-col bg-card border shadow-xl rounded-lg"
    >
      <header className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center gap-3">
        <Bot className="h-7 w-7" />
        <h3 className="text-xl font-bold font-headline">NexusBot</h3>
      </header>
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
             <ChatMessage message={{role: 'model', text: 'Hello! I am NexusBot. How can I help you today?'}} />
             {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
             ))}
             {isLoading && <ChatMessage message={{ role: "model", text: "" }} isLoading />}
        </div>
      </div>
       <div className="p-2 border-t">
        <div className="flex flex-wrap gap-2 mb-2">
            {quickActions.map(action => (
                <button
                    key={action}
                    onClick={() => sendMessage(action)}
                    className="px-3 py-1 text-sm bg-secondary/20 hover:bg-secondary/40 rounded-full"
                >
                    {action}
                </button>
            ))}
        </div>
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </motion.div>
  );
}
