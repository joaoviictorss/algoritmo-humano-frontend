import { useEffect, useState } from "react";

export const useDebouncedFilter = (
  onDebouncedChange: (value: string) => void,
  delay = 500
) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onDebouncedChange(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onDebouncedChange, delay]);

  return {
    inputValue,
    setInputValue,
  };
};
