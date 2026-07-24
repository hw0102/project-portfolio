import { icons } from "@/constants/icons";
import {
  ActivityIndicator,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
// import SearchBar from "@/components/searchBar";
import { useFetch } from "@/api/useFetch";
import { Link } from "expo-router";
import SearchBar from "./searchBar";
import { useEffect, useState } from "react";
import { getTrendingMovies, updateSearchCount } from "@/api/appwrite";
import TrendingCard from "./TrendingCard";

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
        <Text numberOfLines={1} className="text-sm font-bold text-white mt-2">
          {movie.title}
        </Text>
        <View className="flex-row justify-start gap-x-2">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white font-bold text-xs">
            {(movie.vote_average / 2).toFixed(1)}
          </Text>
        </View>
        <View>
          <Text className="text-xs text-light-300 font-medium mt-1">
            {movie.release_date.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export const MoviesView = ({
  autofetch = true,
  searchTerm = "",
  setSearchTerm = () => print(),
  showLogo = true,
  showSearchBar = false,
  showTrendingMovies = false,
}: {
  autofetch?: boolean;
  searchTerm?: string;
  setSearchTerm?: (val: string) => void;
  showLogo?: boolean;
  showSearchBar?: boolean;
  showTrendingMovies?: boolean;
}) => {
  const {
    data: allMovies,
    isLoading,
    error: moviesError,
    refetch,
    reset,
    debouncedSearchTerm,
  } = useFetch(searchTerm, autofetch);

  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);

  // fetch trending movies on load
  useEffect(() => {
    const func = async () => {
      const results = await getTrendingMovies();
      const uniqueByMovieId = Array.from(
        new Map(results.map((movie) => [movie.movie_id, movie])).values(),
      );
      setTrendingMovies(uniqueByMovieId);
    };
    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      if (debouncedSearchTerm.trim()) {
        const results = await refetch();
        // this should be in api call instead of on front end. move this to api.
        if (results && results.length > 0) {
          await updateSearchCount(debouncedSearchTerm.trim(), results[0]);
        }
      } else {
        reset();
      }
    };
    func();
  }, [debouncedSearchTerm, refetch, reset]);

  return (
    <FlatList
      className="mx-2"
      data={allMovies ?? []}
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
          {showLogo && (
            <Image source={icons.logo} className="size-12 mt-20 mb-5 mx-auto" />
          )}
          {showSearchBar && (
            <SearchBar value={searchTerm} setValue={setSearchTerm} />
          )}

          {searchTerm.trim() && (
            <View>
              <Text className="text-white text-xl font-bold">
                {" "}
                Searching for <Text className="text-accent">{searchTerm}</Text>
              </Text>
            </View>
          )}

          {showTrendingMovies && (
            <View>
              <Text className="text-xl text-white font-bold mt-10 mb-5">
                Trending Movies
              </Text>

              <FlatList
                data={trendingMovies ?? []}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                renderItem={({ item, index }) => {
                  return <TrendingCard movie={item} index={index} />;
                }}
                keyExtractor={(item) => item.movie_id}
              />
              {/*{trendingMovies.map((item) => (
                <Text key={item.movie_id} className="text-white">
                  {item.movie_title}
                </Text>
              ))}*/}
            </View>
          )}

          {!isLoading && !moviesError && !showSearchBar && (
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>
          )}
        </View>
      }
      ListEmptyComponent={
        isLoading && autofetch ? (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            className="mt-11 self-center"
          />
        ) : moviesError ? (
          <Text className="text-black">Error: {moviesError?.message}</Text>
        ) : (
          <View className="mt-10 px-5">
            <Text className="text-center text-gray-500">
              {" "}
              {searchTerm.trim() ? "No Movies Found" : "Search for a Movie"}
            </Text>
          </View>
        )
      }
    />
  );
};
