import { useState, useEffect, Dispatch, SetStateAction } from "react";

function useDebounce(
  value: string,
  delay: number,
  setIsLoading: Dispatch<SetStateAction<boolean>>
): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value.length > 0) {
      setIsLoading(true);
    }
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setIsLoading]);

  return debouncedValue;
}

export default useDebounce;
