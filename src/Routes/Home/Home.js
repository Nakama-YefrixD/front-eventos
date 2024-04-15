import React, {useEffect} from 'react'
import { Box, Button, Flex, Grid, Link, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react';
import NFT from 'components/card/NFT';
import Avatar1 from 'assets/img/avatars/avatar1.png';
import Avatar2 from 'assets/img/avatars/avatar2.png';
import Avatar3 from 'assets/img/avatars/avatar3.png';
import Avatar4 from 'assets/img/avatars/avatar4.png';
import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft2 from 'assets/img/nfts/Nft2.png';
import Nft3 from 'assets/img/nfts/Nft3.png';
import Nft4 from 'assets/img/nfts/Nft4.png';
import Nft5 from 'assets/img/nfts/Nft5.png';
import Nft6 from 'assets/img/nfts/Nft6.png';
import { useSelector, useDispatch } from 'react-redux'
import {
    ObtenerEventosHomeReducer
} from '../../Redux/Actions/Home/Home'

const Home = () => {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const dispatch = useDispatch()

    const {
		rex_lista_eventos_home
    } = useSelector(({home}) => home)

    const {
		rex_usuario_seleccionado
    } = useSelector(({login}) => login)

    useEffect(() => {

        dispatch(ObtenerEventosHomeReducer())

    }, [])

    return (
        <div>
            Home
            <br/>
            <br/>
            <br/>
            
            <div
                className='chakra-link css-jw2vrk'
                style={{
                    marginBottom:'-30px'
                }}
                onClick={() => {
                    console.log(rex_usuario_seleccionado);
                }}
            >
                ¡Bienvenido, {rex_usuario_seleccionado?.usunombre}!
            </div>
            {/* <div
                className='chakra-link css-jw2vrk'
                style={{
                    fontSize:'20px',
                    fontWeight:'400',
                    marginBottom:'20px'
                }}
            >
                Ultimas Novedades
            </div> */}
            <Text mt='45px' mb='36px' color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Ultimas Novedades
            </Text>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>

                {
                    rex_lista_eventos_home.map((evt, pos) => {
                        return (
                            pos < 3
                            ?<NFT
                                name={evt.nombre}
                                author={ evt.ponente ?evt.ponente.ponente : "-"}
                                carrera={ evt.carreras ?evt.carreras.nombre :"-" }
                                linkflyer={ evt.linkflyer }
                                bidders={[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ]}
                                image={Nft3}
                                currentbid={
                                    evt.fechaseventos
                                    ?evt.fechaseventos.map((fec, pos) => {
                                        return(
                                            pos == 0
                                            ?fec.fecha
                                            :null
                                        )
                                    })
                                    :""
                                }
                                download='#'
                                showIcon={false}
                                inscrito = { evt.eventosusuarios.length > 0 ?true :false }
                                evento = {evt}
                                mostrarEventos = {() => dispatch(ObtenerEventosHomeReducer())}
                            />
                            :null
                        )
                    })
                }
            </SimpleGrid>

            <Text mt='45px' mb='36px' color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Eventos de la semana
            </Text>

            <SimpleGrid columns={{ base: 1, md: 5 }} gap='20px'>
                {
                    rex_lista_eventos_home.map((evt, pos) => {
                        return (
                            pos > 2
                            ?<NFT
                                name={evt.nombre}
                                author={ evt.ponente ?evt.ponente.ponente : "-"}
                                carrera={ evt.carreras ?evt.carreras.nombre :"-" }
                                linkflyer={ evt.linkflyer }
                                bidders={[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ]}
                                image={Nft3}
                                currentbid={
                                    evt.fechaseventos
                                    ?evt.fechaseventos.map((fec, pos) => {
                                        return(
                                            pos == 0
                                            ?fec.fecha
                                            :null
                                        )
                                    })
                                    :""
                                }
                                download='#'
                                showIcon={true}
                                inscrito = { evt.eventosusuarios.length > 0 ?true :false }
                                evento = {evt}
                                mostrarEventos = {() => dispatch(ObtenerEventosHomeReducer())}
                            />
                            :null
                        )
                    })
                }
            </SimpleGrid>
        </div>
    )
}

export default Home