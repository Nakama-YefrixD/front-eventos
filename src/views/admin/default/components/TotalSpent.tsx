// Chakra imports
import { Box, Button, Flex, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
// Assets
import { RiArrowUpSFill } from 'react-icons/ri';
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from 'variables/charts';
import { HSeparator } from 'components/separator/Separator';

export default function TotalSpent(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
	return (
		<Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
				<div
					style={{
						display:'flex',
    					alignItems: "center"
					}}
				>
					<div 
						style={{
							borderRadius:'100%',
							width:'10px',
							height:'10px',
							background:'#5F3BFF',
							marginRight:'10px'
						}}
					></div>
					Eventos Gratuitos
				</div>
				<div
					style={{
						display:'flex',
    					alignItems: "center"
					}}
				>
					<div 
						style={{
							borderRadius:'100%',
							width:'10px',
							height:'10px',
							background:'#57C3FF',
							marginRight:'10px'
						}}
					></div>
					Eventos de Paga
				</div>
			</SimpleGrid>
			<HSeparator mb='20px' />
			<Flex w='100%' flexDirection={{ base: 'column', lg: 'row' }}>
				<Box minH='260px' minW='100%' mt='auto'>
					<LineChart chartData={lineChartDataTotalSpent} chartOptions={lineChartOptionsTotalSpent} />
				</Box>
			</Flex>
		</Card>
	);
}
