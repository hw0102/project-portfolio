import { getErrorMessage } from "@/utils/getErrorMessage";
import { useCallback, useEffect, useRef, useState } from "react";

export const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autofetch = true,
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMounted = useRef(false);

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  const fetchData = useCallback(async () => {
    try {
      reset();
      setIsLoading(true);
      const result = await fetchFunction();
      if (isMounted.current) setData(result);
    } catch (error) {
      if (isMounted.current) {
        const unwrappedError = getErrorMessage(error);
        setError(Error(`Error: ${unwrappedError}`));
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    isMounted.current = true;
    if (autofetch) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchData();
    }
    return () => {
      isMounted.current = false;
    };
  }, [autofetch, fetchData]);

  return { data, error, isLoading, refetch: fetchData, reset };
};
