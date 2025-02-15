import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Onboard = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        investmentPreferences: [],
        budget: '',
        riskTolerance: '',
        pastInvestments: '',
        sustainabilityGoals: ''
    });

    const updateForm = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Progress bar component
    const ProgressBar = () => (
        <View className="flex-row justify-between py-8 items-center">
            {[1, 2, 3, 4].map((num) => (
                <View key={num} className="items-center">
                    <View
                        className={`w-8 h-8 rounded-full items-center justify-center
              ${step >= num ? 'bg-[#00b890]' : 'bg-background'}`}
                    >
                        <Text className="text-white">{num}</Text>
                    </View>
                    <View
                        className={`h-1 w-16 ${num === 4 ? 'hidden' : ''} 
              ${step > num ? 'bg-[#00b890]' : 'bg-[#131d2a]'}`}
                    />
                </View>
            ))}
        </View>
    );

    // Step 1: Basic Info
    const renderBasicInfo = () => (
        <View className="space-y-12 bg-surface mx-4 p-4 rounded-2xl" style={{ padding: 24 }}>
            <Text className="text-2xl font-bold text-white mb-6">Basic Information</Text>

            <View className="space-y-2">
                <Text className="text-gray-400">Full Name</Text>
                <View className="flex-row items-center bg-[#131d2a] rounded-lg p-3">
                    <MaterialCommunityIcons name="account" size={24} color="#00b890" />
                    <TextInput
                        className="flex-1 ml-3 text-white"
                        placeholder="Enter your name"
                        placeholderTextColor="#4a5568"
                        value={formData.name}
                        onChangeText={(text) => updateForm('name', text)}
                    />
                </View>
            </View>

            <View className="space-y-2">
                <Text className="text-gray-400">Email</Text>
                <View className="flex-row items-center bg-[#131d2a] rounded-lg p-3">
                    <MaterialCommunityIcons name="email" size={24} color="#00b890" />
                    <TextInput
                        className="flex-1 ml-3 text-white"
                        placeholder="Enter your email"
                        placeholderTextColor="#4a5568"
                        keyboardType="email-address"
                        value={formData.email}
                        onChangeText={(text) => updateForm('email', text)}
                    />
                </View>
            </View>
        </View>
    );

    // Step 2: Contact & Location
    const renderContactInfo = () => (
        <View className="space-y-12 bg-surface mx-4 rounded-2xl" style={{ padding: 24 }}>
            <Text className="text-2xl font-bold text-white mb-6">Contact Details</Text>

            <View className="space-y-2">
                <Text className="text-gray-400">Phone Number</Text>
                <View className="flex-row items-center bg-[#131d2a] rounded-lg p-3">
                    <MaterialCommunityIcons name="phone" size={24} color="#00b890" />
                    <TextInput
                        className="flex-1 ml-3 text-white"
                        placeholder="Enter your phone number"
                        placeholderTextColor="#4a5568"
                        keyboardType="phone-pad"
                        value={formData.phone}
                        onChangeText={(text) => updateForm('phone', text)}
                    />
                </View>
            </View>

            <View className="space-y-2">
                <Text className="text-gray-400">Location</Text>
                <View className="flex-row items-center bg-[#131d2a] rounded-lg p-3">
                    <MaterialCommunityIcons name="map-marker" size={24} color="#00b890" />
                    <TextInput
                        className="flex-1 ml-3 text-white"
                        placeholder="Enter your location"
                        placeholderTextColor="#4a5568"
                        value={formData.location}
                        onChangeText={(text) => updateForm('location', text)}
                    />
                </View>
            </View>
        </View>
    );

    // Step 3: Investment Preferences
    const renderInvestmentDetails = () => {
        const investmentTypes = [
            { icon: 'solar-power', label: 'Solar', value: 'solar' },
            { icon: 'wind-turbine', label: 'Wind', value: 'wind' },
            { icon: 'water', label: 'Hydro', value: 'hydro' }
        ];

        return (
            <View className="space-y-12 bg-surface mx-4 p-4 rounded-2xl" style={{ padding: 24 }}>
                <Text className="text-2xl font-bold text-white mb-6">Investment Interests</Text>

                <Text className="text-gray-400 mb-2">Select Investment Types</Text>
                <View style={{ marginHorizontal: 16, paddingVertical: 12 }}>
                    {investmentTypes.map((type) => (
                        <TouchableOpacity
                            key={type.value}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 8,
                                marginVertical: 4,
                                borderRadius: 12,
                                backgroundColor: formData.investmentPreferences.includes(type.value) ? "#00b890" : "#131d2a",
                                borderWidth: formData.investmentPreferences.includes(type.value) ? 1 : 0,
                                borderColor: formData.investmentPreferences.includes(type.value) ? "#00b890" : "transparent",

                            }}
                            onPress={() => {
                                const newPreferences = (formData.investmentPreferences as string[]).includes(type.value)
                                    ? (formData.investmentPreferences as string[]).filter((item) => item !== type.value)
                                    : [...(formData.investmentPreferences as string[]), type.value];
                                console.log("ij", newPreferences)
                                updateForm("investmentPreferences", newPreferences); // ✅ Now TypeScript won't complain

                            }}


                        >
                            <MaterialCommunityIcons
                                name={type.icon}
                                size={24}
                                color={formData.investmentPreferences.includes(type.value) ? "white" : "#00b890"}
                                style={{ marginRight: 10 }}
                            />
                            <Text style={{ color: "white", marginLeft: 8, fontSize: 16 }}>{type.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    // Step 4: Risk & Budget
    const renderRiskAndBudget = () => {
        const riskLevels = [
            { icon: 'shield-check', label: 'Conservative', value: 'conservative' },
            { icon: 'chart-line', label: 'Moderate', value: 'moderate' },
            { icon: 'rocket-launch', label: 'Aggressive', value: 'aggressive' }
        ];

        return (
            <View className="space-y-12 bg-surface mx-4 p-4 rounded-2xl" style={{ padding: 24 }}>
                <Text className="text-2xl font-bold text-white mb-6">Risk & Budget</Text>

                <Text className="text-gray-400 mb-2">Risk Tolerance</Text>
                <View className="space-y-3">
                    {riskLevels.map((level) => (
                        <TouchableOpacity
                            key={level.value}
                            className={`flex-row items-center p-4 rounded-lg ${formData.riskTolerance === level.value
                                ? 'bg-primary border border-primary'
                                : 'bg-darkBlue'
                                }`}
                            onPress={() => updateForm('riskTolerance', level.value)}
                        >
                            <MaterialCommunityIcons name={level.icon} size={24} color={formData.riskTolerance === level.value ? '#FFFFFF' : '#00b890'} className='mr-2' />
                            <Text className="text-white ml-3">{level.label}</Text>
                        </TouchableOpacity>

                    ))}
                </View>

                <View className="space-y-2 mt-4">
                    <Text className="text-gray-400">Investment Budget</Text>
                    <View className="flex-row items-center bg-[#131d2a] rounded-lg p-3">
                        <MaterialCommunityIcons name="currency-usd" size={24} color="#00b890" />
                        <TextInput
                            className="flex-1 ml-3 text-white"
                            placeholder="Enter your budget range"
                            placeholderTextColor="#4a5568"
                            keyboardType="numeric"
                            value={formData.budget}
                            onChangeText={(text) => updateForm('budget', text)}
                        />
                    </View>
                </View>
            </View>
        );
    };

    const renderNavigationButtons = () => (
        <View className="flex-row mt-8" style={{ justifyContent: "space-around", marginTop: 20 }}>
            {step > 1 && (
                <TouchableOpacity
                    className="flex-row items-center bg-[#131d2a] border-1 border-[#00b890] px-6 py-3 rounded-lg"
                    onPress={() => setStep(step - 1)}
                >
                    <MaterialCommunityIcons name="chevron-left" size={24} color="#FFFFFF" className="mr-2" />
                    <Text className="text-white">Previous</Text>
                </TouchableOpacity>
            )}

            {step < 4 ? (
                <TouchableOpacity
                    className="flex-row items-center bg-[#00b890] px-6 py-3 rounded-lg ml-auto"
                    onPress={() => setStep(step + 1)}
                >
                    <Text className="text-white mr-2">Next</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    className="flex-row items-center bg-[#00b890] px-6 py-3 rounded-lg ml-auto"
                    onPress={() => {
                        console.log("Submit form:", formData);
                        router.push("/home"); // Redirect to Home screen
                    }}
                >
                    <Text className="text-white mr-2">Complete</Text>
                    <MaterialCommunityIcons name="check" size={24} color="white" />
                </TouchableOpacity>
            )}
        </View>
    );

    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return renderBasicInfo();
            case 2:
                return renderContactInfo();
            case 3:
                return renderInvestmentDetails();
            case 4:
                return renderRiskAndBudget();
            default:
                return null;
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background px-4">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View className="w-11/12">
                    {/* <ProgressBar/> */}
                    {step === 1 && renderBasicInfo()}
                    {step === 2 && renderContactInfo()}
                    {step === 3 && renderInvestmentDetails()}
                    {step === 4 && renderRiskAndBudget()}
                    {renderNavigationButtons()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Onboard;