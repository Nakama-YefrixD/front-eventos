import React, {useState, useEffect} from 'react'
import { 
    Flex, Text,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
    ModalFooter,
    useColorModeValue
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux'
import { Space, Table, Tag } from 'antd';
import {
    ObtenerFechasEventosReducer
} from '../../Redux/Actions/Administrador/GestionEventos'

const ModalTablaHorarios = (props) => {

    const dispatch = useDispatch()
    const {
		rex_lista_fechas_eventos_tabla
    } = useSelector(({adminGestionEventos}) => adminGestionEventos)
    
    const mostrarModal = props.mostrarModal
    const setMostrarModal = props.setMostrarModal
    const eventoSeleccionado = props.eventoSeleccionado
    const columns = props.columnas
    
    const brandColor = useColorModeValue('brand.500', 'white');

    useEffect(() => {
        if(!eventoSeleccionado.fechas){
            dispatch(ObtenerFechasEventosReducer(eventoSeleccionado))
        }
    }, [])

    // INPUTS PARA ENVIAR

    const [loadingGuardar, setLoadingGuardar] = useState(false)

    const columnss = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Fecha y Hora',
            key: 'fechayhora',
            render: _info => (
                <div>
                    <Flex align='center'>
                        <Text >
                            { _info.fecha +" "+ _info.hora.split(":")[0]+":"+_info.hora.split(":")[1]}
                        </Text>
                    </Flex>
                </div>
            )
        },
        {
            title: 'Sede',
            key: 'sede',
            render: _info => (
                <div>
                    <Flex align='center'>
                        <Text 
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow : 'ellipsis',
                                width : '200px'
                            }}
                        >
                            { _info.sede }
                        </Text>
                    </Flex>
                </div>
            )
        },
        {
            title: 'Lugar',
            key: 'lugar',
            render: _info => (
                <div>
                    <Flex align='center'>
                        <Text 
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow : 'ellipsis',
                                width : '200px'
                            }}
                        >
                            { _info.lugar }
                        </Text>
                    </Flex>
                </div>
            )
        },
        {
            title: 'Zoom',
            key: 'linkzoom',
            render: _info => (
                <div>
                    <Flex align='center'>
                        <Text 
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow : 'ellipsis',
                                width : '200px'
                            }}
                        >
                            { _info.linkzoom }
                        </Text>
                    </Flex>
                </div>
            )
        },
    ];

    // width: 200px; /* ajusta el ancho según tus necesidades */
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;

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
            <ModalHeader>Registros Horarios</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <button onClick={() => console.log(eventoSeleccionado)}>clic</button>
                <Table 
                    columns={
                        columns
                        ?columns
                        :eventoSeleccionado.tipoensenanza == "Presencial"
                        ?[
                            {
                                title: 'Fecha y Hora',
                                key: 'fechayhora',
                                render: _info => (
                                    <div>
                                        <Flex align='center'>
                                            <Text >
                                                { _info.fecha +" "+ _info.hora.split(":")[0]+":"+_info.hora.split(":")[1]}
                                            </Text>
                                        </Flex>
                                    </div>
                                )
                            },
                            {
                                title: 'Sede',
                                key: 'sede',
                                render: _info => (
                                    <div>
                                        <Flex align='center'>
                                            <Text 
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow : 'ellipsis',
                                                    width : '100px'
                                                }}
                                                title={_info.sede}
                                            >
                                                { _info.sede }
                                            </Text>
                                        </Flex>
                                    </div>
                                )
                            },
                            {
                                title: 'Lugar',
                                key: 'lugar',
                                render: _info => (
                                    <div>
                                        <Flex align='center'>
                                            <Text 
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow : 'ellipsis',
                                                    width : '200px'
                                                }}
                                                title={_info.lugar}
                                            >
                                                { _info.lugar }
                                            </Text>
                                        </Flex>
                                    </div>
                                )
                            },
                        ]
                        :[
                            {
                                title: 'Item',
                                dataIndex: 'item',
                                key: 'item',
                                render: (text) => <a>{text}</a>,
                            },
                            {
                                title: 'Fecha y Hora',
                                key: 'fechayhora',
                                render: _info => (
                                    <div>
                                        <Flex align='center'>
                                            <Text >
                                                { _info.fecha +" "+ _info.hora.split(":")[0]+":"+_info.hora.split(":")[1]}
                                            </Text>
                                        </Flex>
                                    </div>
                                )
                            },
                            {
                                title: 'Zoom',
                                key: 'linkzoom',
                                render: _info => (
                                    <div>
                                        <Flex align='center'>
                                            <Text 
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow : 'ellipsis',
                                                    width : '200px'
                                                }}
                                                title={_info.linkzoom}
                                            >
                                                <a
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: 'blue',
                                                        textDecoration: 'underline'
                                                    }}
                                                    href={_info?.linkzoom }
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                >
                                                    { _info.linkzoom }
                                                </a>
                                            </Text>
                                        </Flex>
                                    </div>
                                )
                            },
                        ]
                    }
                    // dataSource={rex_lista_fechas_eventos_tabla}
                    dataSource={eventoSeleccionado.fechas}
                />

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
                        setMostrarModal(!mostrarModal)
                    }}
                >
                    Cerrar
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )

}

export default ModalTablaHorarios