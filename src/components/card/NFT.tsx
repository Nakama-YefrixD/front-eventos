// Chakra imports
import { AvatarGroup, Avatar, Box, Button, Flex, Icon, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { useState } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import config from '../../config'
import MdInscribirse from 'components/modal/MdInscribirse';

export default function NFT(props: {
	image: string;
	name: string;
	author: string;
	carrera: string;
	linkflyer: string;
	bidders: string[];
	download: string;
	currentbid: string | number;
	showIcon: boolean;
	inscrito: boolean;
	evento: {};
	mostrarEventos: ()=>{};
}) {
	
	const { image, name, author, carrera, linkflyer, bidders, download, currentbid, showIcon, inscrito, evento, mostrarEventos } = props;

	const [ like, setLike ] = useState(true);
	
	const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
	const [eventoSeleccionado, setEventoSeleccionado] = useState({});

	const textColor = useColorModeValue('navy.700', 'white');
	const textColorBid = useColorModeValue('brand.500', 'white');
	return (
		<>
			<Card p='20px'>
				<Flex direction={{ base: 'column' }} justify='center'>
					<Box mb={{ base: '20px', '2xl': '20px' }} position='relative'>
						{/* <Image
							src={image}
							w={{ base: '100%', '3xl': '100%' }}
							h={{ base: '100%', '3xl': '100%' }}
							borderRadius='20px'
						/> */}
						<iframe
							src={config.api_public+linkflyer}
							// 'http://localhost:8003/public/mostrar-flyter-evento/evento1.pdf'
							style={{
								width:'100%',
								height:'180px'
							}}
						>

						</iframe>
						{
							showIcon == true
							?<Button
								position='absolute'
								bg='white'
								_hover={{ bg: 'whiteAlpha.900' }}
								_active={{ bg: 'white' }}
								_focus={{ bg: 'white' }}
								p='0px !important'
								top='14px'
								right='14px'
								borderRadius='50%'
								minW='36px'
								h='36px'
								onClick={() => {
									setLike(true);
								}}>
								<Icon
									transition='0.2s linear'
									w='20px'
									h='20px'
									as={like ? IoHeart : IoHeartOutline}
									color='brand.500'
								/>
							</Button>
							:null
						}
					</Box>
					<Flex flexDirection='column' justify='space-between' h='100%'>
						<Flex
							justify='space-between'
							direction={{
								base: 'row',
								md: 'column',
								lg: 'row',
								xl: 'column',
								'2xl': 'row'
							}}
							mb='auto'>
							<Flex direction='column'>
								<Text
									color={textColor}
									fontSize={{
										base: 'xl',
										md: 'lg',
										lg: 'lg',
										xl: 'lg',
										'2xl': 'md',
										'3xl': 'lg'
									}}
									mb='5px'
									fontWeight='bold'
									me='14px'>
									{name}
								</Text>
								<Text
									color='secondaryGray.600'
									fontSize={{
										base: 'sm'
									}}
									fontWeight='400'
									me='14px'>
									{author}
								</Text>
								<Text
									color='secondaryGray.600'
									fontSize={{
										base: 'sm'
									}}
									fontWeight='400'
									me='14px'>
									{carrera}
								</Text>
							</Flex>
							{/* <AvatarGroup
								max={3}
								color={textColorBid}
								size='sm'
								mt={{
									base: '0px',
									md: '10px',
									lg: '0px',
									xl: '10px',
									'2xl': '0px'
								}}
								fontSize='12px'>
								{bidders.map((avt, key) => <Avatar key={key} src={avt} />)}
							</AvatarGroup> */}
						</Flex>
						<Flex
							align={{
								base: 'center',
								md: 'start',
								lg: 'center',
								xl: 'start',
								'2xl': 'center'
							}}
							justify='space-between'
							direction={{
								base: 'row',
								md: 'column',
								lg: 'row',
								xl: 'column',
								'2xl': 'row'
							}}
							mt='25px'>
							<Text fontWeight='700' fontSize='sm' color={textColorBid}>
								{currentbid}
							</Text>
							{/* <Link
								href={download}
								mt={{
									base: '0px',
									md: '10px',
									lg: '0px',
									xl: '10px',
									'2xl': '0px'
								}}> */}
								<Button
									variant='darkBrand'
									color='white'
									fontSize='sm'
									fontWeight='500'
									borderRadius='70px'
									px='24px'
									py='5px'
									style={
										inscrito
										?{
											background: "#2AD295",
											borderRadius: "8px",
											color: "white",
											textAlignLast: "center"
										}
										:{}

									}
									onClick={() => {
										if(!inscrito){
											setEventoSeleccionado(evento)
                            				setMostrarConfirmacion(!mostrarConfirmacion)
										}
									}}
								>
									{
										inscrito
										?<div>Ya Inscrito</div>
										:<div>Inscribirse</div>
									}
								</Button>
								<MdInscribirse 
									mostrarConfirmacion = {mostrarConfirmacion}
									setMostrarConfirmacion = {setMostrarConfirmacion}
									eventoSeleccionado = {eventoSeleccionado}
									setEventoSeleccionado = {setEventoSeleccionado}
									mostrarEventos = {() => mostrarEventos()}
								/>
							{/* </Link> */}
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</>
	);
}
