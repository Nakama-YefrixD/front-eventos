import React, {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Card from 'components/card/Card';

import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'

import { 
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
    ModalFooter,
    SimpleGrid,
    RadioGroup,
    Radio,
    Input,
    Checkbox,
    Select,
    Box,
    Icon,
    Flex,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import Dropzone from 'views/admin/profile/components/Dropzone';
import { MdUpload } from 'react-icons/md';

const events = [
    { title: 'Meeting', start: new Date() }
]

const CrearEvento = () => {

    const [mostrarModal, setMostrarModal] = useState(false)
    const [selectVirtualPresencial, setSelectVirtualPresencial] = useState(1)
    const brandColor = useColorModeValue('brand.500', 'white');

    return (
        <div
            style={{
                marginTop:'80px'
            }}
        >
            <Card
                onClick={() => {
                    setMostrarModal(true)
                }}  
            >
                <FullCalendar
                    locale={'es'}
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek" // Muestra la vista de TimeGrid para una semana
                    events={[
                        // Eventos de ejemplo
                        {
                            title: 'Evento 1',
                            start: '2023-05-17T10:00:00',
                            end: '2023-05-17T12:00:00',
                        },
                        {
                            title: 'Evento 2',
                            start: '2023-05-18T14:00:00',
                            end: '2023-05-18T16:00:00',
                        },
                    ]}
                    
                />
            </Card>
            <Modal 
                isOpen={mostrarModal} 
                onClose={()=>{
                    setMostrarModal(!mostrarModal)
                }}
                size={"xl"}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Registrar Evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                marginBottom: '30px',
                                width: "100%",
                                placeContent: "center"
                            }}
                        >
                            <RadioGroup 
                                style={{
                                    display: 'flex'
                                }}
                                onChange={setSelectVirtualPresencial} 
                                value={selectVirtualPresencial}
                            >
                                <div
                                    style={{
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex'
                                    }}
                                >
                                    <div
                                        style={
                                            selectVirtualPresencial == 1
                                            ?{
                                                borderRadius:'8px',
                                                border: '1px solid #FF7435',
                                                background: '#FFDED2',
                                                paddingLeft:'40px',
                                                paddingRight: '40px',
                                                paddingTop:'8px',
                                                paddingBottom: '8px',
                                                display: "flex"
                                            }
                                            :{
                                                borderRadius:'8px',
                                                border: '1px solid black',
                                                background: 'white',
                                                paddingLeft:'40px',
                                                paddingRight: '40px',
                                                paddingTop:'8px',
                                                paddingBottom: '8px',
                                                display: "flex"
                                            }
                                        }
                                    >
                                        <Radio 
                                            size='sm' name='1' colorScheme='red'
                                            value='1'
                                        >
                                            Virtual
                                        </Radio>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        marginLeft:'20px'
                                    }}
                                >
                                    <div
                                        style={
                                            selectVirtualPresencial == 2
                                            ?{
                                                borderRadius:'8px',
                                                border: '1px solid #FF7435',
                                                background: '#FFDED2',
                                                paddingTop:'8px',
                                                paddingBottom: '8px',
                                                display: "flex",
                                                width: '180px',
                                                justifyContent: "center"
                                            }
                                            :{
                                                borderRadius:'8px',
                                                border: '1px solid black',
                                                background: 'white',
                                                paddingTop:'8px',
                                                paddingBottom: '8px',
                                                display: "flex",
                                                width: '180px',
                                                justifyContent: "center"
                                            }
                                        }
                                    >
                                        <Radio 
                                            size='sm' name='1' colorScheme='red'
                                            value='2'
                                        >
                                            Presencial
                                        </Radio>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        <SimpleGrid 
                            columns={{ base: 1, md: 2 }} gap='20px'
                        >
                            <div>
                                <div>
                                    Nombre del Evento
                                </div>
                                <div
                                    style={{
                                        marginBottom: '10px'
                                    }}
                                >
                                    <Input variant='filled' placeholder='Nombre del Evento' />
                                </div>
                            </div>
                            <div
                                style={{
                                    alignSelf: "center"
                                }}
                            >
                                <Checkbox defaultChecked>
                                    Evento Recurrente
                                </Checkbox>
                            </div>
                        </SimpleGrid>
                        <SimpleGrid 
                            columns={{ base: 1, md: 1 }} gap='20px'
                        >
                            <div
                                style={{
                                    marginTop:'10px'
                                }}
                            >
                                Configurar Evento
                            </div>
                            <div>
                                Carrera:
                            </div>
                            <div
                                style={{
                                    marginTop:'-15px'
                                }}
                            >
                                <Select 
                                    placeholder='Seleccionar Carrera' 
                                    size='sm' 
                                    variant='filled'
                                />
                            </div>

                        </SimpleGrid>

                        <SimpleGrid 
                            columns={{ base: 1, md: 2 }} gap='20px'
                            style={{
                                marginBottom:'20px',
                                marginTop:'20px'
                            }}
                        >
                            <div>
                                <div>
                                    Clasificación del Evento:
                                </div>
                                <Select 
                                    placeholder='Seleccionar Clasificación del Evento'
                                    size='sm' 
                                    variant='filled'
                                />
                            </div>
                            <div>
                                <div>
                                    Tipo de Evento:
                                </div>
                                <Select 
                                    placeholder='Seleccionar Tipo de Evento'
                                    size='sm' 
                                    variant='filled'
                                />
                            </div>
                        </SimpleGrid>
                        
                        <SimpleGrid 
                            columns={{ base: 1, md: 1 }} gap='20px'
                        >
                            {
                                selectVirtualPresencial == 2
                                ?<>
                                    <div
                                        style={{marginTop:'-10px'}}
                                    >
                                        Organización
                                    </div>
                                    <div
                                        style={{
                                            marginTop:'-15px'
                                        }}
                                    >
                                        <Input variant='filled' placeholder='Organización' />
                                    </div>   
                                </>
                                :null
                            }
                            <div>
                                Nombre del Ponente
                            </div>
                            <div
                                style={{
                                    marginTop:'-15px'
                                }}
                            >
                                <Select 
                                    placeholder='Seleccionar Nombre del Ponente'
                                    size='sm' 
                                    variant='filled'
                                />
                            </div>
                            
                            {
                                selectVirtualPresencial == 2
                                ?<div
                                    style={{
                                        marginTop:'-20px'
                                    }}
                                >
                                    <SimpleGrid 
                                        columns={{ base: 1, md: 2 }} gap='20px'
                                        style={{
                                            marginBottom:'20px',
                                            marginTop:'20px'
                                        }}
                                    >
                                        <div>
                                            <div>
                                                Sede:
                                            </div>
                                            <Select 
                                                placeholder='Seleccionar Sede'
                                                size='sm' 
                                                variant='filled'
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                Auditorio:
                                            </div>
                                            <Select 
                                                placeholder='Seleccionar Auditorio'
                                                size='sm' 
                                                variant='filled'
                                            />
                                        </div>
                                    </SimpleGrid>
                                </div>
                                :<>
                                    <div>
                                        Link de Zoom
                                    </div>
                                    <div
                                        style={{
                                            marginTop:'-15px'
                                        }}
                                    >
                                        <Input variant='filled' placeholder='Link de Zoom' />
                                    </div>   
                                </>
                            }

                            <div>
                                Cargar Flyer
                            </div>
                            <div
                                style={{
                                    height:'140px'
                                }}
                            >
                                <Dropzone
                                    w={{ base: '100%', '2xl': '108px' }}
                                    me='36px'
                                    maxH={{ base: '30%', lg: '100%', '2xl': '100%' }}
                                    minH={{ base: '30%', lg: '100%', '2xl': '100%' }}
                                    content={
                                        <Box>
                                            <Icon as={MdUpload} w='40px' h='40px' color={brandColor} />
                                            <Flex justify='center' mx='auto' mb='8px'>
                                                <Text fontSize='xl' fontWeight='700' color={brandColor}>
                                                    Selecciona el archivo que deseas subir
                                                </Text>
                                            </Flex>
                                            <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                                                Solo esta permitido archivos PDF
                                            </Text>
                                        </Box>
                                    }
                                />
                            </div>
                        </SimpleGrid>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        colorScheme='blue' mr={3} 
                        onClick={()=>{
                            setMostrarModal(!mostrarModal)
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        variant='ghost'
                    >
                        Guardar Evento
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CrearEvento

// a custom render function
function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
}