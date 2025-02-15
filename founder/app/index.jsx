import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function App() { 
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Details
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        // Business Info
        companyName: '',
        industry: '',
        experience: '',
        // Project Details
        projectTitle: '',
        projectDescription: '',
        renewableType: [],
        // Financial & Impact
        fundingGoal: '',
        co2Reduction: '',
        communityBenefit: '',
        // Feasibility
        landOwnership: '',
        legalApprovals: '',
        infrastructure: '',
        // Team
        teamMembers: '',
        teamExpertise: ''
    });

    const updateForm = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Progress bar - now with 6 steps
    const ProgressBar = () => (
        <View className="flex-row justify-between py-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((num) => (
                <View key={num} className="items-center">
                    <View
                        className={`w-8 h-8 rounded-full items-center justify-center
                        ${step >= num ? 'bg-[#00b890]' : 'bg-background'}`}
                    >
                        <Text className="text-white">{num}</Text>
                    </View>
                    <View
                        className={`h-1 w-8 ${num === 6 ? 'hidden' : ''} 
                        ${step > num ? 'bg-[#00b890]' : 'bg-[#131d2a]'}`}
                    />
                </View>
            ))}
        </View>
    );

    // Step 1: Personal Details
    const renderPersonalDetails = () => (
        <View className="space-y-12 bg-surface mx-4 p-4 rounded-2xl" style={{ padding: 24 }}>
            <Text className="text-2xl font-bold text-white">Personal Details</Text>
            <Text className="text-gray-400 mb-6">Let's start with your basic information</Text>

            {[
                { label: 'Full Name', icon: 'account', field: 'name', placeholder: 'Enter your name' },
                { label: 'Email', icon: 'email', field: 'email', placeholder: 'Enter your email', type: 'email-address' },
                { label: 'Phone', icon: 'phone', field: 'phone', placeholder: 'Enter your phone', type: 'phone-pad' },
                { label: 'LinkedIn URL', icon: 'linkedin', field: 'linkedin', placeholder: 'Your LinkedIn profile URL' }
            ].map((item) => (
                <View key={item.field} className="space-y-2">
                    <Text className="text-gray-400">{item.label}</Text>
                    <View className="flex-row items-center bg-[#131d2a] rounded-lg p-3">
                        <MaterialCommunityIcons name={item.icon} size={24} color="#00b890" />
                        <TextInput
                            className="flex-1 ml-3 text-white"
                            placeholder={item.placeholder}
                            placeholderTextColor="#4a5568"
                            keyboardType={item.type || 'default'}
                            value={formData[item.field]}
                            onChangeText={(text) => updateForm(item.field, text)}
                        />
                    </View>
                </View>
            ))}
        </View>
    );

    // Step 2: Business Information
    const renderBusinessInfo = () => (
        <View className="space-y-12 bg-surface mx-4 p-4 rounded-2xl" style={{ padding: 24 }}>
            <Text className="text-2xl font-bold text-white">Business Information</Text>
            <Text className="text-gray-400 mb-6">Tell us about your company</Text>

            {[
                { label: 'Company Name', icon: 'domain', field: 'companyName', placeholder: 'Your company name' },
                { label: 'Industry', icon: 'briefcase', field: 'industry', placeholder: 'Primary industry' },
                { 
                    label: 'Years of Experience', 
                    icon: 'clock-outline', 
                    field: 'experience', 
                    placeholder: 'Years in this industry',
                    type: 'numeric'
                }
            ].map((item) => (
                <View key={item.field} className="space-y-2">
                    <Text className="text-gray-400">{item.label}</Text>
                    <View className="flex-row items-center bg-[#131d2a] rounded-lg p-3">
                        <MaterialCommunityIcons name={item.icon} size={24} color="#00b890" />
                        <TextInput
                            className="flex-1 ml-3 text-white"
                            placeholder={item.placeholder}
                            placeholderTextColor="#4a5568"
                            keyboardType={item.type || 'default'}
                            value={formData[item.field]}
                            onChangeText={(text) => updateForm(item.field, text)}
                        />
                    </View>
                </View>
            ))}
        </View>
    );

    // Step 3: Project Details
    const renderProjectDetails = () => {
        const renewableTypes = [
            { icon: 'solar-power', label: 'Solar', value: 'solar' },
            { icon: 'wind-turbine', label: 'Wind', value: 'wind' },
            { icon: 'water', label: 'Hydro', value: 'hydro' },
            { icon: 'leaf', label: 'Biomass', value: 'biomass' },
            { icon: 'lightning-bolt', label: 'Geothermal', value: 'geothermal' }
        ];

        return (
            <View className="space-y-12 bg-surface mx-4 p-4 rounded-2xl" style={{ padding: 24 }}>
                <Text className="text-2xl font-bold text-white">Project Overview</Text>
                <Text className="text-gray-400 mb-6">Describe your renewable energy project</Text>

                <View className="space-y-2">
                    <Text className="text-gray-400">Project Title</Text>
                    <View className="flex-row items-center bg-[#131d2a] rounded-lg p-3">
                        <MaterialCommunityIcons name="file-document" size={24} color="#00b890" />
                        <TextInput
                            className="flex-1 ml-3 text-white"
                            placeholder="Enter project title"
                            placeholderTextColor="#4a5568"
                            value={formData.projectTitle}
                            onChangeText={(text) => updateForm('projectTitle', text)}
                        />
                    </View>
                </View>

                <View className="space-y-2">
                    <Text className="text-gray-400">Project Description</Text>
                    <View className="bg-[#131d2a] rounded-lg p-3">
                        <TextInput
                            className="text-white"
                            placeholder="Describe your project"
                            placeholderTextColor="#4a5568"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={formData.projectDescription}
                            onChangeText={(text) => updateForm('projectDescription', text)}
                        />
                    </View>
                </View>

                <Text className="text-gray-400">Renewable Type</Text>
                <View style={{ marginHorizontal: 16, paddingVertical: 12 }}>
                    {renewableTypes.map((type) => (
                        <TouchableOpacity
                            key={type.value}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 8,
                                marginVertical: 4,
                                borderRadius: 12,
                                backgroundColor: formData.renewableType.includes(type.value) ? "#00b890" : "#131d2a",
                                borderWidth: formData.renewableType.includes(type.value) ? 1 : 0,
                                borderColor: "#00b890"
                            }}
                            onPress={() => {
                                const newTypes = formData.renewableType.includes(type.value)
                                    ? formData.renewableType.filter(item => item !== type.value)
                                    : [...formData.renewableType, type.value];
                                updateForm('renewableType', newTypes);
                            }}
                        >
                            <MaterialCommunityIcons
                                name={type.icon}
                                size={24}
                                color={formData.renewableType.includes(type.value) ? "white" : "#00b890"}
                                style={{ marginRight: 10 }}
                            />
                            <Text style={{ color: "white", marginLeft: 8, fontSize: 16 }}>{type.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    // Step 4: Impact & Funding
    const renderImpactAndFunding = () => (
        <View className="space-y-12 bg-surface mx-4 p-4 rounded-2xl" style={{ padding: 24 }}>
            <Text className="text-2xl font-bold text-white">Impact & Funding</Text>
            <Text className="text-gray-400 mb-6">Financial goals and environmental impact</Text>

            {[
                { 
                    label: 'Funding Goal (USD)', 
                    icon: 'currency-usd', 
                    field: 'fundingGoal', 
                    placeholder: 'Required funding amount',
                    type: 'numeric'
                },
                { 
                    label: 'CO₂ Reduction (tons/year)', 
                    icon: 'molecule-co2', 
                    field: 'co2Reduction', 
                    placeholder: 'Estimated CO₂ reduction',
                    type: 'numeric'
                },
                { 
                    label: 'Community Benefit', 
                    icon: 'account-group', 
                    field: 'communityBenefit', 
                    placeholder: 'Describe community impact',
                    multiline: true
                }
            ].map((item) => (
                <View key={item.field} className="space-y-2">
                    <Text className="text-gray-400">{item.label}</Text>
                    <View className="flex-row items-center bg-[#131d2a] rounded-lg p-3">
                        <MaterialCommunityIcons name={item.icon} size={24} color="#00b890" />
                        <TextInput
                            className="flex-1 ml-3 text-white"
                            placeholder={item.placeholder}
                            placeholderTextColor="#4a5568"
                            keyboardType={item.type || 'default'}
                            multiline={item.multiline}
                            numberOfLines={item.multiline ? 4 : 1}
                            value={formData[item.field]}
                            onChangeText={(text) => updateForm(item.field, text)}
                        />
                    </View>
                </View>
            ))}
        </View>
    );

    // Step 5: Feasibility
    const renderFeasibility = () => (
        <View className="space-y-12 bg-surface mx-4 p-4 rounded-2xl" style={{ padding: 24 }}>
            <Text className="text-2xl font-bold text-white">Project Feasibility</Text>
            <Text className="text-gray-400 mb-6">Tell us about project readiness</Text>

            {[
                { 
                    label: 'Land Ownership Status', 
                    icon: 'home', 
                    field: 'landOwnership', 
                    placeholder: 'Current land ownership details'
                },
                { 
                    label: 'Legal Approvals', 
                    icon: 'file-document-check', 
                    field: 'legalApprovals', 
                    placeholder: 'Status of permits and approvals',
                    multiline: true
                },
                { 
                    label: 'Existing Infrastructure', 
                    icon: 'office-building', 
                    field: 'infrastructure', 
                    placeholder: 'Available infrastructure details',
                    multiline: true
                }
            ].map((item) => (
                <View key={item.field} className="space-y-2">
                    <Text className="text-gray-400">{item.label}</Text>
                    <View className="flex-row items-center bg-[#131d2a] rounded-lg p-3">
                        <MaterialCommunityIcons name={item.icon} size={24} color="#00b890" />
                        <TextInput
                            className="flex-1 ml-3 text-white"
                            placeholder={item.placeholder}
                            placeholderTextColor="#4a5568"
                            multiline={item.multiline}
                            numberOfLines={item.multiline ? 4 : 1}
                            value={formData[item.field]}
                            onChangeText={(text) => updateForm(item.field, text)}
                        />
                    </View>
                </View>
            ))}
        </View>
    );

    // Step 6: Team Details
    const renderTeamDetails = () => (
        <View className="space-y-12 bg-surface mx-4 p-4 rounded-2xl" style={{ padding: 24 }}>
            <Text className="text-2xl font-bold text-white">Team Information</Text>
            <Text className="text-gray-400 mb-6">Tell us about your team</Text>

            <View className="space-y-2">
                <Text className="text-gray-400">Key Team Members</Text>
                <View className="bg-[#131d2a] rounded-lg p-3">
                    <TextInput
                        className="text-white"
                        placeholder="List key team members and their roles"
                        placeholderTextColor="#4a5568"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={formData.teamMembers}
                        onChangeText={(text) => updateForm('teamMembers', text)}
                    />
                </View>
            </View>

            <View className="space-y-2">
                <Text className="text-gray-400">Team Expertise</Text>
                <View className="bg-[#131d2a] rounded-lg p-3">
                    <TextInput
                        className="text-white"
                        placeholder="Describe team's relevant expertise and experience"
                        placeholderTextColor="#4a5568"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={formData.teamExpertise}
                        onChangeText={(text) => updateForm('teamExpertise', text)}  
                    />  
                </View> 
            </View>
        </View>
    );

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

          {step < 5 ? (
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

    return (    
        <View className="flex-1 bg-[#131d2a] p-4 items-center justify-center">
            <Text className="text-2xl font-bold text-white">Onboarding Form</Text>  
            <ProgressBar />

            {step === 1 && renderPersonalDetails()} 
            {step === 2 && renderBusinessInfo()}
            {step === 3 && renderProjectDetails()}
            {step === 4 && renderImpactAndFunding()}
            {step === 5 && renderFeasibility()} 
            {step === 6 && renderTeamDetails()}

            {step < 6 && renderNavigationButtons()}
        </View>
    );
};