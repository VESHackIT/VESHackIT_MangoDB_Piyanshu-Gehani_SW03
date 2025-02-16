import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const Onboard = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
    });
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);

    const updateForm = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerification = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            navigation.navigate('Home');
        }, 2000);
    };

    const verifyPhone = async () => {
        console.log("phoneeeeeeee", formData.phone);
        try {
            const response = await fetch("https://tsec-hack-server.onrender.com/auth/send-otp", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phonenumber: formData.phone }) 
            });
            console.log("Response", response);
            
            router.push('/home')
            
            // if (!response.ok) throw new Error("Failed to send OTP");
    
            setStep(2);
            // Alert.alert("OTP Sent", `Please enter the OTP sent to ${formData.phone}`);
        } catch (error) {
            Alert.alert("Error", "Failed to send OTP. Please try again.");
            console.error("OTP Error:", error);
        }
    };
    

    const renderContactInfo = () => (
        <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
            className="space-y-6 bg-surface mx-4 rounded-3xl p-8"
        >
            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 600 }}
                className="mb-8"
            >
                <MaterialCommunityIcons 
                    name="rocket-launch-outline" 
                    size={48} 
                    color="#00b890" 
                    style={{ alignSelf: 'center', marginBottom: 16 }}
                />
                <Text className="text-2xl font-bold text-white text-center">Almost there!</Text>
                <Text className="text-gray-400 text-center mt-2">Complete your profile to continue</Text>
            </MotiView>

            {[
                { field: 'name', icon: 'account', placeholder: 'Full Name', type: 'default' },
                { field: 'email', icon: 'email', placeholder: 'Email Address', type: 'email-address' },
                { field: 'phone', icon: 'phone', placeholder: 'Phone Number', type: 'phone-pad' },
                { field: 'aadhar', icon: 'fingerprint', placeholder: 'Aadhar Number', type: 'numeric' }, // Add a field for Aadhar Number', placeholder: 'Location', type: 'default' },
            ].map((item, index) => (
                <MotiView
                    key={item.field}
                    from={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: 'timing', duration: 500, delay: 200 + index * 100 }}
                    className="space-y-2"
                >
                    <Text className="text-gray-400 capitalize text-sm font-medium ml-1">{item.field}</Text>
                    <View className="flex-row items-center bg-[#131d2a] rounded-xl p-4 border border-gray-800">
                        <MaterialCommunityIcons name={item.icon} size={24} color="#00b890" />
                        <TextInput
                            className="flex-1 ml-3 text-white text-base"
                            placeholder={item.placeholder}
                            placeholderTextColor="#4a5568"
                            keyboardType={item.type}
                            value={formData[item.field]}
                            onChangeText={(text) => updateForm(item.field, text)}
                        />
                    </View>
                </MotiView>
            ))}

            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 500, delay: 600 }}
                className="mt-8"
            >
                <TouchableOpacity
                    className="bg-[#00b890] py-4 rounded-xl shadow-lg overflow-hidden"
                    onPress={verifyPhone}
                >
                    <View className="absolute right-0 top-0 w-20 h-20 bg-[#00d4a7] rounded-full -mr-10 -mt-10 opacity-20" />
                    <Text className="text-white text-center font-semibold text-lg">Send OTP</Text>
                </TouchableOpacity>
            </MotiView>
        </MotiView>
    );

    const renderOtpVerification = () => (
        <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
            className="space-y-6 bg-surface mx-4 rounded-3xl p-8"
        >
            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 600 }}
                className="items-center mb-8"
            >
                <MaterialCommunityIcons 
                    name="shield-check-outline" 
                    size={48} 
                    color="#00b890" 
                    style={{ marginBottom: 16 }}
                />
                <Text className="text-2xl font-bold text-white text-center">Verify OTP</Text>
                <Text className="text-gray-400 text-center mt-2">
                    Enter the 4-digit code sent to{'\n'}{formData.phone}
                </Text>
            </MotiView>

            <View className="flex-row justify-center space-x-4 py-8">
                {otp.map((digit, index) => (
                    <MotiView
                        key={index}
                        from={{ opacity: 0, scale: 0.5, translateY: 20 }}
                        animate={{ opacity: 1, scale: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: index * 100 }}
                    >
                        <TextInput
                            id={`otp-${index}`}
                            className="w-14 h-14 bg-[#131d2a] rounded-2xl text-center text-white text-xl border border-gray-800"
                            maxLength={1}
                            keyboardType="number-pad"
                            value={digit}
                            onChangeText={(value) => handleOtpChange(index, value)}
                        />
                    </MotiView>
                ))}
            </View>

            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 500, delay: 400 }}
                className="space-y-4 mt-4"
            >
                <TouchableOpacity
                    className={`py-4 rounded-xl overflow-hidden ${isVerifying ? 'bg-gray-500' : 'bg-[#00b890]'}`}
                    onPress={handleVerification}
                    disabled={isVerifying}
                >
                    <View className="absolute right-0 top-0 w-20 h-20 bg-[#00d4a7] rounded-full -mr-10 -mt-10 opacity-20" />
                    <Text className="text-white text-center font-semibold text-lg">
                        {isVerifying ? 'Verifying...' : 'Verify OTP'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => setStep(1)}
                    className="flex-row items-center justify-center space-x-2 py-2"
                >
                    <MaterialCommunityIcons name="arrow-left" size={20} color="#00b890" />
                    <Text className="text-[#00b890] text-center font-medium">Go Back</Text>
                </TouchableOpacity>
            </MotiView>
        </MotiView>
    );

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                {step === 1 ? renderContactInfo() : renderOtpVerification()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Onboard;