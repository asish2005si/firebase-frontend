
"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chatbot } from "./chatbot";
import { AnimatePresence, motion } from "framer-motion";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
       <AnimatePresence>
        {isOpen && <Chatbot />}
      </AnimatePresence>
      <motion.div
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          className="rounded-full w-14 h-14 bg-primary text-primary-foreground shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>
    </div>
  );
}
