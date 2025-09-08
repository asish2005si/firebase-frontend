
"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle, Loader } from "lucide-react";

type StatusTimelineProps = {
  status: "Approved" | "Pending" | "Rejected";
};

const timelineSteps = [
  { name: "Submitted", icon: CheckCircle },
  { name: "Under Review", icon: Loader },
  { name: "Final Status", icon: Clock },
];

export function StatusTimeline({ status }: StatusTimelineProps) {
  let activeStepIndex = 1; // "Under Review" is active for Pending
  if (status === "Approved") activeStepIndex = 2;
  if (status === "Rejected") activeStepIndex = 2;

  const getStepIcon = (index: number) => {
    if (index < activeStepIndex) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    if (index === activeStepIndex) {
      if (status === 'Pending') return <Loader className="h-5 w-5 text-yellow-500 animate-spin" />;
      if (status === 'Approved') return <CheckCircle className="h-5 w-5 text-green-500" />;
      if (status === 'Rejected') return <XCircle className="h-5 w-5 text-red-500" />;
    }
    return <Clock className="h-5 w-5 text-muted-foreground" />;
  };

  const getStepName = (index: number) => {
    if(index === 2) {
        if(status === 'Approved') return 'Approved';
        if(status === 'Rejected') return 'Rejected';
        return 'Final Status';
    }
    return timelineSteps[index].name;
  }

  return (
    <div className="p-6 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-6 text-center">Application Journey</h3>
      <div className="flex justify-between items-center">
        {timelineSteps.map((step, index) => (
          <div key={step.name} className="flex-1 text-center relative">
            <div className="flex flex-col items-center">
              <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center z-10",
                  index <= activeStepIndex ? "bg-primary/10" : "bg-muted"
              )}>
                {getStepIcon(index)}
              </div>
              <p className={cn(
                  "mt-2 text-sm font-medium",
                  index <= activeStepIndex ? "text-primary" : "text-muted-foreground"
              )}>
                {getStepName(index)}
              </p>
            </div>
            {index < timelineSteps.length - 1 && (
              <div className={cn(
                  "absolute top-5 left-1/2 w-full h-0.5 -translate-x-1/2",
                   index < activeStepIndex ? "bg-primary" : "bg-border"
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
