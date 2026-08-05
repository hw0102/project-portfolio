import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";
//import { View } from "react-native";

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href={"/home"} />;
  }

  return <Redirect href={"/welcome"} />;
}
