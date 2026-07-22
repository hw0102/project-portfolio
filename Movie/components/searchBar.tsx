import { View, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const SearchBar = () => {
  return (
    <View className="bg-dark-200 rounded-full px-5 py-4 flex-row items-center">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={() => {}}
        placeholder="Search"
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
