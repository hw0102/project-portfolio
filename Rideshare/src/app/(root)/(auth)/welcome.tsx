import { CustomButton } from "@/components/CustomButton";
import { onBoardingArray } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [index, setIndex] = useState<number>(0);
  const isOnLastSlide: boolean = index === onBoardingArray.length - 1;

  return (
    <SafeAreaView className="flex-1 relative items-center">
      <TouchableOpacity
        className="absolute right-10 top-14"
        onPress={() => router.push("/sign-up")}
      >
        <Text className="text-black text-md font-JakartaBold"> Skip </Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-8 h-1 bg-[#E2E8F0] mx-1 rounded-full" />}
        activeDot={<View className="w-8 h-2 bg-[#0286FF] mx-1 rounded-full" />}
        onIndexChanged={(index) => setIndex(index)}
        className="mt-10"
      >
        {onBoardingArray.map((item) => (
          <View key={item.id} className="items-center">
            <Image
              source={item.image}
              className="h-[300px] w-full"
              resizeMode="contain"
            />
            <View className="mt-6 gap-2 items-center mx-10">
              <Text className="text-3xl font-bold text-center">
                {item.title}
              </Text>
              <Text className="text-lg font-JakartaSemiBold text-[#858585] text-center">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <View className="w-full px-3">
        <CustomButton
          title={isOnLastSlide ? "Sign Up" : "Next"}
          onPress={() =>
            isOnLastSlide
              ? router.push("/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
