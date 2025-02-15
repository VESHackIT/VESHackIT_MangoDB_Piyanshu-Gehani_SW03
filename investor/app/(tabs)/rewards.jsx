import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GRID_SIZE = 4;
const CELL_MARGIN = 2;
const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 40) / GRID_SIZE - CELL_MARGIN * 2;

const investments = [0, 1, 2]; // Hardcoded positions of tree investments (0-indexed)

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

  const renderCell = (index) => {
    const hasInvestment = investments.includes(index);

    return (
      <TouchableOpacity
        key={index}
        style={[styles.cell, hasInvestment && styles.investedCell]}
        activeOpacity={0.7}
        onPress={hasInvestment ? openModal : null}
      >
        {hasInvestment && <Text style={styles.tree}>🌳</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#0a0f1a', '#131d2a']} style={styles.container}>
      <Text style={styles.title}>Investment Grid</Text>
      <Text style={styles.subtitle}>Active Investments: 3</Text>

      <View style={styles.gridContainer}>
        {Array(GRID_SIZE)
          .fill()
          .map((_, row) => (
            <View key={row} style={styles.row}>
              {Array(GRID_SIZE)
                .fill()
                .map((_, col) => renderCell(row * GRID_SIZE + col))}
            </View>
          ))}
      </View>

      {/* Reward Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
            {!redeemed ? (
              <>
                <Text style={styles.modalTitle}>🎉 Congratulations! 🎉</Text>
                <Text style={styles.modalText}>You've earned a reward!</Text>
                <TouchableOpacity style={styles.redeemButton} onPress={redeemReward}>
                  <LinearGradient colors={['#00b890', '#009977']} style={styles.redeemGradient}>
                    <Text style={styles.redeemText}>Redeem Reward</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>✨ Reward Redeemed ✨</Text>
                <Text style={styles.modalText}>You've successfully claimed your reward! 🎁</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#0a0f1a',
  },
  gridContainer: {
    backgroundColor: '#131d2a',
    borderRadius: 15,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: CELL_MARGIN,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: CELL_MARGIN,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  investedCell: {
    backgroundColor: '#00b890',
  },
  tree: {
    fontSize: CELL_SIZE * 0.6,
  },
  title: {
    color: '#00b890',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#131d2a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#00b890',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00b890',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  redeemButton: {
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  redeemGradient: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redeemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#00b890',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});