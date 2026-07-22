import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SearchBar from "@/components/searchBar";
import { useFetch } from "@/api/useFetch";
import { fetchAllMovies } from "@/api/api";
import { Link } from "expo-router";

const MoviesView = () => {
  const {
    data: allMovies,
    isLoading,
    error: moviesError,
  } = useFetch(fetchAllMovies);

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        color="#ffffff"
        className="mt-11  self-center"
      />
    );

  if (moviesError)
    return <Text className="text-black">Error: {moviesError?.message}</Text>;

  return (
    <FlatList
      className="mx-2"
      data={allMovies}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <MovieCardView movie={item} />}
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: "flex-start",
        gap: 20,
        paddingRight: 5,
        marginBottom: 10,
      }}
      contentContainerStyle={{ paddingBottom: 120 }}
      ListHeaderComponent={
        <View className="mt-5 mx-2">
          <Image source={icons.logo} className="size-12 mt-20 mb-5 mx-auto" />
          <SearchBar />
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Latest Movies
          </Text>
        </View>
      }
    />
  );
};

const MovieCardView = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2">{movie.title}</Text>
        <View className="flex-row justify-start gap-x-2">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white font-normal">
            {(movie.vote_average / 2).toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default function Index() {
  return (
    <View className="flex-1">
      <Image source={images.bg} className="absolute top-0 w-full" />
      {/*<ScrollView
        className="flex-1"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >*/}
      <MoviesView />
      {/*</ScrollView>*/}
    </View>
  );
}
