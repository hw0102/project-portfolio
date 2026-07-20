import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image source={images.bg} className="absolute top-0 w-full" />
      <ScrollView className="flex-1" showsHorizontalScrollIndicator={false} contentContainerStyle={{minHeight:"100%", paddingBottom: 10}}>
        <Image source={icons.logo} className="size-12 mt-20 mb-5 mx-auto" />
      </ScrollView>
    </View>
  );
}
