import React, { useEffect, useState } from "react";

// Chakra imports
import { Box, Button, Flex, Grid, Icon, Image, Spacer, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, VStack, Divider, Spinner, FormControl, FormLabel, Input, Textarea, ModalFooter, useToast } from "@chakra-ui/react";

import { motion } from "framer-motion";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GradientBorder from "components/GradientBorder/GradientBorder";
import IconBox from "components/Icons/IconBox";
import CustomScheduleModal from "./CustomScheduleModal";


// Icons
import { FaPlay } from "react-icons/fa";
import earthImg from "./../../assets/earth.jpg"
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import {
	GraphIcon,
	BillIcon,
} from "components/Icons/Icons";
import { BsArrowRight } from "react-icons/bs";

// Sample Data
const projectsData = [
	{
		name: "Project Green Earth",
		raised: 125000,
		goal: 200000,
		sustainability: 92,
		status: "Active",
	},
	{
		name: "Ocean Cleanup",
		raised: 75000,
		goal: 150000,
		sustainability: 88,
		status: "Pending",
	}
];

const updatesData = [
	{
		title: "Q1 Financial Report",
		date: "Today, 16:36",
		type: "Document",
		status: "Pending"
	},
	{
		title: "Phase 1 Complete",
		date: "Yesterday, 12:30",
		type: "Milestone",
		status: "Approved"
	}
];

function Dashboard() {
	const [isPitchDeckValid, setIsPitchDeckValid] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const toast = useToast();

	const [rotating, setRotating] = useState(null);
	const badges = [
		{ value: "150+", label: "Community Backers", color: "blue.300" },
		{ value: "85%", label: "Funding Progress", color: "yellow.300" },
		{ value: "250", label: "Metric Tons CO₂ Reduced", color: "teal.300" },
	  ];

	// Sample Data
	const meeting = [
		{
			id: 1,
			title: "Investor Meeting",
			sentiment: "Positive",
			date: "2024-02-15",
			startTime: "10:00 AM",
			endTime: "11:30 AM",
			keyPoints: ["Market expansion", "Funding update", "Next steps"],
			videoUrl: "https://youtu.be/j1HbiaMVvWI?si=fU7-5jYXKpLSrdYn"
		}
	];

	const [isOpen, setIsOpen] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [projectOpen, setProjectOpen] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    fundingGoal: "",
    pitchDeck: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };
  const verifyPitchDeck = async () => {
    if (!projectData.pitchDeck) {
      toast({
        title: "No file uploaded.",
        description: "Please upload a pitch deck to verify.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulating verification process (replace with real API call)
    setVerificationStatus("loading");

    setTimeout(() => {
      const isValid = projectData.pitchDeck.name.endsWith(".pdf"); // Simple check (can be extended)
      if (isValid) {
        setIsPitchDeckValid(true);
        setVerificationStatus("success");
        toast({
          title: "Pitch Deck Verified!",
          description: "Your document is valid and ready to submit.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setVerificationStatus("error");
        toast({
          title: "Invalid Pitch Deck!",
          description: "Please upload a valid PDF document.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }, 2000);
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProjectData((prev) => ({ ...prev, pitchDeck: file }));
    setIsPitchDeckValid(false);
    setVerificationStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPitchDeckValid) {
      toast({
        title: "Verification Required!",
        description: "Please verify your pitch deck before submitting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log("Project Data:", projectData);
    setProjectOpen(false);
  };



	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		setIsOpen(false);
		setIsPlaying(false);
	};

	const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
	const [founderData, setFounderData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [summary, setSummary] = useState(null);
	const [transcript, setTranscript] = useState(null);
	const [sentiment, setSentiment] = useState(null);
	const [suggestions, setSuggestions] = useState(null);

	const transcriptData = `John: Let's start with project updates. How's the API development going?
Emma: We’ve completed the user authentication module, and now working on database optimization.
Michael: Great! Next, let’s discuss the upcoming sprint tasks.
Sarah: We need to finalize the UI components and integrate the new API endpoints.
John: Sounds good. Let’s set a deadline for next week and track progress daily.`;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:5001/login/founder/Piyanshu");
				const data = await response.json();
				console.log("Data:", data);
				setFounderData(data.founder);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};



		fetchData();
	}, []);

	if (!founderData) {
		return <Text>Loading...</Text>;
	}


	const hour = new Date().getHours();
	const greeting =
		hour < 12 ? "Good morning ☀️" : hour < 18 ? "Good afternoon 🌤️" : "Good evening 🌙";
	const totalRaised = founderData?.projects.reduce((sum, project) => sum + project.raisedAmount, 0);
	const successfulProjects = founderData.projects.filter(
		(project) => project.raisedAmount >= project.fundingGoal
	).length;
	const successRate = founderData.projects.length > 0 ? (successfulProjects / founderData.projects.length) * 100 : 0;



	const handleGenerate = async () => {
		setLoading(true);
		try {
			const response = await fetch("http://127.0.0.1:5005/analyze", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text: transcriptData }),
			});

			const data = await response.json();
			setSummary(data.summary);
			setSentiment(data.sentiment);
			setSuggestions(data.suggestions);  // Store the suggestions in state
		} catch (error) {
			console.error("Error fetching analysis:", error);
		} finally {
			setLoading(false);
		}
	};



	return (
		<Flex direction='column' pt={{ base: "120px", md: "75px" }} mx='auto'>
			<Grid templateColumns={{ sm: "1fr", lg: "60% 38%" }}>
				<Box>
					<Grid
						templateColumns={{
							sm: "1fr",
							md: "1fr 1fr",
						}}
						gap='26px'>

						{/* Welcome Card */}
						<Card
							p="0px"
							gridArea={{ md: "1 / 1 / 2 / 3", "2xl": "auto" }}
							borderRadius="lg"
							boxShadow="xl"
							bg="#000000"
							color="white"
						>
							<CardBody w="100%" h="100%">
								<Flex
									flexDirection="row"
									align="center"
									justify="space-between"
									w="100%"
									h="100%"
									p="20px"
								>
									<Flex flexDirection="column" w="65%" lineHeight="1.6" justify="center">
										<Text fontSize="sm" color="gray.400" fontWeight="bold">
											{greeting},
										</Text>
										<Text fontSize="32px" fontWeight="bold" mb="16px">
											{founderData.name}
										</Text>
										<Text fontSize="md" color="gray.400" fontWeight="normal" mb="auto">
											Ready to make an impact today? 🚀 <br />
											Need help? Just ask!
										</Text>
										<Spacer />
										<Flex align="center">
											<Button
												p="0px"
												variant="no-hover"
												bg="transparent"
												onClick={() => window.open("https://www.producthunt.com", "_blank")}
											>
												<Text
													fontSize="sm"
													color="#fff"
													fontWeight="bold"
													cursor="pointer"
													transition="all .3s ease"
													_hover={{ me: "4px" }}
												>
													Explore trending projects
												</Text>
												<Icon
													as={BsArrowRight}
													w="20px"
													h="20px"
													color="#fff"
													fontSize="2xl"
													transition="all .3s ease"
													mx=".3rem"
													cursor="pointer"
													pt="4px"
													_hover={{ transform: "translateX(20%)" }}
												/>
											</Button>
										</Flex>
									</Flex>

									<Flex
										justify="center"
										align="center"
										w="65%"
										h="100%"
										borderRadius="md"
										boxShadow="md"
									>
										<Image src={earthImg} alt="Earth" w="100%" h="auto" objectFit="cover" borderRadius="lg" boxShadow="md" />
									</Flex>
								</Flex>
							</CardBody>
						</Card>



						{/* Project Stats */}
						<Card
							p="16px"
							backgroundImage="linear-gradient(127.09deg, #000000 19.41%, #000000 76.65%)"
							backgroundRepeat="no-repeat"
							bgSize="cover"
							bgPosition="center"
							borderRadius="lg"
							boxShadow="lg"
						>
							<CardBody h="100%" w="100%">
								<Flex direction="column" color="white" h="100%" p="0px 10px 20px 10px" w="100%">
									{/* Founder Rating Section */}
									<Flex justify="space-between" align="center">
										<Text fontSize="lg" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
											Founder Rating
										</Text>
										<Text fontSize="2xl" fontWeight="bold" color="green.400">
											⭐ 4.7 / 5
										</Text>
									</Flex>

									<Spacer />

									{/* Active Projects & Key Stats */}
									<Flex direction="column">
										<Box>
											<Text fontSize="sm" color="gray.400" fontWeight="medium">
												Active Projects
											</Text>
											
											
											<Text fontSize="xl" fontWeight="bold" letterSpacing="wide">
												🚀 {founderData.projects.length} Projects
											</Text>
										</Box>

										<Flex mt="16px">
											{/* Total Raised */}
											<Flex direction="column" me="34px">
												<Text fontSize="xs" color="gray.300" fontWeight="medium" textTransform="uppercase">
													Total Raised
												</Text>
												<Text fontSize="lg" fontWeight="bold" color="green.400">
													💰 ${totalRaised}
												</Text>
											</Flex>

											{/* Success Rate */}
											<Flex direction="column">
												<Text fontSize="xs" color="gray.300" fontWeight="medium" textTransform="uppercase">
													Success Rate
												</Text>
												<Text fontSize="lg" fontWeight="bold" color="green.400">
													📈 {successRate.toFixed(0)}%
												</Text>
											</Flex>
										</Flex>
									</Flex>
								</Flex>
							</CardBody>
						</Card>


						{/* AI Insights */}
						<Card>
							<Flex direction='column'>
								<Flex
									justify='space-between'
									p='22px'
									mb='18px'
									bg='linear-gradient(126.97deg, rgba(10, 10, 10) 28.26%, rgba(5, 5, 5) 91.2%)'
									borderRadius='18px'>
									<Flex direction='column'>
										<Text color='#E9EDF7' fontSize='12px'>
											Average Project Score
										</Text>
										<Text color='#fff' fontWeight='bold' fontSize='34px'>
											{founderData.projects.length > 0 ?
												(founderData.projects.reduce((sum, project) => sum + project.sustainability_score, 0) / founderData.projects.length).toFixed(0) + '%' : 'N/A'}
										</Text>
									</Flex>
									<Flex direction='column'>
										<Button
											bg='transparent'
											_hover='none'
											_active='none'
											alignSelf='flex-end'
											p='0px'>
											<Icon
												as={IoEllipsisHorizontalSharp}
												color='#fff'
												w='24px'
												h='24px'
											/>
										</Button>
										<GraphIcon w='60px' h='18px' />
									</Flex>
								</Flex>
								<Text fontSize='10px' color='gray.400' mb='8px'>
									KEY METRICS
								</Text>
								<Flex justify='space-between' align='center'>
									<Flex align='center'>
										<IconBox
											bg='#22234B'
											borderRadius='30px'
											w='42px'
											h='42px'
											me='10px'>
											<BillIcon w='22px' h='22px' />
										</IconBox>
										<Flex direction='column'>
											<Text color='#fff' fontSize='sm' mb='2px'>
												Feasibility
											</Text>
											<Text color='gray.400' fontSize='sm'>
												High Probability
											</Text>
										</Flex>
									</Flex>
									<Text color='#fff' fontSize='sm' fontWeight='bold'>
										92%
									</Text>
								</Flex>
							</Flex>
						</Card>
					</Grid>
					{/* Projects List */}
					<Card p='16px' mt='24px'>
						<CardHeader>
							<Flex
								justify='space-between'
								align='center'
								minHeight='60px'
								w='100%'>
								<Text fontSize='lg' color='#fff' fontWeight='bold'>
									Active Projects
								</Text>
								<Button onClick={() => setProjectOpen(true)} fontSize='15px' colorScheme="brand">
        New Project
      </Button>
								{/* <Button maxW='135px' fontSize='10px' variant='brand'>
                  NEW PROJECT
                </Button> */}
							</Flex>
						</CardHeader>
						<CardBody>
							<Flex
								direction='column'
								w='100%'>
								{founderData.projects.map((project, index) => (
									<GradientBorder
										mb='24px'
										w='100%'
										borderRadius='20px'
										key={index}>
										<Flex
											p='22px'
											bg="linear-gradient(126.97deg, rgba(10, 10, 10) 28.26%, rgba(5, 5, 5) 91.2%)"
											borderRadius='20px'
											width='100%'>
											<Flex direction='column' flex='1'>
												<Text color='#fff' fontSize='md' fontWeight='bold' mb='10px'>
													{project.name}
												</Text>
												<Flex justify='space-between' mb='10px'>
													<Text color='gray.400' fontSize='sm'>
														Raised:
													</Text>
													<Text color='#fff' fontSize='sm'>
														${project.raisedAmount.toLocaleString()}/${project.fundingGoal.toLocaleString()}
													</Text>
												</Flex>
												<Flex justify='space-between'>
													<Text color='gray.400' fontSize='sm'>
														Sustainability Score:
													</Text>
													<Text color='#fff' fontSize='sm'>
														{project.sustainability_score}%
													</Text>
												</Flex>
											</Flex>
											<Flex align='center' ml='20px'>
												<Text
													color={project.raisedAmount >= project.fundingGoal ? 'green.400' : 'yellow.400'}
													fontSize='sm'
													fontWeight='bold'>
													{project.raisedAmount >= project.fundingGoal ? 'Active' : 'Pending'}
												</Text>
											</Flex>
										</Flex>
									</GradientBorder>
								))}
							</Flex>
						</CardBody>
					</Card>
				</Box>

				{/* Updates, Meetings & Community Section */}
				<Card
					p='22px'
					my={{ sm: "24px", lg: "0px" }}
					ms={{ sm: "0px", lg: "24px" }}>
					<CardHeader>
						<Flex
							direction={{ sm: "column", lg: "row" }}
							justify={{ sm: "center", lg: "space-between" }}
							align={{ sm: "center" }}
							w='100%'
							mb='1rem'>
							<Text fontSize='lg' color='#fff' fontWeight='bold'>
								Activity Center
							</Text>
							<Flex mt={{ sm: "10px", lg: "0" }}>
								<Button
									variant='brand'
									fontSize='10px'
									fontWeight='bold'
									p='6px 32px'
									me='10px'>
									UPLOAD
								</Button>
								<Button
									variant="outline"
									fontSize="10px"
									fontWeight="bold"
									p="6px 32px"
									color="white"
									style={{
										backgroundColor: "transparent",
										borderColor: "white",

									}}
									onClick={() => setIsScheduleModalOpen(true)}
								>
									SCHEDULE MEETING
								</Button>

							</Flex>
						</Flex>
					</CardHeader>
					<CardBody>
						<Flex direction='column' w='100%'>
							{/* Meeting Summary Section */}
							<Box mb='24px'>
								<Text color='gray.400' fontSize='sm' mb='16px' fontWeight='bold'>
									RECENT MEETINGS
								</Text>
								{founderData.meetings.map((meeting, index) => (
									<GradientBorder mb='20px' borderRadius='20px' key={index}>
										<Flex
											bg='linear-gradient(126.97deg, rgba(10, 10, 10) 28.26%, rgba(5, 5, 5) 91.2%)'
											p='16px'
											borderRadius='20px'
											direction='column'>
											<Flex justify='space-between' mb='10px'>
												<Text color='#fff' fontSize='sm' fontWeight='bold'>
													{meeting.title}
												</Text>
												<Text color={meeting.sentiment === 'Positive' ? 'green.400' : meeting.sentiment === 'Neutral' ? 'yellow.400' : 'red.400'} fontSize='xs'>
													{meeting.sentiment} Sentiment
												</Text>
											</Flex>
											<Text color='gray.400' fontSize='xs' mb='10px'>
												{new Date(meeting.date).toLocaleDateString()}, {meeting.startTime} - {meeting.endTime}
											</Text>
											<Box p='10px' borderRadius='10px'>
												<Text color='gray.300' fontSize='xs'>
													Key Points: {meeting.keyPoints.join(', ')}
												</Text>
											</Box>
											<Flex mt='10px' justify='flex-end'>
												<Button
													variant="outline"
													size="sm"
													onClick={openModal}
													style={{
														backgroundColor: "transparent",
														borderColor: "white",
														color: "white"
													}}
												>
													View Recording
												</Button>
											</Flex>
										</Flex>
									</GradientBorder>
								))}
								{/* Video & Sentiment Modal */}
								<Modal isOpen={isOpen} onClose={closeModal} size="6xl">
									<ModalOverlay />
									<ModalContent bg="rgba(10, 10, 10, 0.95)" borderRadius="20px">
										<ModalHeader color="white">Meeting Recording</ModalHeader>
										<ModalCloseButton color="white" />
										<ModalBody>
											<Flex gap={6}>
												{/* Left: Video Player */}
												<Box flex="1" position="relative" borderRadius="10px" overflow="hidden">
													<video
														style={{
															width: "100%",
															height: "95%", // Ensures it takes full height
															minHeight: "200px", // Sets a minimum height
															borderRadius: "10px",
															cursor: "pointer",
															objectFit: "cover", // Prevents stretching
														}}
														controls
														poster="https://via.placeholder.com/640x360.png?text=Meeting+Recording"
													>
														<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
														Your browser does not support the video tag.
													</video>
												</Box>

												{/* Right: Sentiment & Summary */}
												<Box flex="1" p="16px">
													<Text color="white" fontSize="lg" fontWeight="bold">
														Weekly Team Sync
													</Text>
													{/* Sentiment Analysis */}
													{sentiment && (
														<Text
															color={sentiment === "Positive" ? "green.400" : sentiment === "Negative" ? "red.400" : "yellow.400"}
															fontSize="md"
															mb="4"
														>
															Sentiment: {sentiment}
														</Text>
													)}

													{/* Generate Button */}
													<Button mt="4" bg="#00b890" onClick={handleGenerate} isDisabled={loading}>
														{loading ? <Spinner size="sm" /> : "🔍 Analyze & Summarize"}
													</Button>


													{/* Summary Section */}
													{summary && (
														<Box mt="4" p="3" border="1px solid gray" borderRadius="10px">
															<Text color="white" fontSize="md" fontWeight="bold">
																✨ Quick Recap:
															</Text>

															<Text color="gray.300" fontSize="sm">{summary}</Text>
														</Box>
													)}

													{/* Suggestions Section */}
													{suggestions && (
														<Box mt="4" p="3" border="1px solid gray" borderRadius="10px">
															<Text color="white" fontSize="md" fontWeight="bold">
																🚀 Smart AI Insight:
															</Text>

															<Text color="gray.300" fontSize="sm">{suggestions}</Text>
														</Box>
													)}
												</Box>
											</Flex>

											<Divider my="6" borderColor="gray.600" />

											{/* Transcript Section */}
											{summary && (
												<VStack align="stretch" spacing={3} p="3">
													<Text color="white" fontSize="md" fontWeight="bold">
														Transcript:
													</Text>
													<Box p="3" border="1px solid gray" borderRadius="10px">
														<Text color="gray.300" fontSize="sm">
															{transcriptData}
														</Text>
													</Box>
												</VStack>
											)}
										</ModalBody>

									</ModalContent>
								</Modal>
							</Box>

							{/* Founder Achievements - Gamification */}
							<Box mb="24px">
								<Text color="gray.400" fontSize="sm" mb="16px" fontWeight="bold">
									IMPACT ACHIEVEMENTS
								</Text>
								<GradientBorder borderRadius="20px">
									<Flex bg='linear-gradient(126.97deg, rgba(10, 10, 10) 28.26%, rgba(5, 5, 5) 91.2%)' p="16px" borderRadius="20px" direction="column">
										{/* Achievement Title & Level */}
										<Flex justify="space-between" align="center" mb="16px">
											<Text color="#fff" fontSize="sm" fontWeight="bold">
												🌱 Sustainability Champion
											</Text>
											<Box bg="green.400" px="8px" py="2px" borderRadius="full">
												<Text fontSize="xs">Level 4</Text>
											</Box>
										</Flex>

										{/* Progress Grid */}
										<Grid templateColumns="repeat(3, 1fr)" gap="10px" mb="10px">
											<Box bg='linear-gradient(126.97deg, rgba(20, 20, 20) 28.26%, rgba(10, 10, 10) 91.2%)' p="10px" borderRadius="10px" textAlign="center">
												<Text color="blue.300" fontSize="lg" fontWeight="bold">150+</Text>
												<Text color="gray.400" fontSize="xs">Community Backers</Text>
											</Box>
											<Box bg='linear-gradient(126.97deg, rgba(20, 20, 20) 28.26%, rgba(10, 10, 10) 91.2%)' p="10px" borderRadius="10px" textAlign="center">
												<Text color="yellow.300" fontSize="lg" fontWeight="bold">85%</Text>
												<Text color="gray.400" fontSize="xs">Funding Progress</Text>
											</Box>
											<Box bg='linear-gradient(126.97deg, rgba(20, 20, 20) 28.26%, rgba(10, 10, 10) 91.2%)' p="10px" borderRadius="10px" textAlign="center">
												<Text color="teal.300" fontSize="lg" fontWeight="bold">250</Text>
												<Text color="gray.400" fontSize="xs">Metric Tons CO₂ Reduced</Text>
											</Box>
										</Grid>

										{/* Reward Badge Section */}
										<Flex justify="space-between" align="center" mt="16px">
											<Text color="gray.300" fontSize="xs">🎖 Next Reward: Green Impact Badge</Text>
											<Box bg="green.500" px="6px" py="2px" borderRadius="full">
												<Text fontSize="xs" color="white">Earn 500 Solar Credits</Text>
											</Box>
										</Flex>
									</Flex>
								</GradientBorder>
							</Box>


							{/* Regular Updates Section */}
							<Box mt="24px">
								<Text color='gray.400' fontSize='sm' mb='16px' fontWeight='bold'>
									RECENT UPDATES
								</Text>
								{updatesData.map((update, index) => (
									<Flex
										key={index}
										justify='space-between'
										mb='20px'
										pb='20px'
										borderBottom='1px solid rgba(255,255,255,0.1)'>
										<Flex direction='column'>
											<Text color='#fff' fontSize='sm' fontWeight='bold' mb='5px'>
												{update.title}
											</Text>
											<Text color='gray.400' fontSize='xs'>
												{update.date}
											</Text>
										</Flex>
										<Flex align='center'>
											<Text
												color={update.status === 'Approved' ? 'green.400' : 'yellow.400'}
												fontSize='sm'
												me='10px'>
												{update.status}
											</Text>
											<Button
												variant='ghost'
												size='sm'
												p='0'
												minW='auto'
												h='auto'>
												<Icon as={FaPencilAlt} color='gray.400' w='12px' h='12px' />
											</Button>
										</Flex>
									</Flex>
								))}
							</Box>
						</Flex>
					</CardBody>
				</Card>
			</Grid>

			<CustomScheduleModal
				isOpen={isScheduleModalOpen}
				onClose={() => setIsScheduleModalOpen(false)}
			/>
			
			<Modal isOpen={projectOpen} onClose={() => setProjectOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent bg="linear-gradient(126.97deg, rgba(10, 10, 10) 28.26%, rgba(5, 5, 5) 91.2%)" color="white">
          <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">
            🚀 Launch Your Dream Project!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">🌟 Project Name</FormLabel>
                <Input
                  name="name"
                  value={projectData.name}
                  onChange={handleChange}
                  placeholder="Give your project an exciting name..."
                  focusBorderColor="green.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="semibold">📖 Project Description</FormLabel>
                <Textarea
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                  placeholder="Describe your vision and impact..."
                  focusBorderColor="green.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="semibold">💰 Funding Goal ($)</FormLabel>
                <Input
                  type="number"
                  name="fundingGoal"
                  value={projectData.fundingGoal}
                  onChange={handleChange}
                  placeholder="How much funding do you need?"
                  focusBorderColor="green.400"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="semibold">📂 Upload Pitch Deck (PDF)</FormLabel>
                <Input type="file" accept="application/pdf" onChange={handleFileChange} p={1} />
              </FormControl>

              <Button bg="gray.800" onClick={verifyPitchDeck} isLoading={verificationStatus === "loading"}>
                Verify Pitch Deck
              </Button>

              {verificationStatus === "success" && <Text color="green.400">✔️ Pitch Deck Verified!</Text>}
              {verificationStatus === "error" && <Text color="red.400">❌ Invalid Pitch Deck. Upload a valid PDF.</Text>}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setProjectOpen(false)} color="gray.300" _hover={{ color: "white" }}>
              Cancel
            </Button>
            <Button 
              colorScheme="green" 
              fontWeight="bold" 
              onClick={handleSubmit}
              isDisabled={!isPitchDeckValid}
              _hover={{ transform: "scale(1.05)", transition: "0.2s ease-in-out" }}
            >
              Submit Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
			
		</Flex>
	);
}

export default Dashboard;