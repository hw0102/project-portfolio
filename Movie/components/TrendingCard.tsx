import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

const TrendingCard = ({
  movie,
  index,
}: {
  movie: TrendingMovie;
  index: number;
}) => {
  return (
    // <View>
    //   <Text className="text-white">{movie.movie_title}</Text>;
    // </View>
    <Link href={`/movies/${movie.movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: movie.poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        {/* movie ranking */}
        <View className="absolute bottom-10 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-white text-6xl font-bold">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        {/* movie title */}
        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {movie.movie_title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
