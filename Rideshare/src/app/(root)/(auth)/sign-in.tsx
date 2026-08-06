import { CustomButton } from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, router, type Href } from "expo-router";
import { useState } from "react";
import { Button, Image, ScrollView, Text, TextInput, View } from "react-native";
import { useSignIn } from "@clerk/expo";

const SignIn = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const [code, setCode] = useState("");

  const [form, setForm] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const { error } = await signIn.password({
      emailAddress: form.email,
      password: form.password,
    });
    if (error) {
      //console.error(JSON.stringify(error, null, 2)); - handled with errors directly
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          // Handle session tasks
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          // If no session tasks, navigate the signed-in user to the home page
          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else if (signIn.status === "needs_second_factor") {
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
    } else if (signIn.status === "needs_client_trust") {
      // For other second factor strategies,
      // see https://clerk.com/docs/guides/development/custom-flows/authentication/client-trust
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          // Handle session tasks
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          // If no session tasks, navigate the signed-in user to the home page
          const url = decorateUrl("/home");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  if (signIn.status === "needs_client_trust") {
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
        Welcome back.
      </Text>

      <View className="m-3 gap-5">
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

      {errors && (
        <View className="mx-3">
          <Text className="text-red-400">
            {errors.fields.password?.message}
          </Text>
        </View>
      )}

      <View className="px-3 mt-5">
        <CustomButton onPress={handleSubmit} title="Sign In" />
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
        <Link href="/sign-up">
          <Text className="text-lg text-center text-general-200">
            {"Don't have an account yet?"}
            <Text className="text-primary-500"> Sign up.</Text>{" "}
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignIn;
