
"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { chat } from "@/ai/flows/chat-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SendHorizonal, Bot, User } from "lucide-react";
import { ClientOnly } from "@/components/client-only";

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const chatFormSchema = z.object({
  message: z.string().min(1, "Message is required."),
});
type ChatFormSchema = z.infer<typeof chatFormSchema>;

const quickReplies = [
  "Open New Account",
  "Loan Information",
  "Card Services",
  "Goal-Based Savings",
];

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<ChatFormSchema>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: { message: "" },
  });

  // Welcome message
  useEffect(() => {
    startTransition(async () => {
      const response = await chat([]);
      setMessages([{ role: "model", content: response }]);
    });
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleQuickReply = (text: string) => {
    form.setValue("message", text);
    form.handleSubmit(onSubmit)();
  };

  const onSubmit = (data: ChatFormSchema) => {
    const userMessage: ChatMessage = { role: "user", content: data.message };
    setMessages(prev => [...prev, userMessage]);
    form.reset();

    startTransition(async () => {
      const chatHistory = [...messages, userMessage];
      const response = await chat(chatHistory);
      setMessages(prev => [...prev, { role: "model", content: response }]);
    });
  };

  return (
    <ClientOnly>
      <div className="w-full max-w-sm md:max-w-md h-[70vh] flex flex-col bg-card rounded-lg border shadow-xl">
        <header className="bg-[#003366] text-white p-4 rounded-t-lg flex items-center">
          <h2 className="text-lg font-semibold">Nexus Assist</h2>
        </header>
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "model" && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "p-3 rounded-lg max-w-[80%]",
                    msg.role === "user"
                      ? "bg-[#0072CE] text-white"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                 {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isPending && messages[messages.length-1]?.role === "user" && (
                 <div className="flex items-start gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-0"></span>
                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></span>
                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300"></span>
                        </div>
                    </div>
                 </div>
            )}
          </div>
        </ScrollArea>
         {messages[messages.length - 1]?.role === 'model' && (
          <div className="p-2 border-t">
              <div className="flex flex-wrap gap-2 justify-center">
                  {quickReplies.map((text) => (
                      <Button key={text} size="sm" variant="outline" onClick={() => handleQuickReply(text)} disabled={isPending}>
                          {text}
                      </Button>
                  ))}
              </div>
          </div>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 border-t flex items-center gap-2"
        >
          <Input
            {...form.register("message")}
            placeholder="Type your message..."
            autoComplete="off"
            disabled={isPending}
          />
          <Button type="submit" size="icon" variant="ghost" disabled={isPending}>
            <SendHorizonal className="h-5 w-5 text-primary" />
          </Button>
        </form>
      </div>
    </ClientOnly>
  );
}
