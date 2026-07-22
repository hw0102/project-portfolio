import { useEffect, useState } from "react";

interface props {
  /** search to debounce */
  value: string;
  /** milliseconds */
  delay: number;
}

// delay is in milliseconds
const useDebounced = ({ value, delay }: props) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounced;
};

export { useDebounced };
