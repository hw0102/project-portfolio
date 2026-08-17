import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * const buttonClass = cn(
   'bg-blue-500 text-px px-4 py-2',
   { 'bg-red-500': isError },
   className
 );
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatDate = (date: string | Date): string => {
  const parsedDate =
    typeof date === "string" ? new Date(date.replace(" ", "T")) : date;
  return parsedDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

// rideTimeMinutes is the ride's duration in minutes
export const getArrivalTime = (
  createdAt: string,
  rideTimeMinutes: string | number,
): Date => {
  const created = new Date(createdAt.replace(" ", "T"));
  const minutes = Number(rideTimeMinutes);
  return new Date(created.getTime() + minutes * 60_000);
};

const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

// Shows only the time if the arrival falls on the same calendar day as
// createdAt, otherwise appends how many days later it lands, e.g. "(+1 day)".
export const formatArrivalTime = (
  createdAt: string,
  rideTimeMinutes: string | number,
): string => {
  const created = new Date(createdAt.replace(" ", "T"));
  const arrival = getArrivalTime(createdAt, rideTimeMinutes);

  const dayDiff = Math.round(
    (startOfDay(arrival).getTime() - startOfDay(created).getTime()) /
      86_400_000,
  );

  const time = arrival.toLocaleString(undefined, { timeStyle: "short" });

  if (dayDiff <= 0) {
    return time;
  }
  return `${time} (+${dayDiff} day${dayDiff > 1 ? "s" : ""})`;
};

export const formatTimeDuration = (
  rideTimeMinutes: string | number,
): string => {
  const totalMinutes = Math.round(Number(rideTimeMinutes));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} m`;
  }
  if (minutes === 0) {
    return `${hours} h`;
  }
  return `${hours} h ${minutes} m`;
};
