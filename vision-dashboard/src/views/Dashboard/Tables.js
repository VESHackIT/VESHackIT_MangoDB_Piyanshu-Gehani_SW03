import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	Grid,
	Icon,
	Progress,
	SimpleGrid,
	Spacer,
	Stack,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react';
// Styles for the circular progressbar
import medusa from 'assets/img/cardimgfree.png';
// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import BarChart from 'components/Charts/BarChart';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
// Icons
import { CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon } from 'components/Icons/Icons.js';
import DashboardTableRow from 'components/Tables/DashboardTableRow';
import TimelineRow from 'components/Tables/TimelineRow';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiHappy } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { IoCheckmarkDoneCircleSharp, IoEllipsisHorizontal } from 'react-icons/io5';
// Data
import {
	barChartDataDashboard,
	barChartOptionsDashboard,
	lineChartDataDashboard,
	lineChartOptionsDashboard
} from 'variables/charts';
import { dashboardTableData, timelineData } from 'variables/general';

export default function Dashboard() {
	const [founderData, setFounderData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await fetch('http://localhost:5002/login/founder/Piyanshu');
			const data = await response.json();
			setFounderData(data.founder);
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
	
		fetchData();
	  }, []);
	
	  if (!founderData) {
		return <Text>Loading...</Text>;
	  }
// Calculate total funds raised
const totalRaised = founderData.projects.reduce((sum, project) => sum + (project.raisedAmount || 0), 0);

// Calculate total funding goals
const totalFundingGoal = founderData.projects.reduce((sum, project) => sum + (project.fundingGoal || 0), 0) || 1;

// Calculate success rate safely
const successfulProjects = founderData.projects.filter(project => (project.raisedAmount || 0) >= (project.fundingGoal || 0)).length;
const successRate = successfulProjects == 0 ? 0 : ((successfulProjects / Math.max(founderData.projects.length, 1)) * 100).toFixed(0);
// const successRate = 75;

// Ensure funding progress is a valid number
const rawFundingProgress = (totalRaised / totalFundingGoal) * 100;
const fundingProgress = 75;
// const fundingProgress = isNaN(rawFundingProgress) ? "0.00" : Math.min(rawFundingProgress, 100).toFixed(2);


// Controlled random backer count
const backersThisYear = Math.floor(Math.random() * 501) + 500; // Between 500-1000

// Calculate average contribution safely
const avgContribution = backersThisYear > 0 ? (totalRaised / backersThisYear).toFixed(2) : 0;


	return (
		<Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
			<SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing='24px'>
				{/* Project Funding Status */}
				<Card>
					<CardBody>
						<Flex flexDirection='row' align='center' justify='center' w='100%'>
							<Stat me='auto'>
								<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
									Total Funds Raised
								</StatLabel>
								<Flex>
									<StatNumber fontSize='lg' color='#fff'> ${totalRaised.toLocaleString()}</StatNumber>
									<StatHelpText color='green.400' fontWeight='bold' ps='3px' fontSize='md'>+{fundingProgress.toFixed(0)}%</StatHelpText>
								</Flex>
							</Stat>
							<IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
								<WalletIcon h={'24px'} w={'24px'} color='#fff' />
							</IconBox>
						</Flex>
					</CardBody>
				</Card>

				{/* AI Validation Status */}
				<Card>
					<CardBody>
						<Flex flexDirection='row' align='center' justify='center' w='100%'>
							<Stat>
								<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
									 Score
								</StatLabel>
								<Flex>
									<StatNumber fontSize='lg' color='#fff'>{founderData.projects.length > 0
                      ? (
                          founderData.projects.reduce((sum, project) => sum + project.sustainability_score, 0) /
                          founderData.projects.length
                        ).toFixed(0) + '%'
                      : 'N/A'}</StatNumber>
								</Flex>
							</Stat>
							<IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
								<RocketIcon h={'24px'} w={'24px'} color='#fff' />
							</IconBox>
						</Flex>
					</CardBody>
				</Card>

				{/* Founder Rating */}
				<Card>
					<CardBody>
						<Flex flexDirection='row' align='center' justify='center' w='100%'>
							<Stat>
								<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
									Founder Trust Rating
								</StatLabel>
								<Flex>
									<StatNumber fontSize='lg' color='#fff'>4.7/5</StatNumber>
								</Flex>
							</Stat>
							<IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
								<StatsIcon h={'24px'} w={'24px'} color='#fff' />
							</IconBox>
						</Flex>
					</CardBody>
				</Card>
			</SimpleGrid>

			<Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', '2xl': '2fr 1.2fr 1.5fr' }} my='26px' gap='18px'>
				
				{/* Satisfaction Rate */}
				<Card gridArea={{ md: '2 / 1 / 3 / 2', '2xl': 'auto' }}>
									<CardHeader mb='24px'>
										<Flex direction='column'>
											<Text color='#fff' fontSize='lg' fontWeight='bold' mb='4px'>
												Project Success Rate
											</Text>
											<Text color='gray.400' fontSize='sm'>
												From all solar projects
											</Text>
										</Flex>
									</CardHeader>
									<Flex direction='column' justify='center' align='center'>
										<Box zIndex='-1'>
											<CircularProgress
												size={200}
												value={successRate}
												thickness={6}
												color='brand.400'
												variant='vision'>
												<CircularProgressLabel>
													<IconBox mb='20px' mx='auto' borderRadius='50%' w='48px' h='48px'>
														<Icon as={BiHappy} color='#fff' w='30px' h='30px' />
													</IconBox>
												</CircularProgressLabel>
											</CircularProgress>
										</Box>
										<Stack
											direction='row'
											spacing={{ sm: '42px', md: '68px' }}
											justify='center'
											maxW={{ sm: '270px', md: '300px', lg: '100%' }}
											mx={{ sm: 'auto', md: '0px' }}
											p='18px 22px'
											bg='linear-gradient(126.97deg, rgba(10, 10, 10) 28.26%, rgba(5, 5, 5) 91.2%)'
											borderRadius='20px'
											position='absolute'
											bottom='5%'>
											<Text fontSize='xs' color='gray.400'>
												0%
											</Text>
											<Flex direction='column' align='center' minW='80px'>
											<Text color='#fff' fontSize='28px' fontWeight='bold'>
                  {successRate}%
                </Text>
												<Text fontSize='xs' color='gray.400'>
													Success Rate
												</Text>
											</Flex>
											<Text fontSize='xs' color='gray.400'>
												100%
											</Text>
										</Stack>
									</Flex>
								</Card>
				{/* Project Status */}
				<Card gridArea={{ md: '2 / 2 / 3 / 3', '2xl': 'auto' }}>
									<Flex direction='column'>
										<Flex justify='space-between' align='center' mb='40px'>
											<Text color='#fff' fontSize='lg' fontWeight='bold'>
												Project Status
											</Text>
										</Flex>
										<Flex direction={{ sm: 'column', md: 'row' }}>
											<Flex direction='column' me={{ md: '6px', lg: '52px' }} mb={{ sm: '16px', md: '0px' }}>
												<Flex
													direction='column'
													p='22px'
													pe={{ sm: '22e', md: '8px', lg: '22px' }}
													minW={{ sm: '220px', md: '140px', lg: '220px' }}
													bg='linear-gradient(126.97deg,rgb(10, 10, 10) 28.26%, rgba(5, 5, 5, 0.5) 91.2%)'
													borderRadius='20px'
													mb='20px'>
													<Text color='gray.400' fontSize='sm' mb='4px'>
														Panels Delivered
													</Text>
													<Text color='#fff' fontSize='lg' fontWeight='bold'>
														50% Complete
													</Text>
												</Flex>
												<Flex
													direction='column'
													p='22px'
													pe={{ sm: '22px', md: '8px', lg: '22px' }}
													minW={{ sm: '170px', md: '140px', lg: '170px' }}
													bg='linear-gradient(126.97deg,rgb(10, 10, 10) 28.26%, rgba(5, 5, 5, 0.5) 91.2%)'
													borderRadius='20px'>
													<Text color='gray.400' fontSize='sm' mb='4px'>
														Grid Connection
													</Text>
													<Text color='#fff' fontSize='lg' fontWeight='bold'>
														In Progress
													</Text>
												</Flex>
											</Flex>
											<Box mx={{ sm: 'auto', md: '0px' }}>
												<CircularProgress
													size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
													value={fundingProgress}
													thickness={6}
													color='yellow.500'
													variant='vision'>
													<CircularProgressLabel>
														<Flex direction='column' justify='center' align='center'>
															<Text color='gray.400' fontSize='sm'>
																Overall
															</Text>
															<Text
																color='#fff'
																fontSize={{ md: '20px', lg: '20px' }}
																fontWeight='bold'
																mb='4px'>
																{fundingProgress.toFixed(0)}%
															</Text>
															<Text color='gray.400' fontSize='sm'>
																Completion
															</Text>
														</Flex>
													</CircularProgressLabel>
												</CircularProgress>
											</Box>
										</Flex>
									</Flex>
								</Card>
			</Grid>
			<Grid
				templateColumns={{ sm: '1fr', lg: '1.7fr 1.3fr' }}
				maxW={{ sm: '100%', md: '100%' }}
				gap='24px'
				mb='24px'>
				{/* Sales Overview */}
				<Card p='28px 0px 0px 0px'>
									<CardHeader mb='20px' ps='22px'>
										<Flex direction='column' alignSelf='flex-start'>
											<Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
												Project Timeline
											</Text>
											<Text fontSize='md' fontWeight='medium' color='gray.400'>
												<Text as='span' color='green.400' fontWeight='bold'>
													On Track
												</Text>{' '}
												for completion
											</Text>
										</Flex>
									</CardHeader>
									<Box w='100%' minH={{ sm: '300px' }}>
										<LineChart
											lineChartData={lineChartDataDashboard}
											lineChartOptions={lineChartOptionsDashboard}
										/>
									</Box>
								</Card>
				{/* Active Users */}
				<Card p='16px'>
  <CardBody>
    <Flex direction='column' w='100%'>
      <Box
        bg='linear-gradient(126.97deg, rgb(10, 10, 10) 28.26%, rgba(5, 5, 5, 0.5) 91.2%)'
        borderRadius='20px'
        display={{ sm: 'flex', md: 'block' }}
        justify={{ sm: 'center', md: 'flex-start' }}
        align={{ sm: 'center', md: 'flex-start' }}
        minH={{ sm: '180px', md: '220px' }}
        p={{ sm: '0px', md: '22px' }}>
        <BarChart
          barChartOptions={barChartOptionsDashboard}
          barChartData={barChartDataDashboard}
        />
      </Box>
      <Flex direction='column' mt='24px' mb='36px' alignSelf='flex-start'>
        <Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
          Project Funding Overview
        </Text>
        <Text fontSize='md' fontWeight='medium' color='gray.400'>
          <Text as='span' color='green.400' fontWeight='bold'>
            (+18%)
          </Text>{' '}
          growth in funding this month
        </Text>
      </Flex>
      <SimpleGrid gap={{ sm: '12px' }} columns={4}>
        <Flex direction='column'>
          <Flex alignItems='center'>
            <IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
              <WalletIcon h={'15px'} w={'15px'} color='#fff' />
            </IconBox>
            <Text fontSize='sm' color='gray.400'>
              Total Raised
            </Text>
          </Flex>
          <Text fontSize={{ sm: 'md', lg: 'lg' }} color='#fff' fontWeight='bold' my='6px'>
            $125,600
          </Text>
          <Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={70} />
        </Flex>
        <Flex direction='column'>
          <Flex alignItems='center'>
            <IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
              <RocketIcon h={'15px'} w={'15px'} color='#fff' />
            </IconBox>
            <Text fontSize='sm' color='gray.400'>
              Backers this year
            </Text>
          </Flex>
          <Text fontSize={{ sm: 'md', lg: 'lg' }} color='#fff' fontWeight='bold' my='6px'>
            1,245
          </Text>
          <Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={85} />
        </Flex>
        <Flex direction='column'>
          <Flex alignItems='center'>
            <IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
              <CartIcon h={'15px'} w={'15px'} color='#fff' />
            </IconBox>
            <Text fontSize='sm' color='gray.400'>
              Projects Live
            </Text>
          </Flex>
          <Text fontSize={{ sm: 'md', lg: 'lg' }} color='#fff' fontWeight='bold' my='6px'>
            8
          </Text>
          <Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={40} />
        </Flex>
        <Flex direction='column'>
          <Flex alignItems='center'>
            <IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
              <StatsIcon h={'15px'} w={'15px'} color='#fff' />
            </IconBox>
            <Text fontSize='sm' color='gray.400'>
              Avg. Contribution
            </Text>
          </Flex>
          <Text fontSize={{ sm: 'md', lg: 'lg' }} color='#fff' fontWeight='bold' my='6px'>
            $210
          </Text>
          <Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={60} />
        </Flex>
      </SimpleGrid>
    </Flex>
  </CardBody>
</Card>

			</Grid>
			<Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '2fr 1fr' }} gap='24px'>
				{/* Active Project Submissions */}
				<Card p='16px' overflowX={{ sm: 'scroll', xl: 'hidden' }}>
					<CardHeader p='12px 0px 28px 0px'>
						<Flex direction='column'>
							<Text fontSize='lg' color='#fff' fontWeight='bold' pb='8px'>
								Active Project Submissions
							</Text>
							<Flex align='center'>
								<Icon as={IoCheckmarkDoneCircleSharp} color='teal.300' w={4} h={4} pe='3px' />
								<Text fontSize='sm' color='gray.400' fontWeight='normal'>
									<Text fontWeight='bold' as='span'>
									{founderData.projects.length} projects
									</Text>{' '}
									under review
								</Text>
							</Flex>
						</Flex>
					</CardHeader>
					<Table variant='simple' color='#fff'>
						<Thead>
							<Tr my='.8rem' ps='0px'>
								<Th
									ps='0px'
									color='gray.400'
									fontFamily='Plus Jakarta Display'
									borderBottomColor='#56577A'>
									Project Name
								</Th>
								<Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
									Impact Area
								</Th>
								<Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
									Funding Goal
								</Th>
								<Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
									Milestone Status
								</Th>
							</Tr>
						</Thead>
						<Tbody>
						{founderData.projects.map((project, index) => (
              <DashboardTableRow
                key={index}
                name={project.name}
                logo={medusa} // Replace with actual project logo if available
                members={['Project Lead', 'Technical Lead', 'Community Manager']} // Mock members
                budget={`$${project.fundingGoal.toLocaleString()}`}
                progression={(project.raisedAmount / project.fundingGoal) * 100}
                lastItem={index === founderData.projects.length - 1}
              />
            ))}
						</Tbody>
					</Table>
				</Card>
				{/* Milestone Timeline */}
				<Card>
					<CardHeader mb='32px'>
						<Flex direction='column'>
							<Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
								Milestone Timeline
							</Text>
							<Flex align='center'>
								<Icon as={AiFillCheckCircle} color='green.500' w='15px' h='15px' me='5px' />
								<Text fontSize='sm' color='gray.400' fontWeight='normal'>
									<Text fontWeight='bold' as='span' color='gray.400'>
										Next Review
									</Text>{' '}
									in 2 days
								</Text>
							</Flex>
						</Flex>
					</CardHeader>
					<CardBody>
						<Flex direction='column' lineHeight='21px'>
							{[
								{
									logo: "PanelIcon",
									title: "Solar Panel Delivery",
									date: "April 15, 2024",
									color: "green.500"
								},
								{
									logo: "GridIcon",
									title: "Grid Connection Planning",
									date: "April 30, 2024",
									color: "blue.500"
								},
								{
									logo: "TestIcon",
									title: "System Testing Phase",
									date: "May 15, 2024",
									color: "orange.500"
								},
								{
									logo: "LaunchIcon",
									title: "Grid Activation",
									date: "May 30, 2024",
									color: "purple.500"
								}
							].map((milestone, index, arr) => (
								<TimelineRow
									key={index}
									logo={milestone.logo}
									title={milestone.title}
									date={milestone.date}
									color={milestone.color}
									index={index}
									arrLength={arr.length}
								/>
							))}
						</Flex>
					</CardBody>
				</Card>
			</Grid>
		</Flex>
	);
}
