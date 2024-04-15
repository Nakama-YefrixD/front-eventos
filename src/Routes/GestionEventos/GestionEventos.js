import React, {useEffect, useState} from 'react'
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
import { 
    AgregarEventoReducer,
    EliminarEventoReducer,
    ObtenerGestionEventosReducer, SeleccionarEventoReducer
} from 'Redux/Actions/Administrador/GestionEventos';
import { useSelector, useDispatch } from 'react-redux'
import ModalCrearEvento from './ModalCrearEvento';
import ModalTablaHorarios from './ModalTablaHorarios';
import ModalTablaPonentes from './ModalTablaPonentes';
import TablaEventos from './TablaEventos';

const GestionEventos = () => {

    const history = useHistory();
    const dispatch = useDispatch()

    const [showTableEventos, setShowTableEventos] = useState(true)
    const [input_estado, setInput_estado] = useState(null)
    const [input_fecha, setInput_fecha] = useState(null)
    const [eventoSeleccionado, setEventoSeleccionado] = useState({})

    const [mostrarModal, setMostrarModal] = useState(false)
    const [mostrarModalHorario, setMostrarModalHorario] = useState(false)
    const [mostrarModalPonente, setMostrarModalPonente] = useState(false)

    useEffect(() => {
		dispatch(ObtenerGestionEventosReducer() )
	}, [])

    const {
		rex_lista_gestion_eventos
    } = useSelector(({adminGestionEventos}) => adminGestionEventos)

    const EditarEvento = (idevento) => {
        const evento = rex_lista_gestion_eventos.find(item => item.id === idevento);
        console.log(evento);
        dispatch(SeleccionarEventoReducer(evento))
    }

    const EliminarEvento = async (idevento) => {
        const rpta = await dispatch(EliminarEventoReducer(idevento))
 
        return rpta
    }

    const AgregarEvento = async (evento, fileFlyer, fileCertificado) => {
        const rpta = await dispatch(AgregarEventoReducer(evento, fileFlyer, fileCertificado))
        setShowTableEventos(false)
        setTimeout(() => {
            setShowTableEventos(true)
        }, 500)
        return rpta
    }

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
            <div 
                style={{
                    marginBottom:'20px'
                }}
            >
                <div
                    style={{
                        display:'flex'
                    }}
                >
                    {/* <div
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
                            mb='8px'
                        >
                            <Input
                                placeholder="Fecha"
                                size="md"
                                type="date"
                                style={{
                                    border: '1px solid #0C0F59',
                                    marginRight:'10px'
                                }}
                                onChange={(e) => {
                                    
                                    // dispatch(ObtenerGestionEventosReducer(input_estado, e.target.value))
                                    setInput_fecha(e.target.value)
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
                                fontSize='sm' variant='subtle' 
                                defaultValue='Estado' width='unset' fontWeight='700'
                                style={{
                                    border: '1px solid #0C0F59',
                                }}
                                onChange={(e) => {
                                    dispatch(ObtenerGestionEventosReducer(e.target.value, input_fecha))
                                    setInput_estado(e.target.value)
                                }}
                            >
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </Select>
                        </Flex>
                        <Flex
                            px={{ base: '0px', '2xl': '10px' }}
                            justifyContent='space-between'
                            alignItems='center'
                            w='100%'
                            mb='8px'
                        >
                            <div
                                style={{
                                    width:'70px',
                                    height:'40px',
                                    background:'#0C0F59',
                                    color:'white',
                                    borderRadius:'8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor:'pointer',
                                    marginLeft: '10px'
                                    // right: '0',
                                    // position: 'absolute'
                                }}
                                onClick={() => {
                                    dispatch(ObtenerGestionEventosReducer(input_estado, input_fecha))
                                }}
                            >
                                Buscar
                            </div>
                        </Flex>
                    </div> */}
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
                                cursor:'pointer'
                            }}
                            onClick={() => {
                                // history.push('/otros/crear-eventos');
                                setMostrarModal(!mostrarModal)
                            }}
                        >
                            Agregar
                        </div>
                    </div>
                </div>
            </div>
            
            <TablaEventos 
                table_data = {rex_lista_gestion_eventos}
                
                editarEvento = {(e) => {
                    EditarEvento(e)
                }}
                eliminarEvento = {async (idevento) => {
                    return await EliminarEvento(idevento)
                }}
                setMostrarFechas = {setMostrarModalHorario}
                mostrarFechas = {mostrarModalHorario}
                setEventoSeleccionado = {setEventoSeleccionado}
                eventoSeleccionado  = {eventoSeleccionado}
                setmostrarModalPonente = {setMostrarModalPonente}
                mostrarModalPonente = {mostrarModalPonente}
            />

            {/* {
                rex_lista_gestion_eventos.length > 0 && showTableEventos
                ? <TablaGestionEventos 
                    tableData={tableDataComplex}
                    lista_data = {rex_lista_gestion_eventos}
                    editarEvento = {(e) => {
                        EditarEvento(e)
                    }}
                    eliminarEvento = {(idevento) => {
                        EliminarEvento(idevento)
                    }}
                    setMostrarFechas = {setMostrarModalHorario}
                    mostrarFechas = {mostrarModalHorario}
                    setEventoSeleccionado = {setEventoSeleccionado}
                    setmostrarModalPonente = {setMostrarModalPonente}
                    mostrarModalPonente = {mostrarModalPonente}
                />
                : null
            } */}

            {
                mostrarModal
                ?<ModalCrearEvento 
                    mostrarModal = {mostrarModal}
                    setMostrarModal = {setMostrarModal}
                    agregarEvento = {AgregarEvento}
                />
                :null
            }

            {
                mostrarModalHorario == true
                ?<ModalTablaHorarios
                    mostrarModal = {mostrarModalHorario}
                    setMostrarModal = {setMostrarModalHorario}
                    eventoSeleccionado = {eventoSeleccionado}
                />
                :null
            }

            {
                mostrarModalPonente == true
                ?<ModalTablaPonentes 
                    mostrarModal = {mostrarModalPonente}
                    setMostrarModal = {setMostrarModalPonente}
                    eventoSeleccionado = {eventoSeleccionado}
                />
                :null
            }
            
        </div>
    )
}

export default GestionEventos