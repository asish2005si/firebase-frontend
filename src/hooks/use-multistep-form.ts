
import { ReactElement, useState, Children, useEffect, useCallback } from "react";

export function useMultistepForm(initialSteps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState(initialSteps);

  const next = useCallback(() => {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }, [steps.length]);

  const back = useCallback(() => {
    setCurrentStepIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  }, []);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  }, [steps.length]);

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    setSteps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
