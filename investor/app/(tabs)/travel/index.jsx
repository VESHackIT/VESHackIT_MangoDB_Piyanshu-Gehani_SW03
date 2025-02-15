import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar, // Import StatusBar
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";

// Mock data remains unchanged
const dummyData = [
  {
    _id: "650f94bfc7e89f001d1e4e5a",
    name: "Solar Grid for Green Town",
    description: "A community-driven solar power project for Green Town.",
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
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9I5m26BeOtJX4wwWXvp0bD0go3kmRDx6RLQ&s",
    daysLeft: 15,
  },
  {
    _id: "650f94bfc7e89f001d1e4e5b",
    name: "Wind Energy Project",
    description: "A sustainable wind energy initiative.",
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
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTK-W-QAu_Gpf7GW7m21q8wSPUMATtrlzw_w&s",
    daysLeft: 20,
  },
];

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const statusBarHeight = StatusBar.currentHeight || 20; // Default value if StatusBar.currentHeight is null

  // Define our theme colors - Using ORIGINAL Colors
  const theme = {
    background: "#0a0f1a", // Darker background
    surface: "#131d2a", // Darker card surface
    primary: "#00b890", // Adjusted green shade
    primaryTransparent: "rgba(0, 216, 160, 0.1)", // Adjusted transparent green
    inactive: "#7a8ca2", // Slightly muted inactive color
    shadow: "#000",
  };

  useEffect(() => {
    setProjects(dummyData);
  }, []);

  const renderProgressBar = (progress) => {
    return (
      <View style={styles.customProgressContainer}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: statusBarHeight + 20 },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: "#ffffff" }]}>
          Explore Projects
        </Text>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: theme.primaryTransparent,
              borderColor: theme.primaryTransparent,
            },
          ]}
        >
          <Icon name="sliders" size={18} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {projects.map((project) => {
        const progress = project.raisedAmount / project.targetAmount;
        return (
          <TouchableOpacity
            key={project._id}
            style={[styles.card, { backgroundColor: theme.surface }]}
            onPress={() => {
              router.push({
                pathname: "/(tabs)/travel/projectdetails",
                params: { id: project._id },
              });
            }}
          >
            <View style={styles.cardContent}>
              <View style={styles.topSection}>
                <View style={styles.headerSection}>
                  <Text style={[styles.projectName, { color: "#ffffff" }]}>
                    {project.name}
                  </Text>
                  <View
                    style={[
                      styles.trustBadge,
                      {
                        backgroundColor: theme.primaryTransparent,
                        borderColor: theme.primaryTransparent,
                      },
                    ]}
                  >
                    <Icon name="shield" size={12} color={theme.primary} />
                    <Text style={[styles.trustScore, { color: theme.primary }]}>
                      {project.impactMetrics.trustScore.split("/")[0]}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.location, { color: theme.inactive }]}>
                  <Icon name="map-pin" size={12} color={theme.inactive} />
                  {project.location}
                </Text>
                <Text style={[styles.description, { color: "#c3cfe2" }]}>
                  {project.description}
                </Text>
              </View>

              <View style={styles.imageSection}>
                <Image
                  source={{ uri: project.imageUrl }}
                  style={styles.projectImage}
                  resizeMode="cover"
                />

                <LinearGradient
                  colors={["rgba(15, 25, 36, 0)", "rgba(15, 25, 36, 0.9)"]}
                  style={styles.imageGradient}
                />

                <View style={styles.overlayStats}>
                  <View
                    style={[
                      styles.statBadge,
                      { backgroundColor: "rgba(15, 25, 36, 0.7)" },
                    ]}
                  >
                    <Icon name="users" size={12} color={theme.primary} />
                    <Text style={[styles.statText, { color: "#ffffff" }]}>
                      {project.impactMetrics.householdsBenefited}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statBadge,
                      { backgroundColor: "rgba(15, 25, 36, 0.7)" },
                    ]}
                  >
                    <Icon name="trending-up" size={12} color={theme.primary} />
                    <Text style={[styles.statText, { color: "#ffffff" }]}>
                      {project.impactMetrics.roi}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.fundingSection}>
                <View style={styles.fundingHeader}>
                  <Text style={[styles.raisedAmount, { color: "#ffffff" }]}>
                    ₹{project.raisedAmount.toLocaleString()}
                  </Text>
                  <Text
                    style={[styles.targetAmount, { color: theme.inactive }]}
                  >
                    / ₹{project.targetAmount.toLocaleString()}
                  </Text>
                </View>

                {renderProgressBar(progress)}

                <View style={styles.fundingFooter}>
                  <View style={styles.timeRemaining}>
                    <Icon name="clock" size={12} color={theme.inactive} />
                    <Text style={[styles.daysLeft, { color: theme.inactive }]}>
                      {project.daysLeft} days left
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
                      {project.investors[project.investors.length - 1]}
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
                    pathname: "/(tabs)/travel/projectdetails",
                    params: { id: project._id },
                  });
                }}
              >
                <Text style={[styles.buttonText, { color: theme.background }]}>
                  View Details
                </Text>
                <Icon name="arrow-right" size={16} color={theme.background} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
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
    fontSize: 14,
    lineHeight: 20,
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
    backgroundColor: "#00b890",
    borderRadius: 4,
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

export default ProjectList;
