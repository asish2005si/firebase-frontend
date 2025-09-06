
"use client";

import { useState, useRef, useEffect } from 'react';
import { Bot, Loader2, SendHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import type { ChatMessage } from '@/ai/flows/chat-flow';
import { chat } from '@/ai/flows/chat-flow';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

const welcomeMessage: ChatMessage = {
    role: 'model',
    content: [{text: "Hello! 👋 Welcome to Nexus Bank. I’m your virtual assistant. I can help you learn about our bank, account types, loans, and card services. How can I assist you today?"}]
};

const quickButtons = [
    "About Nexus Bank",
    "Account Types",
    "Loans We Offer",
    "Card Services",
    "Contact & Support"
];

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const handleSendMessage = (messageContent: string) => {
        if (!messageContent.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: [{ text: messageContent }] };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        chat(updatedMessages)
            .then(response => {
                setMessages(prevMessages => [...prevMessages, response]);
            })
            .catch(error => {
                console.error("Chatbot error:", error);
                const errorMessage: ChatMessage = {
                    role: 'model',
                    content: [{ text: "I'm having trouble connecting right now. Please try again later." }]
                };
                setMessages(prevMessages => [...prevMessages, errorMessage]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
            >
                <Button
                    size="icon"
                    className="rounded-full w-16 h-16 bg-[#0072CE] hover:bg-[#005a9e] shadow-lg"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
                </Button>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm"
                    >
                        <Card className="flex flex-col h-[60vh] shadow-2xl">
                            <CardHeader className="bg-[#003366] text-white rounded-t-lg">
                                <CardTitle className="text-lg">Nexus InfoBot 🤖</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col p-0">
                                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                                    <div className="space-y-4">
                                    {messages.map((message, index) => (
                                        <div key={index} className={cn("flex items-end gap-2", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                            {message.role === 'model' && <Bot className="h-6 w-6 self-start text-primary" />}
                                            <div className={cn("max-w-[80%] rounded-xl p-3 text-sm", message.role === 'user' ? 'bg-[#0072CE] text-white' : 'bg-gray-100 dark:bg-gray-800')}>
                                                {typeof message.content[0].text === 'string' && message.content[0].text.split('\n').map((line, i) => (
                                                    <p key={i}>{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex items-center justify-start gap-2">
                                            <Bot className="h-6 w-6 text-primary" />
                                            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                </ScrollArea>
                                {messages.length <= 1 && (
                                    <div className="p-2 border-t">
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {quickButtons.map((text) => (
                                                <Badge key={text} variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => handleSendMessage(text)}>
                                                    {text}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="p-4 border-t bg-background">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSendMessage(input);
                                        }}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1 p-2 border rounded-full text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                            disabled={isLoading}
                                        />
                                        <Button type="submit" size="icon" className="rounded-full bg-[#0072CE] hover:bg-[#005a9e]" disabled={isLoading || !input.trim()}>
                                            <SendHorizontal className="h-5 w-5" />
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
