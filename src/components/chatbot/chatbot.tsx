
"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, Send, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import type { ChatMessage } from "@/ai/flows/chat-flow";
import { chat } from "@/ai/flows/chat-flow";
import { ScrollArea } from "../ui/scroll-area";

const initialQuickOptions = [
  "Open New Account",
  "Loan Information",
  "Card Services",
  "Goal-Based Savings",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      chat([])
        .then((initialResponse) => {
          setMessages([
            { role: "model", content: initialResponse },
          ]);
        })
        .catch((error) => {
          console.error("Chatbot initial message error:", error);
          setMessages([
            {
              role: "model",
              content:
                "I'm having trouble connecting right now. Please try again later.",
            },
          ]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        setTimeout(() => {
             scrollAreaRef.current?.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: "smooth",
            });
        }, 100)
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: messageContent };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await chat(newMessages);
      const botMessage: ChatMessage = { role: "model", content: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: ChatMessage = {
        role: "model",
        content: "I'm having trouble connecting right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const QuickOptionButton = ({ text }: { text: string }) => (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full bg-background hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => handleSendMessage(text)}
    >
      {text}
    </Button>
  );

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-80 sm:w-96"
            >
              <Card className="h-[32rem] flex flex-col shadow-2xl rounded-2xl border-none">
                <CardHeader className="flex flex-row items-center justify-between p-4 bg-[#003366] text-white rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 flex items-center justify-center rounded-full">
                       <Bot className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg font-headline">Nexus Assist</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0 flex-1 flex flex-col bg-white dark:bg-gray-800">
                  <ScrollArea className="flex-1" ref={scrollAreaRef}>
                     <div className="p-4 space-y-4">
                        {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex items-end gap-2 text-sm ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2 whitespace-pre-wrap ${
                              message.role === "user"
                                ? "bg-[#0072CE] text-white rounded-br-none"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                            }`}
                          >
                            {message.content}
                            {message.role === "model" && messages.length === 1 && (
                               <div className="flex flex-wrap gap-2 mt-3">
                                   {initialQuickOptions.map(opt => <QuickOptionButton key={opt} text={opt} />)}
                               </div>
                           )}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                           <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-bl-none px-4 py-2 text-sm flex items-center gap-2">
                             <Loader2 className="h-4 w-4 animate-spin"/>
                             <span className="text-gray-900 dark:text-gray-100">Thinking...</span>
                           </div>
                        </div>
                      )}
                     </div>
                  </ScrollArea>
                  <div className="p-4 border-t bg-white dark:bg-gray-800 rounded-b-2xl">
                    <div className="flex items-center gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage(input)}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="rounded-full"
                      />
                      <Button onClick={() => handleSendMessage(input)} disabled={isLoading} size="icon" className="rounded-full bg-[#0072CE] hover:bg-[#005a9e]">
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Button onClick={() => setIsOpen(true)} className="rounded-full shadow-lg h-16 w-16 bg-[#0072CE] hover:bg-[#005a9e]">
                <Bot className="h-8 w-8 text-white" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
