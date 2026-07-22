import { View, Text, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { MoviesView } from "@/components/MoviesView";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <View className="flex-1">
      <Image source={images.bg} className="absolute top-0 w-full" />
      <MoviesView
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showLogo={true}
        showSearchBar={true}
        autofetch={false}
      />
    </View>
  );
};

export default Search;
