import { View, Text, Image, ScrollView, ImageBackground, TouchableOpacity, StyleSheet} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ProgressBar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import {router} from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from "@expo/vector-icons"; 
import { Linking, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React, { useEffect, useState } from "react";
const impactIcons = {
  carbonReduction: { icon: "cloud", color: "#4CAF50" }, // Green
  householdsBenefited: { icon: "home", color: "#3F51B5" }, // Blue
  roi: { icon: "chart-line", color: "#FF9800" }, // Orange
  longTermSustainability: { icon: "sync-alt", color: "#9C27B0" }, // Purple
};
const theme = {
  background: "#0a0f1a", // Darker background
  surface: "#131d2a", // Darker card surface
  primary: "#00d8a0", // Adjusted green shade
  primaryTransparent: "rgba(0, 216, 160, 0.1)", // Adjusted transparent green
  inactive: "#7a8ca2", // Slightly muted inactive color
  shadow: "#000",
};
const contact = {
  email: "example@example.com",
  linkedin: "https://www.linkedin.com/company/solar-energy-projects-zw",
  instagram: "https://www.instagram.com/primegridsolar",
};
// Dummy Data (same as before)
const dummyProjects = {
  "650f94bfc7e89f001d1e4e5a": {
    name: "Solar Grid for Green Town",
    description: "A community-driven solar power project aiming to transform Green Town's energy infrastructure. This innovative initiative will install solar panels across public buildings and residential areas, creating a sustainable micro-grid that reduces dependency on fossil fuels while lowering electricity costs for locals. The project will implement the latest photovoltaic technology, ensuring maximum efficiency and durability in various weather conditions. Community members will receive training on basic maintenance, creating local green jobs and fostering a sense of ownership. The environmental impact extends beyond carbon reduction, as it will demonstrate the viability of renewable energy in similar communities across the region.",
    targetAmount: 50000,
    raisedAmount: 32000,
    location: "Green Town, India",
    impactMetrics: {
      carbonReduction: "100 tons/year",
      householdsBenefited: 150,
      roi: "12%",
      trustScore: "8.5/10",
    },
    investors: ["Priya", "Rahul", "Anita", "+154 others"],
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9I5m26BeOtJX4wwWXvp0bD0go3kmRDx6RLQ&s",
    daysLeft: 15,
    contact: {
      email: "example@example.com",
      linkedin: "https://www.linkedin.com/company/solar-energy-projects-zw",
      instagram: "https://www.instagram.com/primegridsolar",
    }
  },
  "650f94bfc7e89f001d1e4e5b": {
    name: "Wind Energy Project",
    description: "A community-driven solar power project aiming to transform Green Town's energy infrastructure. This innovative initiative will install solar panels across public buildings and residential areas, creating a sustainable micro-grid that reduces dependency on fossil fuels while lowering electricity costs for locals. The project will implement the latest photovoltaic technology, ensuring maximum efficiency and durability in various weather conditions. Community members will receive training on basic maintenance, creating local green jobs and fostering a sense of ownership. The environmental impact extends beyond carbon reduction, as it will demonstrate the viability of renewable energy in similar communities across the region.",
    targetAmount: 75000,
    raisedAmount: 50000,
    location: "Blue City, India",
    impactMetrics: {
      carbonReduction: "150 tons/year",
      householdsBenefited: 200,
      roi: "10%",
      trustScore: "9/10",
    },
    investors: ["Amit", "Neha", "Karan", "+230 others"],
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTK-W-QAu_Gpf7GW7m21q8wSPUMATtrlzw_w&s",
    daysLeft: 20,
    contact: {
      email: "example@example.com",
      linkedin: "https://www.linkedin.com/company/wind-energy-holding-co-ltd",
      instagram: "https://www.instagram.com/windenergyy",
    },
  },
};
const openSocialLink = async (url) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert("Error", "Cannot open the link.");
  }
};

const ProjectDetails = () => {
  const { name } = useLocalSearchParams();
  const [project, setProject] = useState(null);
  console.log("Received name param:", name); 
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://192.168.39.152:5001/login/project/${name}`);
        const data = await response.json();
  
        if (response.ok && data.project) {
          setProject(data.project); // ✅ Set project using nested object
        } else {
          console.error("Project not found:", data);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
  
    if (name) {
      console.log("Fetching project with name:", name);
      fetchProject();
    }
  }, [name]);
  


  if (!project) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg font-bold text-red-500">Project Not Found</Text>
      </View>
    );
  }

  const progress = project.raisedAmount / project.fundingGoal;
const renderProgressBar = (progress) => {
    return (
      <View style={styles.customProgressContainer}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    );
  };
  return (
    <ScrollView style={{ backgroundColor: theme.background }} className="flex-1">

      {/* Hero Section with Faded Image */}
      <View className="relative rounded-b-3xl overflow-hidden">
        <ImageBackground
          source={{ uri: project.imageUri }}
          className="w-full h-72"
          resizeMode="cover"
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            className="absolute bottom-0 left-0 right-0 h-24"
          />
        </ImageBackground>
        
        {/* Overlapping Title Card */}
        <View className="absolute bottom-0 left-0 right-0 px-5 pb-6">
          <Text className="text-3xl font-pbold text-white shadow-text">{project.name}</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-sm text-white mr-2">📍 Mumbai, Maharashtra</Text>
          </View>
        </View>
      </View>

      {/* Project Details */}
      <View className="p-5 space-y-6">
        {/* Trust Score and Funding Progress */}
        <View style={styles.fundingSection}>
                        <View style={styles.fundingHeader}>
                          <Text style={[styles.raisedAmount, { color: "#ffffff" }]}>
                            ₹{project.raisedAmount.toLocaleString()}
                          </Text>
                          <Text
                            style={[styles.targetAmount, { color: theme.inactive }]}
                          >
                            / ₹{project.fundingGoal.toLocaleString()}
                          </Text>
                        </View>
        
                        {renderProgressBar(progress)}
        
                        <View style={styles.fundingFooter}>
                          <View style={styles.timeRemaining}>
                            <Icon name="clock" size={12} color={theme.inactive} />
                            <Text style={[styles.daysLeft, { color: theme.inactive }]}>
                              15 days left
                            </Text>
                          </View>
        
                          <View style={styles.investors}>
                            <View style={styles.avatarStack}>
                              {[0, 1, 2].map((index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.avatarWrapper,
                                    {
                                      right: index * 12,
                                      backgroundColor: theme.surface,
                                    },
                                  ]}
                                >
                                  <Image
                                    source={{
                                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmI57giWxjA-WXBTE7HIzLV0Y9YcEnxIyrCQ&s",
                                    }}
                                    style={styles.avatar}
                                  />
                                </View>
                              ))}
                            </View>
                            <Text
                              style={[styles.investorCount, { color: theme.inactive }]}
                            >
                              +220 others
                            </Text>
                          </View>
                        </View>
                      </View>
        <TouchableOpacity
          style={[
            styles.detailsButton,
            { backgroundColor: theme.primary },
          ]}
          onPress={() => {
            router.push({
              pathname: "/(tabs)/travel/routescreen",
            
            });
            }}
          >
          <Text style={[styles.buttonText, { color: theme.background }]}>Invest</Text>
        </TouchableOpacity>

        {/* Description */}
        <View>
          <Text className="text-xl font-bold text-white my-3">About This Project</Text>
          <Text style={[styles.description, { color: "#c3cfe2" }]} className="text-base text-white leading-7 tracking-wide">
            {project.description}
          </Text>
        </View>


        <Text className="text-xl font-pbold text-white my-5">Project Impact</Text>
        {/* Impact Metrics Cards */}
        <View className="flex-row flex-wrap justify-between">
          {Object.entries(dummyProjects["650f94bfc7e89f001d1e4e5a"].impactMetrics).map(([key, value]) => (
            <View 
              key={key} 
              style={[styles.card, { backgroundColor: theme.surface }]} 
              className="w-[48%] h-32 bg-gray-100 border border-gray-800 p-5 rounded-xl shadow-md flex-col items-center justify-center"
            >
              {/* Icon */}
              <FontAwesome5 
                name={impactIcons[key]?.icon || "info-circle"} 
                size={28} 
                color={impactIcons[key]?.color || "#6B7280"} 
                className="mb-3"
              />

              {/* Text Content */}
              <Text style={[styles.description, { color: "#c3cfe2" }]} className="text-xs uppercase font-medium tracking-wide text-gray-700 text-center">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </Text>
              <Text className="text-lg font-semibold text-white text-center mt-1">
                {value}
              </Text>
            </View>
          ))}
        </View>



        <View className="pb-3">
          <Text className="text-xl font-bold text-white mb-3">Contact for More Info</Text>
          <View className="flex-row items-center gap-x-4">
            <TouchableOpacity onPress={() => openSocialLink(contact.email ? `mailto:${contact.email}` : "#")}>
              <FontAwesome name="envelope" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openSocialLink(contact.linkedin)}>
              <FontAwesome name="linkedin" size={24} color="#0077b5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openSocialLink(contact.instagram)}>
              <FontAwesome name="instagram" size={24} color="#C13584" />
            </TouchableOpacity>
          </View>
        </View>


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "600",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  card: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  cardContent: {
    padding: 20,
  },
  topSection: {
    marginBottom: 20,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginRight: 16,
  },
  trustBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  trustScore: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  location: {
    fontSize: 13,
    marginBottom: 10,
  },
  description: {
    color: "#c3cfe2",
  },
  imageSection: {
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    marginBottom: 20,
  },
  projectImage: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  overlayStats: {
    position: "absolute",
    bottom: 12,
    left: 12,
    flexDirection: "row",
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 25, 36, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  statText: {
    color: "#ffffff",
    fontSize: 12,
    marginLeft: 4,
  },
  fundingSection: {
    marginBottom: 20,
  },
  fundingHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  raisedAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  targetAmount: {
    fontSize: 14,
    marginLeft: 4,
  },
  customProgressContainer: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00ffcc",
    borderRadius: 2,
  },
  fundingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeRemaining: {
    flexDirection: "row",
    alignItems: "center",
  },
  daysLeft: {
    fontSize: 13,
    marginLeft: 4,
  },
  investors: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarStack: {
    flexDirection: "row",
    width: 36,
    height: 24,
    position: "relative",
  },
  avatarWrapper: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  investorCount: {
    fontSize: 13,
    marginLeft: 12,
  },
  detailsButton: {
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
});


export default ProjectDetails;