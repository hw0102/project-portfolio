import {
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  View,
  Text,
  ImageSourcePropType,
  Keyboard,
  Image,
  TextInput,
  Platform,
} from "react-native";

interface InputFieldProps {
  labelStyle?: string;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  icon?: ImageSourcePropType;
  value: string;
  onChangeText: (value: string) => void;
}

const InputField = ({ secureTextEntry = false, ...props }: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View className="gap-2">
          <Text className={props.labelStyle}>{props.label}</Text>
          <View className="flex-row items-center border border-neutral-100 focus:border-primary-500 rounded-full p-4 gap-2">
            {props.icon && <Image source={props.icon} className="size-6" />}
            <TextInput
              className="flex-1 font-JakartaSemiBold"
              secureTextEntry={secureTextEntry}
              placeholder={props.placeholder}
              value={props.value}
              onChangeText={props.onChangeText}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
