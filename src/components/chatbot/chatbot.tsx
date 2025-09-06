"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Bot, Send, X, User, Loader2 } from "lucide-react";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat-flow";
import { useRouter } from "next/navigation";

const ChatMessageSchema = z.object({
  role: z.enum(["user", "model"]),
  content: z.string(),
});
type ChatMessage = z.infer<typeof ChatMessageSchema>;

const quickReplies = [
  "Open a New Account",
  "Check Loan Options",
  "Card Services",
  "General FAQs",
];

export function Chatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setMessages([
          {
            role: "model",
            content:
              "Hello! 👋 Welcome to Nexus Bank. I’m your virtual assistant. I can help you with accounts, loans, cards, and general banking information. How can I assist you today?",
          },
        ]);
        setIsLoading(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages]);

  const handleQuickReply = (text: string) => {
    setInput(text);
    const fakeEvent = { preventDefault: () => {} } as FormEvent<HTMLFormElement>;
    handleSendMessage(fakeEvent, text);
  };
  
  const handleAction = (messageContent: string) => {
      if (messageContent.toLowerCase().includes("open an account")) {
          router.push('/open-account');
          setIsOpen(false);
      }
  }

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>, quickReplyText?: string) => {
    e.preventDefault();
    const userMessageContent = quickReplyText || input;
    if (!userMessageContent.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: "user", content: userMessageContent };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const modelResponse = await chat(updatedMessages);
      
      const newModelMessage: ChatMessage = { role: "model", content: modelResponse };
      setMessages((prev) => [...prev, newModelMessage]);

    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: ChatMessage = {
        role: "model",
        content: "I'm sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
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
            className="fixed bottom-24 right-4 w-full max-w-sm h-[60vh] bg-card border shadow-xl rounded-lg flex flex-col z-50"
          >
            <header className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Nexus Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-primary/80">
                <X className="h-5 w-5" />
              </Button>
            </header>

            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "model" && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                  <div
                    className={cn(
                      "p-3 rounded-lg max-w-[80%]",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    {msg.content.toLowerCase().includes("open an account now") && (
                         <Button size="sm" className="mt-2" onClick={() => handleAction("open an account")}>Start Account Opening</Button>
                    )}
                  </div>
                  {msg.role === "user" && <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3 justify-start">
                    <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="p-3 rounded-lg bg-muted">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                </div>
              )}
            </div>
            
            {messages.length <= 1 && !isLoading && (
                 <div className="p-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Suggested Replies:</p>
                    <div className="flex flex-wrap gap-2">
                        {quickReplies.map(reply => (
                            <Badge key={reply} variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => handleQuickReply(reply)}>
                                {reply}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="p-4 border-t bg-background rounded-b-lg">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="pr-12"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full h-16 w-16 shadow-lg z-50 bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        <span className="sr-only">Toggle Chatbot</span>
      </Button>
    </>
  );
}
