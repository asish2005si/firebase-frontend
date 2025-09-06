
"use client";

import { useState, useRef, useEffect } from 'react';
import { Bot, Loader2, SendHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { chat, type ChatMessage } from '@/ai/flows/chat-flow';
import { useToast } from '@/hooks/use-toast';

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (input.trim() === '' || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat(updatedMessages);
            if (response?.content) {
                setMessages(prev => [...prev, { role: 'model', content: response.content as string }]);
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'AI Error',
                    description: 'The AI did not return a valid response. Please try again.',
                });
            }
        } catch (error) {
             toast({
                variant: 'destructive',
                title: 'Chat Error',
                description: 'Failed to get a response. Please check the console for details.',
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const quickReplies = [
        "Tell me about Savings Accounts",
        "What are the loan options?",
        "Explain credit card benefits",
    ];

    return (
        <>
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-24 right-4 z-50"
                    >
                        <Card className="w-[350px] h-[500px] shadow-2xl flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                                <div className="flex items-center gap-2">
                                    <Bot className="h-6 w-6 text-primary" />
                                    <CardTitle className="text-lg font-headline">Nexus Assist</CardTitle>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                    <X className="h-5 w-5"/>
                                </Button>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.length === 0 ? (
                                     <div className="text-center text-sm text-muted-foreground space-y-4">
                                        <p>Hello! 👋 Welcome to Nexus Bank. How can I assist you today?</p>
                                        <div className="flex flex-col gap-2">
                                            {quickReplies.map(reply => (
                                                <Button key={reply} variant="outline" size="sm" onClick={() => {
                                                    setInput(reply);
                                                    setTimeout(handleSendMessage, 0);
                                                }}>
                                                    {reply}
                                                </Button>
                                            ))}
                                        </div>
                                     </div>
                                ) : (
                                     messages.map((msg, index) => (
                                        <div key={index} className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {msg.role === 'model' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                                            <div className={`rounded-lg px-3 py-2 max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {isLoading && (
                                     <div className="flex items-center gap-2">
                                        <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div className="rounded-lg px-3 py-2 bg-muted">
                                            <Loader2 className="h-5 w-5 animate-spin"/>
                                        </div>
                                     </div>
                                )}
                                <div ref={messagesEndRef} />
                            </CardContent>
                            <div className="p-4 border-t">
                                <div className="flex items-center gap-2">
                                    <Input 
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Ask a question..."
                                        disabled={isLoading}
                                    />
                                    <Button onClick={handleSendMessage} disabled={isLoading || input.trim() === ''}>
                                        <SendHorizontal />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="fixed bottom-4 right-4 z-50"
                    >
                        <Button
                            size="lg"
                            className="rounded-full w-16 h-16 shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90"
                            onClick={() => setIsOpen(true)}
                        >
                            <Bot className="h-8 w-8 text-primary-foreground" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
