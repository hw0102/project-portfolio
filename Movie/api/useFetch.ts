import { getErrorMessage } from "@/utils/getErrorMessage";
import { useDebounced } from "@/utils/useDebounced";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAllMovies, fetchMoviesById } from "./api";

export const useFetch = (searchTerm: string = "", autofetch = true) => {
  const debouncedSearchTerm = useDebounced({ value: searchTerm, delay: 500 });
  const [data, setData] = useState<null>(null);
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMounted = useRef(false);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      reset();
      setIsLoading(true);
      // fetch all if there's no searchTerm
      if (debouncedSearchTerm.trim()) {
        const result = await fetchMoviesById({ query: debouncedSearchTerm });
        if (isMounted.current) setData(result);
      } else {
        const result = await fetchAllMovies();
        if (isMounted.current) setData(result);
      }
    } catch (error) {
      if (isMounted.current) {
        const unwrappedError = getErrorMessage(error);
        setError(Error(`Error: ${unwrappedError}`));
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  }, [debouncedSearchTerm]);

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

  return {
    data,
    error,
    isLoading,
    refetch: fetchData,
    reset,
    debouncedSearchTerm,
  };
};
