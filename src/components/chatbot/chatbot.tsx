
"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Bot, Loader2, Send, X, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { chat } from "@/ai/flows/chat-flow";
import { Badge } from "../ui/badge";

const ChatMessageSchema = z.object({
  role: z.enum(["user", "model"]),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleApiKeySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      setIsApiKeySet(true);
      setMessages([
        { role: "model", content: "Thanks! I'm ready to chat. How can I help you today?" }
      ]);
    }
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const botResponse = await chat(apiKey, updatedMessages);
      setMessages(prevMessages => [...prevMessages, { role: 'model', content: botResponse }]);
    } catch (err) {
      console.error(err);
      setError("Sorry, I'm having trouble connecting. Please check your API key and try again.");
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
            className="fixed bottom-24 right-4 w-full max-w-sm z-50"
          >
            <Card className="flex flex-col h-[60vh] shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bot /> Nexus Assist
                  </CardTitle>
                  <CardDescription>Your friendly AI banking guide</CardDescription>
                </div>
                 <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
              </CardHeader>

              <CardContent ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                 {!isApiKeySet ? (
                   <div className="flex flex-col items-center justify-center h-full text-center">
                    <KeyRound className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold">Enter Your Gemini API Key</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      To start chatting, please enter your Google AI Studio API key.
                    </p>
                    <form onSubmit={handleApiKeySubmit} className="w-full space-y-2">
                      <Input 
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API key"
                      />
                      <Button type="submit" className="w-full">Set API Key</Button>
                    </form>
                   </div>
                 ) : (
                    messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                      {msg.role === 'model' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                      <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))
                 )}
                 {isLoading && (
                   <div className="flex items-start gap-3">
                     <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                     <div className="p-3 rounded-lg bg-muted">
                       <Loader2 className="h-5 w-5 animate-spin" />
                     </div>
                   </div>
                 )}
                 {error && <Badge variant="destructive">{error}</Badge>}
              </CardContent>
              
              {isApiKeySet && (
                <div className="p-4 border-t">
                  <form onSubmit={sendMessage} className="flex items-center gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about your finances..."
                      disabled={isLoading}
                      autoComplete="off"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="fixed bottom-4 right-4 rounded-full h-16 w-16 shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
      </Button>
    </>
  );
}
