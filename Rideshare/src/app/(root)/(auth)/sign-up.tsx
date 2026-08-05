import { CustomButton } from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
  });

  const submitForm = async () => {};

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

      <View className="m-3 gap-5">
        {/* Name */}
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
        {/* Email */}
        <InputField
          labelStyle="text-lg font-JakartaSemiBold"
          label="Email"
          placeholder="Type your email here."
          icon={icons.email}
          value={form.email}
          onChangeText={(value) =>
            setForm((prev) => ({ ...prev, email: value }))
          }
        />
        {/* Password */}
        <InputField
          labelStyle="text-lg font-JakartaSemiBold"
          label="Password"
          placeholder="Type your password here."
          secureTextEntry
          icon={icons.lock}
          value={form.password}
          onChangeText={(value) =>
            setForm((prev) => ({ ...prev, password: value }))
          }
        />
      </View>

      <View className="px-3 mt-5">
        <CustomButton onPress={submitForm} title="Sign up" />
      </View>

      {/* OAuth */}
      <View className="mt-10">
        <Link href="/sign-in">
          <Text className="text-lg text-center text-general-200">
            Already have another account?{" "}
            <Text className="text-primary-500"> Log in.</Text>{" "}
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignUp;
