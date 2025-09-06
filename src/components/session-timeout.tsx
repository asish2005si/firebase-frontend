
"use client";

import { useState, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useIdleTimer } from "use-idle-timer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

// For demo purposes, we use short durations.
// In a real application, these would be much longer.
const SESSION_IDLE_MINUTES = 10;
const PROMPT_BEFORE_IDLE_MINUTES = 1;

const SESSION_IDLE_TIMEOUT = 1000 * 60 * SESSION_IDLE_MINUTES;
const PROMPT_TIMEOUT = 1000 * 60 * (SESSION_IDLE_MINUTES - PROMPT_BEFORE_IDLE_MINUTES);


export function SessionTimeoutProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  
  const onIdle = () => {
    setIsPromptOpen(false);
    toast({
      variant: "destructive",
      title: "Session Expired",
      description: "You have been logged out due to inactivity.",
    });
    router.push("/login");
  };

  const onPrompt = () => {
    setIsPromptOpen(true);
  };
  
  const onActive = () => {
    // We can add logic here if needed when the user is active.
    // For now, we just let the idle timer reset automatically.
  };

  const idleTimer = useIdleTimer({
    onIdle,
    onPrompt,
    onActive,
    timeout: SESSION_IDLE_TIMEOUT,
    promptBeforeIdle: PROMPT_TIMEOUT,
    throttle: 500,
  });
  
  const handleStayLoggedIn = () => {
    idleTimer.reset();
    setIsPromptOpen(false);
  };

  const handleLogout = () => {
    setIsPromptOpen(false);
    router.push("/login");
  };

  return (
    <>
      {children}
      <AlertDialog open={isPromptOpen} onOpenChange={setIsPromptOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you still there?</AlertDialogTitle>
            <AlertDialogDescription>
              For your security, your session will expire in {PROMPT_BEFORE_IDLE_MINUTES} minute.
              Choose to stay logged in or log out now.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={handleLogout}>Logout Now</Button>
            <Button onClick={handleStayLoggedIn}>Stay Logged In</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
