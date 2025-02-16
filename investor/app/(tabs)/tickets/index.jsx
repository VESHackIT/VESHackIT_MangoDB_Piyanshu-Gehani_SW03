import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, View, Text, TouchableOpacity, Image, SafeAreaView, Modal, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Renewable energy focused dummy data
const INVESTED_PROJECTS = [
  {
    id: 1,
    title: 'Solar Farm Initiative',
    description: 'Community-funded 50MW solar power plant in Nevada',
    amount: '$150,000',
    founder: 'Green Energy Collective',
    photo: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Wind Turbine Project',
    description: 'Offshore wind energy generation for coastal cities',
    amount: '$200,000',
    founder: 'EcoPower Solutions',
    photo: 'https://images.unsplash.com/photo-1483977399921-6cf94f6fdc3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

export default function CommunitySection() {
  const [communityDiscussions, setCommunityDiscussions] = useState([
    {
      id: 1,
      title: 'Fixing Potholes in Downtown',
      description: "Let's organize a weekend pothole repair drive and request city assistance.",
      createdBy: 'Alex Johnson',
      votes: 56,
      comments: 4,
      bgColor: '#131d2a',
      iconColor: '#00b890',
      liked: false
    },
    {
      id: 2,
      title: 'Community Cleanup Initiative',
      description: 'Plan a cleanup day for the local park and invite volunteers.',
      createdBy: 'Samantha Lee',
      votes: 102,
      comments: 25,
      bgColor: '#131d2a',
      iconColor: '#00b890',
      liked: false
    },
    {
      id: 3,
      title: 'Streetlight Safety Concerns',
      description: 'Report and replace broken streetlights to improve nighttime safety.',
      createdBy: 'Michael Brown',
      votes: 78,
      comments: 18,
      bgColor: '#131d2a',
      iconColor: '#00b890',
      liked: false
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    description: '',
    createdBy: ''
  });

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news data from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5001/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNewsData(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const toggleLike = (id) => {
    setCommunityDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion => {
        if (discussion.id === id) {
          return {
            ...discussion,
            liked: !discussion.liked,
            votes: discussion.liked ? discussion.votes - 1 : discussion.votes + 1
          };
        }
        return discussion;
      })
    );
  };

  const addNewDiscussion = () => {
    if (newDiscussion.title && newDiscussion.description && newDiscussion.createdBy) {
      const newId = Math.max(...communityDiscussions.map(d => d.id)) + 1;
      setCommunityDiscussions([
        ...communityDiscussions,
        {
          id: newId,
          title: newDiscussion.title,
          description: newDiscussion.description,
          createdBy: newDiscussion.createdBy,
          votes: 0,
          comments: 0,
          bgColor: '#131d2a',
          iconColor: '#00b890',
          liked: false
        }
      ]);
      setNewDiscussion({ title: '', description: '', createdBy: '' });
      setModalVisible(false);
    }
  };

  const DiscussionCard = ({ discussion }) => (
    <TouchableOpacity
      className="rounded-xl mb-4 overflow-hidden p-4"
      style={{ backgroundColor: discussion.bgColor }}
      onPress={() => router.push({ pathname: '/tickets/open', params: { discussion: JSON.stringify(discussion) }, })}
    >
      <View className="flex-row items-center mb-3">
        <MaterialIcons name="forum" size={24} color={discussion.iconColor} />
        <View className="ml-4">
          <Text className="text-white text-lg font-semibold">{discussion.title}</Text>
          <Text className="text-gray-400 text-sm">by {discussion.createdBy}</Text>
        </View>
      </View>
      <Text className="text-gray-300 text-sm mb-4">{discussion.description}</Text>
      <View className="flex-row justify-between items-center border-t border-gray-700 pt-3">
        <TouchableOpacity onPress={() => toggleLike(discussion.id)} className="flex-row items-center">
          <Ionicons name={discussion.liked ? "heart" : "heart-outline"} size={18} color={discussion.liked ? discussion.iconColor : "gray"} />
          <Text className="text-gray-400 ml-1">{discussion.votes}</Text>
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Ionicons name="chatbubble-outline" size={18} color="gray" />
          <Text className="text-gray-400 ml-1">{discussion.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#0a0f1a' }}>
      <ScrollView className='mt-10'>
        <View className="py-6">
          <Text className="text-2xl px-5 mb-4 text-white font-semibold">Your Renewable Investments</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5">
            {INVESTED_PROJECTS.map((project) => (
              <TouchableOpacity
                key={project.id}
                onPress={() => router.push(`/tickets/invested/${project.id}`)}
                className="rounded-xl mr-5 w-80 overflow-hidden"
                style={{ backgroundColor: '#131d2a' }}
              >
                <Image source={{ uri: project.photo }} className="w-full h-40" />
                <View className="p-4">
                  <Text className="text-white text-lg font-semibold mb-1">{project.title}</Text>
                  <Text className="text-gray-400 text-sm mb-2">{project.description}</Text>
                  <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-gray-400 text-xs">Founder: {project.founder}</Text>
                    <Text className="text-[#00b890] text-sm font-bold">{project.amount}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* News Section */}
        {/* News Section */}
<View className="py-6">
  <Text className="text-2xl px-5 mb-4 text-white font-semibold">Latest Renewable Energy News</Text>
  {loading ? (
    <ActivityIndicator size="large" color="#00b890" />
  ) : error ? (
    <Text className="text-red-500 px-5">{error}</Text>
  ) : (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      className="pl-5"
      contentContainerStyle={{ paddingRight: 20 }}
    >
      {newsData.map((news, index) => (
        <TouchableOpacity
          key={index}
          className="rounded-xl mr-4 overflow-hidden"
          style={{ 
            width: width * 0.85,
            backgroundColor: '#172233',
            borderLeftWidth: 4,
            borderLeftColor: '#00b890'
          }}
          activeOpacity={0.9}
        >
          <View className="p-5 h-40 justify-between">
            <View>
              <Text 
                className="text-white text-lg font-bold mb-2" 
                numberOfLines={2}
                style={{ lineHeight: 24 }}
              >
                {news.title}
              </Text>
              <Text className="text-[#00b890] text-sm font-medium">
                {news.source}
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-400 text-xs">
                {news.timestamp}
              </Text>
              <MaterialIcons 
                name="arrow-forward" 
                size={20} 
                color="#00b890" 
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )}
</View>

        {/* Community Discussions Section */}
        <View className="px-5 py-6">
          <Text className="text-2xl mb-5 text-white font-semibold">Community Discussions</Text>
          {communityDiscussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </View>
      </ScrollView>

      {/* Add Discussion Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full justify-center items-center"
        style={{ backgroundColor: '#00b890' }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Add Discussion Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className="bg-[#131d2a] rounded-t-3xl p-6" style={{ maxHeight: '80%' }}>
            <Text className="text-white text-2xl font-bold mb-4">New Discussion</Text>

            <Text className="text-gray-300 mb-2">Title</Text>
            <TextInput
              className="bg-[#0a0f1a] text-white p-3 rounded-lg mb-4"
              placeholder="Enter discussion title"
              placeholderTextColor="#666"
              value={newDiscussion.title}
              onChangeText={(text) => setNewDiscussion({ ...newDiscussion, title: text })}
            />

            <Text className="text-gray-300 mb-2">Description</Text>
            <TextInput
              className="bg-[#0a0f1a] text-white p-3 rounded-lg mb-4"
              placeholder="Enter discussion description"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={newDiscussion.description}
              onChangeText={(text) => setNewDiscussion({ ...newDiscussion, description: text })}
            />

            <Text className="text-gray-300 mb-2">Your Name</Text>
            <TextInput
              className="bg-[#0a0f1a] text-white p-3 rounded-lg mb-6"
              placeholder="Enter your name"
              placeholderTextColor="#666"
              value={newDiscussion.createdBy}
              onChangeText={(text) => setNewDiscussion({ ...newDiscussion, createdBy: text })}
            />

            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="py-3 px-6 rounded-lg mr-3"
              >
                <Text className="text-gray-400 font-semibold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={addNewDiscussion}
                className="bg-[#00b890] py-3 px-6 rounded-lg"
                disabled={!newDiscussion.title || !newDiscussion.description || !newDiscussion.createdBy}
                style={{
                  opacity: (!newDiscussion.title || !newDiscussion.description || !newDiscussion.createdBy) ? 0.5 : 1
                }}
              >
                <Text className="text-white font-semibold">Add Discussion</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}