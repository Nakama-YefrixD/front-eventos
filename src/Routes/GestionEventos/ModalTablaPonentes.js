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
    ObtenerPonentesEventosReducer
} from '../../Redux/Actions/Administrador/GestionEventos'

const ModalTablaPonentes = (props) => {

    const dispatch = useDispatch()
    const {
		rex_lista_ponentes_eventos_tabla
    } = useSelector(({adminGestionEventos}) => adminGestionEventos)
    
    const mostrarModal = props.mostrarModal
    const setMostrarModal = props.setMostrarModal
    const eventoSeleccionado = props.eventoSeleccionado
    
    const brandColor = useColorModeValue('brand.500', 'white');

    useEffect(() => {
        if(!eventoSeleccionado.ponentes){
            dispatch(ObtenerPonentesEventosReducer(eventoSeleccionado))
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
            title: 'Ponente',
            dataIndex: 'ponente',
            key: 'ponente',
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
            <ModalHeader>Registros Ponentes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                
                <Table 
                    columns={columns}
                    dataSource={rex_lista_ponentes_eventos_tabla}
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

export default ModalTablaPonentes