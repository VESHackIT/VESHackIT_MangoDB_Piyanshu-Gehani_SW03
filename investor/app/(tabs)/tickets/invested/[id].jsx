import { useState, useCallback, memo } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Memoized message component to prevent unnecessary re-renders
const MessageItem = memo(({ item, currentUser }) => {
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isCurrentUser = item.sender === currentUser;

  return (
    <View className={`my-2 ${isCurrentUser ? "items-end" : "items-start"}`}>
      <View className={`max-w-[80%] rounded-xl p-3 shadow-md ${
        isCurrentUser 
          ? "bg-[#00b890] rounded-br-none" 
          : "bg-[#131d2a] rounded-bl-none"
      }`}>
        {/* Sender Name (for non-current user) */}
        {!isCurrentUser && (
          <Text className="text-[#00b890] text-xs font-semibold mb-1">
            {item.sender}
          </Text>
        )}
        <Text className="text-white">{item.text}</Text>
        <Text className={`text-xs mt-1 ${
          isCurrentUser ? "text-[#e0fcf4]" : "text-[#64748b]"
        }`}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );
});

export default function InvestmentChat() {
  const { id } = useLocalSearchParams();
  const currentUser = "Investor1";
  const projectName = "Solar Farm Initiative";

  const [messages, setMessages] = useState([
    { 
      id: "1", 
      sender: "Founder", 
      text: "Hello investors! We've completed the site preparation phase.",
      timestamp: "2023-07-20T09:30:00"
    },
    { 
      id: "2", 
      sender: "Investor1", 
      text: "That's great news! When can we expect the first energy production?",
      timestamp: "2023-07-20T09:35:00"
    },
    { 
        id: "3", 
        sender: "Investor2", 
        text: "That's great news! When can we expect the first energy production?",
        timestamp: "2023-07-20T09:35:00"
      },
  ]);

  const [newMessage, setNewMessage] = useState("");

  // Memoized send message function
  const sendMessage = useCallback(() => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        sender: currentUser,
        text: newMessage,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [newMsg, ...prev]);
      setNewMessage("");
    }
  }, [newMessage]);

  return (
    <SafeAreaView className="flex-1 bg-[#0a0f1a]">
      {/* Project Header (Added Margin-Top to Fix Overflow) */}
      <View className="mt-8 pt-4 pb-3 px-4 border-b border-[#1e293b]">
        <Text className="text-white text-xl font-bold mb-1">{projectName}</Text>
        <Text className="text-[#00b890] text-sm">Investment ID: {id}</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        className="px-4 pt-4"
        initialNumToRender={10}
        windowSize={7}
        renderItem={({ item }) => (
          <MessageItem item={item} currentUser={currentUser} />
        )}
      />

      {/* Message Input */}
      <View className="flex-row items-center p-4 border-t border-[#1e293b]">
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          placeholderTextColor="#64748b"
          className="flex-1 bg-[#131d2a] text-white px-4 py-3 rounded-xl mr-3"
          multiline
        />
        
        <TouchableOpacity 
          onPress={sendMessage}
          className="bg-[#00b890] p-3 rounded-xl"
          disabled={!newMessage.trim()}
        >
          <MaterialCommunityIcons 
            name="send" 
            size={20} 
            color={newMessage.trim() ? "#fff" : "#ffffff60"} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
