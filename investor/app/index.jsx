import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Contribute to Green Energy",
    description: "Help fund solar, wind, and renewable projects to drive a sustainable future.",
    lottie: require("../assets/animation-4.json"),
  },
  {
    id: "2",
    title: "Track Your Carbon Impact",
    description: "Monitor CO₂ reduction and earn solar credits based on your contributions.",
    lottie: require("../assets/animation-1.json"),
  },
  {
    id: "3",
    title: "Secure & Rewarding Investments",
    description: "Invest confidently with escrow-based payments and earn sustainability rewards.",
    lottie: require("../assets/animation-2.json"),
  },
];


export default function App() {
  
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0]?.index !== undefined) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <FlatList
        className="mt-28"
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <LottieView
              source={item.lottie}
              autoPlay
              loop
              style={styles.lottie}
              renderMode="AUTOMATIC"
              cacheStrategy="strong"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index
                ? styles.activeIndicator
                : styles.inactiveIndicator,
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
      <LinearGradient
        colors={['#00b890', '#00856d']} // Gradient Colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.primaryButton} // Applying styles
        
      >
        <TouchableOpacity onPress={() => router.push("/Onboard")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0f1a",
    color:"#ffffff"
  },
  slide: {
    width: width,
    height: height * 0.7,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  lottie: {
    width: width * 0.8,
    height: width * 0.8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "System",
  },
  description: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 24,
    fontFamily: "System",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  activeIndicator: {
    backgroundColor: "#00b890",
    width: 24,
  },
  inactiveIndicator: {
    backgroundColor: "#E0E0E0",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 50,
  },
  primaryButton: {
    backgroundColor: "#00b890",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "System",
  },
  secondaryButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#065F46",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "System",
  },
});