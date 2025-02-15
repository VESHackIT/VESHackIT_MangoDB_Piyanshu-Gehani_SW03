import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8; // Card size
const CARD_MARGIN = 15; // Margin between cards
const ITEM_SIZE = CARD_WIDTH + CARD_MARGIN * 2; // Total item width


const data = [
  {
    id: '1',
    title: 'Solar Energy for Schools',
    description: 'Bringing solar power to rural schools for a sustainable future.',
    funded: 7500,
    goal: 10000,
    supporters: 320,
    image: 'https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2024/12/Major-Events-that-Impacted-the-Indian-Solar-Sector-in-2024.jpg',
  },
  {
    id: '2',
    title: 'Reforest the Amazon',
    description: 'Planting 50,000 trees to restore the rainforest.',
    funded: 5400,
    goal: 8000,
    supporters: 210,
    image: 'https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2024/12/Major-Events-that-Impacted-the-Indian-Solar-Sector-in-2024.jpg',
  },
  {
    id: '3',
    title: 'Clean Water Initiative',
    description: 'Providing water filters to villages affected by pollution.',
    funded: 6800,
    goal: 12000,
    supporters: 410,
    image: 'https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2024/12/Major-Events-that-Impacted-the-Indian-Solar-Sector-in-2024.jpg',
  },
  {
    id: '4',
    title: 'Ocean Cleanup Drive',
    description: 'Removing 10,000 tons of plastic waste from oceans.',
    funded: 9200,
    goal: 15000,
    supporters: 500,
    image: 'https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2024/12/Major-Events-that-Impacted-the-Indian-Solar-Sector-in-2024.jpg',
  },
];

const ProjectCarousel = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
  ref={flatListRef}
  data={data}
  horizontal
  showsHorizontalScrollIndicator={false}
  pagingEnabled
  snapToInterval={ITEM_SIZE}
  snapToAlignment="center"
  decelerationRate="fast"
  keyExtractor={(item) => item.id}
  getItemLayout={(data, index) => ({
    length: ITEM_SIZE,
    offset: ITEM_SIZE * index,
    index,
  })}
  scrollEventThrottle={16} // Smoother scrolling experience
  onScroll={(event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / ITEM_SIZE);
    setCurrentIndex(newIndex);
  }}
  onMomentumScrollEnd={(event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / ITEM_SIZE);
    setCurrentIndex(newIndex);
  }}
  renderItem={({ item, index }) => {
    const isActive = index === currentIndex;
    const progress = (item.funded / item.goal) * 100;
    return (
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { scale: isActive ? 1 : 0.8 },
              { perspective: 1000 },
              { rotateY: isActive ? '0deg' : '15deg' },
            ],
            opacity: isActive ? 1 : 0.7,
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {/* Funding Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.fundingText}>
          ${item.funded} raised of ${item.goal}
        </Text>

        <Text style={styles.supporters}>{item.supporters} supporters</Text>
      </Animated.View>
    );
  }}
/>


      {/* Navigation Buttons
      <View style={styles.buttons}>
        <TouchableOpacity
          disabled={currentIndex === 0}
          onPress={() => handleScroll(currentIndex - 1)}
          style={[styles.button, currentIndex === 0 && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={currentIndex === data.length - 1}
          onPress={() => handleScroll(currentIndex + 1)}
          style={[styles.button, currentIndex === data.length - 1 && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ProjectCarousel;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40, 
  },
  card: {
    width: CARD_WIDTH,
    height: 300,
    backgroundColor: '#131d2a',
    color: '#fff',  
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginHorizontal: CARD_MARGIN,
    elevation: 6, // Android Shadow
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
  occupation: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#777',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 25,
  },
  button: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  disabledButton: {
    backgroundColor: '#1A1F2E',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fundingText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#888',
  },
  supporters: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#00b8a0', // Green color
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});
