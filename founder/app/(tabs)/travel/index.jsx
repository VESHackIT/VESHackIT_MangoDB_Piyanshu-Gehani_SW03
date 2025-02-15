import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {router} from 'expo-router'

const Travel = () => {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-xl">Welcome to the App</Text>
      <TouchableOpacity
        className="absolute bottom-[1rem] left-4 right-4 bg-emerald-800 rounded-full py-3 shadow-lg"
        onPress={() => {
          router.push({
            pathname: "/(tabs)/travel/routescreen",
            params: {
              text: 'hi'
            },
          });
        }}
        style={{ zIndex: 10 }}
      >
        <Text className="text-white text-center font-bold text-lg">
          Find Routes
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Travel