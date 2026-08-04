import { images } from "@/constants";
import { Image, ScrollView, Text } from "react-native";

const SignUp = () => {
  return (
    <ScrollView contentContainerClassName="grow" className="bg-white">
      <Image
        source={images.signUpCar}
        className="w-full h-[250px] z-0"
        resizeMode="cover"
      />
      <Text className="font-JakartaSemiBold absolute top-[200px] left-3 text-2xl">
        {" "}
        Create Your Account{" "}
      </Text>
    </ScrollView>
  );
};

export default SignUp;
