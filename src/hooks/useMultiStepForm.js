import { useState } from "react";

const useMultiStepForm = (components) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = components.length - 1;

  const next = () => {
    setCurrentIndex((i) => {
      if (i >= components.length - 1) return i;
      return i + 1;
    });
  };

  const prev = () => {
    setCurrentIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  return {
    current: components[currentIndex],
    currentIndex,
    lastIndex,
    next,
    prev,
  };
};

export default useMultiStepForm;
