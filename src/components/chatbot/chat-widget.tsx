"use client";

import { useState, useRef, useEffect, use } from "react";
import { BotIcon } from "./bot-icon";
import { Button } from "../ui/button";
import { X, Send, Loader2, User } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat-flow";
import type { ChatMessage } from "@/ai/schemas/chat-schema";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const welcomeMessage: ChatMessage = {
    role: "model",
    content: "Hello! Welcome to Nexus Bank. I’m NexusBot, your 24/7 AI Banking Assistant. I can help you explore accounts, loans, cards, and guide you with online banking services."
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: ChatMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
        const botResponse = await chat(newMessages);
        setMessages(prev => [...prev, { role: "model", content: botResponse }]);
    } catch (error) {
        console.error("Chat error:", error);
        setMessages(prev => [...prev, { role: "model", content: "Sorry, something went wrong." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cn("fixed bottom-4 right-4 z-50 transition-transform duration-300 ease-in-out", {
        "translate-y-20 opacity-0": isOpen,
        "translate-y-0 opacity-100": !isOpen
      })}>
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90"
          onClick={() => setIsOpen(true)}
        >
          <BotIcon className="w-8 h-8 text-primary-foreground" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </div>

      <div
        className={cn(
          "fixed bottom-4 right-4 z-50 w-[calc(100vw-32px)] max-w-lg h-[70vh] max-h-[600px] flex flex-col bg-card border shadow-2xl rounded-lg transition-all duration-300 ease-in-out",
          {
            "transform-gpu translate-y-0 opacity-100": isOpen,
            "transform-gpu translate-y-full opacity-0 pointer-events-none": !isOpen,
          }
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <BotIcon className="w-7 h-7 text-primary" />
            <h3 className="text-lg font-bold font-headline">NexusBot</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close Chat</span>
          </Button>
        </header>

        {/* Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-3", { "justify-end": message.role === "user"})}>
                   {message.role === 'model' && (
                        <Avatar className="w-8 h-8 border">
                           <AvatarFallback><BotIcon className="w-5 h-5"/></AvatarFallback>
                        </Avatar>
                   )}
                   <div className={cn("rounded-lg px-3 py-2 max-w-[80%] break-words", {
                       "bg-primary text-primary-foreground": message.role === "user",
                       "bg-muted": message.role === "model",
                   })}>
                        <p className="text-sm">{message.content}</p>
                   </div>
                   {message.role === 'user' && (
                        <Avatar className="w-8 h-8 border">
                           <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
                        </Avatar>
                   )}
                </div>
            ))}
            {isLoading && (
                <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback><BotIcon className="w-5 h-5"/></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    </div>
                </div>
            )}
        </div>

        {/* Input */}
        <footer className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </footer>
      </div>
    </>
  );
}
