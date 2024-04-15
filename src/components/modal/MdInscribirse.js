import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    InscribirUsuarioEventoReducer
} from '../../Redux/Actions/EventosInscritos/EventosInscritos'
import cogoToast from 'cogo-toast';
import { Modal, Button } from 'antd';

const MdInscribirse = (props) => {

    const dispatch = useDispatch()
	
	const [loadingInscribirme, setLoadingInscribirme] = useState(false);

    const { 
        mostrarConfirmacion, setMostrarConfirmacion, eventoSeleccionado,
        mostrarEventos
    } = props

    return (
        <div>
            <Modal
                title="Confirmación"
                visible={mostrarConfirmacion}
                footer={[
                    <Button 
                        key="back" 
                        onClick={() => {
                            setMostrarConfirmacion(!mostrarConfirmacion)
                        }}
                    >
                        Cancelar
                    </Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        loading={loadingInscribirme} 
                        onClick={async () => {
                            setLoadingInscribirme(true)
                            const rpta = await dispatch(InscribirUsuarioEventoReducer(eventoSeleccionado.id))
                            if(rpta.respuesta){
                                cogoToast.success(
                                    'Has sido inscrito correctametne',
                                    {
                                        position: 'top-right',
                                        heading: 'Inscripción Evento'
                                    },
                                );
                                
                                mostrarEventos()
                                // setMostrarTabla(false)
                                // setTimeout(() => {
                                //     setMostrarTabla(true)
                                // }, 1000)
                                
                            }
                            setLoadingInscribirme(false)
                            setMostrarConfirmacion(!mostrarConfirmacion)
                        }}
                    >
                      Aceptar
                    </Button>
                  ]}
            >
                <p>¿Estás seguro de inscribirte a este evento?</p>
            </Modal>
        </div>
    )
}

export default MdInscribirse