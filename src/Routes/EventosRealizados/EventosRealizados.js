import React, {useEffect} from 'react'
import TabEventosRealizados from './TabEventosRealizados';
import { useSelector, useDispatch } from 'react-redux'
import {
    ObtenerEventosRealizadosReducer
} from '../../Redux/Actions/EventosRealizados/EventosRealizados'

const EventosRealizados = () => {

    const dispatch = useDispatch()

    const {
		rex_lista_eventos_realizados
    } = useSelector(({eventosRealizados}) => eventosRealizados)

    useEffect(() => {
        dispatch(ObtenerEventosRealizadosReducer())
    }, [])

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
                Eventos Realizados
            </div>
            
            {/* <button onClick={()=> {console.log(rex_lista_eventos_realizados);}}> ver </button> */}

            <TabEventosRealizados 
                table_data = {rex_lista_eventos_realizados}
            />
        </div>

    )
}

export default EventosRealizados