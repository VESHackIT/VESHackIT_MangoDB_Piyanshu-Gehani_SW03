import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  DarkMode,
  Stack,
  Progress,
  Icon,
  useToast,
  Spinner
} from "@chakra-ui/react";

import { CheckCircle, Upload } from "lucide-react";

// Assets
import signInImage from "assets/sign.jpg";
import GradientBorder from "components/GradientBorder/GradientBorder";
import AuthFooter from "components/Footer/AuthFooter";

function SignIn() {
 
  const [selectedType, setSelectedType] = useState(null);
  const [step, setStep] = useState(1);
  const [bankStatement, setBankStatement] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const toast = useToast();
  
  
  const titleColor = "white";
  const textColor = "white";
  const bgColor = "black";

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBankStatement(file);
      toast({
        title: "File uploaded",
        description: "Bank statement uploaded successfully. Verification pending.",
        status: "success",
        duration: 3000,
      });
    }
  };

  const handleVerification = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast({
        title: "Verification complete",
        description: "Bank statement has been verified successfully.",
        status: "success",
        duration: 3000,
      });
      setTimeout(() => {
        window.location.href="/#admin/dashboard";
      }, 1000);
    }, 4000);
  };

  const renderFormStep = () => {
    switch(step) {
      case 1:
        return (
          <Stack spacing={6}>
            <Box>
              <Heading color={titleColor} fontSize="32px" mb={4}>
                Personal Details
              </Heading>
              <Text color={textColor} fontSize="16px">
                Let's start with your basic information
              </Text>
            </Box>
            
            <FormControl>
              <FormLabel color="white" mb={2}>Full Name</FormLabel>
              <GradientBorder borderRadius="20px">
                <Input
                  color="white"
                  bg={bgColor}
                  border="transparent"
                  borderRadius="20px"
                  placeholder="Enter your name"
                  h="50px"
                />
              </GradientBorder>
            </FormControl>

            <FormControl>
              <FormLabel color="white" mb={3}>Email</FormLabel>
              <GradientBorder borderRadius="20px">
                <Input
                  color="white"
                  bg={bgColor}
                  border="transparent"
                  borderRadius="20px"
                  placeholder="Enter your email"
                  h="50px"
                />
              </GradientBorder>
            </FormControl>

            <FormControl>
              <FormLabel color="white" mb={3}>Phone</FormLabel>
              <GradientBorder borderRadius="20px">
                <Input
                  color="white"
                  bg={bgColor}
                  border="transparent"
                  borderRadius="20px"
                  placeholder="Enter your phone"
                  h="50px"
                />
              </GradientBorder>
            </FormControl>

            <FormControl>
              <FormLabel color="white" mb={3}>LinkedIn URL</FormLabel>
              <GradientBorder borderRadius="20px">
                <Input
                  color="white"
                  bg={bgColor}
                  border="transparent"
                  borderRadius="20px"
                  placeholder="Your LinkedIn profile URL"
                  h="50px"
                />
              </GradientBorder>
            </FormControl>
          </Stack>
        );
      
      case 2:
        return (
          <Stack spacing={6}>
            <Box>
              <Heading color={titleColor} fontSize="32px" mb={4}>
                Project Overview
              </Heading>
              <Text color={textColor} fontSize="16px">
                Describe your renewable energy project
              </Text>
            </Box>

            <FormControl>
              <FormLabel color="white" mb={3}>Project Title</FormLabel>
              <GradientBorder borderRadius="20px">
                <Input
                  color="white"
                  bg={bgColor}
                  border="transparent"
                  borderRadius="20px"
                  placeholder="Enter project title"
                  h="50px"
                />
              </GradientBorder>
            </FormControl>

            <FormControl>
              <FormLabel color="white" mb={3}>Project Description</FormLabel>
              <GradientBorder borderRadius="20px">
                <Input
                  as="textarea"
                  color="white"
                  bg={bgColor}
                  border="transparent"
                  borderRadius="20px"
                  placeholder="Describe your project"
                  minH="120px"
                  p={4}
                />
              </GradientBorder>
            </FormControl>

            <FormControl>
  <FormLabel color="white" mb={3} fontSize="xl" fontWeight="bold">
    Choose Your Power, Shape the Future ⚡️
  </FormLabel>
  <Stack spacing={4} color="white">
    {["☀️ Solar", "🌬️ Wind", "💧 Hydro", "🌿 Biomass", "🌍 Geothermal"].map((type) => (
      <Button
      key={type}
      onClick={() => setSelectedType(type)}
      w="100%"
      h="50px"
      fontSize="md"
      fontWeight="semibold"
      color={selectedType === type ? "black" : "white"}
      bg={selectedType === type ? "brand.500" : "transparent"}
      borderColor="white"
      _hover={{
        bg: selectedType === type ? "brand.600" : "gray.700",
        transform: "scale(1.05)",
      }}
      transition="all 0.2s ease-in-out"
    >
      {type}
    </Button>
    ))}
  </Stack>
</FormControl>

          </Stack>
        );

      case 3:
        return (
          <Stack spacing={6}>
            <Box>
              <Heading color={titleColor} fontSize="32px" mb={4}>
                Bank Verification
              </Heading>
              <Text color={textColor} fontSize="16px">
                Please upload your bank statement for verification
              </Text>
            </Box>

            <FormControl bg="black">
              <FormLabel color="white" mb={3}>Bank Statement</FormLabel>
              <GradientBorder borderRadius="20px" bg="black" border="white">
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  // bg="black"
                  borderRadius="20px"
                  // p={24}
                  cursor="pointer"
                  onClick={() => document.getElementById('fileInput').click()}
                  // minH="200px"
                >
                  <Input
                    id="fileInput"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    display="none"
                    onChange={handleFileUpload}
                    bg="black"
                  />
                  {isVerified ? (
                    <>
                      <Icon as={CheckCircle} w={12} h={12} color="green.300" mb={4} />
                      <Text color="white" fontSize="16px">
                        {bankStatement.name}
                      </Text>
                      <Text color="green.300" fontSize="16px" mt={2}>
                        Verified Successfully
                      </Text>
                    </>
                  ) : (
                    <>
                      <Icon as={Upload} w={12} h={12} color="white" mb={4} />
                      <Text color="white" fontSize="16px">
                        {bankStatement ? bankStatement.name : "Click to upload bank statement"}
                      </Text>
                    </>
                  )}
                </Flex>
              </GradientBorder>
            </FormControl>

            {bankStatement && !isVerified && (
              <Flex 
                align="center" 
                cursor="pointer" 
                onClick={handleVerification}
                color="green.300"
                fontSize="16px"
              >
                {isVerifying ? (
                  <>
                    <Spinner size="sm" mr={2} />
                    <Text>Please hold on for a moment, we are verifying...</Text>
                  </>
                ) : (
                  <Text>
                    File uploaded successfully. Pending verification. Click to verify
                  </Text>
                )}
              </Flex>
            )}
          </Stack>
        );
    }
  };

  return (
    <Flex position="relative">
      <Flex
        minH="100vh"
        w="100%"
        maxW="1044px"
        mx="auto"
        pt={{ sm: "100px", md: "0px" }}
        flexDirection="column"
        me={{ base: "auto", lg: "50px", xl: "auto" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          w={{ base: "100%", md: "50%", lg: "450px" }}
          px="50px"
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            mt={{ base: "50px", md: "150px", lg: "160px", xl: "245px" }}
            mb={{ base: "60px", lg: "95px" }}
          >
            <Progress 
              value={(step / 3) * 100} 
              mb={8} 
              colorScheme="green" 
              h="8px" 
              borderRadius="full" 
            />
            
            {renderFormStep()}

            <Flex justify="space-between" mt={8}>
              {step > 1 && (
                <Button
                  variant="outline"
                  color="white"
                  h="50px"
                  px={8}
                  onClick={() => setStep(step - 1)}
                  borderColor="white"
                >
                  Previous
                </Button>
              )}
              <Button
                variant="brand"
                ml="auto"
                h="50px"
                px={8}
                onClick={() => {
                  if (step === 3 && !bankStatement) {
                    toast({
                      title: "Bank statement required",
                      description: "Please upload your bank statement to proceed",
                      status: "error",
                      duration: 3000,
                    });
                    return;
                  }
                  if (step < 3) setStep(step + 1);
                }}
              >
                {step === 3 ? "Submit" : "Next"}
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <Box
          display={{ base: "none", lg: "block" }}
          overflowX="hidden"
          h="100%"
          maxW={{ md: "50vw", lg: "50vw" }}
          minH="100vh"
          w="960px"
          position="absolute"
          left="0px"
          bg={bgColor}
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;