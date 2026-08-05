import { Text, View, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  onPress?: () => void;
  title: string;
  IconLeft?: React.ComponentType;
  IconRight?: React.ComponentType;
  className?: string;
}

const CustomButton = ({
  onPress,
  title,
  IconLeft,
  IconRight,
  className,
  ...props
}: CustomButtonProps) => {
  return (
    //<View>
    <TouchableOpacity
      onPress={onPress}
      className=" bg-primary-500 rounded-full py-3"
      {...props}
    >
      <View className="flex-row items-center mx-auto">
        {IconLeft && <IconLeft />}
        <Text className="text-lg font-bold text-white text-center">
          {" "}
          {title}{" "}
        </Text>
      </View>
      {IconRight && <IconRight />}
    </TouchableOpacity>
    // </View>
  );
};

export { CustomButton };
