// app/product/[id].js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const mockProduct = [
    {
      _id: "60d21b4667d0d8992e610c85",
      name: "Portable Solar Power Bank",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Solar",
      description: "This high-capacity solar power bank allows you to charge your devices anywhere using clean solar energy. Features include fast charging, multiple USB ports, LED light, and weather-resistant design. Perfect for camping, hiking, or emergency backup power.",
      features: [
        "20,000mAh capacity",
        "Dual USB ports",
        "Water-resistant (IP65)",
        "Built-in LED flashlight",
        "Solar and USB charging"
      ],
      rating: 4.7,
      reviews: 128,
      inStock: true,
      createdAt: "2023-06-23T18:25:43.511Z",
      updatedAt: "2023-12-15T09:15:22.471Z"
    },
    {
      _id: "60d21b4667d0d8992e610c86",
      name: "Home Wind Turbine Kit",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Wind",
      description: "Generate your own clean energy with this compact home wind turbine. Suitable for homes and small businesses.",
      features: [
        "Max power output: 400W",
        "Lightweight aluminum body",
        "Works in low wind speeds",
        "Easy installation",
        "Weather-resistant design"
      ],
      rating: 4.5,
      reviews: 89,
      inStock: true,
      createdAt: "2023-05-17T12:11:33.456Z",
      updatedAt: "2024-01-07T14:22:36.129Z"
    },
    {
      _id: "60d21b4667d0d8992e610c87",
      name: "Smart Energy Monitoring System",
      price: 199.99,
      image: "https://tse1.mm.bing.net/th?id=OIP.BcKfUF_T94IQX0OyXpD61AHaEm&pid=Api&P=0&h=180",
      category: "Smart Home",
      description: "Track and optimize your home's energy usage in real-time with this advanced monitoring system.",
      features: [
        "Real-time energy tracking",
        "Mobile app support",
        "AI-powered usage insights",
        "Smart appliance integration",
        "Customizable alerts"
      ],
      rating: 4.9,
      reviews: 212,
      inStock: true,
      createdAt: "2023-08-09T08:45:12.789Z",
      updatedAt: "2024-01-22T11:33:45.012Z"
    },
    {
      _id: "60d21b4667d0d8992e610c88",
      name: "Micro Hydro Generator",
      price: 349.99,
      image: "https://tse1.mm.bing.net/th?id=OIP.Cgylwd0f87r4CM_xTjmKvAHaFL&pid=Api&P=0&h=180",
      category: "Hydro",
      description: "Generate electricity from flowing water sources around your property. Ideal for off-grid homes and farms.",
      features: [
        "Max power output: 600W",
        "Operates in low water flow",
        "Durable stainless steel blades",
        "Easy installation",
        "Supports battery storage"
      ],
      rating: 4.6,
      reviews: 67,
      inStock: false,
      createdAt: "2023-09-27T16:20:18.123Z",
      updatedAt: "2024-02-11T10:05:33.789Z"
    },
    {
      _id: "60d21b4667d0d8992e610c89",
      name: "Biomass Cooking Stove",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1546024664-9226c2d3819b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Biomass",
      description: "Cook efficiently while reducing emissions with this advanced biomass stove. Perfect for sustainable cooking.",
      features: [
        "Low smoke emissions",
        "Efficient fuel consumption",
        "Compact and lightweight",
        "Stainless steel body",
        "Supports multiple fuel types"
      ],
      rating: 4.8,
      reviews: 156,
      inStock: true,
      createdAt: "2023-07-03T09:14:27.456Z",
      updatedAt: "2024-01-15T13:42:18.951Z"
    },
    {
      _id: "60d21b4667d0d8992e610c90",
      name: "Solar Water Heater",
      price: 599.99,
      image: "https://tse3.mm.bing.net/th?id=OIP.88s6L3bMFgiiNsenxfHxzwHaD0&pid=Api&P=0&h=180",
      category: "Solar",
      description: "Heat your water for free using the power of the sun. Perfect for homes looking to reduce energy bills.",
      features: [
        "High-efficiency solar panels",
        "Works in all weather conditions",
        "Integrated storage tank",
        "Long lifespan",
        "Easy installation"
      ],
      rating: 4.7,
      reviews: 94,
      inStock: true,
      createdAt: "2023-10-15T11:55:42.789Z",
      updatedAt: "2024-02-05T15:36:27.159Z"
    }
  ];
  

const ProductDetailsPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  console.log({id})
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
  
    setLoading(true); // Start loading
    const product = mockProduct.find((p) => p._id === id);
  
    if (product) {
      setProduct(product);
    } else {
      setError("Product not found");
    }
    setLoading(false); // End loading
  }, [id]);
  

  const handleAddToCart = () => {
    // This would handle adding to cart logic
    console.log(`Added ${quantity} of product ${id} to cart`);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0a0f1a]">
        <ActivityIndicator size="large" color="#00b890" />
        <Text className="text-[#9ca3af] mt-4 text-base">Loading product details...</Text>
      </View>
    );
  }
  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0f1a' }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Product not found!</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0a0f1a] p-6">
        <Feather name="alert-circle" size={48} color="#ff6b6b" />
        <Text className="text-[#ff6b6b] mt-4 text-base text-center">{error}</Text>
        <TouchableOpacity 
          className="mt-6 py-2.5 px-5 bg-[#131d2a] rounded-lg"
          onPress={() => {
            setLoading(true);
            setError(null);
            // Retry fetching
          }}
        >
          <Text className="text-[#00b890] text-base font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0a0f1a]">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <TouchableOpacity 
          className="absolute top-4 left-4 z-10 bg-black/50 rounded-full w-10 h-10 justify-center items-center"
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        
        {/* Product Image */}
        <View className="w-full h-[300px]">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        
        {/* Product Info */}
        <View className="bg-[#0a0f1a] rounded-t-[24px] mt-[-20px] px-4 pt-5 pb-8">
          <Text className="text-[#00b890] text-sm font-medium mb-1">{product.category}</Text>
          <Text className="text-white text-2xl font-bold mb-2">{product.name}</Text>
          
          <View className="flex-row items-center mb-3">
            <View className="flex-row mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Feather 
                  key={star}
                  name="star" 
                  size={16} 
                  color={star <= Math.floor(product.rating) ? "#FFD700" : "#2a3442"} 
                  style={{ marginRight: 2 }}
                />
              ))}
            </View>
            <Text className="text-[#9ca3af] text-sm">
              {product.rating} ({product.reviews} reviews)
            </Text>
          </View>
          
          <Text className="text-[#00b890] text-2xl font-bold mb-4">${product.price.toFixed(2)}</Text>
          
          <Text className="text-[#e0e0e0] text-base leading-6 mb-6">{product.description}</Text>
          
          {/* Features */}
          <Text className="text-white text-lg font-semibold mb-3">Key Features</Text>
          {product.features.map((feature, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <Feather 
                name="check-circle" 
                size={16} 
                color="#00b890" 
                style={{ marginRight: 8 }} 
              />
              <Text className="text-[#e0e0e0] text-base">{feature}</Text>
            </View>
          ))}
          
          {/* Quantity Selector */}
          <View className="mt-6 mb-4">
            <Text className="text-white text-base font-medium mb-2">Quantity</Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                className="w-8 h-8 bg-[#131d2a] rounded-full justify-center items-center"
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Feather name="minus" size={16} color="white" />
              </TouchableOpacity>
              <Text className="text-white text-lg font-medium mx-4">{quantity}</Text>
              <TouchableOpacity
                className="w-8 h-8 bg-[#131d2a] rounded-full justify-center items-center"
                onPress={() => setQuantity(quantity + 1)}
              >
                <Feather name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Add to Cart Button */}
          <TouchableOpacity
            className="flex-row items-center justify-center bg-[#00b890] py-3 px-4 rounded-xl mt-4"
            onPress={handleAddToCart}
          >
            <Feather name="shopping-cart" size={20} color="white" style={{ marginRight: 8 }} />
            <Text className="text-white text-lg font-semibold">Pledge Money</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsPage;