import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { Alert } from 'react-native';

const Tickets = () => {
  useEffect(() => {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        Alert.alert('Data received', JSON.stringify(data));
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', error.message);
      });
  }, []);

  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-xl text-white">Welcome to the App</Text>
    </View>
  )
}
export default Tickets