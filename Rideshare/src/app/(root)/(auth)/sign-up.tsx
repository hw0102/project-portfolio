import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
  });

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

      <View className="m-3">
        <InputField
          labelStyle="text-lg font-JakartaSemiBold"
          label="Name"
          placeholder="Type your name here."
          icon={icons.person}
          value={form.name}
          onChangeText={(value) =>
            setForm((prev) => ({ ...prev, name: value }))
          }
        />
      </View>
    </ScrollView>
  );
};

export default SignUp;
