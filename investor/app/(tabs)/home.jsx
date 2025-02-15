import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import LineChartComponent from '@/components/LineChart';
import ProjectCarousel from '@/components/ProjectCarousel';

const COLORS = {
  background: "#0a0f1a",
  surface: "#131d2a",
  primary: '#00b890',
  text: '#e0e0e0',
  gray: {
    100: 'rgba(255, 255, 255, 0.08)',
    200: 'rgba(255, 255, 255, 0.12)',
    300: 'rgba(255, 255, 255, 0.16)',
  }
};

const CustomCard = ({ children, className = '' }) => (
  <View className={`bg-[${COLORS.surface}] rounded-3xl shadow-lg p-5 border border-[${COLORS.gray[100]}] ${className}`}>
    {children}
  </View>
);

export default function Home() {
  const WEBHOOK_URL = 'https://piyanshu.app.n8n.cloud/webhook/7e474783-7445-43b6-a753-c9ce141e082c';
  const scrollY = useSharedValue(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleConfirm = async () => {
    try {
      await fetch('https://piyanshu.app.n8n.cloud/webhook/7e474783-7445-43b6-a753-c9ce141e082c', {
        method: 'POST',
      });

      Alert.alert('Success', `Event added for ${selectedDate}`);
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to add event');
    }
  };

  const busyDates = {
    '2025-02-10': { selected: true, selectedColor: "#064e3b" },
    '2025-02-15': { selected: true, selectedColor: "#064e3b" },
    // '2025-02-20': { selected: true, selectedColor: "#064e3b" },
  };
  


  const portfolioStats = {
    totalInvested: 250000,
    totalReturns: 45000,
    carbonOffset: 34.5,
    projectCount: 12
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.background }}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        className="flex-1"
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        {/* Header Section */}
        <LinearGradient
          colors={['#00b890', '#007f6b', '#004d3f', COLORS.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.3, 0.7, 1]}
          className="px-5 pt-6 pb-8 mt-10"
        >

          <View className="flex-row items-center mb-6">
            <View className="flex-1">
              <Text className="text-white/60 text-base mb-1 font-pmedium">Welcome Back,</Text>
              <Text className="text-white text-3xl font-psemibold tracking-wide">Investor</Text>
            </View>
            <View className="h-10 w-10 rounded-full bg-white/10 border border-white/20" />
          </View>

          <View className="flex-row justify-between space-x-4">
            <View className="flex-1 bg-white/10 p-4 rounded-2xl border mr-2 border-white/5">
              <View className="flex-row justi items-center mb-2">
                <View className="w-8 h-8 rounded-full bg-[#00b890] bg-opacity-20 mr-2 items-center justify-center">
                  <Text className="text-[#00b890] text-lg">$</Text>
                </View>
                <Text className="text-white/60 text-sm">Total Invested</Text>
              </View>
              <Text className="text-white text-xl font-bold">
                ${portfolioStats.totalInvested.toLocaleString()}
              </Text>
            </View>

            <View className="flex-1 bg-white/10 p-4 rounded-2xl border ml-2 border-white/5">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 rounded-full bg-[#00b890] bg-opacity-20 mr-2 items-center justify-center">
                  <Text className="text-[#00b890] text-lg">🌱</Text>
                </View>
                <Text className="text-white/60 text-sm">Carbon Offset</Text>
              </View>
              <Text className="text-white text-xl font-bold">
                {portfolioStats.carbonOffset}kg
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View className="px-5">
          {/* Invested Projects Section */}
          <View className="mt-4 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold" style={{ color: COLORS.text }}>
                Invested Projects
              </Text>
              <Text className="text-sm" style={{ color: COLORS.primary }}>
                View All
              </Text>
            </View>
            <View style={{ flex: 1, overflow: 'visible' }}>
              <ProjectCarousel />
            </View>
          </View>

          {/* Carbon Impact */}
          <CustomCard className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-white/60 text-sm mb-1">Total Impact</Text>
                <Text className="text-lg font-bold" style={{ color: COLORS.text }}>
                  Carbon Impact
                </Text>
              </View>
              <View className="bg-[#00b890] bg-opacity-20 px-3 py-1 rounded-full">
                <Text className="text-[#00b890] font-medium">+12.5%</Text>
              </View>
            </View>
            <LineChartComponent />
          </CustomCard>
          {/* Calendar Section */}
        <View className="mt-6 mb-4">
          <Text className="text-xl font-bold mb-2" style={{ color: COLORS.text }}>
            Upcoming Meetings
          </Text>
          <Calendar
  theme={{
    backgroundColor: COLORS.surface,
    calendarBackground: COLORS.surface,
    textSectionTitleColor: 'rgba(255,255,255,0.6)',
    selectedDayBackgroundColor: COLORS.primary,
    selectedDayTextColor: '#ffffff',
    todayTextColor: COLORS.primary,
    dayTextColor: COLORS.text,
    arrowColor: COLORS.primary,
    monthTextColor: COLORS.text,
    textDisabledColor: 'rgba(255,255,255,0.2)',
  }}
  markedDates={busyDates}
/>

        </View>

        {/* Add Event Button */}
        <TouchableOpacity
          className="bg-[#00b890] p-3 rounded-lg mb-4"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white text-center font-bold">Add Event</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
       {/* Event Popup Modal */}
       <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-[#131d2a] p-6 rounded-lg w-4/5">
            <Text className="text-lg font-bold mb-2 text-white">Select Event Date</Text>

            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={{
                ...busyDates,
                [selectedDate]: { selected: true, selectedColor: COLORS.primary },
              }}
              theme={{
                backgroundColor: COLORS.surface,
                calendarBackground: COLORS.surface,
                textSectionTitleColor: 'rgba(255,255,255,0.6)',
                selectedDayBackgroundColor: COLORS.primary,
                selectedDayTextColor: '#ffffff',
                todayTextColor: COLORS.primary,
                dayTextColor: COLORS.text,
                arrowColor: COLORS.primary,
                monthTextColor: COLORS.text,
                textDisabledColor: 'rgba(255,255,255,0.2)',
              }}
            />

            {/* Confirmation Buttons */}
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-[#00b890] px-4 py-2 rounded-lg"
                onPress={handleConfirm}
                disabled={!selectedDate}
              >
                <Text className="text-white">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}