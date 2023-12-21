import React, {useEffect} from 'react'
import Tablaevdi from './Tablaevdi';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import TablaEventDisp from './TablaEventDisp';
import { useSelector, useDispatch } from 'react-redux'
import { ObtenerEventosDisponiblesReducer } from 'Redux/Actions/EventosDisponibles/EventosDisponibles';

const EventosDisponibles = () => {
    
    const dispatch = useDispatch()

    const {
		rex_lista_eventos_disponibles
    } = useSelector(({eventosDisponibles}) => eventosDisponibles)

    useEffect(() => {
        dispatch(ObtenerEventosDisponiblesReducer())
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
                Eventos Disponibles
            </div>
            
            <TablaEventDisp 
                table_data={rex_lista_eventos_disponibles}
            />

            {/* <Tablaevdi tableData={tableDataComplex} /> */}
        </div>
    )
}

export default EventosDisponibles