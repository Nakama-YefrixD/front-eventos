import React from 'react'
import TablaEventosRealizados from './TablaEventosRealizados'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';

const EventosRealizados = () => {
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

            <TablaEventosRealizados tableData={tableDataComplex} />
        </div>

    )
}

export default EventosRealizados