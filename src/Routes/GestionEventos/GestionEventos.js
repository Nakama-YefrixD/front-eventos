import React from 'react'
import TablaGestionEventos from './TablaGestionEventos'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import Card from 'components/card/Card';
import { 
    Text, Flex, FormLabel, Icon, 
    Select, SimpleGrid, 
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input
} from '@chakra-ui/react';
import { useHistory } from "react-router-dom";

const GestionEventos = () => {

    const history = useHistory();

    return (
        <div>

            <br/>
            <br/>
            <br/>
            
            <div
                className='chakra-link css-jw2vrk'
                style={{
                    marginBottom:'15px'
                }}
            >
                Gestion de Eventos
            </div>
            <Card 
                style={{marginBottom:'20px'}}
            >
                <div
                    style={{
                        display:'flex'
                    }}
                >
                    <div
                        style={{
                            width:'35%',
                            alignSelf: 'center'
                        }}
                    >
                        <input 
                            style={{
                                border: '2px solid #0C0F59',
                                borderRadius: '8px',
                                paddingLeft:'5px',
                                width: '250px'
                            }}
                            placeholder='Buscar' 
                        />
                    </div>
                    <div
                        style={{
                            display:'flex',
                            width:'30%'
                        }}
                    >
                        <Flex
                            px={{ base: '0px', '2xl': '10px' }}
                            justifyContent='space-between'
                            alignItems='center'
                            w='100%'
                            mb='8px'>
                            <Input
                                placeholder="Fecha"
                                size="md"
                                type="date"
                                style={{
                                    border: '2px solid #0C0F59',
                                    marginRight:'10px'
                                }}
                            />
                        </Flex>
                        <Flex
                            px={{ base: '0px', '2xl': '10px' }}
                            justifyContent='space-between'
                            alignItems='center'
                            w='100%'
                            mb='8px'>
                            <Select 
                                fontSize='sm' variant='subtle' defaultValue='estado' width='unset' fontWeight='700'
                                style={{
                                    border: '2px solid #0C0F59',
                                }}
                            >
                                <option value='estado'>Estado</option>
                                <option value='monthly'>Monthly</option>
                                <option value='yearly'>Yearly</option>
                            </Select>
                        </Flex>
                    </div>
                    <div
                        style={{
                            width:'35%',
                            position:'relative'
                        }}
                    >
                        <div
                            style={{
                                width:'110px',
                                height:'40px',
                                background:'#0C0F59',
                                color:'white',
                                borderRadius:'8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor:'pointer',
                                right: '0',
                                position: 'absolute'
                            }}
                            onClick={() => {
                                history.push('/otros/crear-eventos');
                            }}
                        >
                            Agregar
                        </div>
                    </div>
                </div>
            </Card>
            
            <TablaGestionEventos tableData={tableDataComplex} />
        </div>
    )
}

export default GestionEventos