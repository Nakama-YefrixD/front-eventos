import React, {useState} from 'react'
import TablaGestionCarreras from './TablaGestionCarreras'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import Card from 'components/card/Card';
import { useHistory } from "react-router-dom";
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


const GestionCarreras = () => {

    const history = useHistory();

    const [showModalCrearCarrera, setShowModalCrearCarrera] = useState(false)

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


            <Card 
                style={{marginBottom:'20px'}}
            >
                <div
                    style={{
                        display:'flex'
                    }}
                >
                    <div
                        style={{
                            width:'35%',
                            alignSelf: 'center'
                        }}
                    >
                        <input 
                            style={{
                                border: '2px solid #0C0F59',
                                borderRadius: '8px',
                                paddingLeft:'5px',
                                width: '250px'
                            }}
                            placeholder='Buscar' 
                        />
                    </div>
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
                                right: '0',
                                position: 'absolute'
                            }}
                            onClick={() => {
                                setShowModalCrearCarrera(!showModalCrearCarrera)
                            }}
                        >
                            Agregar
                        </div>
                    </div>
                </div>
            </Card>

            <TablaGestionCarreras tableData={tableDataComplex} />
            


            <Modal
                isOpen={showModalCrearCarrera}
                onClose={() => {
                    setShowModalCrearCarrera(!showModalCrearCarrera)
                }}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Crea un carrera</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Nombre de la carrera</FormLabel>
                        <Input placeholder='Nombre de la carrera' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Guardar
                    </Button>
                    <Button onClick={() => {}}>Cancelar</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default GestionCarreras