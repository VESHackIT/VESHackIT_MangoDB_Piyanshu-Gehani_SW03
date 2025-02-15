import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {router} from 'expo-router';
const SustainableEcommercePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Solar', 'Wind', 'Hydro', 'Biomass'];

  // Simulate fetching data from MongoDB
  useEffect(() => {
    // This would normally be an API call to your MongoDB
    const fetchProducts = async () => {
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data in MongoDB-like structure
        const mockProductsData = [
          {
            _id: "60d21b4667d0d8992e610c85",
            name: "Portable Solar Power Bank",
            price: 129.99,
            image: "https://tse4.mm.bing.net/th?id=OIP.qr4HLOel4qHrYqrZ-amupgHaHa&pid=Api&P=0&h=180",
            category: "Solar",
            description: "Charge your devices anywhere with this high-capacity solar power bank",
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
            description: "Generate your own clean energy with this compact home wind turbine",
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
            description: "Track and optimize your home's energy usage in real-time",
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
            description: "Generate electricity from flowing water sources around your property",
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
            description: "Cook efficiently while reducing emissions with this advanced biomass stove",
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
            image: "https://images.unsplash.com/photo-1640937590055-135e03951037?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            category: "Solar",
            description: "Heat your water for free using the power of the sun",
            rating: 4.7,
            reviews: 94,
            inStock: true,
            createdAt: "2023-10-15T11:55:42.789Z",
            updatedAt: "2024-02-05T15:36:27.159Z"
          }
        ];
        
        setProducts(mockProductsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const filteredProducts = selectedFilter === 'All' 
    ? products 
    : products.filter(product => product.category === selectedFilter);

  const renderProductCard = ({ item }) => (
    <TouchableOpacity 
      style={{
        width: '48%',
        backgroundColor: '#131d2a',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
      }}
      onPress={() => {
                    router.push({
                        pathname: "/(tabs)/account/productdetails",
                        params: { id: item._id },
                    });
                  }}
    >
      <View style={{ height: 120, borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 4 }}>{item.name}</Text>
      <Text style={{ color: '#00b890', fontSize: 16, fontWeight: '700', marginBottom: 6 }}>${item.price.toFixed(2)}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="star" size={14} color="#FFD700" />
          <Text style={{ color: '#9ca3af', marginLeft: 4, fontSize: 14 }}>{item.rating}</Text>
        </View>
        <Text style={{ color: '#9ca3af', fontSize: 12 }}>
          {item.reviews} reviews
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#0a0f1a', padding: 16 }}>
      {/* Search Bar and Profile Icon */}
      <View style={{ flexDirection: 'row', marginBottom: 16, alignItems: 'center' }}>
        <View style={{ 
          flex: 1, 
          height: 50, 
          backgroundColor: '#131d2a', 
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          marginRight: 12
        }}>
          <Feather name="search" size={20} color="#9ca3af" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, color: 'white', fontSize: 16 }}
          />
        </View>
        <TouchableOpacity>
          <View style={{ 
            width: 50, 
            height: 50, 
            backgroundColor: '#131d2a', 
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Feather name="camera" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Informative Card */}
        <TouchableOpacity
          style={{
            backgroundColor: '#131d2a',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: '#00b890',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
            Explore Sustainable Products
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 14 }}>
            Handpicked eco-friendly products from our founders
          </Text>
        </TouchableOpacity>

        {/* Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={{ marginBottom: 20 }}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: selectedFilter === filter ? '#00b890' : '#131d2a',
                borderRadius: 20,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  color: selectedFilter === filter ? 'white' : '#9ca3af',
                  fontWeight: selectedFilter === filter ? '600' : '400',
                }}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Grid */}
        {loading ? (
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Loading products...</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={filteredProducts}
              renderItem={renderProductCard}
              keyExtractor={(item) => item._id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={{ color: 'white', textAlign: 'center', padding: 20 }}>
                  No products found in this category
                </Text>
              }
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SustainableEcommercePage;