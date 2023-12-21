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
    useColorModeValue
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux'
import { Space, Table, Tooltip } from 'antd';
import {
    ObtenerAsistenciaEventoReducer
} from '../../Redux/Actions/Administrador/GestionEventos'
import { UsergroupAddOutlined } from '@ant-design/icons';

const ModalEstudiantes = (props) => {

    const dispatch = useDispatch()
    const {
		rex_lista_fechas_eventos_tabla,
        rex_lista_asistencias_evento_tabla
    } = useSelector(({adminGestionEventos}) => adminGestionEventos)

    const mostrarModal = props.mostrarModal
    const setMostrarModal = props.setMostrarModal
    const eventoSeleccionado = props.eventoSeleccionado

    const fechaEventoSeleccionado = props.fechaEventoSeleccionado
    const setFechaEventoSeleccionado = props.setFechaEventoSeleccionado

    useEffect(() => {
        dispatch(ObtenerAsistenciaEventoReducer(eventoSeleccionado, fechaEventoSeleccionado))
    }, [])

    const [loadingGuardar, setLoadingGuardar] = useState(false)

    const columns = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: (text) => <a>{text}</a>,
        },
        // {
        //     title: 'Nombre Evento',
        //     key: 'nombevento',
        //     render: (info) => (
        //         <div
        //             onClick={() => {
                        
        //             }}
        //         >
        //             {info.eventos?.nombre}
        //         </div>
        //     )
        // },
        {
            title: 'Estudiante',
            key: 'estudiante',
            render: (info) => (
                <div
                    onClick={() => {
                        
                    }}
                >
                    {info.usuusuarios?.usunombre + " "+ info.usuusuarios?.usuapell_paterno}
                </div>
            )
        },
        // {
        //     title: 'Fecha',
        //     key: 'fecha',
        //     render: (info) => (
        //         <div
        //             onClick={() => {
                        
        //             }}
        //         >
        //             {info.fechaseventos?.fecha}
        //         </div>
        //     )
        // },
        // {
        //     title: 'Hora',
        //     key: 'hora',
        //     render: (info) => (
        //         <div
        //             onClick={() => {
                        
        //             }}
        //         >
        //             {info.fechaseventos?.hora}
        //         </div>
        //     )
        // },
        {
            title: 'Asistio',
            key: 'asistio',
            render: (info) => (
                <div
                    onClick={() => {
                        
                    }}
                >
                    {info.asistio ? "Si" : "No"}
                </div>
            )
        }
    ];

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
            <ModalHeader>Registros Asistencias</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    onClick={() => {
                        console.log(fechaEventoSeleccionado);
                    }}
                >
                    <div style={{}}><b>Nombre Evento: {fechaEventoSeleccionado.eventos?.nombre} </b></div>
                    <div style={{}}><b>Fecha: {fechaEventoSeleccionado.fecha} </b></div>
                    <div style={{}}><b>Hora: {fechaEventoSeleccionado.hora} </b></div>
                </div>

                <Table 
                    columns={columns}
                    dataSource={rex_lista_asistencias_evento_tabla}
                />

            </ModalBody>

            <ModalFooter>
                <Button 
                    // variant='blue'
                    colorScheme='blue'
                    isLoading={loadingGuardar}
                    onClick={async () => {
                        
                    }}
                >
                    Cerrar
                </Button>
            </ModalFooter>
            </ModalContent>

            

        </Modal>
    )
}

export default ModalEstudiantes