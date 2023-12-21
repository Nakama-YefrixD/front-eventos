import React, {useEffect} from 'react'
import { CalendarEventosInscritos } from './CalendarEventosInscritos'
import Card from 'components/card/Card';
import CalenEventoInscritos from './CalenEventoInscritos';
import { useSelector, useDispatch } from 'react-redux'
import {
    ObtenerEventosInscritosReducer
} from '../../Redux/Actions/EventosInscritos/EventosInscritos'

const EventosInscrito = () => {

    const dispatch = useDispatch()

    const {
		rex_lista_eventos_inscritos
    } = useSelector(({eventosInscritos}) => eventosInscritos)

    useEffect(() => {
        dispatch(ObtenerEventosInscritosReducer())
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
                Eventos Inscritos
            </div>
            
            <Card>
                <CalendarEventosInscritos 
                    eventos = {rex_lista_eventos_inscritos}
                />
                {/* <CalenEventoInscritos /> */}
            </Card>

            
        </div>
    )
}

export default EventosInscrito