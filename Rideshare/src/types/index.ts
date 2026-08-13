import { z } from "zod";

export const Ride = z.object({
  origin_address: z.string(),
  destination_address: z.string(),
  origin_latitude: z.string(),
  origin_longitude: z.string(),
  destination_latitude: z.string(),
  destination_longitude: z.string(),
  ride_time: z.string(),
  fare_price: z.string(),
  payment_status: z.string(),
  driver_id: z.string(),
  user_email: z.string(),
  created_at: z.string(),
  driver: z.object({
    first_name: z.string(),
    last_name: z.string(),
    car_seats: z.string(),
  }),
});

export type Ride = z.infer<typeof Ride>;

// declare interface Driver {
//   driver_id: number;
//   first_name: string;
//   last_name: string;
//   profile_image_url: string;
//   car_image_url: string;
//   car_seats: number;
//   rating: number;
// }
