
"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Bot, Send, X, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chat } from "@/ai/flows/chat-flow";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MessageData } from 'genkit';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      // Create a temporary history to send to the server for the initial greeting
      const initialHistory: MessageData[] = [{ role: 'user', content: [{ text: 'Hi' }] }];
       chat(initialHistory)
        .then(response => {
          setMessages([
              { role: 'model', content: [{ text: response }]}
          ]);
        })
        .catch(error => {
          console.error("Error fetching initial message:", error);
          setMessages([
              { role: 'model', content: [{ text: "I'm having trouble connecting right now. Please try again later." }]}
          ]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, messages.length]);


  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: MessageData = {
      role: 'user',
      content: [{ text: input }],
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await chat(updatedMessages);
      const botMessage: MessageData = {
        role: 'model',
        content: [{ text: botResponse }],
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: MessageData = {
        role: 'model',
        content: [{ text: "Sorry, I encountered an error. Please try again." }],
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 z-50 w-full max-w-sm"
          >
            <Card className="flex flex-col h-[60vh] shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4 rounded-t-lg">
                <CardTitle className="text-lg font-headline">Nexus Assist</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={cn("flex items-end gap-2", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                     {msg.role === 'model' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                    <div className={cn(
                      "rounded-lg px-4 py-2 max-w-xs whitespace-pre-wrap",
                      msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    )}>
                      {msg.content[0].text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2">
                      <Loader2 className="h-5 w-5 animate-spin"/>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <form onSubmit={sendMessage} className="p-4 border-t">
                <div className="relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    autoComplete="off"
                    disabled={isLoading}
                    className="pr-12"
                  />
                  <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-16 h-16 shadow-lg bg-accent text-accent-foreground hover:bg-accent/90 transform transition-transform duration-300 hover:scale-110"
        aria-label="Toggle Chatbot"
      >
        <AnimatePresence>
        {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        </AnimatePresence>
      </Button>
    </>
  );
}
