import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const Saved = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="items-center gap-3">
        <Image source={icons.save} className="size-5" tintColor="#ffffff" />
        <Text className="text-base text-white font-bold">Saved</Text>
      </View>
    </View>
  );
};

export default Saved;
