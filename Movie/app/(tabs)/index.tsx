import { images } from "@/constants/images";
import { Image, View, Text } from "react-native";
// import SearchBar from "@/components/searchBar";
//import { fetchAllMovies } from "@/api/api";
import { MoviesView } from "@/components/MoviesView";

export default function Index() {
  return (
    <View className="flex-1">
      <Image source={images.bg} className="absolute top-0 w-full" />
      {/*<ScrollView
        className="flex-1"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >*/}
      {/*<Text className="text-white font-bold"> Trending Movies </Text>*/}
      <MoviesView showTrendingMovies={true} />
      {/*</ScrollView>*/}
    </View>
  );
}
