"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Bot, Send, X, Loader2, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { chat } from "@/ai/flows/chat-flow";
import { ChatMessage } from "./chat-message";
import { Badge } from "../ui/badge";
import { z } from "zod";

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessageType = z.infer<typeof ChatMessageSchema>;


const quickActions = [
    "Open Account",
    "Loan Information",
    "Cards & Services",
    "Expense Tips",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      setHasUnread(false);
    } else {
        if(messages.length > 0) {
            setHasUnread(true);
        }
    }
  }, [messages, isOpen]);
  
  useEffect(() => {
    if(messages.length === 0) {
        setMessages([
            { role: 'model', content: "Hello! I'm NexusBot 🤖. How can I help you today?" }
        ]);
    }
  }, [])

  const handleQuickAction = (text: string) => {
    sendMessage(text);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
  };
  
  const sendMessage = async (messageContent: string) => {
    const newUserMessage: ChatMessageType = { role: "user", content: messageContent };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const response = await chat(newMessages);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "model", content: response },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] max-w-sm h-[70vh] max-h-[500px] z-50 flex flex-col"
          >
            <div className="bg-card rounded-xl shadow-2xl flex flex-col h-full border">
               <header className="bg-primary text-primary-foreground p-4 rounded-t-xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Bot className="w-6 h-6"/>
                        <h3 className="font-bold text-lg">NexusBot</h3>
                    </div>
                    <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground h-8 w-8" onClick={() => setIsOpen(false)}>
                        <ChevronDown className="w-5 h-5"/>
                    </Button>
                </header>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <ChatMessage key={i} message={msg} />
                ))}
                {isLoading && (
                   <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                            <Bot className="w-8 h-8 text-primary"/>
                        </div>
                        <div className="bg-muted p-3 rounded-lg flex items-center">
                            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground"/>
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
              </div>
              <div className="p-4 border-t">
                  {messages.length <= 2 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {quickActions.map(action => (
                            <Button key={action} variant="outline" size="sm" onClick={() => handleQuickAction(action)} disabled={isLoading}>
                                {action}
                            </Button>
                        ))}
                    </div>
                  )}
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:right-8 rounded-full w-16 h-16 shadow-2xl z-50 bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        {hasUnread && !isOpen && <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center">1</Badge>}
      </Button>
    </>
  );
}
