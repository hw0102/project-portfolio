import { colors } from '@/constants/theme'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import { ColorValue, Image, ImageBackground, ImageSourcePropType, Text, View } from 'react-native'
import { icons } from '@/constants/icons'

interface TabIconProps {
  name: string,
  focused: boolean,
  iconImage: ImageSourcePropType,
  tintColor: ColorValue,
}

// tab icons
const TabIcon = ({ name, focused, iconImage, tintColor }: TabIconProps) => {

  if (focused) {
    return (
      <ImageBackground source={images.highlight} className='flex-row rounded-full mt-4 overflow-hidden min-w-32 min-h-16 justify-center items-center'>
          <Image source={iconImage} tintColor={tintColor} className='size-5' />
        <Text className='text-secondary text-base ml-2'>{name}</Text>
      </ImageBackground>
    )
  }
  return (
    <View>
      <Image source={iconImage} tintColor="#A8B5DB" className='size-5 mt-4' />
    </View>
  )
}




const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F0D23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'fixed',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0F0D23'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name='Home'
              iconImage={icons.home}
              focused={focused}
              tintColor={colors.homeTab}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name='Search'
              iconImage={icons.search}
              focused={focused}
              tintColor={colors.homeTab}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="Save"
              iconImage={icons.save}
              focused={focused}
              tintColor={colors.homeTab}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name='Profile'
              iconImage={icons.person}
              focused={focused}
              tintColor={colors.homeTab}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default _Layout
