import React, {useState} from 'react'
import Card from 'components/card/Card';
import Dropzone from 'views/admin/profile/components/Dropzone';
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { MdUpload } from 'react-icons/md';
import {
    SubirArchivosEstudiantesReducer
} from '../../Redux/Actions/Administrador/AdminCarga'
import { useSelector, useDispatch } from 'react-redux'
import cogoToast from 'cogo-toast';
import config from '../../config'

const AdminCarga = () => {

    const brandColor = useColorModeValue('brand.500', 'white');
    const [fileFlyer, setFileFlyer] = useState(null)

    const dispatch = useDispatch()

    const handleDescarga = () => {
        // URL del archivo que deseas descargar
        const archivoURL = `${config.api_public}/descargar-plantilla-estudiante/plantilla_carga_estudiantes.xlsx`;
    
        // Crear un elemento <a> temporal
        const link = document.createElement('a');
        link.href = archivoURL;
    
        // Establecer el nombre del archivo a descargar (opcional)
        link.download = 'nombre_del_archivo.pdf';
    
        // Simular un clic en el enlace
        document.body.appendChild(link);
        link.click();
    
        // Limpiar el elemento <a> temporal
        document.body.removeChild(link);
    };

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
                Carga Masiva de Estudiantes
            </div>
            <Card>
                <div
                    style={{
                        height:'320px'
                    }}
                >
                    <Dropzone
                        w={{ base: '100%', lg: '100%', xg: '100%', '2xl': '268px' }}
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

                <div
                    style={{
                        display: 'flex',
                        marginTop: "20px"
                    }}
                >
                    <div
                        style={{
                            marginRight: '20px'
                        }}
                    >
                        <Button
                            me='100%'
                            mb='50px'
                            w='160px'
                            minW='140px'
                            mt={{ base: '20px', '2xl': 'auto' }}
                            variant='brand'
                            fontWeight='500'
                            onClick={handleDescarga}
                            style={{
                                background: "rgb(42, 210, 149)",
                                borderRadius: "8px",
                                color: "white",
                                textAlignLast: "center"
                            }}
                        >
                            Descargar Plantilla
                        </Button>
                    </div>

                    <div>
                        <Button
                            me='100%'
                            mb='50px'
                            w='140px'
                            minW='140px'
                            mt={{ base: '20px', '2xl': 'auto' }}
                            variant='brand'
                            fontWeight='500'
                            onClick={async () => {
                                await dispatch(SubirArchivosEstudiantesReducer(fileFlyer))
                                cogoToast.success(
                                    'Los estudiantes fueron cargados correctamente',
                                    {
                                        position: 'top-right',
                                        heading: 'Carga Estudiantes'
                                    },
                                );
                            }}
                        >
                            Subir Archivos
                        </Button>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default AdminCarga