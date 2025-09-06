
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, SendHorizonal, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat-flow";
import { Button } from "@/components/ui/button";

const chatInputSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});

type ChatInput = z.infer<typeof chatInputSchema>;

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({text: z.string()})),
});

type ChatMessage = z.infer<typeof ChatMessageSchema>;

const suggestedQueries = [
    "Open Account",
    "Loan Information",
    "Cards & Services",
    "Expense Tracker",
    "KYC / Document Help"
]

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const form = useForm<ChatInput>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: { message: "" },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestedQuery = (query: string) => {
    form.setValue("message", query);
    form.handleSubmit(onSubmit)();
  }

  async function onSubmit(data: ChatInput) {
    const userMessage: ChatMessage = {
      role: "user",
      content: [{ text: data.message }],
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    form.reset();
    setIsPending(true);

    try {
      const botResponse = await chat(newMessages);
      const botMessage: ChatMessage = {
        role: "model",
        content: [{ text: botResponse }],
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: ChatMessage = {
        role: "model",
        content: [{ text: "I'm sorry, I'm having trouble connecting to my services right now. Please try again later." }],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute bottom-20 right-0 w-80 h-[32rem] bg-card border border-border rounded-lg shadow-xl flex flex-col"
    >
      <header className="text-primary-foreground p-3 rounded-t-lg flex items-center gap-2" style={{backgroundColor: '#004aad'}}>
        <Bot className="h-6 w-6" />
        <h3 className="font-semibold text-lg">NexusBot</h3>
      </header>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {messages.length === 0 && (
                <div className="flex flex-col items-center text-center gap-2 p-4">
                    <Bot className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Welcome to Nexus Bank! How can I help you today?</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {suggestedQueries.map(query => (
                            <Button 
                                key={query} 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleSuggestedQuery(query)}
                                className="text-xs"
                            >
                                {query}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex items-end gap-2.5",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                 {msg.role === 'model' && <Bot className="h-6 w-6 text-muted-foreground self-start flex-shrink-0" />}
                <div
                  className={cn(
                    "p-3 rounded-lg max-w-[85%]",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content[0].text}</p>
                   <p className="text-xs text-right mt-1 opacity-70">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </motion.div>
            ))}
             {isPending && (
                <motion.div
                    key="thinking"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2.5 justify-start"
                >
                     <Bot className="h-6 w-6 text-muted-foreground" />
                    <div className="p-3 rounded-lg bg-muted text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin"/>
                    </div>
                </motion.div>
             )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-3 border-t">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
          <input
            {...form.register("message")}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
            disabled={isPending}
          />
          <Button type="submit" size="icon" variant="ghost" disabled={isPending}>
            <SendHorizonal className="h-5 w-5 text-primary" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
