
"use client";

import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

// The ChatMessage type can be defined here or in the component that uses it.
// To keep components focused, it's often better in the parent component (chatbot.tsx).
// For now, let's create a local type for props.
export interface ChatMessageProps {
  message: {
    role: 'user' | 'model';
    content: string;
  };
  isPending?: boolean;
}

export function ChatMessageBubble({ message, isPending }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "max-w-sm rounded-lg px-4 py-2",
          isUser
            ? "bg-sky-500 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-foreground"
        )}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:-0.3s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:-0.15s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary/50" />
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
       {isUser && (
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
