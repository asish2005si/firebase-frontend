
import { ReactElement, useState, Children, useEffect } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Filter out null/undefined steps that may result from conditional rendering
  const validSteps = Children.toArray(steps).filter(Boolean) as ReactElement[];

  useEffect(() => {
    // If the number of steps changes (e.g., due to accountType change),
    // ensure the currentStepIndex is not out of bounds.
    if (currentStepIndex >= validSteps.length) {
      setCurrentStepIndex(validSteps.length - 1);
    }
  }, [validSteps.length, currentStepIndex]);


  function next() {
    setCurrentStepIndex(i => {
      if (i >= validSteps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    if (index >= 0 && index < validSteps.length) {
      setCurrentStepIndex(index);
    }
  }

  return {
    currentStepIndex,
    step: validSteps[currentStepIndex],
    steps: validSteps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === validSteps.length - 1,
    goTo,
    next,
    back,
  };
}
