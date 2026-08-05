import { CustomButton } from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, Redirect, router } from "expo-router";
import { useState } from "react";
import { Button, Image, ScrollView, Text, TextInput, View } from "react-native";
import { useSignUp, useAuth } from "@clerk/expo";

const SignUp = () => {
  const { signUp } = useSignUp();
  const [isVerifying, setIsVerifying] = useState(false);
  const [code, setCode] = useState("");
  const { isSignedIn } = useAuth();

  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleVerify = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      // Handle the error in your app.
      console.error("Error handling verifying", error.message);
      return;
    }

    const { error: finalizeError } = await signUp.finalize();

    if (finalizeError) {
      // Handle the error in your app.
    }
    // redirect to home page
    if (isSignedIn) {
      router.replace("/home");
    }
  };

  const handleSignUp = async () => {
    const { error } = await signUp.password({
      emailAddress: form.email,
      password: form.password,
      firstName: form.name,
    });
    if (error) {
      // Handle the error in your app.
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      console.error("Error handling sign up", error.message);
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      // Handle the error in your app.
      return;
    }

    setIsVerifying(true);
  };

  if (isVerifying) {
    return (
      <View className="flex-1 justify-center items-center">
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        <Button title="Verify" onPress={handleVerify} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerClassName="grow pb-[30px]"
      // contentContainerStyle={{ paddingBottom: 30 }}
      className="bg-white"
    >
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
        <CustomButton onPress={handleSignUp} title="Sign up" />
      </View>

      {/* Separator */}
      <View className="flex-row items-center gap-3 mx-4 mt-5">
        <View className="flex-1 bg-general-100 h-[1px]" />
        <Text> Or </Text>
        <View className="flex-1 bg-general-100 h-[1px]" />
      </View>

      <OAuth />
      {/*Verificatio Model*/}
      {/* Existing Account */}
      <View className="mt-10">
        <Link href="/sign-in">
          <Text className="text-lg text-center text-general-200">
            Already have an account?
            <Text className="text-primary-500"> Sign in.</Text>{" "}
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignUp;
