import { ImageSourcePropType } from "react-native";

interface OnboardingProps {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export const onBoardingArray: OnboardingProps[] = [
  {
    id: 1,
    title: "The Perfect Ride is just a tap away!",
    description: "Your journey begins here. Find ideal rides today.",
    image: require("../../assets/images/onboarding1.png"),
  },
  {
    id: 2,
    title: "Title 2",
    description: "Description 2",
    image: require("../../assets/images/onboarding2.png"),
  },
  {
    id: 3,
    title: "Title 3",
    description: "Description 3",
    image: require("../../assets/images/onboarding3.png"),
  },
];
