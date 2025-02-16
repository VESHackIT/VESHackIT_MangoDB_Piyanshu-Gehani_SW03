import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GRID_SIZE = 4;
const CELL_MARGIN = 5;
const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 50) / GRID_SIZE - CELL_MARGIN * 2;
const investments = [0, 1, 2];

// Sample leaderboard data
const leaderboardData = [
  { name: "Sarah Miller", carbonSaved: 245 },
  { name: "John Davis", carbonSaved: 189 },
  { name: "You", carbonSaved: 167 },
  { name: "Michael Chen", carbonSaved: 145 },
  { name: "Lisa Thompson", carbonSaved: 123 }
];

export default function InvestmentGrid() {
  const [modalVisible, setModalVisible] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const openModal = () => {
    setModalVisible(true);
    setRedeemed(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const redeemReward = () => {
    setRedeemed(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderLeaderboardItem = (item, index) => (
    <View key={index} className="flex-row items-center bg-[#131d2a] rounded-xl p-3 mb-2">
      <View className="w-8 h-8 rounded-full bg-[#00b890] justify-center items-center mr-3">
        <Text className="text-white font-bold text-base">{index + 1}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-white text-base font-semibold">{item.name}</Text>
        <Text className="text-[#00b890] text-sm">{item.carbonSaved} kg CO₂ saved</Text>
      </View>
      {index < 3 && (
        <MaterialCommunityIcons 
          name="medal" 
          size={24} 
          color={index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'} 
        />
      )}
    </View>
  );

  const renderCell = (index) => {
    const hasInvestment = investments.includes(index);
    return (
      <TouchableOpacity
        key={index}
        className={`justify-center items-center rounded-lg m-1 ${hasInvestment ? 'bg-[#00b890]' : 'bg-white/10'}`}
        style={{ width: CELL_SIZE, height: CELL_SIZE }}
        activeOpacity={0.7}
        onPress={hasInvestment ? openModal : null}
      >
        {hasInvestment && <MaterialCommunityIcons name="tree" size={CELL_SIZE * 0.6} color="#FFF" />}
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#0a0f1a', '#131d2a']} className="flex-1 p-5">
      <ScrollView className="mb-5 mt-10">
        <Text className="text-white text-xl font-psemibold mb-4">CO2 Savings Leaderboard</Text>
        {leaderboardData.map((item, index) => renderLeaderboardItem(item, index))}
  

      <View className="bg-[#131d2a] rounded-xl p-3 mt-6">
        <Text className="text-white text-lg font-psemibold mb-3">Investment Grid</Text>
        {Array(GRID_SIZE)
          .fill()
          .map((_, row) => (
            <View key={row} className="flex-row mb-1">
              {Array(GRID_SIZE)
                .fill()
                .map((_, col) => renderCell(row * GRID_SIZE + col))}
            </View>
          ))}
      </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/90 justify-center items-center">
          <Animated.View className="w-[85%] rounded-xl overflow-hidden shadow-lg" style={{ opacity: fadeAnim }}>  
            <LinearGradient colors={['#00b890', '#008870']} className="py-6 px-5 items-center">
              <Text className="text-white text-2xl font-bold mb-2">
                {redeemed ? 'Reward Redeemed!' : ' Congratulations! '}
              </Text>
              <Text className="text-white text-base text-center mb-5">
                {redeemed ? "You've successfully claimed your reward! 🌱" : "You've earned a reward!"}
              </Text>
              <TouchableOpacity
                className="bg-[#131d2a] py-3 px-8 rounded-lg"
                onPress={redeemed ? () => setModalVisible(false) : redeemReward}
              >
                <Text className="text-[#00b890] text-lg font-bold">
                  {redeemed ? 'Close' : 'Redeem Reward'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </View>
      </Modal>
    </LinearGradient>
  );
}