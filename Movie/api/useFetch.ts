import { getErrorMessage } from "@/utils/getErrorMessage";
import { useDebounced } from "@/utils/useDebounced";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAllMovies, fetchMoviesById } from "./api";

export const useFetch = (searchTerm: string = "", autofetch = true) => {
  const debouncedSearchTerm = useDebounced({ value: searchTerm, delay: 500 });
  const [data, setData] = useState<Movie[] | null>(null);
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
      const result = debouncedSearchTerm.trim()
        ? await fetchMoviesById({ query: debouncedSearchTerm })
        : await fetchAllMovies();
      if (isMounted.current) setData(result);
      return result;
    } catch (error) {
      if (isMounted.current) {
        const unwrappedError = getErrorMessage(error);
        setError(Error(`Error: ${unwrappedError}`));
      }
      return null;
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
