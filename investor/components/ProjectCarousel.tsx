import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_MARGIN = 8;
const ITEM_SIZE = CARD_WIDTH + CARD_MARGIN * 2;
const SPACER = (width - CARD_WIDTH - CARD_MARGIN) / 2;

const data = [
  {
    id: '1',
    title: 'Solar Energy for Schools',
    description: 'Bringing solar power to rural schools for a sustainable future.',
    funded: 7500,
    goal: 10000,
    supporters: 320,
    image: 'https://images.unsplash.com/photo-1484399172022-72a90b12e3c1',
  },
  {
    id: '2',
    title: 'Reforest the Amazon',
    description: 'Planting 50,000 trees to restore the rainforest.',
    funded: 5400,
    goal: 8000,
    supporters: 210,
    image: 'https://images.unsplash.com/photo-1464790719320-516ecd75af6c',
  },
  {
    id: '3',
    title: 'Clean Water Initiative',
    description: 'Providing water filters to villages affected by pollution.',
    funded: 6800,
    goal: 12000,
    supporters: 410,
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29',
  },
  {
    id: '4',
    title: 'Ocean Cleanup Drive',
    description: 'Removing 10,000 tons of plastic waste from oceans.',
    funded: 9200,
    goal: 15000,
    supporters: 500,
    image: 'https://images.unsplash.com/photo-1536939459926-301728717817',
  },
];

const ProjectCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          paddingHorizontal: SPACER,
          paddingVertical: 40, // Add padding to account for the scale/translateY animations
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1.05, 0.9],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [15, -30, 15],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });

          const rotateX = scrollX.interpolate({
            inputRange,
            outputRange: ['20deg', '0deg', '20deg'],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [
                    { perspective: 1000 },
                    { scale },
                    { translateY },
                    { rotateX },
                  ],
                  opacity,
                },
              ]}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.supportersBadge}>
                  <Text style={styles.supportersText}>
                    {item.supporters} supporters
                  </Text>
                </View>
              </View>

              <View style={styles.contentContainer}>
                <Text className='font-psemibold' style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.progressContainer}>
                  <View style={styles.progressInfo}>
                    <Text style={styles.fundingAmount}>
                      ${item.funded.toLocaleString()}
                    </Text>
                    <Text style={styles.fundingGoal}>
                      of ${item.goal.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progress,
                        { width: `${(item.funded / item.goal) * 100}%` },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500, // Increased height to accommodate the animated scaling and translation
    marginTop: 0, // Removed top margin as we're using paddingVertical in FlatList
    marginLeft: -16,
    marginRight: -16,
    marginBottom: -80,
  },
  card: {
    width: CARD_WIDTH,
    height: 380,
    backgroundColor: '#1a2a38',
    borderRadius: 20,
    marginHorizontal: CARD_MARGIN,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: '#243447',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#a0aec0',
    lineHeight: 20,
    marginBottom: 20,
  },
  progressContainer: {
    width: '100%',
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  fundingAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 4,
  },
  fundingGoal: {
    color: '#718096',
    fontSize: 14,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4ade80',
    borderRadius: 3,
  },
  supportersBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  supportersText: {
    color: '#1a2a38',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ProjectCarousel;