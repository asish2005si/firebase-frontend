
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, SendHorizonal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { chat } from "@/ai/flows/chat-flow";
import { ChatMessageBubble } from "./chat-message";
import { Button } from "@/components/ui/button";

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const chatFormSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});

type ChatFormValues = z.infer<typeof chatFormSchema>;

const quickReplies = [
  "Open New Account",
  "Loan Information",
  "Card Services",
  "Goal-Based Savings",
];

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPending, setIsPending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: { message: "" },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async ({ message }: ChatFormValues) => {
    form.reset();
    setIsPending(true);

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: message },
    ];
    setMessages(newMessages);

    try {
      const response = await chat(newMessages);
      setMessages([
        ...newMessages,
        { role: "model", content: response },
      ]);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setMessages([
        ...newMessages,
        { role: "model", content: "Sorry, I'm having trouble connecting. Please try again later." },
      ]);
    } finally {
      setIsPending(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSubmit({ message: reply });
  };
  
  useEffect(() => {
    // Start with a greeting from the bot
    setMessages([{
      role: 'model',
      content: 'Hello! 👋 I’m Nexus Assist, your virtual banking guide. How can I help you today?'
    }]);
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ChatMessageBubble message={message} />
            </motion.div>
          ))}
          {isPending && (
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ChatMessageBubble message={{role: 'model', content: ''}} isPending={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
       <div className="p-4 border-t">
         {messages.length <= 2 && !isPending && (
            <div className="flex flex-wrap gap-2 mb-2">
                {quickReplies.map(reply => (
                    <Button key={reply} variant="outline" size="sm" onClick={() => handleQuickReply(reply)}>
                        {reply}
                    </Button>
                ))}
            </div>
         )}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center gap-2">
          <input
            {...form.register("message")}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md"
            disabled={isPending}
          />
          <Button type="submit" size="icon" variant="ghost" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : <SendHorizonal className="h-5 w-5 text-primary" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
