import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerk } from "@clerk/expo";
import { router } from "expo-router";

const Home = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.replace("/sign-in");
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="grow items-center justify-center">
      <Text> Home </Text>
      <TouchableOpacity
        onPress={handleSignOut}
        className="bg-slate-400 rounded-full mx-auto p-3"
      >
        <Text className="text-white"> Sign Out </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
