
import { Bot, User } from "lucide-react";
import { type ChatMessage } from "./chatbot";
import { cn } from "@/lib/utils";

const LoadingIndicator = () => (
    <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
    </div>
)

export function ChatMessage({ message, isLoading = false }: { message: ChatMessage, isLoading?: boolean }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex items-start gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Bot className="h-5 w-5" />
        </div>
      )}
      <div
        className={cn(
          "px-4 py-2 rounded-lg max-w-xs break-words",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {isLoading ? <LoadingIndicator /> : message.text}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
            <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
