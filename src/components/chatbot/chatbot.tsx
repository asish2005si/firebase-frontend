
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { SendHorizonal, Bot, User, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chat } from "@/ai/flows/chat-flow";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});
type FormSchema = z.infer<typeof formSchema>;

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const QuickActionButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => (
  <Button
    variant="outline"
    size="sm"
    className="rounded-full"
    onClick={onClick}
  >
    {text}
  </Button>
);

export function Chatbot() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content: "Hello! 👋 I’m Nexus Assist, your virtual banking guide. How can I help you today?",
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  
  const quickActions = [
    "Open New Account",
    "Check Account Details",
    "Loan Information",
    "Card Services",
    "Goal-Based Savings",
    "Other Queries"
  ];
  
  const handleQuickAction = (text: string) => {
     const userMessage: ChatMessage = { role: "user", content: text };
     getBotResponse([...messages, userMessage]);
  };
  
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const getBotResponse = async (currentMessages: ChatMessage[]) => {
    setMessages(currentMessages);
    setIsPending(true);
    try {
      const botResponse = await chat(currentMessages);
      setMessages((prev) => [...prev, { role: "model", content: botResponse }]);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const userMessage: ChatMessage = { role: "user", content: data.message };
    reset();
    await getBotResponse([...messages, userMessage]);
  };
  
  const showQuickActions = messages.length <= 2;

  return (
    <div className="w-80 h-[28rem] flex flex-col rounded-lg border bg-card text-card-foreground shadow-lg">
      <header className="flex items-center justify-between px-4 py-3 text-white rounded-t-lg" style={{ backgroundColor: '#003366' }}>
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <h3 className="font-semibold text-lg">Nexus Assist</h3>
        </div>
      </header>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  "flex items-end gap-2",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "model" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl px-4 py-2 text-sm whitespace-pre-wrap",
                     message.role === 'user' ? 'bg-[#0072CE] text-white rounded-br-none' : 'bg-muted rounded-bl-none'
                  )}
                >
                  {message.content}
                </div>
                 {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </motion.div>
            ))}
            {isPending && (
              <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.3 }}
                 className="flex items-end gap-2 justify-start"
              >
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-5 w-5 text-muted-foreground" />
                  </div>
                 <div className="max-w-[80%] rounded-xl px-4 py-2 text-sm bg-muted rounded-bl-none flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
       {showQuickActions && (
          <div className="p-2 border-t flex flex-wrap gap-2 justify-center">
            {quickActions.map(action => (
              <QuickActionButton key={action} text={action} onClick={() => handleQuickAction(action)} />
            ))}
          </div>
        )}
      <div className="border-t p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
          <Input
            {...register("message")}
            placeholder="Type your message..."
            autoComplete="off"
            className="flex-1"
            disabled={isPending}
          />
          <Button type="submit" size="icon" variant="ghost" disabled={isPending}>
            <SendHorizonal className="h-5 w-5 text-primary" />
          </Button>
        </form>
      </div>
    </div>
  );
}
