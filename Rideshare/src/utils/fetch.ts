import Constants from "expo-constants";
import { useCallback, useEffect, useState } from "react";

// In development, resolve to the actual dev server address (LAN IP, tunnel, etc.)
// since it changes per network/machine. In production, there's no dev server,
// so fall back to the deployed origin.
export const getServerUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    return `http://${hostUri}`;
  }
  return process.env.EXPO_PUBLIC_SERVER_URL;
};

export const fetchAPI = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    const body = await response.json();
    if (!response.ok) {
      throw Error(body.error?.errors?.[0] ?? `HTTP Error ${response.status}`);
    }
    return body;
  } catch (err) {
    console.error("fetchAPI error", err);
    throw err;
  }
};

// this is a custom react hook
export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchAPI(url, options);
      setData(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.error("Unknown Error:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  // run once, and whenever url/options change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
