import React from 'react'
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

const EditarCarrera = (props) => {

    const {
        mostrarModal,
        setMostrarModal,
        funEditar,
        loading,
        carreraSeleccionada,
        funEditarContenido
    } = props

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
                <ModalHeader>Editar Carrera</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Nombre de la carrera</FormLabel>
                        <Input 
                            placeholder='Nombre de la carrera' 
                            onChange={(e) => {
                                funEditarContenido(e.target.value)
                            }}
                            value={carreraSeleccionada.nombreEditado}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        colorScheme='blue' mr={3}
                        onClick={async () => {
                            const rpta = await funEditar(carreraSeleccionada.nombreEditado)
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

export default EditarCarrera