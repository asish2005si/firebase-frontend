
"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Chatbot } from "./chatbot";

export function ChatbotWidget() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button 
                    className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
                    style={{ backgroundColor: "#0072CE" }}
                >
                    <MessageCircle className="h-8 w-8 text-white" />
                </Button>
            </SheetTrigger>
            <SheetContent 
                side="right" 
                className="w-[400px] sm:w-[540px] p-0 flex flex-col"
            >
                <SheetHeader 
                    className="p-4 border-b text-left"
                    style={{ backgroundColor: '#003366', color: 'white' }}
                >
                    <SheetTitle style={{ color: 'white' }}>Nexus Assist</SheetTitle>
                </SheetHeader>
                <div className="flex-1">
                     <Chatbot />
                </div>
            </SheetContent>
        </Sheet>
    );
}
