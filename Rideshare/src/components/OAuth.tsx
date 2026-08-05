import { View, Text, Image } from "react-native";
import { CustomButton } from "./CustomButton";
import { Link } from "expo-router";
import { icons } from "@/constants";

const LogInWithGoogle = async () => {};

const OAuth = () => {
  return (
    <View>
      {/* OAuth */}
      <View className="px-3 mt-5">
        <CustomButton
          IconLeft={() => (
            <Image
              source={icons.google}
              resizeMode="contain"
              className="size-5"
            />
          )}
          onPress={LogInWithGoogle}
          title="Sign in with Google"
        />
      </View>
    </View>
  );
};

export default OAuth;
