import React, {useState, useEffect} from 'react'
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
import {
    ObtenerGestionCarrerasReducer
} from '../../Redux/Actions/Administrador/GestionCarreras'
import { useSelector, useDispatch } from 'react-redux'
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { 
    AgregarListaFechasEventosReducer, 
    EditarListaFechasEventosReducer, 
    EliminarItemListaFechasEventosReducer,
    AgregarEventoReducer,
    ObtenerListaPonentesEventosReducer
} from 'Redux/Actions/Administrador/GestionEventos';
import Selects from 'react-select'
import cogoToast from 'cogo-toast';

const ModalCrearEvento = (props) => {

    const dispatch = useDispatch()
    const {
		rex_lista_gestion_carreras
    } = useSelector(({adminGestionCarreras}) => adminGestionCarreras)
    const {
		rex_lista_fechas_eventos,
        rex_lista_completa_ponentes_eventos
    } = useSelector(({adminGestionEventos}) => adminGestionEventos)

    const mostrarModal = props.mostrarModal
    const setMostrarModal = props.setMostrarModal
    const agregarEvento = props.agregarEvento

    // const [mostrarModal, setMostrarModal] = useState(false)
    const brandColor = useColorModeValue('brand.500', 'white');

    useEffect(() => {
        dispatch(ObtenerGestionCarrerasReducer())
        dispatch(ObtenerListaPonentesEventosReducer())
    }, [])

    // INPUTS PARA ENVIAR

    const [loadingGuardar, setLoadingGuardar] = useState(false)
    const [idCarrera, setIdCarrera] = useState(0)
    const [inputRecurrente, setInputRecurrente] = useState(false)
    const [tipoEnsenanza, setTipoEnsenanza] = useState("Virtual")
    const [clasificacionEvento, setClasificacionEvento] = useState("")
    const [tipoEvento, setTipoEvento] = useState("")
    const [organizacion, setOrganizacion] = useState("")
    const [linkZoom, setLinkZoom] = useState("")
    const [linkEncuesta, setLinkEncuesta] = useState("")
    const [inputCupos, setInputCupos] = useState("")
    const [inputHrsExtra, setInputHrsExtra] = useState("")

    const [fileFlyer, setFileFlyer] = useState(null)
    const [filePlantillaCertificado, setFilePlantillaCertificado] = useState(null)
    const [inputSede, setInputSede] = useState("")
    const [auditoria, setAuditoria] = useState("")
    const [inputNombre, setInputNombre] = useState("")
    // const [inputFecha, setInputFecha] = useState("")
    // const [inputFecHora, setInputFecHora] = useState("")
    const [estadoEvento, setEstadoEvento] = useState("")
    const [listPonentes, setListPonentes] = useState([])

    return (
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
                            onChange={setTipoEnsenanza} 
                            value={tipoEnsenanza}
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
                                        tipoEnsenanza == "Virtual"
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
                                        value='Virtual'
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
                                        tipoEnsenanza == "Presencial"
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
                                        value='Presencial'
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
                                <Input 
                                    variant='filled' 
                                    placeholder='Nombre del Evento'
                                    onChange={(e) => {
                                        setInputNombre(e.target.value)
                                    }}
                                    value={inputNombre}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                alignSelf: "center"
                            }}
                        >
                            <Checkbox 
                                onChange={(e) => {
                                    setInputRecurrente(e.target.checked)

                                    if(!e.target.checked){
                                        dispatch(EliminarItemListaFechasEventosReducer(99, true))
                                    }

                                }}
                                checked={inputRecurrente}
                            >
                                Evento Recurrente
                            </Checkbox>
                        </div>
                    </SimpleGrid>
                    <SimpleGrid 
                        columns={{ base: 1, md: 1 }} gap='20px'
                    >
                        <div
                            style={{
                                marginTop:'10px',
                                marginBottom:'-10px'
                            }}
                        >
                            Configurar Evento:
                        </div>
                        
                        {
                            rex_lista_fechas_eventos.map((lfecha, pos) => {
                                return (
                                    <SimpleGrid 
                                        columns={{ base: 1, md: 2 }} gap='20px'
                                        style={{
                                            marginBottom:'-5px',
                                            marginTop:'0px'
                                        }}
                                    >
                                        <div style={{display: 'flex'}} >
                                            <div
                                                style={{
                                                    alignSelf: "center",
                                                    marginRight:'5px'
                                                }}
                                            >
                                                {(pos+1)+")"}
                                            </div>
                                            <div>
                                                <Input 
                                                    placeholder="Fecha"
                                                    size="md"
                                                    type="datetime-local"
                                                    style={{
                                                        border: '1px solid #0C0F59',
                                                        marginRight:'10px'
                                                    }}
                                                    value={lfecha.fecha}
                                                    onChange={(e) => {
                                                        console.log(e.target.value);
                                                        dispatch(EditarListaFechasEventosReducer(e.target.value, pos))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div
                                            style={{
                                                alignSelf: "center"
                                            }}
                                        >

                                            {
                                                inputRecurrente == true
                                                ?pos == 0
                                                    ?<div
                                                        style={{
                                                            borderRadius: '100%',
                                                            background: '#0C0F59',
                                                            width: '25px',
                                                            height: '25px',
                                                            cursor: 'pointer',
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "white",
                                                            fontSize:'12px'
                                                        }}
                                                        onClick={() => {
                                                            dispatch(AgregarListaFechasEventosReducer({fecha:null}))
                                                        }}
                                                    >
                                                        <AddIcon />
                                                    </div>
                                                    :<div
                                                        style={{
                                                            borderRadius: '100%',
                                                            background: '#E53E3E',
                                                            width: '25px',
                                                            height: '25px',
                                                            cursor: 'pointer',
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "white",
                                                            fontSize:'12px'
                                                        }}
                                                        onClick={() => {
                                                            dispatch(EliminarItemListaFechasEventosReducer(pos))
                                                        }}
                                                    >
                                                        <MinusIcon />
                                                    </div>
                                                :null
                                            }
                                            
                                        </div>
                                    </SimpleGrid>
                                )
                            })
                        }
                        

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
                                onChange={(e) => {
                                    setIdCarrera(e.target.value)
                                }}
                                value={idCarrera}
                            >
                                {
                                    rex_lista_gestion_carreras.map((carrera) => {
                                        return (
                                            <option 
                                                value={carrera.id}
                                            >
                                                {carrera.nombre}
                                            </option>
                                        )
                                    })
                                }
                            </Select>
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
                                onChange={(e) => {
                                    setClasificacionEvento(e.target.value)
                                }}
                                value={clasificacionEvento}
                            >
                                <option 
                                    value={"clasi1"}
                                >
                                    {"Clasificación 1"}
                                </option>

                                <option 
                                    value={"clasi2"}
                                >
                                    {"Clasificación 2"}
                                </option>

                            </Select>
                        </div>
                        <div>
                            <div>
                                Tipo de Evento:
                            </div>
                            <Select 
                                placeholder='Seleccionar Tipo de Evento'
                                size='sm' 
                                variant='filled'
                                onChange={(e) => {
                                    setTipoEvento(e.target.value)
                                }}
                                value={tipoEvento}
                            >
                                <option 
                                    value={"evnt1"}
                                >
                                    {"Evento 1"}
                                </option>

                                <option 
                                    value={"evnt2"}
                                >
                                    {"Evento 2"}
                                </option>

                            </Select>
                        </div>
                    </SimpleGrid>
                    
                    <SimpleGrid 
                        columns={{ base: 1, md: 1 }} gap='20px'
                    >
                        {
                            tipoEnsenanza == "Presencial"
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
                                    <Input 
                                        variant='filled' placeholder='Organización' 
                                        onChange={(e) => {
                                            setOrganizacion(e.target.value)
                                        }}
                                        value={organizacion}
                                    />
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
                            {/* <Select 
                                placeholder='Seleccionar Nombre del Ponente'
                                size='sm' 
                                variant='filled'
                            /> */}
                            <Selects 
                                // options={[
                                //     { value: 'ponente1', label: 'Ponente 1' },
                                //     { value: 'ponente2', label: 'Ponente 2' },
                                //     { value: 'ponente3', label: 'Ponente 3' }
                                // ]}
                                options={rex_lista_completa_ponentes_eventos}
                                isMulti
                                onChange={(e) => {
                                    setListPonentes(e)
                                }}
                                value={listPonentes}
                            />

                        </div>
                        
                        {
                            tipoEnsenanza == "Presencial"
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
                                            onChange={(e) => {
                                                setInputSede(e.target.value)
                                            }}
                                            value={inputSede}
                                        >
                                            <option 
                                                value={"sed1"}
                                            >
                                                {"Sede 1"}
                                            </option>

                                            <option 
                                                value={"sed2"}
                                            >
                                                {"Sede 2"}
                                            </option>
                                        </Select>
                                    </div>
                                    <div>
                                        <div>
                                            Lugar:
                                        </div>
                                        <Input 
                                            variant='filled' placeholder='Lugar' 
                                            onChange={(e) => {
                                                setAuditoria(e.target.value)
                                            }}
                                            value={auditoria}
                                        />
                                        {/* <Select 
                                            placeholder='Seleccionar Auditorio'
                                            size='sm' 
                                            variant='filled'
                                            onChange={(e) => {
                                                setAuditoria(e.target.value)
                                            }}
                                            value={auditoria}
                                        >
                                            <option 
                                                value={"aud1"}
                                            >
                                                {"Auditoria 1"}
                                            </option>

                                            <option 
                                                value={"aud2"}
                                            >
                                                {"Auditoria 2"}
                                            </option>
                                        </Select> */}
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
                                    <Input 
                                        variant='filled' placeholder='Link de Zoom' 
                                        onChange={(e) => {
                                            setLinkZoom(e.target.value)
                                        }}
                                        value={linkZoom}
                                    />
                                </div>   
                            </>
                        }

                        <SimpleGrid 
                            columns={{ base: 1, md: 2 }} gap='20px'
                            style={{
                                marginBottom:'20px',
                                marginTop:'20px'
                            }}
                        >
                            <div>
                                <div>
                                    # Cupos
                                </div>
                                <Input 
                                    variant='filled' 
                                    placeholder='Numero Cupos'
                                    onChange={(e) => {
                                        setInputCupos(e.target.value)
                                    }}
                                    type='number'
                                    value={inputCupos}
                                />
                            </div>
                            <div>
                                <div>
                                    Horas Extracurriculares:
                                </div>
                                <Input 
                                    variant='filled' 
                                    placeholder='Hrs Extracurriculares'
                                    onChange={(e) => {
                                        setInputHrsExtra(e.target.value)
                                    }}
                                    type='number'
                                    value={inputHrsExtra}
                                />
                            </div>
                        </SimpleGrid>

                        <>
                            <div>
                                Link de Encuesta
                            </div>
                            <div
                                style={{
                                    marginTop:'-15px'
                                }}
                            >
                                <Input 
                                    variant='filled' placeholder='Link de Encuesta' 
                                    onChange={(e) => {
                                        setLinkEncuesta(e.target.value)
                                    }}
                                    value={linkEncuesta}
                                />
                            </div>   
                        </>

                        <div>
                            Cargar Flyer
                        </div>
                        <div
                            style={{
                                height:'140px'
                            }}
                        >
                            <Dropzone
                                w={{ base: '100%', lg: '100%', xg: '100%', '2xl': '108px' }}
                                me='36px'
                                maxH={{ base: '30%', lg: '100%', '2xl': '100%' }}
                                minH={{ base: '30%', lg: '100%', '2xl': '100%' }}
                                content={
                                    <Box>
                                        <Icon as={MdUpload} w='40px' h='40px' color={brandColor} />
                                        <Flex justify='center' mx='auto' mb='8px'>
                                            <Text fontSize='xl' fontWeight='700' color={brandColor}>
                                                {
                                                    fileFlyer 
                                                    ?fileFlyer.name
                                                    :"Selecciona el archivo que deseas subir"
                                                }
                                            </Text>
                                        </Flex>
                                        <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                                            Solo esta permitido archivos PDF
                                        </Text>
                                    </Box>
                                }
                                selectFile ={setFileFlyer}
                            />
                        </div>


                        <div>
                            Cargar Plantilla Certificado
                        </div>
                        <div
                            style={{
                                height:'140px'
                            }}
                        >
                            <Dropzone
                                w={{ base: '100%', lg: '100%', xg: '100%', '2xl': '108px' }}
                                me='36px'
                                maxH={{ base: '30%', lg: '100%', '2xl': '100%' }}
                                minH={{ base: '30%', lg: '100%', '2xl': '100%' }}
                                content={
                                    <Box>
                                        <Icon as={MdUpload} w='40px' h='40px' color={brandColor} />
                                        <Flex justify='center' mx='auto' mb='8px'>
                                            <Text fontSize='xl' fontWeight='700' color={brandColor}>
                                                {
                                                    filePlantillaCertificado 
                                                    ?filePlantillaCertificado.name
                                                    :"Selecciona el archivo que deseas subir"
                                                }
                                            </Text>
                                        </Flex>
                                        <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                                            Solo esta permitido archivos PDF
                                        </Text>
                                    </Box>
                                }
                                selectFile ={setFilePlantillaCertificado}
                            />
                        </div>
                    </SimpleGrid>
                </div>
            </ModalBody>

            <ModalFooter>
                {/* <Button 
                    colorScheme='ghost' mr={3} 
                    onClick={()=>{
                        setMostrarModal(!mostrarModal)
                    }}
                >
                    Cancelar
                </Button> */}
                <Button 
                    // variant='blue'
                    colorScheme='blue'
                    isLoading={loadingGuardar}
                    onClick={async () => {
                        setLoadingGuardar(true)
                        const data = {
                            "req_carrera" : idCarrera,
                            "req_recurrente" : inputRecurrente,
                            "req_tipoensenanza" : tipoEnsenanza,
                            "req_clasificacionevento" : clasificacionEvento,
                            "req_tipoevento" : tipoEvento,
                            "req_organizacion" : organizacion,
                            "req_zoom" : linkZoom,
                            "req_linkEncuesta" : linkEncuesta,
                            "req_linkflyer" : "",
                            "req_sede" : inputSede,
                            "req_auditoria" : auditoria,
                            "req_nombre" : inputNombre,
                            "req_fecha" : "",
                            "req_fechahora" : "",
                            "req_estado" : true,
                            "req_ponente" : "",
                            "req_list_fechas" : rex_lista_fechas_eventos,
                            "req_list_ponentes" : listPonentes,
                            "req_cupos" : inputCupos,
                            "req_hrsextra" : inputHrsExtra
                            // "req_linkflyer" : fileFlyer,
                        }

                        const rpta = await agregarEvento(data, fileFlyer, filePlantillaCertificado)
                        if(rpta.respuesta == true){
                            cogoToast.success(
                                'El evento fue creado correctamente',
                                {
                                    position: 'top-right',
                                    heading: 'Evento Creado'
                                },
                            );
                            setMostrarModal(!mostrarModal)
                            setLoadingGuardar(false)
                        }else{
                            setLoadingGuardar(false)
                        }
                    }}
                >
                    Guardar Evento
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )

}

export default ModalCrearEvento