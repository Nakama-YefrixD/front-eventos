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
    ObtenerFechasEventosReducer
} from '../../Redux/Actions/Administrador/GestionEventos'
import { UsergroupAddOutlined } from '@ant-design/icons';
import ModalEstudiantes from './ModalEstudiantes';

const ModalAsistencias = (props) => {

    const dispatch = useDispatch()
    const {
		rex_lista_fechas_eventos_tabla
    } = useSelector(({adminGestionEventos}) => adminGestionEventos)

    const mostrarModal = props.mostrarModal
    const setMostrarModal = props.setMostrarModal
    const eventoSeleccionado = props.eventoSeleccionado

    const mostrarModalEstudiantes = props.mostrarModalEstudiantes
    const setMostrarModalEstudiantes = props.setMostrarModalEstudiantes
    
    const fechaEventoSeleccionado = props.fechaEventoSeleccionado
    const setFechaEventoSeleccionado = props.setFechaEventoSeleccionado

    useEffect(() => {
        dispatch(ObtenerFechasEventosReducer(eventoSeleccionado))
    }, [])

    const [loadingGuardar, setLoadingGuardar] = useState(false)
    

    const columns = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Nombre Evento',
            key: 'nombevento',
            render: (info) => (
                <div
                    onClick={() => {
                        
                    }}
                >
                    {info.eventos?.nombre}
                </div>
            )
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'Hora',
            dataIndex: 'hora',
            key: 'hora',
        },
        {
            title: 'Estudiantes',
            key: 'estudiantes',
            render: (info) => (
                <div
                    onClick={() => {
                        setMostrarModalEstudiantes(!mostrarModalEstudiantes)
                        setMostrarModal(!mostrarModal)
                        setFechaEventoSeleccionado(info)
                    }}
                    style={{
                        cursor: 'pointer',
                        color: 'blue',
                        textDecoration: 'underline'
                    }}
                >
                    <Tooltip 
                        placement="bottom" 
                        title={"Ver Estudiantes"}
                    >
                        <UsergroupAddOutlined style={{ fontSize: '20px' }} />
                    </Tooltip>
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
            <ModalHeader>Fechas de Evento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Table 
                    columns={columns}
                    dataSource={rex_lista_fechas_eventos_tabla}
                />

            </ModalBody>

            <ModalFooter>
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

export default ModalAsistencias