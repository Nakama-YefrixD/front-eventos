import React from 'react'
import { CalendarEventosInscritos } from './CalendarEventosInscritos'
import Card from 'components/card/Card';
import CalenEventoInscritos from './CalenEventoInscritos';

const EventosInscrito = () => {
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
                <CalendarEventosInscritos />
                {/* <CalenEventoInscritos /> */}
            </Card>

            
        </div>
    )
}

export default EventosInscrito