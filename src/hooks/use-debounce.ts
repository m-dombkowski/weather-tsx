import { useState, useEffect, Dispatch, SetStateAction } from "react";

function useDebounce(
  value: string,
  delay: number,
  setIsLoading: Dispatch<SetStateAction<boolean>>
): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value) {
      setIsLoading(true);
    }
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
