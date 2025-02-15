import React from "react";

// Chakra imports
import { Box, Button, Flex, Grid, Icon, Image, Spacer, Text } from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GradientBorder from "components/GradientBorder/GradientBorder";
import IconBox from "components/Icons/IconBox";

// Icons
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

	const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning ☀️" : hour < 18 ? "Good afternoon 🌤️" : "Good evening 🌙";

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
          Deep
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
        w="35%"
        h="100%"
        bg="teal.500"
        borderRadius="md"
        boxShadow="md"
      >
        {/* Adjusted the image width */}
        <Image src={earthImg} alt="Earth" w="100%" h="auto" objectFit="cover" />
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
          ⭐ 4.8 / 5
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
            🚀 3 Projects
          </Text>
        </Box>

        <Flex mt="16px">
          {/* Total Raised */}
          <Flex direction="column" me="34px">
            <Text fontSize="xs" color="gray.300" fontWeight="medium" textTransform="uppercase">
              Total Raised
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="green.400">
              💰 $200,000
            </Text>
          </Flex>

          {/* Success Rate */}
          <Flex direction="column">
            <Text fontSize="xs" color="gray.300" fontWeight="medium" textTransform="uppercase">
              Success Rate
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="green.400">
              📈 92%
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
											AI Project Score
										</Text>
										<Text color='#fff' fontWeight='bold' fontSize='34px'>
											87%
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
								{/* <Button maxW='135px' fontSize='10px' variant='brand'>
                  NEW PROJECT
                </Button> */}
							</Flex>
						</CardHeader>
						<CardBody>
							<Flex
								direction='column'
								w='100%'>
								{projectsData.map((project, index) => (
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
														${project.raised.toLocaleString()}/${project.goal.toLocaleString()}
													</Text>
												</Flex>
												<Flex justify='space-between'>
													<Text color='gray.400' fontSize='sm'>
														Sustainability Score:
													</Text>
													<Text color='#fff' fontSize='sm'>
														{project.sustainability}%
													</Text>
												</Flex>
											</Flex>
											<Flex align='center' ml='20px'>
												<Text
													color={project.status === 'Active' ? 'green.400' : 'yellow.400'}
													fontSize='sm'
													fontWeight='bold'>
													{project.status}
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
								<GradientBorder mb='20px' borderRadius='20px'>
									<Flex
										bg='linear-gradient(126.97deg, rgba(10, 10, 10) 28.26%, rgba(5, 5, 5) 91.2%)'
										p='16px'
										borderRadius='20px'
										direction='column'>
										<Flex justify='space-between' mb='10px'>
											<Text color='#fff' fontSize='sm' fontWeight='bold'>
												Investor Pitch - Round A
											</Text>
											<Text color='green.400' fontSize='xs'>
												Positive Sentiment
											</Text>
										</Flex>
										<Text color='gray.400' fontSize='xs' mb='10px'>
											Yesterday, 15:00 - 16:30
										</Text>
										<Box p='10px' borderRadius='10px'>
											<Text color='gray.300' fontSize='xs'>
												Key Points: Project scalability discussed, sustainability metrics approved,
												timeline adjustment needed for Phase 2
											</Text>
										</Box>
										<Flex mt='10px' justify='flex-end'>
											<Button variant='outline' size='sm' style={{
												backgroundColor: "transparent",
												borderColor: "white",
												color: "white"
											}}>
												View Recording
											</Button>
										</Flex>
									</Flex>
								</GradientBorder>
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
		</Flex>
	);
}

export default Dashboard;