import { isAxiosError } from "axios";

export const getErrorMessage = (
  error: unknown,
  fallback: string = "Something went wrong",
): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};
