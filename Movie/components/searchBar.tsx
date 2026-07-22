import { View, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface props {
  value: string;
  setValue: (val: string) => void;
}

const SearchBar = ({ value, setValue }: props) => {
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
        placeholder="Search Movies..."
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
