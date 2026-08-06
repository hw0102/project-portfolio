import { CustomButton } from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, Redirect, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSignUp, useAuth } from "@clerk/expo";
import Modal from "react-native-modal";

const SignUp = () => {
  const { signUp } = useSignUp();
  const [isVerifying, setIsVerifying] = useState(false);

  // mock for dev purposes
  //const [showModal, setShowModal] = useState(true);
  const [verificationError, setVerificationError] = useState(false);
  // mock for dev purposes
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
      //console.error("Error handling verifying", error.message);
      Alert.alert("Error", error.longMessage);
      setVerificationError(true);
      return;
    }

    const { error: finalizeError } = await signUp.finalize();

    if (finalizeError) {
      // Handle the error in your app.
      Alert.alert("Error", finalizeError.longMessage);
      setVerificationError(true);
      return;
    }
    // redirect to home page
    //if (isSignedIn) {
    router.replace("/home");
    // TODO: create user in db if they don't already exist
    //}
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
      //console.error("Error handling sign up", error.message);
      Alert.alert("Error", error.message);
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      // Handle the error in your app.
      return;
    }

    setIsVerifying(true);
  };

  // verification modal
  // if (isVerifying) {
  //   return (
  //     <View className="flex-1 justify-center items-center">
  //       <TextInput
  //         value={code}
  //         placeholder="Enter your verification code"
  //         onChangeText={setCode}
  //         keyboardType="numeric"
  //       />
  //       <Button title="Verify" onPress={handleVerify} />
  //     </View>
  //   );
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
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
          <CustomButton onPress={handleSignUp} title="Sign up" />
        </View>

        {/* Separator */}
        <View className="flex-row items-center gap-3 mx-4 mt-5">
          <View className="flex-1 bg-general-100 h-[1px]" />
          <Text> Or </Text>
          <View className="flex-1 bg-general-100 h-[1px]" />
        </View>

        <OAuth />
        {/* Existing Account */}
        <View className="mt-10">
          <Link href="/sign-in">
            <Text className="text-lg text-center text-general-200">
              Already have an account?
              <Text className="text-primary-500"> Sign in.</Text>{" "}
            </Text>
          </Link>
        </View>

        {/*Verificatio Modal*/}
        <Modal isVisible={isVerifying}>
          <View className="bg-white rounded-xl min-h-[300px] p-8">
            <Text className="text-2xl font-JakartaBold">Verification</Text>
            <Text className="text-base font-Jakarta mb-10">{`We've sent a code to ${form.email || "<email here>"}`}</Text>
            <InputField
              label="Code"
              labelStyle="font-JakartaBold"
              icon={icons.lock}
              placeholder="Enter Your Code"
              onChangeText={setCode}
              value={code}
            />
            {/*<TextInput
            value={code}
            placeholder="Enter your verification code"
            onChangeText={setCode}
            keyboardType="numeric"
          />*/}
            {/*<Button title="Verify" onPress={handleVerify} />*/}

            {verificationError && (
              <Text className="text-red-500 mb-10 mt-5">
                Incorrect Code Entered
              </Text>
            )}
            <View className="mt-5">
              <CustomButton title="Verify" onPress={handleVerify} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
