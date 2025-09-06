
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { Chatbot } from "./chatbot";
import { AnimatePresence, motion } from "framer-motion";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
       <AnimatePresence>
        {isOpen && <Chatbot />}
      </AnimatePresence>
      <motion.div layout>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg"
          aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
        </Button>
      </motion.div>
    </div>
  );
}
