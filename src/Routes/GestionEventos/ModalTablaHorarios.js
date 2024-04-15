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
    
    const brandColor = useColorModeValue('brand.500', 'white');

    useEffect(() => {
        if(!eventoSeleccionado.fechas){
            dispatch(ObtenerFechasEventosReducer(eventoSeleccionado))
        }
    }, [])

    // INPUTS PARA ENVIAR

    const [loadingGuardar, setLoadingGuardar] = useState(false)

    const columns = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: (text) => <a>{text}</a>,
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
            <ModalHeader>Registros Horarios</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {/* <button onClick={() => console.log(eventoSeleccionado)}>clic</button> */}
                <Table 
                    columns={columns}
                    dataSource={rex_lista_fechas_eventos_tabla}
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