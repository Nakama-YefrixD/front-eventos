import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ObtenerInscritosEventosReducer } from 'Redux/Actions/Administrador/GestionEventos'

const ModalTablaInscritos = (props) => {

  const dispatch = useDispatch()
  const {
    rex_lista_ponentes_eventos_tabla
  } = useSelector(({ adminGestionEventos }) => adminGestionEventos)

  const mostrarModal = props.mostrarModal
  const setMostrarModal = props.setMostrarModal
  const eventoSeleccionado = props.eventoSeleccionado

  const [loadingGuardar, setLoadingGuardar] = useState(false)

  useEffect(() => {
    if (!eventoSeleccionado.ponentes) {
      dispatch(ObtenerInscritosEventosReducer(eventoSeleccionado))
    }
  }, [])

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
      onClose={() => {
        setMostrarModal(!mostrarModal)
      }}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Estudiantes Inscritos</ModalHeader>
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

export default ModalTablaInscritos