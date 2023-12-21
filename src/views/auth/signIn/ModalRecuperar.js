import React, {useState} from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    ModalBody,
    ModalHeader,
    ModalFooter
} from "@chakra-ui/react";

import {
    EnviarCorreoReducer
} from '../../../Redux/Actions/Recuperar/Recuperar'
import { useSelector, useDispatch } from 'react-redux'
import cogoToast from 'cogo-toast';

const ModalRecuperar = (props) => {

    const {
        setShowModal,
        showModal
    } = props

    const dispatch = useDispatch()
    const [txtCorreo, setTxtCorreo] = useState("")
    const [cargandoBtn, setCargandoBtn] = useState(false)

    return (
        <div>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(!showModal)
                }}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Recuperar tu Cuenta</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        placeholder='mail@gmail.com' 
                        onChange={(e) => {
                            setTxtCorreo(e.target.value)
                        }}
                        value={txtCorreo}
                    />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        isLoading={cargandoBtn}
                        colorScheme='blue' mr={3}
                        onClick={async() => {
                            setCargandoBtn(true)
                            const rpta = await dispatch(EnviarCorreoReducer(txtCorreo))
                            setCargandoBtn(false)
                            console.log(rpta);
                            if(rpta.respuesta == true){
                                cogoToast.success(
                                    'El correo fue enviado correctamente',
                                    {
                                        position: 'top-right',
                                        heading: 'Contraseña reiniciada'
                                    },
                                );
                                setShowModal(false)
                            }else{
                                cogoToast.error(
                                    rpta.message,
                                    {
                                        position: 'top-right',
                                        heading: 'Usuario no encontrado'
                                    },
                                )
                            }
                        }}
                    >
                        Enviar
                    </Button>
                    <Button 
                        onClick={() => {setShowModal(!showModal)}}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ModalRecuperar