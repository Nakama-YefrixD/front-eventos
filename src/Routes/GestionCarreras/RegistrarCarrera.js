import React, {useState} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    FormControl,
    ModalHeader,
    ModalBody,
    FormLabel,
    Input,
    ModalFooter,
    Button
} from '@chakra-ui/react';

const RegistrarCarrera = (props) => {

    const {
        mostrarModal,
        setMostrarModal,
        funCrear,
        loading
    } = props

    const [input_nombre, setInput_nombre] = useState("")

    return (
        <div>

            <Modal
                isOpen={mostrarModal}
                onClose={() => {
                    setMostrarModal(!mostrarModal)
                }}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Crea un carrera</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Nombre de la carrera</FormLabel>
                        <Input 
                            placeholder='Nombre de la carrera' 
                            onChange={(e) => {
                                setInput_nombre(e.target.value)
                            }}
                            value={input_nombre}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        colorScheme='blue' mr={3}
                        onClick={() => {
                            funCrear(input_nombre)
                        }}
                        isLoading={loading}
                    >
                        Guardar
                    </Button>
                    <Button 
                        onClick={() => {
                            setMostrarModal(!mostrarModal)
                        }}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default RegistrarCarrera