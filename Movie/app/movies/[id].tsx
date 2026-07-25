import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { fetchMovieDetails } from "@/api/api";
// import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value: string | number | undefined;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="items-start gap-3">
      <Text className="text-light-200 font-bold">{label}</Text>
      <Text className="text-light-300">{value}</Text>
    </View>
  );
};

const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState<MovieDetails | undefined>(
    undefined,
  );
  const { id } = useLocalSearchParams<{ id: string }>();
  useEffect(() => {
    const func = async () => {
      const result = await fetchMovieDetails({ movieId: id });
      setMovieDetail(result);
    };
    func();
  }, [id]);
  return (
    <View className="bg-primary flex-1">
      {/*p Poster */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
          }}
          className="w-full h-[520px]"
          resizeMode="cover"
        />
        {/* Meta data*/}
        <View className="mt-2 mx-3 gap-y-2">
          <Text className="text-white font-bold">{movieDetail?.title}</Text>
          <View className="flex-row gap-x-3">
            <Text className="text-light-300 text-sm">
              {movieDetail?.release_date.split("-")[0]}
            </Text>

            {/*{movieDetail?.spoken_languages.map(({ english_name }) => (
              <Text key={english_name} className="text-light-300 text-sm">
                {english_name}
              </Text>
            ))}*/}

            <Text className="text-light-300 text-sm">
              {movieDetail?.runtime} mins
            </Text>
          </View>
          <View className="flex-row items-center gap-x-2 bg-dark-100 rounded-md p-1 self-start">
            <Image source={icons.star} className="size-4" />
            <Text className="text-light-300 font-bold">
              {" "}
              {Math.round((movieDetail?.vote_average ?? 0) / 2)}/10{" "}
            </Text>
            <Text className="text-light-200 text-sm">
              {movieDetail?.vote_count} votes{" "}
            </Text>
          </View>

          <MovieInfo label="Overview" value={movieDetail?.overview ?? "N/A"} />
          <MovieInfo
            label="Genre"
            value={
              movieDetail?.genres.map((genre) => genre.name).join(" - ") ??
              "N/A"
            }
          />
          <View className="flex-row w-1/2 justify-between">
            <MovieInfo
              label="Budget"
              value={`$${(movieDetail?.budget ?? 0) / 1_000_000} M`}
            />
            <MovieInfo
              label="Box Office"
              value={`$${((movieDetail?.revenue ?? 0) / 1_000_000).toFixed(1)} M`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movieDetail?.production_companies
                .map(({ name }) => name)
                .join(" - ") ?? "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="flex-row absolute bottom-5 left-0 right-0 bg-accent justify-center rounded-lg py-5 mx-5"
        onPress={router.back}
      >
        <Image source={icons.arrow} className="rotate-180" />
        <Text> Go Back </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
