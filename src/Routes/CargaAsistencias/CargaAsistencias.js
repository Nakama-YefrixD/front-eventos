import React, {useState} from 'react'
import Card from 'components/card/Card';
import Dropzone from 'views/admin/profile/components/Dropzone';
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { MdUpload } from 'react-icons/md';
import {
    SubirArchivosAsistenciasReducer
} from '../../Redux/Actions/CargaAsistencias/CargaAsistencias'
import { useSelector, useDispatch } from 'react-redux'
import cogoToast from 'cogo-toast';

const CargaAsistencias = () => {

    const brandColor = useColorModeValue('brand.500', 'white');
    const [fileFlyer, setFileFlyer] = useState(null)

    const dispatch = useDispatch()

    return (
        <div>
            Home
            <br/>
            <br/>
            <br/>
            
            <div
                className='chakra-link css-jw2vrk'
                style={{
                    marginBottom:'20px'
                }}
            >
                Cargar Asistencias de un Evento
            </div>
            <Card>
                <div
                    style={{
                        height:'320px'
                    }}
                >
                    <Dropzone
                        w={{ base: '100%', '2xl': '268px' }}
                        me='36px'
                        maxH={{ base: '60%', lg: '50%', '2xl': '100%' }}
                        minH={{ base: '60%', lg: '50%', '2xl': '100%' }}
                        content={
                            <Box>
                                <Icon as={MdUpload} w='80px' h='80px' color={brandColor} />
                                <Flex justify='center' mx='auto' mb='12px'>
                                    <Text fontSize='xl' fontWeight='700' color={brandColor}>
                                        {
                                            fileFlyer 
                                            ?fileFlyer.name
                                            :"Selecciona el archivo que deseas subir"
                                        }
                                    </Text>
                                </Flex>
                                <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                                    Solo esta permitido archivos excel
                                </Text>
                            </Box>
                        }
                        selectFile ={setFileFlyer}
                    />
                </div>

                <Button
                    me='100%'
                    mb='50px'
                    w='140px'
                    minW='140px'
                    mt={{ base: '20px', '2xl': 'auto' }}
                    variant='brand'
                    fontWeight='500'
                    onClick={async () => {
                        await dispatch(SubirArchivosAsistenciasReducer(fileFlyer))
                        cogoToast.success(
                            'Las asistencias fueron cargados correctamente',
                            {
                                position: 'top-right',
                                heading: 'Carga Estudiantes'
                            },
                        );
                    }}
                >
                    Subir Archivos
                </Button>

            </Card>
        </div>
    )
}

export default CargaAsistencias