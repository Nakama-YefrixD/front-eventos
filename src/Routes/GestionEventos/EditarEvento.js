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

const EditarEvento = (props) => {

    const dispatch = useDispatch()
    const {
		rex_lista_gestion_carreras
    } = useSelector(({adminGestionCarreras}) => adminGestionCarreras)
    const {
		rex_lista_fechas_eventos,
        rex_lista_completa_ponentes_eventos
    } = useSelector(({adminGestionEventos}) => adminGestionEventos)

    const {
        mostrarModal,
        setMostrarModal,
        funEditarEvento,
        eventoSeleccionado,
        setEventoSeleccionado
    } = props

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

    const [eventoAEditar, setEventoAEditar] = useState({
        tipoensenanza : "Virtual"
    })

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
            <ModalHeader>Editar Evento ({eventoSeleccionado.nombre})</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
                <div>
                    {/* <button onClick={() => {
                        console.log(eventoSeleccionado)
                        console.log(listPonentes)
                        console.log(rex_lista_completa_ponentes_eventos)
                    }}>click</button> */}
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
                            // onChange={setTipoEnsenanza} 
                            onChange={(e) => {
                                setEventoSeleccionado({
                                    ...eventoSeleccionado,
                                    tipoensenanza : e
                                })
                            }} 
                            value={eventoSeleccionado.tipoensenanza}
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
                                        eventoSeleccionado.tipoensenanza == "Virtual"
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
                                        eventoSeleccionado.tipoensenanza == "Presencial"
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
                                        setEventoSeleccionado({
                                            ...eventoSeleccionado,
                                            nombre : e.target.value
                                        })
                                    }}
                                    value={eventoSeleccionado.nombre}
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
                                    eventoSeleccionado?.fechas?.splice(1, 99)
                                    setEventoSeleccionado({
                                        ...eventoSeleccionado,
                                        recurrente : e.target.checked,
                                        edito : true
                                    })
                                }}
                                checked={eventoSeleccionado.recurrente}
                                defaultChecked={eventoSeleccionado.recurrente}
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
                            eventoSeleccionado?.fechas?.map((lfecha, pos) => {
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
                                                    value={lfecha.fechora}
                                                    onChange={(e) => {
                                                        let nuevasFechas = eventoSeleccionado?.fechas?.find(lf => lf.id == lfecha.id)
                                                        nuevasFechas.fechora = e.target.value
                                                        nuevasFechas.fecha = e.target.value

                                                        setEventoSeleccionado({
                                                            ...eventoSeleccionado,
                                                            edito : true
                                                        })
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
                                                eventoSeleccionado.recurrente == true
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
                                                            eventoSeleccionado?.fechas?.push({
                                                                fecha : null,
                                                                id : Math.random()
                                                            })
                                                            setEventoSeleccionado({
                                                                ...eventoSeleccionado,
                                                                edito : true
                                                            })
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
                                                            eventoSeleccionado?.fechas?.splice(pos, 1)
                                                            setEventoSeleccionado({
                                                                ...eventoSeleccionado,
                                                                edito : true
                                                            })
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
                                    // setIdCarrera(e.target.value)
                                    setEventoSeleccionado({
                                        ...eventoSeleccionado,
                                        carrera : e.target.value
                                    })
                                }}
                                value={eventoSeleccionado.carrera}
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
                                    setEventoSeleccionado({
                                        ...eventoSeleccionado,
                                        clasificacionevento : e.target.value
                                    })
                                }}
                                value={eventoSeleccionado.clasificacionevento}
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
                                    setEventoSeleccionado({
                                        ...eventoSeleccionado,
                                        tipoevento : e.target.value
                                    })
                                }}
                                value={eventoSeleccionado.tipoevento}
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
                            eventoSeleccionado.tipoensenanza == "Presencial"
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
                                            setEventoSeleccionado({
                                                ...eventoSeleccionado,
                                                organizacion : e.target.value
                                            })
                                        }}
                                        value={eventoSeleccionado.organizacion}
                                    />
                                </div>   
                            </>
                            :null
                        }
                        <div>
                            Nombre del Ponentess
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
                                    setEventoSeleccionado({
                                        ...eventoSeleccionado,
                                        ponentes : e
                                    })
                                }}
                                value={
                                    eventoSeleccionado.ponentes 
                                    ?eventoSeleccionado.ponentes 
                                    : []
                                }
                            />

                        </div>
                        
                        {
                            eventoSeleccionado.tipoensenanza == "Presencial"
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
                                                setEventoSeleccionado({
                                                    ...eventoSeleccionado,
                                                    sede : e.target.value
                                                })
                                            }}
                                            value={eventoSeleccionado.sede}
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
                                            Auditorio:
                                        </div>
                                        <Select 
                                            placeholder='Seleccionar Auditorio'
                                            size='sm' 
                                            variant='filled'
                                            onChange={(e) => {
                                                setEventoSeleccionado({
                                                    ...eventoSeleccionado,
                                                    auditoria : e.target.value
                                                })
                                            }}
                                            value={eventoSeleccionado.auditoria}
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
                                        </Select>
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
                                            setEventoSeleccionado({
                                                ...eventoSeleccionado,
                                                zoom : e.target.value
                                            })
                                        }}
                                        value={eventoSeleccionado.zoom}
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
                                        setEventoSeleccionado({
                                            ...eventoSeleccionado,
                                            cupos : e.target.value
                                        })
                                    }}
                                    type='number'
                                    value={eventoSeleccionado.cupos}
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
                                        setEventoSeleccionado({
                                            ...eventoSeleccionado,
                                            hrsextracurriculares : e.target.value
                                        })
                                    }}
                                    type='number'
                                    value={eventoSeleccionado.hrsextracurriculares}
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
                                        
                                        setEventoSeleccionado({
                                            ...eventoSeleccionado,
                                            linkencuesta : e.target.value
                                        })
                                    }}
                                    value={eventoSeleccionado.linkencuesta}
                                />
                            </div>   
                        </>

                        <div>
                            Cargar Nuevo Flyer
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
                            Cargar Nueva Plantilla de Certificado
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
                            "req_id" : eventoSeleccionado.idevento,
                            "req_carrera" : eventoSeleccionado.carrera,
                            "req_recurrente" : eventoSeleccionado.recurrente,
                            "req_tipoensenanza" : eventoSeleccionado.tipoensenanza,
                            "req_clasificacionevento" : eventoSeleccionado.clasificacionevento,
                            "req_tipoevento" : eventoSeleccionado.tipoevento,
                            "req_organizacion" : eventoSeleccionado.organizacion,
                            "req_zoom" : eventoSeleccionado.zoom,
                            "req_linkEncuesta" : eventoSeleccionado.linkencuesta,
                            "req_linkflyer" : "",
                            "req_sede" : eventoSeleccionado.sede,
                            "req_auditoria" : eventoSeleccionado.auditoria,
                            "req_nombre" : eventoSeleccionado.nombre,
                            "req_estado" : true,
                            "req_list_fechas" : eventoSeleccionado.fechas,
                            "req_list_ponentes" : eventoSeleccionado.ponentes,
                            "req_cupos" : eventoSeleccionado.cupos,
                            "req_hrsextra" : eventoSeleccionado.hrsextracurriculares
                            // "req_linkflyer" : fileFlyer,
                        }

                        const rpta = await funEditarEvento(data, fileFlyer, filePlantillaCertificado)
                        if(rpta.respuesta == true){
                            cogoToast.success(
                                'El evento fue editado correctamente',
                                {
                                    position: 'top-right',
                                    heading: 'Evento Editado'
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

export default EditarEvento