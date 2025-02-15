import React, { useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  Pressable, 
  Platform, 
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  useSharedValue
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import Carousel from 'react-native-reanimated-carousel';
import LineChartComponent from '@/components/LineChart';
import { motion } from 'framer-motion';
import ProjectCarousel from '@/components/ProjectCarousel';

// Types
interface Project {
  id: string;
  name: string;
  description: string;
  fundingStatus: number;
  expectedReturn: number;
  image: string;
}

// Theme Colors
const COLORS = {
  background: "#0a0f1a",
  surface: "#131d2a",
  primary: '#00856d',
  text: '#ffffff'
};

const CustomCard = ({ children, className = '' }) => (
  <View 
    whileHover={{ scale: 1.05 }} 
    whileTap={{ scale: 0.95 }}
    className={`bg-[${COLORS.surface}] rounded-2xl shadow-sm p-4 ${className}`}
  >
    {children}
  </View>
);

export default function Home() {
  const scrollY = useSharedValue(0);
  
  // Sample data
  const portfolioStats = {
    totalInvested: 250000,
    totalReturns: 45000,
    carbonOffset: 34.5,
    projectCount: 12
  };

  const trendingProjects: Project[] = [
    {
      id: '1',
      name: 'Solar Farm Initiative',
      description: 'Large scale solar installation in Nevada',
      fundingStatus: 75,
      expectedReturn: 12,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw-euSjxBo6SdTlCSu-wXQ6sjmconb13Wi6A&s'
    },
    // Add more projects...
  ];

  // Animation for header
  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 180], [160, 160], 'clamp'),
      opacity: interpolate(scrollY.value, [0, 100], [1, 0.8], "clamp")
    };
  });

  return (
    <SafeAreaView className="flex-1 pt-12 bg-background">
      <StatusBar barStyle="light-content" />
      <Animated.View style={headerStyle}>
        <LinearGradient
          colors={['#00856d', '#0a0f1a']}
          className="w-full h-full px-4 py-12"
        >
          <Text className="text-white text-2xl font-bold">
            Welcome Back, Investor
          </Text>
          <View className="flex-row justify-between mt-4">
            <View className="bg-white/20 p-4 rounded-xl w-[48%]">
              <Text className="text-white text-sm">Total Invested</Text>
              <Text className="text-white text-xl font-bold">
                ${portfolioStats.totalInvested.toLocaleString()}
              </Text>
            </View>
            <View className="bg-white/20 p-4 rounded-xl w-[48%]">
              <Text className="text-white text-sm">Carbon Offset</Text>
              <Text className="text-white text-xl font-bold">
                {portfolioStats.carbonOffset}kg
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView 
        className="flex-1 px-4"
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        {/* Trending Projects Carousel */}
        <View className="my-6">
          <Text className="text-xl font-bold mb-4 mt-6 text-white">Trending Projects</Text>
          <SafeAreaView style={{ flex: 1 }}>
      <ProjectCarousel />
    </SafeAreaView>
        </View>

        {/* Carbon Impact */}
        <CustomCard className="mb-6 bg-surface">
          <Text className="text-lg font-bold mb-4 text-white">Carbon Impact</Text>
          <LineChartComponent/>
        </CustomCard>

        {/* Active Investments */}
        <View className="mb-6">
          <Text className="text-xl font-bold mb-4 text-white">Active Investments</Text>
          {[1, 2, 3].map((index) => (
            <CustomCard key={index} className="mb-4 bg-surface text-white">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="font-bold text-lg text-white">Project {index}</Text>
                  <Text className="text-gray-600">Invested: $25,000</Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-primary">Active</Text>
                </View>
              </View>
              <View className="mt-2 bg-gray-200 h-2 rounded-full">
                <View className="bg-primary h-2 rounded-full w-3/4" />
              </View>
              <Text className="text-gray-600 text-right mt-1">75% Complete</Text>
            </CustomCard>
          ))}
        </View>

        {/* Recent Updates */}
        <CustomCard className="mb-6 bg-surface text-white">
          <Text className="text-lg font-bold mb-4 text-white">Recent Updates</Text>
          {[1, 2, 3].map((index) => (
            <View key={index} className="border-b border-gray-100 py-3">
              <Text className="font-medium text-white">Project Update #{index}</Text>
              <Text className="text-gray-600 text-sm mt-1">
                Latest milestone achieved: Phase {index} completed
              </Text>
              <Text className="text-gray-400 text-xs mt-1">2 hours ago</Text>
            </View>
          ))}
        </CustomCard>

      </ScrollView>

    
    </SafeAreaView>
  );
};
