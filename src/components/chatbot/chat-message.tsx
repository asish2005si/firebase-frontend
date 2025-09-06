"use client";

import { Bot, User } from "lucide-react";
import { z } from "zod";

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessageType = z.infer<typeof ChatMessageSchema>;

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  // Simple markdown to HTML for bold and links
  const formatContent = (content: string) => {
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline">$1</a>');
    return { __html: content };
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <div className="flex-shrink-0 self-start">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        }`}
      >
        <p dangerouslySetInnerHTML={formatContent(message.content)}></p>
        <div className="text-xs text-right mt-1 opacity-60">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {isUser && (
         <div className="flex-shrink-0 self-start">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-secondary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}
