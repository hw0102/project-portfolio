import { icons } from "@/constants";
import { Ride } from "@/types";
import { getServerUrl } from "@/utils/fetch";
import {
  formatArrivalTime,
  formatDate,
  formatTimeDuration,
} from "@/utils/utils";
import { ActivityIndicator, View, Text, Image } from "react-native";
import { useState } from "react";
interface RideCardProps {
  ride: Ride;
}
interface AddressViewProps {
  from_address: string;
  to_address: string;
}

interface TripMapsViewProps {
  longtitude: string;
  latitude: string;
}

interface BreakDownViewProps {
  rideTime: string;
  createdAt: string;
  driver: string;
  carSeats: string;
  paymentStatus: string;
}

const AddressView = (props: AddressViewProps) => (
  <View className="justify-start gap-5">
    {/* from address */}
    <View className="flex-row gap-2 items-center">
      <Image source={icons.to} className="size-6" />
      <Text className="text-md font-JakartaMedium" numberOfLines={1}>
        {props.from_address}
      </Text>
    </View>
    {/* to address */}
    <View className="flex-row gap-2 items-center">
      {/*icon*/}
      <Image source={icons.point} className="size-6" />
      <Text className="text-md font-JakartaMedium" numberOfLines={1}>
        {props.to_address}
      </Text>
    </View>
  </View>
);

const TripMapsView = (props: TripMapsViewProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <View className="w-[80px] h-[90px]">
      <Image
        className="w-[80px] h-[90px] rounded-lg"
        source={{
          uri: `${getServerUrl()}/static-map?lon=${props.longtitude}&lat=${props.latitude}`,
        }}
        onLoadEnd={() => setLoading(false)}
        onError={(e) =>
          console.error("Map image failed to load:", e.nativeEvent.error)
        }
      />
      {loading && (
        <View className="absolute inset-0 items-center justify-center">
          <ActivityIndicator size="small" />
        </View>
      )}
    </View>
  );
};

const BreakDownView = (props: BreakDownViewProps) => (
  <View className="bg-general-500 rounded-lg p-3 gap-3">
    {/*date & time*/}
    <View className="flex-row w-full justify-between">
      {/*<Text className="text-md font-JakartaMedium text-gray-500">
        Date & Time
      </Text>*/}
      <Text>{formatDate(props.createdAt)}</Text>
      <Text>
        {formatArrivalTime(props.createdAt, props.rideTime)}
        {` (${formatTimeDuration(props.rideTime)})`}
      </Text>
    </View>
    <View className="flex-row justify-between w-full">
      <Text className="text-md font-JakartaMedium text-gray-500">Driver</Text>
      <Text>{props.driver}</Text>
    </View>
    <View className="flex-row justify-between w-full">
      <Text className="text-md font-JakartaMedium text-gray-500">Car Seat</Text>
      <Text>{props.carSeats}</Text>
    </View>
    <View className="flex-row justify-between w-full">
      <Text className="text-md font-JakartaMedium text-gray-500">Status</Text>
      <Text
        className={`capitalize ${props.paymentStatus === "paid" ? "text-green-500" : "text-red-500"}`}
      >
        {props.paymentStatus}
      </Text>
    </View>
  </View>
);

export const RideCard = ({ ride }: RideCardProps) => (
  <View className="rounded-lg bg-white shadow-sm shadow-neutral-300 p-3 m-3 gap-3">
    <View className="flex-row items-center gap-5 w-full">
      {/* map - this may need longitude and latitude as opposed to addresses */}
      <TripMapsView
        longtitude={ride.destination_longitude}
        latitude={ride.destination_latitude}
      />
      {/* Addresses */}
      <AddressView
        from_address={ride.origin_address}
        to_address={ride.destination_address}
      />
    </View>
    {/* Breakdown */}
    <BreakDownView
      rideTime={ride.ride_time}
      createdAt={ride.created_at}
      driver={String(ride.driver.first_name + " " + ride.driver.last_name)}
      carSeats={ride.driver.car_seats}
      paymentStatus={ride.payment_status}
    />
    <View></View>
  </View>
);
