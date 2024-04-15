import React, {useEffect, useState} from 'react'
import TablaGestionUsuarios from './TablaGestionUsuarios'
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
    Button, Input
} from '@chakra-ui/react';
import { useHistory } from "react-router-dom";
import {
	ObtenerListaUsuariosAdministradorReducer,
    SeleccionarUsuarioReducer,
    EliminarUsuarioReducer
} from '../../Redux/Actions/Administrador/GestionUsuarios'
import { useSelector, useDispatch } from 'react-redux'
import TabGestionUsuarios from './TabGestionUsuarios';

const GestionUsuarios = () => {

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const history = useHistory();
    const dispatch = useDispatch()

    const [showTableUsuarios, setShowTableUsuarios] = useState(true)
    const [input_estado, setInput_estado] = useState(null)
    const [input_rol, setInput_rol] = useState(null)

    useEffect(() => {
		dispatch(ObtenerListaUsuariosAdministradorReducer())
	}, [])

    const {
		rex_lista_usuarios_adminsitrador
    } = useSelector(({adminGestionUsuarios}) => adminGestionUsuarios)

    const EditarUsuario = (usuid) => {
        const usuario = rex_lista_usuarios_adminsitrador.find(item => item.usuid === usuid);
        console.log(usuario);
        dispatch(SeleccionarUsuarioReducer(usuario))
    }

    const EliminarUsuario = async (usuid) => {
        const rpta = await dispatch(EliminarUsuarioReducer(usuid))
        setShowTableUsuarios(false)
        setTimeout(() => {
            setShowTableUsuarios(true)
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
                Gestion de Usuarios
            </div>

            <div 
                style={{marginBottom:'20px'}}
            >
                <div
                    // style={{
                    //     display:'flex'
                    // }}
                >
                    
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
                                cursor:'pointer',
                                // right: '0',
                                // position: 'absolute'
                            }}
                            onClick={() => {
                                history.push('/otros/registrar-usuario');
                            }}
                        >
                            Agregar
                        </div>
                    </div>
                </div>
            </div>

            {/* {
                rex_lista_usuarios_adminsitrador.length > 0 && showTableUsuarios
                ?<TablaGestionUsuarios 
                    tableData={tableDataComplex} 
                    lista_data = {rex_lista_usuarios_adminsitrador}
                    editarUsuario = {(e) => {
                        EditarUsuario(e)
                    }}
                    eliminarUsuario = {(usuid) => {
                        EliminarUsuario(usuid)
                    }}
                />
                :null
            } */}

            <TabGestionUsuarios 
                table_data = {rex_lista_usuarios_adminsitrador}
                editarUsuario = {(e) => {
                    EditarUsuario(e)
                }}
                eliminarUsuario = {(usuid) => {
                    EliminarUsuario(usuid)
                }}
            />
            
            <Modal 
                isOpen={false} 
                // onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    asdasdsa
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} >
                    Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default GestionUsuarios