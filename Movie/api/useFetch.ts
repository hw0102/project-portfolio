import { getErrorMessage } from "@/utils/getErrorMessage";
import { useCallback, useEffect, useState } from "react";

export const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autofetch = true,
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  const fetchData = useCallback(async () => {
    try {
      reset();
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      const unwrappedError = getErrorMessage(error);
      setError(Error(`Error: ${unwrappedError}`));
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (autofetch) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchData();
    }
  }, [autofetch, fetchData]);

  return { data, error, isLoading, refetch: fetchData, reset };
};
